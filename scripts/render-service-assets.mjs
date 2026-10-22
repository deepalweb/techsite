// Export original Three.js scenes as static PNG fallbacks; no external imagery.
import {pathToFileURL} from 'node:url';
import {join} from 'node:path';
const {chromium}=await import(pathToFileURL(join(process.env.LOCALAPPDATA,'Temp/drtech-review/node_modules/playwright/index.mjs')));
const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',args:['--use-angle=swiftshader','--enable-unsafe-swiftshader']});
try {
 const page=await browser.newPage({viewport:{width:720,height:540},deviceScaleFactor:1,reducedMotion:'reduce'});
 await page.goto('http://127.0.0.1:5180/');
 await page.evaluate(()=>document.fonts.ready);
 for(const device of ['computer','wifi','printer','software']) {
  await page.evaluate(async device=>{
   window.assetController?.dispose();
   document.body.innerHTML='<div id="asset-stage" style="width:720px;height:540px;background:#06162b"></div>';
   document.body.style.margin='0';
   const {mountHardware}=await import('/src/components/studio/hardwareRenderer.js');
   await new Promise(resolve=>{window.assetController=mountHardware(document.querySelector('#asset-stage'),()=>{}, {serviceStudio:true,initialDevice:device,onReady:resolve});});
  }, device);
  await page.locator('#asset-stage').screenshot({path:`public/assets/service-3d-${device}.png`});
  console.log(`Exported ${device} 3D asset`);
 }
} finally {await browser.close();}
