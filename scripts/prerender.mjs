import {build} from 'esbuild'
import {readFile,writeFile,mkdir,unlink} from 'node:fs/promises'
import {fileURLToPath} from 'node:url'
import {canonicalUrl, seoLocales} from '../src/i18n/localePaths.js'
const bundle=new URL('./.render-bundle.mjs',import.meta.url)
const escape=s=>s.replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;').replaceAll('>','&gt;')
const ogLocale={en:'en_LK',si:'si_LK',ta:'ta_LK'}
const paths=['/','/home-it','/business','/digital','/projects','/about','/support']
const alternates=path=>seoLocales.map(locale=>`<link rel="alternate" hreflang="${locale === 'en' ? 'en-LK' : `${locale}-LK`}" href="${canonicalUrl(locale,path)}">`).join('')+`<link rel="alternate" hreflang="en" href="${canonicalUrl('en',path)}"><link rel="alternate" hreflang="x-default" href="${canonicalUrl('en',path)}">`
try{
 await build({entryPoints:['scripts/render.jsx'],outfile:fileURLToPath(bundle),bundle:true,platform:'node',format:'esm',packages:'external',jsx:'automatic',logLevel:'silent'})
 const {renderPage}=await import(bundle.href)
 const template=await readFile('dist/index.html','utf8')
 for(const locale of seoLocales){
  for(const path of paths){
   const {html,title,description}=await renderPage(path,locale)
   const canonical=canonicalUrl(locale,path)
   let document=template.replace('<html lang="en">',`<html lang="${locale}">`).replace('<div id="root"></div>',`<div id="root" data-page="${path}" data-locale="${locale}">${html}</div>`).replace(/<title>.*?<\/title>/,`<title>${escape(title)}</title>`).replace(/(<meta name="description" content=")[^"]*(")/,`$1${escape(description)}$2`).replace(/(<link rel="canonical" href=")[^"]*(")/,`$1${canonical}$2`).replace(/(<meta property="og:url" content=")[^"]*(")/,`$1${canonical}$2`).replace(/(<meta property="og:locale" content=")[^"]*(")/,`$1${ogLocale[locale]}$2`).replace(/(<meta (?:property|name)="(?:og|twitter):title" content=")[^"]*(")/g,`$1${escape(title)}$2`).replace(/(<meta (?:property|name)="(?:og|twitter):description" content=")[^"]*(")/g,`$1${escape(description)}$2`).replace('</head>',`${alternates(path)}</head>`)
   const directory=locale==='en'?(path==='/'?'dist':`dist${path}`):(path==='/'?`dist/${locale}`:`dist/${locale}${path}`)
   await mkdir(directory,{recursive:true})
   await writeFile(`${directory}/index.html`,document)
  }
 }
 const notFound=await renderPage('/404','en')
 let notFoundDocument=template.replace('<div id="root"></div>',`<div id="root" data-page="/404" data-locale="en">${notFound.html}</div>`).replace(/<title>.*?<\/title>/,`<title>${escape(notFound.title)}</title>`).replace(/(<meta name="description" content=")[^"]*(")/,`$1${escape(notFound.description)}$2`).replace(/(<link rel="canonical" href=")[^"]*(")/,`$1https://www.drtech.lk/404$2`).replace('<meta name="robots" content="index, follow">','<meta name="robots" content="noindex, follow">')
 await writeFile('dist/404.html',notFoundDocument)
 console.log('Prerendered English, Sinhala and Tamil public pages plus the not-found page.')
}finally{await unlink(bundle).catch(()=>{})}
