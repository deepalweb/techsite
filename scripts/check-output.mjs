import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
const routes=['/','/home-it','/business','/digital','/projects','/about','/support'];
const titles=new Set();
for(const route of routes){
 const html=await readFile(`dist${route==='/'?'':route}/index.html`,'utf8');
 assert.match(html, /<h1[ >]/);
 assert.match(html, new RegExp(`rel="canonical" href="https://www.drtech.lk${route}"`));
 assert.equal((html.match(/<h1[ >]/g)||[]).length,1);
 assert.ok(!html.includes('<div id="root"></div>'));
 const title=html.match(/<title>(.*?)<\/title>/)[1];
 titles.add(title);
 const response=await fetch(`http://127.0.0.1:5173${route}/`.replace(/\/\/$/,'/'));
 assert.equal(response.status,200);
 assert.ok((await response.text()).includes(`<title>${title}</title>`));
 console.log(`${route}: static HTML and HTTP passed — ${title}`);
}
assert.equal(titles.size,7);
assert.match(await readFile('dist/404.html','utf8'),/noindex/);
