import assert from "node:assert/strict";
import { pathToFileURL } from "node:url";
import { join } from "node:path";
import { mkdir, writeFile } from "node:fs/promises";
const { chromium } = await import(pathToFileURL(process.env.PLAYWRIGHT_MODULE || join(process.env.LOCALAPPDATA,"Temp/drtech-review/node_modules/playwright/index.mjs")));
const base = process.env.REVIEW_URL || "http://127.0.0.1:5180";
const folder = "docs/review/3d-2026-10-06";
await mkdir(folder,{recursive:true});
const browser = await chromium.launch({executablePath:process.env.REVIEW_BROWSER || "C:/Program Files/Google/Chrome/Application/chrome.exe",args:["--use-angle=swiftshader","--enable-unsafe-swiftshader"]});
const results=[], errors=[];
for (const width of [1440,390]) {
  const page=await browser.newPage({viewport:{width,height:1000}});
  page.on("pageerror",e=>errors.push(e.message));
  await page.addInitScript(()=>{
    window.glDraws=0;
    for(const type of [WebGLRenderingContext,WebGL2RenderingContext]) {
      const original=type.prototype.drawElements;
      type.prototype.drawElements=function(...args){window.glDraws++;return original.apply(this,args)};
    }
  });
  await page.goto(base,{waitUntil:"domcontentloaded"});
  assert.equal(await page.locator("canvas").count(),0,"image-first HTML");
  assert.equal(await page.locator(".hero-backdrop img").isVisible(),true);
  await page.locator(".immersive-hardware.is-live").waitFor({timeout:30000});
  await page.waitForTimeout(2500);
  const before=await page.evaluate(()=>window.glDraws);
  await page.waitForTimeout(400);
  assert.equal(await page.evaluate(()=>window.glDraws),before,"renderer stops after settling");
  if(width===1440){await page.mouse.move(1250,400);await page.waitForTimeout(1000);assert.ok(await page.evaluate(()=>window.glDraws)>before,"pointer changes perspective");}
  for(const lang of ["en","si","ta"]) {
    await page.locator(".language-button").nth(["en","si","ta"].indexOf(lang)).click();
    await page.waitForFunction(lang=>document.documentElement.lang===lang,lang);
    await page.evaluate(()=>document.fonts.ready);
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
    assert.equal(await page.locator(".scene-toggle,.hardware-controls,.device-detail").count(),0);
    await page.screenshot({path:`${folder}/hero-${lang}-${width}.png`});
  }
  await page.locator("#business").scrollIntoViewIfNeeded();
  await page.waitForTimeout(1000);
  const offscreen=await page.evaluate(()=>window.glDraws);
  await page.waitForTimeout(400);
  assert.equal(await page.evaluate(()=>window.glDraws),offscreen,"offscreen renderer paused");
  await page.locator(".business-chapter").screenshot({path:`${folder}/business-${width}.png`,style:".studio-header,.mobile-dock{visibility:hidden!important}"});
  await page.locator("#growth").scrollIntoViewIfNeeded();
  await page.locator(".digital-preview").screenshot({path:`${folder}/digital-${width}.png`,style:".studio-header,.mobile-dock{visibility:hidden!important}"});
  await page.locator("#home").scrollIntoViewIfNeeded();
  await page.evaluate(()=>document.querySelector("canvas").getContext("webgl2").getExtension("WEBGL_lose_context").loseContext());
  await page.waitForFunction(()=>!document.querySelector(".immersive-hardware.is-live"));
  await page.waitForFunction(()=>getComputedStyle(document.querySelector(".hero-backdrop img")).opacity==="1");
  assert.equal(await page.locator("canvas").count(),0);
  assert.equal(await page.locator(".hero-backdrop img").evaluate(e=>getComputedStyle(e).opacity),"1");
  await page.screenshot({path:`${folder}/context-fallback-${width}.png`});
  results.push({width,translatedLayouts:3,imageFirst:true,pointer:width===1440,settles:true,offscreen:true,contextLossFallback:true});
  await page.close();
}
for(const mode of ["reduced","save-data","no-webgl"]){
  const page=await browser.newPage({viewport:{width:390,height:1000},reducedMotion:mode==="reduced"?"reduce":"no-preference"});
  if(mode==="save-data")await page.addInitScript(()=>Object.defineProperty(navigator,"connection",{value:{saveData:true}}));
  if(mode==="no-webgl")await page.addInitScript(()=>{const original=HTMLCanvasElement.prototype.getContext;HTMLCanvasElement.prototype.getContext=function(type,...args){return /^webgl/.test(type)?null:original.call(this,type,...args)}});
  await page.goto(base);
  await page.waitForTimeout(3500);
  assert.equal(await page.locator("canvas").count(),0);
  assert.equal(await page.locator(".hero-backdrop img").evaluate(e=>getComputedStyle(e).opacity),"1");
  if(mode!=="no-webgl")assert.equal(await page.evaluate(()=>performance.getEntriesByType("resource").some(r=>/hardwareRenderer/.test(r.name))),false);
  await page.screenshot({path:`${folder}/${mode}.png`});
  results.push({mode,photoFallback:true,noCanvas:true});
  await page.close();
}
assert.deepEqual(errors,[]);
await writeFile(`${folder}/checks.json`,JSON.stringify({results,errors},null,2));
await browser.close();
console.log(JSON.stringify({results,errors},null,2));
