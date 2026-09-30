import React from 'react'
import {act,create} from 'react-test-renderer'
import {renderToStaticMarkup} from 'react-dom/server'
import assert from 'node:assert/strict'
import {existsSync} from 'node:fs'
import i18n from '../src/i18n/index.js'
import App from '../src/App.jsx'
import {pagePaths,normalizePage} from '../src/components/studio/Pages.jsx'
import Contact from '../src/components/sections/Contact.jsx'
const supportedServices=['computer','wifi','printer','software','business','digital','other']
for(const lang of ['en','si','ta']){
 await i18n.changeLanguage(lang)
 const rendered=new Map(pagePaths.map(path=>[path,renderToStaticMarkup(<App initialPath={path} initialSearch=""/>)]))
 for(const [path,html] of rendered){
  assert.equal((html.match(/<h1[ >]/g)||[]).length,1,`${lang} ${path}: one main heading`)
  assert.ok(!/>(?:studio|request|projects|brand)\.[a-zA-Z]/.test(html),`${lang} ${path}: translated content`)
  const ids=[...html.matchAll(/\sid="([^"]+)"/g)].map(m=>m[1]);assert.equal(new Set(ids).size,ids.length,`${path}: unique IDs`)
  for(const [,href] of html.matchAll(/href="([^"]+)"/g)){
   if(!href.startsWith('/')&&!href.startsWith('#'))continue
   const target=new URL(href,`https://www.drtech.lk${path}`)
   assert.ok(pagePaths.includes(target.pathname),`${path}: valid route ${href}`)
   if(target.hash)assert.ok(rendered.get(target.pathname).includes(`id="${target.hash.slice(1)}"`),`${path}: valid anchor ${href}`)
   if(target.searchParams.has('service'))assert.ok(supportedServices.includes(target.searchParams.get('service')))
  }
  for(const [,src] of html.matchAll(/src="(\/assets\/[^\"]+)"/g))assert.ok(existsSync(`public${src}`),`asset exists ${src}`)
 }
 const home=rendered.get('/')
 assert.ok(home.indexOf('id="packages"')<home.indexOf('id="business"'),'home prices before business')
 assert.ok(!home.includes('ERP_AI_AGENT'),'portfolio stays off homepage')
 assert.ok(!home.includes('<canvas'),'HTML first, no required canvas')
 assert.ok(home.includes('LKR 1,500 - 2,500'))
 for(const service of [...supportedServices,'network','invalid']){
  let view;await act(async()=>{view=create(<Contact initialService={service}/>)})
  const selected=view.root.findAllByType('input').filter(n=>n.props.type==='radio'&&n.props.checked)
  assert.equal(selected.length,service==='invalid'?0:1,'validated preselection')
  if(selected.length)assert.equal(selected[0].props.value,service==='network'?'wifi':service)
  await act(async()=>view.unmount())
 }
 let view;await act(async()=>{view=create(<Contact/>)})
 const root=view.root
 const submit=()=>act(()=>root.findByType('form').props.onSubmit({preventDefault(){}}))
 const change=(name,value)=>act(()=>root.findAllByProps({name}).find(n=>typeof n.type==='string').props.onChange({target:{name,value}}))
 submit();assert.equal(root.findAllByProps({role:'alert'}).length,1)
 change('service','computer');submit();change('issue','          ');submit();assert.equal(root.findAllByProps({role:'alert'}).length,1)
 change('issue','Laptop is slow & screen flickers.');submit();change('name','Test customer');change('phone','abcdefg');change('location','Kotte');submit();assert.equal(root.findAllByProps({role:'alert'}).length,1)
 change('phone','+94 77 123 4567');submit()
 const link=root.findAllByType('a').find(a=>a.props.href.startsWith('https://wa.me/'))
 const url=new URL(link.props.href);assert.equal(url.pathname,'/94760846996')
 for(const value of ['Laptop is slow & screen flickers.','Test customer','Kotte','+94 77 123 4567'])assert.ok(url.searchParams.get('text').includes(value))
 assert.equal(root.findAllByProps({role:'status'}).length,0)
 act(()=>link.props.onClick());assert.equal(root.findAllByProps({role:'status'}).length,1)
 act(()=>root.findAllByType('button').find(b=>b.props.type==='button').props.onClick());assert.equal(root.findByProps({name:'name'}).props.value,'Test customer')
 await act(async()=>view.unmount())
 console.log(`${lang}: 7 routes, navigation, assets, home-first order, service preselection and request flow passed`)
}
assert.equal(normalizePage('/business/'),'/business');assert.equal(normalizePage('/does-not-exist'),'/404')
