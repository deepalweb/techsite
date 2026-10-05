// Local lab diagnostics, not a substitute for field Core Web Vitals.
import { pathToFileURL } from "node:url";
import { join } from "node:path";
import { writeFile, mkdir } from "node:fs/promises";
const { chromium } = await import(
  pathToFileURL(
    process.env.PLAYWRIGHT_MODULE ||
      join(
        process.env.LOCALAPPDATA,
        "Temp/drtech-review/node_modules/playwright/index.mjs",
      ),
  )
);
const browser = await chromium.launch({
  executablePath:
    process.env.REVIEW_BROWSER ||
    "C:/Program Files/Google/Chrome/Application/chrome.exe",
});
const output = [];
for (const width of [1440, 390]) {
  const page = await browser.newPage({ viewport: { width, height: 1000 } });
  const cdp = await page.context().newCDPSession(page);
  await cdp.send("Emulation.setCPUThrottlingRate", { rate: 4 });
  await page.addInitScript(() => {
    window.lab = { lcp: 0, cls: 0, events: [], longTasks: [] };
    new PerformanceObserver((list) =>
      list.getEntries().forEach((e) => (window.lab.lcp = e.startTime)),
    ).observe({ type: "largest-contentful-paint", buffered: true });
    new PerformanceObserver((list) =>
      list.getEntries().forEach((e) => {
        if (!e.hadRecentInput) window.lab.cls += e.value;
      }),
    ).observe({ type: "layout-shift", buffered: true });
    new PerformanceObserver((list) =>
      list.getEntries().forEach((e) => window.lab.longTasks.push(e.duration)),
    ).observe({ type: "longtask", buffered: true });
    new PerformanceObserver((list) =>
      list
        .getEntries()
        .forEach((e) =>
          window.lab.events.push({ type: e.name, duration: e.duration }),
        ),
    ).observe({ type: "event", buffered: true, durationThreshold: 16 });
  });
  await page.goto(process.env.REVIEW_URL || "http://127.0.0.1:5181");
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(1000);
  const initial = await page.evaluate(() => ({
    ...window.lab,
    threeLoaded: performance
      .getEntriesByType("resource")
      .some((e) => /hardwareRenderer/.test(e.name)),
    resources: performance
      .getEntriesByType("resource")
      .filter((e) => e.name.startsWith(location.origin))
      .map((e) => ({ name: e.name.split("/").pop(), bytes: e.transferSize })),
  }));
  if (width === 390) await page.locator(".menu-toggle").click();
  else await page.locator(".language-button").nth(1).click();
  await page.waitForTimeout(300);
  const interactions = await page.evaluate(() => window.lab.events);
  output.push({
    width,
    cpuSlowdown: 4,
    network: "Local server; external fonts/analytics use actual network",
    ...initial,
    interactions,
  });
  await page.close();
}
await mkdir("docs/review/performance", { recursive: true });
await writeFile(
  "docs/review/performance/results.json",
  JSON.stringify(output, null, 2),
);
console.log(JSON.stringify(output, null, 2));
await browser.close();
