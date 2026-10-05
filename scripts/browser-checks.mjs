import assert from "node:assert/strict";
import { pathToFileURL } from "node:url";
import { join } from "node:path";
import { mkdir, writeFile } from "node:fs/promises";
const { chromium } = await import(
  pathToFileURL(
    process.env.PLAYWRIGHT_MODULE ||
      join(
        process.env.LOCALAPPDATA,
        "Temp/drtech-review/node_modules/playwright/index.mjs",
      ),
  )
);
const base = process.env.REVIEW_URL || "http://127.0.0.1:5180";
const folder = "docs/review/validation";
await mkdir(folder, { recursive: true });
const browser = await chromium.launch({
  executablePath:
    process.env.REVIEW_BROWSER ||
    "C:/Program Files/Google/Chrome/Application/chrome.exe",
  args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader"],
});
const page = await browser.newPage({ reducedMotion: "reduce" });
const errors = [];
page.on("pageerror", (error) =>
  errors.push({ url: page.url(), message: error.message }),
);
const findings = [];
for (const lang of ["en", "si", "ta"]) {
  for (const width of [1440, 390, 320]) {
    await page.setViewportSize({ width, height: 1000 });
    for (const route of [
      "/",
      "/home-it",
      "/business",
      "/digital",
      "/projects",
      "/about",
      "/support",
      "/missing-page",
    ]) {
      const requestPath =
        route === "/" || route === "/missing-page" ? route : `${route}/`;
      await page.goto(`${base}${requestPath}?lang=${lang}`);
      await page.evaluate(() => document.fonts.ready);
      await page.evaluate(async () => {
        const images = [...document.images];
        images.forEach((i) => (i.loading = "eager"));
        await Promise.all(images.map((i) => i.decode().catch(() => {})));
      });
      const layout = await page.evaluate(() => ({
        overflow: document.documentElement.scrollWidth > innerWidth,
        overflowing: [...document.querySelectorAll("main *,header *")]
          .filter((e) => {
            const r = e.getBoundingClientRect();
            return r.width > 0 && (r.right > innerWidth + 1 || r.left < -1);
          })
          .map((e) => ({
            tag: e.tagName,
            class: e.className?.baseVal || e.className,
            text: e.innerText?.slice(0, 60),
          }))
          .slice(0, 15),
        h1s: document.querySelectorAll("h1").length,
        missingImages: [...document.images]
          .filter((i) => !i.naturalWidth)
          .map((i) => i.src),
      }));
      findings.push({ route, lang, width, ...layout });
      if (width !== 320)
        await page.screenshot({
          path: `${folder}/${route === "/" ? "home" : route.slice(1)}-${lang}-${width}.png`,
          fullPage: true,
        });
      if (route === "/" && width !== 320) {
        for (const section of [
          "problem-section",
          "pricing-section",
          "business-chapter",
          "digital-preview",
        ])
          await page.locator(`.${section}`).screenshot({
            path: `${folder}/${section}-${lang}-${width}.png`,
            style:
              ".studio-header,.mobile-dock { visibility:hidden!important; }",
          });
      }
    }
  }
  await page.goto(`${base}/support?lang=${lang}&service=wifi`);
  assert.equal(await page.locator("input[value=wifi]").isChecked(), true);
  await page.locator("button[type=submit]").click();
  await page
    .locator("textarea[name=issue]")
    .fill("Wi-Fi drops connection during video calls.");
  await page.locator("button[type=submit]").click();
  await page.locator("input[name=name]").fill("Browser review");
  await page.locator("input[name=phone]").fill("abc");
  await page.locator("input[name=location]").fill("Kotte");
  await page.locator("button[type=submit]").click();
  assert.equal(await page.locator("[role=alert]").count(), 1);
  await page.locator("input[name=phone]").fill("+94 77 123 4567");
  await page.locator("button[type=submit]").click();
  const handoff = new URL(
    await page.locator('form a[href^="https://wa.me"]').getAttribute("href"),
  );
  assert.equal(handoff.pathname, "/94760846996");
  assert.ok(
    handoff.searchParams
      .get("text")
      .includes("Wi-Fi drops connection during video calls."),
  );
  await page.screenshot({
    path: `${folder}/request-summary-${lang}.png`,
    fullPage: true,
  });
  await page.locator(".request-back").click();
  assert.equal(
    await page.locator("input[name=name]").inputValue(),
    "Browser review",
  );
}
await page.setViewportSize({ width: 390, height: 1000 });
await page.goto(`${base}/?lang=en`);
await page.locator(".menu-toggle").focus();
await page.keyboard.press("Enter");
assert.equal(
  await page.locator(".menu-toggle").getAttribute("aria-expanded"),
  "true",
);
await page.screenshot({ path: `${folder}/mobile-menu.png` });
await page.keyboard.press("Escape");
assert.equal(
  await page.locator(".menu-toggle").getAttribute("aria-expanded"),
  "false",
);
assert.equal(
  await page
    .locator(".menu-toggle")
    .evaluate((e) => e === document.activeElement),
  true,
);
// Language switching must work in place as well as through querystring URLs.
await page.locator(".language-button").nth(1).click();
await page.waitForFunction(() => document.documentElement.lang === "si");
await page.locator(".language-button").nth(2).click();
await page.waitForFunction(() => document.documentElement.lang === "ta");
await page.locator(".language-button").nth(0).click();
await page.waitForFunction(() => document.documentElement.lang === "en");
// Also exercise a host fallback URL whose HTML may belong to the home route.
await page.goto(`${base}/business?lang=en`);
assert.ok((await page.locator("h1").innerText()).includes("business"));
await page.goto(`${base}/?lang=en`);
assert.equal(await page.locator("canvas").count(), 0);
assert.equal(await page.locator('.scene-toggle,.hardware-controls,.device-detail').count(),0);
assert.equal(await page.locator('.hero-backdrop img').isVisible(),true);
assert.equal(await page.evaluate(()=>performance.getEntriesByType('resource').some(r=>/hardwareRenderer/.test(r.name))),false);
await writeFile(
  `${folder}/results.json`,
  JSON.stringify(
    {
      findings,
      errors,
      interactions:
        "Request preselection, validation, summary, encoded WhatsApp handoff, back navigation, keyboard menu, language switching, static hero with no device/price/3D overlays and no renderer download passed.",
    },
    null,
    2,
  ),
);
await browser.close();
console.log(
  JSON.stringify(
    {
      layouts: findings.length,
      overflows: findings.filter((f) => f.overflow),
      missingImages: findings.filter((f) => f.missingImages.length),
      errors,
    },
    null,
    2,
  ),
);
assert.ok(
  findings.every((f) => !f.overflow && f.h1s === 1 && !f.missingImages.length),
  "All routes fit the viewport, have one heading and valid images",
);
assert.deepEqual(errors, []);
