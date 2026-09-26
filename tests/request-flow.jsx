import React from "react";
import { act, create } from "react-test-renderer";
import { renderToStaticMarkup } from "react-dom/server";
import assert from "node:assert/strict";
import i18n from "../src/i18n/index.js";
import Contact from "../src/components/sections/Contact.jsx";
import Hero from "../src/components/sections/Hero.jsx";
import ServicePaths from "../src/components/sections/ServicePaths.jsx";
import ServiceCatalog, {
  WhyDrTech,
} from "../src/components/sections/ServiceCatalog.jsx";
import BusinessCare from "../src/components/sections/BusinessCare.jsx";
import BusinessGrowth from "../src/components/sections/BusinessGrowth.jsx";
import About from "../src/components/sections/About.jsx";
import Packages from "../src/components/sections/Packages.jsx";
import Projects from '../src/components/sections/Projects.jsx';
import { BusinessInfrastructure, TechnologyStack, InfrastructurePhotography, Resources, FinalSupport } from '../src/components/sections/Infrastructure.jsx';

for (const lang of ["en", "si", "ta"]) {
  await i18n.changeLanguage(lang);
  const markup = renderToStaticMarkup(
    <>
      <Hero />
      <ServicePaths />
      <WhyDrTech />
      <ServiceCatalog />
      <BusinessCare />
      <BusinessGrowth />
      <About />
      <Packages />
      <Projects />
      <Contact />
      <BusinessInfrastructure />
      <TechnologyStack />
      <InfrastructurePhotography />
      <Resources />
      <FinalSupport />
    </>,
  );
  assert.ok(
    !/(?:experience|request|brand|motion|projects)\.[a-zA-Z]/.test(markup),
    `${lang}: no untranslated keys: ${markup.match(/.{0,30}(?:experience|request|brand)\..{0,60}/g)}`,
  );
  const ids = new Set(
    [...markup.matchAll(/id="([^"]+)"/g)].map((match) => match[1]),
  );
  for (const link of markup.matchAll(/href="#([^"]+)"/g)) {
    assert.ok(ids.has(link[1]), `${lang}: missing anchor ${link[1]}`);
  }
  assert.equal(
    (markup.match(/<h1[ >]/g) || []).length,
    1,
    "one primary heading",
  );
  for (const price of ["LKR 7,500", "LKR 15,000", "LKR 25,000+"])
    assert.ok(markup.includes(price));
  let view;
  await act(async () => { view = create(<ServiceCatalog />); });
  const services = view.root.findAllByType('button');
  assert.equal(services.length, 6, 'six accessible service controls');
  for (let index = 0; index < services.length; index++) {
    act(() => services[index].props.onClick());
    assert.equal(services[index].props['aria-pressed'], true);
    assert.equal(view.root.findAllByProps({'aria-pressed': true}).length, 1);
    const detail = view.root.findByProps({id: 'service-detail'});
    assert.equal(detail.findByType('h3').children.join(''), i18n.t(`brand.catalog.${index}.title`));
  }
  await act(async () => view.unmount());
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
