import React from "react";
import { act, create } from "react-test-renderer";
import { renderToStaticMarkup } from "react-dom/server";
import assert from "node:assert/strict";
import i18n from "../src/i18n/index.js";
import Contact from "../src/components/sections/Contact.jsx";
import Hero from "../src/components/sections/Hero.jsx";
import ServicePaths from "../src/components/sections/ServicePaths.jsx";

for (const lang of ["en", "si", "ta"]) {
  await i18n.changeLanguage(lang);
  const markup = renderToStaticMarkup(
    <>
      <Hero />
      <ServicePaths />
      <Contact />
    </>,
  );
  assert.ok(
    !markup.includes("experience.") && !markup.includes("request."),
    `${lang}: no untranslated keys`,
  );
  let view;
  await act(async () => {
    view = create(<Contact />);
  });
  const root = view.root;
  const submit = () =>
    act(() => root.findByType("form").props.onSubmit({ preventDefault() {} }));
  const change = (name, value) =>
    act(() =>
      root
        .findAllByProps({ name })
        .find((n) => typeof n.type === "string")
        .props.onChange({ target: { name, value } }),
    );
  submit();
  assert.equal(
    root.findAllByProps({ role: "alert" }).length,
    1,
    "empty service rejected",
  );
  change("service", "computer");
  submit();
  change("issue", "          ");
  submit();
  assert.equal(
    root.findAllByProps({ role: "alert" }).length,
    1,
    "whitespace issue rejected",
  );
  change("issue", "Laptop is slow & screen flickers.");
  submit();
  change("name", "Test customer");
  change("phone", "abcdefg");
  change("location", "Kotte");
  submit();
  assert.equal(
    root.findAllByProps({ role: "alert" }).length,
    1,
    "invalid phone rejected",
  );
  change("phone", "+94 77 123 4567");
  submit();
  const link = root
    .findAllByType("a")
    .find((a) => a.props.href.startsWith("https://wa.me/"));
  const url = new URL(link.props.href);
  assert.equal(url.pathname, "/94760846996");
  const message = url.searchParams.get("text");
  for (const value of [
    "Laptop is slow & screen flickers.",
    "Test customer",
    "Kotte",
    "+94 77 123 4567",
  ])
    assert.ok(message.includes(value));
  assert.equal(
    root.findAllByProps({ role: "status" }).length,
    0,
    "no false sent status",
  );
  act(() => link.props.onClick());
  assert.equal(
    root.findAllByProps({ role: "status" }).length,
    1,
    "handoff guidance shown",
  );
  act(() =>
    root
      .findAllByType("button")
      .find((b) => b.props.type === "button")
      .props.onClick(),
  );
  assert.equal(
    root.findByProps({ name: "name" }).props.value,
    "Test customer",
    "back preserves entries",
  );
  await act(async () => view.unmount());
  console.log(
    `${lang}: rendering, validation, review, WhatsApp encoding and back navigation passed`,
  );
}
