// Local browser review. Dependencies are deliberately kept outside the app.
import { pathToFileURL } from "node:url";
import { join } from "node:path";
const { chromium } = await import(
  pathToFileURL(
    process.env.PLAYWRIGHT_MODULE ||
      join(
        process.env.LOCALAPPDATA,
        "Temp/drtech-review/node_modules/playwright/index.mjs",
      ),
  )
);
import { mkdir, writeFile } from "node:fs/promises";
const phase = process.argv[2] || "final";
const base = process.env.REVIEW_URL || "http://127.0.0.1:5180";
const folder = `docs/review/${phase}`;
await mkdir(folder, { recursive: true });
const browser = await chromium.launch({
  executablePath:
    process.env.REVIEW_BROWSER ||
    "C:/Program Files/Google/Chrome/Application/chrome.exe",
  headless: true,
  args: [
    "--enable-webgl",
    "--use-angle=swiftshader",
    "--enable-unsafe-swiftshader",
  ],
});
const results = [];
for (const lang of ["en", "si", "ta"]) {
  for (const width of [1440, 768, 390]) {
    const page = await browser.newPage({
      viewport: { width, height: 1000 },
      reducedMotion: "reduce",
    });
    const errors = [];
    page.on("pageerror", (e) => errors.push(e.message));
    await page.goto(`${base}/?lang=${lang}`);
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: `${folder}/viewport-${lang}-${width}.png` });
    await page.evaluate(async () => {
      const images = [...document.querySelectorAll("img")];
      images.forEach((img) => {
        img.loading = "eager";
      });
      await Promise.all(images.map((img) => img.decode().catch(() => {})));
    });
    await page.screenshot({
      path: `${folder}/home-${lang}-${width}.png`,
      fullPage: true,
    });
    results.push({
      lang,
      width,
      errors,
      ...(await page.evaluate(() => ({
        overflow: document.documentElement.scrollWidth > innerWidth,
        heading: document.querySelector("h1").innerText,
        initialWebGL: !!document.querySelector("canvas"),
        threeLoaded: performance
          .getEntriesByType("resource")
          .some((r) => /hardwareRenderer/.test(r.name)),
      }))),
    });
    await page.close();
  }
}
await writeFile(`${folder}/results.json`, JSON.stringify(results, null, 2));
await browser.close();
console.log(JSON.stringify(results, null, 2));
