import {build} from 'esbuild'
import {readFile,writeFile,mkdir,unlink} from 'node:fs/promises'
import {fileURLToPath} from 'node:url'
const bundle=new URL('./.render-bundle.mjs',import.meta.url)
const escape=s=>s.replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;').replaceAll('>','&gt;')
try{
 await build({entryPoints:['scripts/render.jsx'],outfile:fileURLToPath(bundle),bundle:true,platform:'node',format:'esm',packages:'external',jsx:'automatic',logLevel:'silent'})
 const {renderPage}=await import(bundle.href)
 const template=await readFile('dist/index.html','utf8')
 for(const path of ['/','/home-it','/business','/digital','/projects','/about','/support','/404']){
  const {html,title,description}=await renderPage(path)
  const canonical=`https://www.drtech.lk${path}`
  let document=template.replace('<div id="root"></div>',`<div id="root">${html}</div>`).replace(/<title>.*?<\/title>/,`<title>${escape(title)}</title>`).replace(/(<meta name="description" content=")[^"]*(")/,`$1${escape(description)}$2`).replace(/(<link rel="canonical" href=")[^"]*(")/,`$1${canonical}$2`).replace(/(<meta property="og:url" content=")[^"]*(")/,`$1${canonical}$2`).replace(/(<meta (?:property|name)="(?:og|twitter):title" content=")[^"]*(")/g,`$1${escape(title)}$2`).replace(/(<meta (?:property|name)="(?:og|twitter):description" content=")[^"]*(")/g,`$1${escape(description)}$2`)
  if(path!=='/') document=document.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/,'')
  if(path==='/404')document=document.replace('<meta name="robots" content="index, follow">','<meta name="robots" content="noindex, follow">')
  const directory=path==='/'||path==='/404'?'dist':`dist${path}`
  await mkdir(directory,{recursive:true})
  await writeFile(`${directory}/${path==='/404'?'404.html':'index.html'}`,document)
 }
 console.log('Prerendered 7 public pages and the not-found page.')
}finally{await unlink(bundle).catch(()=>{})}
