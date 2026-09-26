import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Building2, Network, ShieldCheck, Cloud, DatabaseBackup, Headset, Monitor, Wifi, ArrowUpRight, ArrowRight, PanelsTopLeft, Workflow, BriefcaseBusiness, FileText } from 'lucide-react';
import { waLink, waMessages } from '../../data/content.js';
import TechAsset from '../visuals/TechAsset.jsx';

const layerIcons = [Building2, Network, ShieldCheck, Cloud, DatabaseBackup, Headset];
const technologyIcons = [PanelsTopLeft, Cloud, Workflow, Wifi, DatabaseBackup, Network];
const resourceIcons = [BriefcaseBusiness, Network, FileText, Workflow];

function TechnologySymbol({ index }) {
  const Icon = technologyIcons[index];
  return <Icon size={19} strokeWidth={1.5} aria-hidden="true"/>;
}

function ResourceSymbol({ index }) {
  const Icon = resourceIcons[index];
  return <span className="resource-symbol"><Icon size={30} strokeWidth={1.4}/></span>;
}

export function BusinessInfrastructure() {
  const { t } = useTranslation();
  const [active, setActive] = useState(0);
  const layers = t('motion.layers', { returnObjects: true });
  const Icon = layerIcons[active];
  return <section className="section-space infrastructure-section" id="business-infrastructure">
    <div className="site-container infrastructure-layout">
      <div className="infrastructure-intro"><p className="eyebrow-label">{t('brand.business')}</p><h2>{t('motion.businessTitle')}</h2><p>{t('motion.businessIntro')}</p>
        <div className="office-scene" aria-hidden="true"><div className="office-floor"/><div className="office-cloud"><Cloud size={35}/></div><div className="office-wifi"><Wifi size={30}/></div>{[0,1].map(i => <div key={i} className={`office-desk desk-${i}`}><Monitor size={40}/></div>)}<TechAsset type="server" className="office-server-asset"/><div className="office-security"><Icon size={28}/></div></div>
        <a href="#services" className="text-link">{t('brand.viewPlans')}<ArrowRight size={17}/></a>
      </div>
      <div className="infrastructure-layers">{layers.map((layer, i) => { const LayerIcon = layerIcons[i]; return <motion.div key={layer.title} onViewportEnter={() => setActive(i)} viewport={{ margin: '-25% 0px -25% 0px' }} className={`infrastructure-layer ${active === i ? 'active' : ''}`}><span className="layer-number">0{i + 1}</span><LayerIcon size={23}/><div><h3>{layer.title}</h3><p>{layer.body}</p></div></motion.div>; })}</div>
    </div>
  </section>;
}

export function TechnologyStack() {
  const { t } = useTranslation();
  return <section className="section-space technology-section"><div className="site-container technology-layout"><div><p className="eyebrow-label">{t('motion.expertiseLabel')}</p><h2>{t('motion.expertiseTitle')}</h2><p>{t('motion.expertiseIntro')}</p><a href="#contact" className="text-link">{t('brand.discussPlan')}<ArrowUpRight size={17}/></a></div><div className="technology-orbit"><div className="tech-ring"/><div className="tech-ring inner"/><div className="tech-center">DR<span>TECH</span></div>{['Microsoft 365','Azure','Odoo','UniFi','Cloud','Networking'].map((name,i) => <span className={`tech-satellite satellite-${i}`} key={name}><TechnologySymbol index={i}/>{name}</span>)}</div></div></section>;
}

export function InfrastructurePhotography() {
  const { t } = useTranslation();
  return <section className="infrastructure-photography site-container"><figure><picture><source media="(max-width: 767px)" srcSet="/assets/hero-network-mobile.webp"/><img src="/assets/hero-network.webp" alt={t('motion.photoAlt')} width="1920" height="1280" loading="lazy"/></picture><figcaption>{t('motion.photoCaption')}</figcaption></figure><div className="photo-copy"><p className="eyebrow-label">{t('motion.photoLabel')}</p><h2>{t('motion.photoTitle')}</h2><p>{t('motion.photoIntro')}</p><a href="#contact" className="text-link">{t('brand.discussPlan')}<ArrowUpRight size={17}/></a></div></section>;
}

export function Resources() {
  const { t } = useTranslation();
  return <section id="resources" className="section-space resources-section"><div className="site-container"><div className="section-title"><div><p className="eyebrow-label">DR TECH Resources</p><h2>{t('motion.resourcesTitle')}</h2><p>{t('motion.resourcesIntro')}</p></div><span className="preview-badge">{t('motion.planned')}</span></div><div className="resources-grid">{['IT Business Toolkit','Network Deployment Kit','UniFi Documentation Kit','Odoo Implementation Toolkit'].map((name,i) => <article className="resource-card" key={name}><div className={`product-box product-${i}`} aria-hidden="true"><span>DR TECH / RESOURCES</span><ResourceSymbol index={i}/><strong>{name}</strong><small>0{i+1} / DIGITAL TOOLKIT</small></div><h3>{name}</h3><p>{t(`motion.resourceDescriptions.${i}`)}</p><a className="text-link" href={waLink(`Hi DR TECH, I am interested in the planned ${name}. Please let me know about availability.`)} target="_blank" rel="noopener noreferrer">{t('motion.resourceCta')}<ArrowUpRight size={16}/></a></article>)}</div></div></section>;
}

export function FinalSupport() {
  const { t } = useTranslation();
  return <section className="final-support section-space"><div className="site-container"><div className="converging-lines" aria-hidden="true"><span/><span/><span/><b>DR<span>TECH</span></b></div><h2>{t('motion.finalTitle')}</h2><p>{t('motion.finalIntro')}</p><div className="brand-hero-actions"><a href="#contact" className="button-primary">{t('experience.getHelp')}<ArrowRight size={18}/></a><a className="button-secondary" href={waLink(waMessages.contact)} target="_blank" rel="noopener noreferrer">{t('hero.ctaWhatsapp')}</a></div></div></section>;
}
