import { pathToFileURL } from "node:url";
import { join } from "node:path";
import { createRequire } from "node:module";
const toolRoot =
  process.env.REVIEW_TOOLS ||
  join(process.env.LOCALAPPDATA, "Temp/drtech-review/node_modules");
const { chromium } = await import(
  pathToFileURL(join(toolRoot, "playwright/index.mjs"))
);
const sharp = createRequire(import.meta.url)(join(toolRoot, "sharp"));
const browser = await chromium.launch({
  executablePath:
    process.env.REVIEW_BROWSER ||
    "C:/Program Files/Google/Chrome/Application/chrome.exe",
  args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader"],
});
const page = await browser.newPage({
  viewport: { width: 1280, height: 1067 },
  deviceScaleFactor: 1,
  reducedMotion: "reduce",
});
await page.goto(process.env.REVIEW_URL || "http://127.0.0.1:5180");
await page.evaluate(async () => {
  const { mountHardware } =
    await import("/src/components/studio/hardwareRenderer.js");
  document.body.innerHTML =
    '<div id="poster" style="position:fixed;inset:0;background:#030b18"></div>';
  window.posterRenderer = mountHardware(
    document.getElementById("poster"),
    () => {},
  );
});
await page.locator("#poster canvas").waitFor();
await page.waitForTimeout(1000);
const png = await page.screenshot();
await sharp(png)
  .webp({ quality: 88 })
  .toFile("public/assets/workstation-studio.webp");
await sharp(png)
  .resize(768, 640)
  .webp({ quality: 84 })
  .toFile("public/assets/workstation-studio-mobile.webp");
await browser.close();
console.log("Generated responsive posters from the real HardwareScene.");
