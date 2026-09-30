import React from 'react'
import {renderToString} from 'react-dom/server'
import App,{pageTitleKeys} from '../src/App.jsx'
import i18n from '../src/i18n/index.js'
export async function renderPage(path){
 await i18n.changeLanguage('en')
 const key=pageTitleKeys[path]||pageTitleKeys['/404']
 const descriptions={'/':'studio.heroIntro','/home-it':'studio.homePageIntro','/business':'studio.businessPageIntro','/digital':'studio.digitalPageIntro','/projects':'projects.intro','/about':'studio.aboutPageIntro','/support':'studio.supportPageIntro','/404':'studio.notFoundBody'}
 return {html:renderToString(<App initialPath={path} initialSearch=""/>),title:path==='/'?i18n.t(key):`${i18n.t(key)} | DR TECH`,description:i18n.t(descriptions[path]||descriptions['/404'])}
}
