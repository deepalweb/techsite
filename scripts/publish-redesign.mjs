import { readFile, writeFile, access } from 'node:fs/promises';

const source = await readFile('dist/redesign/index.html', 'utf8');
let html = source.replace(/(href|src)="\.\//g, '$1="/redesign/');
html = html.replace('</head>', '<link rel="canonical" href="https://www.drtech.lk/"></head>');
html = html.replace('<div class="hero-trust">', '<p style="margin-top:18px;font-size:12px;color:#bcd0da"><a href="/home-it?lang=si" lang="si">සිංහල සේවා</a> &nbsp;·&nbsp; <a href="/home-it?lang=ta" lang="ta">தமிழ் சேவைகள்</a></p><div class="hero-trust">');
for (const match of html.matchAll(/(?:src|href)="(\/redesign\/[^"]+)"/g)) {
  await access('dist' + match[1]);
}
for (const path of ['home-it','business','digital','projects','about','support']) {
  await access('dist/' + path + '/index.html');
}
if (!html.includes('id="webgl"') || !html.includes('Computer repairs.')) throw new Error('Missing redesigned homepage');
await writeFile('dist/index.html', html);
console.log('Published the animated 3D redesign at /; existing translated service pages retained.');

const structured = JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
if (!structured['@graph'].some(node => node['@type'] === 'Organization')) throw new Error('Missing business schema');
if ((html.match(/rel="canonical"/g) || []).length !== 1) throw new Error('Homepage must have exactly one canonical');
for (const path of ['home-it','business','digital','projects','about','support']) {
  if (!html.includes('href="/' + path + '"')) throw new Error('Missing service page link: ' + path);
}
const config = JSON.parse(await readFile('dist/staticwebapp.config.json', 'utf8'));
for (const path of ['/redesign','/redesign/','/redesign/index.html']) {
  if (!config.routes.some(route => route.route === path && route.redirect === '/' && route.statusCode === 301)) throw new Error('Missing duplicate-page redirect');
}
console.log('SEO checks passed: structured data, canonical, service links and permanent redirects.');
