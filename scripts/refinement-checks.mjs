import assert from 'node:assert/strict';
import {pathToFileURL} from 'node:url';
import {join} from 'node:path';
import {mkdir, writeFile} from 'node:fs/promises';
const {chromium}=await import(pathToFileURL(join(process.env.LOCALAPPDATA,'Temp/drtech-review/node_modules/playwright/index.mjs')));
const phase=process.argv[2]||'after';
const folder=`docs/review/refinement-2026-10-10/${phase}`;
await mkdir(folder,{recursive:true});
const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe'});
const results=[],errors=[];
try {
 for(const width of [1440,390,820,360]) {
  for(const lang of width===1440||width===390?['en','si','ta']:['en']) {
   const page=await browser.newPage({viewport:{width,height:1000},reducedMotion:'reduce'});
   page.on('pageerror',e=>errors.push(e.message));
   await page.goto(`http://127.0.0.1:5180/?lang=${lang}`);
   await page.evaluate(()=>document.fonts.ready);
   assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,`${width} ${lang}: overflow`);
   assert.equal(await page.locator('.scene-toggle,.hardware-controls,.device-detail').count(),0);
   await page.screenshot({path:`${folder}/hero-${lang}-${width}.png`});
   await page.locator('#growth').scrollIntoViewIfNeeded();
   await page.locator('#growth').screenshot({path:`${folder}/projects-${lang}-${width}.png`,style:'.studio-header,.mobile-dock{visibility:hidden!important}'});
   assert.equal(await page.locator('.project-featured h3').innerText(),'ERP_AI_AGENT');
   const sizes=await page.locator('.language-button').evaluateAll(elements=>elements.map(e=>({width:e.getBoundingClientRect().width,height:e.getBoundingClientRect().height})));
   await page.locator('#repairs').screenshot({path:`${folder}/services-${lang}-${width}.png`,style:'.studio-header,.mobile-dock{visibility:hidden!important}'});
   if(phase==='after') {
    assert.equal(await page.locator('.service-hardware canvas').count(),0,'reduced motion uses static assets');
    const loaded=await page.locator('.service-mobile-asset,.service-hardware > img').evaluateAll(async elements=>{
     const visible=elements.filter(e=>e.getClientRects().length>0);
     await Promise.all(visible.map(e=>e.decode()));
     return visible.every(e=>e.complete && e.naturalWidth>0);
    });
    assert.ok(loaded,'all service assets loaded');
   }
   await page.goto(`http://127.0.0.1:5180/support?service=wifi&lang=${lang}`);
   await page.evaluate(()=>document.fonts.ready);
   assert.equal(await page.locator('input[value="wifi"]').isChecked(),true);
   await page.locator('button[type="submit"]').click();
   await page.locator('textarea').fill('       ');
   // Submit directly to exercise custom trimmed-value validation rather than the browser length gate.
   await page.locator('textarea').fill('          ');
   await page.locator('button[type="submit"]').click();
   await page.locator('[role="alert"]').waitFor();
   assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
   await page.locator('.request-section').screenshot({path:`${folder}/support-${lang}-${width}.png`,style:'.studio-header,.mobile-dock{visibility:hidden!important}'});
   results.push({width,lang,overflow:false,servicePreselection:true,languageTargets:sizes});
   await page.close();
  }
 }
 if(phase==='after') {
  const page=await browser.newPage({viewport:{width:1440,height:1000}});
  page.on('pageerror',e=>errors.push(e.message));
  await page.addInitScript(()=>{
   window.serviceDraws=0;
   const original=WebGL2RenderingContext.prototype.drawElements;
   WebGL2RenderingContext.prototype.drawElements=function(...args){window.serviceDraws++;return original.apply(this,args);};
  });
  await page.goto('http://127.0.0.1:5180/');
  await page.locator('#repairs').scrollIntoViewIfNeeded();
  await page.locator('.service-hardware.is-live').waitFor();
  for(const device of ['wifi','printer','software','computer']) {
   await page.locator(`.problem-link[href="/support?service=${device}"]`).focus();
   await page.waitForTimeout(850);
   assert.ok((await page.locator('.service-hardware > img').getAttribute('src')).includes(device));
  }
  await page.locator('#repairs').screenshot({path:`${folder}/services-live-desktop.png`,style:'.studio-header,.mobile-dock{visibility:hidden!important}'});
  const draws=await page.evaluate(()=>window.serviceDraws);
  await page.waitForTimeout(450);
  assert.equal(await page.evaluate(()=>window.serviceDraws),draws,'WebGL drawing settles');
  await page.locator('#growth').scrollIntoViewIfNeeded();
  await page.waitForFunction(()=>!document.querySelector('.service-hardware canvas'));
  await page.locator('#repairs').scrollIntoViewIfNeeded();
  await page.locator('.service-hardware.is-live').waitFor();
  await page.locator('.service-hardware canvas').evaluate(canvas=>canvas.getContext('webgl2').getExtension('WEBGL_lose_context').loseContext());
  await page.waitForFunction(()=>!document.querySelector('.service-hardware canvas'));
  assert.equal(await page.locator('.service-hardware.is-live').count(),0,'context loss restores image');
  await page.emulateMedia({reducedMotion:'reduce'});
  await page.waitForTimeout(100);
  assert.equal(await page.locator('.service-hardware canvas').count(),0);
  await page.close();
  const mobile=await browser.newPage({viewport:{width:390,height:1000}});
  await mobile.goto('http://127.0.0.1:5180/');
  await mobile.locator('#repairs').scrollIntoViewIfNeeded();
  await mobile.waitForTimeout(500);
  assert.equal(await mobile.locator('.service-hardware canvas').count(),0,'mobile uses exported 3D assets');
  await mobile.close();
 }
 assert.deepEqual(errors,[]);
 await writeFile(`${folder}/checks.json`,JSON.stringify({phase,results,errors,serviceRuntime:phase==='after'?{keyboardSelection:true,settling:true,offscreenDisposal:true,reentry:true,contextLossFallback:true,mobileStatic:true}:null},null,2));
 console.log(`${phase}: ${results.length} viewport/language combinations passed; project prominence and support validation checked.`);
} finally {await browser.close();}
