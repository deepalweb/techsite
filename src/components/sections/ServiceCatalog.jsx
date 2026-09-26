import { useTranslation } from "react-i18next";
import { useState } from 'react';
import {
  Zap,
  BadgeCheck,
  ShieldCheck,
  Laptop,
  Network,
  Cloud,
  Printer,
  Shield,
  Workflow,
  ArrowUpRight,
} from "lucide-react";
const reasons = [Zap, BadgeCheck, ShieldCheck];
const services = [Laptop, Network, Cloud, Printer, Shield, Workflow];
export function WhyDrTech() {
  const { t } = useTranslation();
  return (
    <section className="why-section">
      <div className="site-container why-layout">
        <h2>{t("brand.whyTitle")}</h2>
        <div className="why-grid">
          {t("brand.reasons", { returnObjects: true }).map((item, i) => {
            const Icon = reasons[i];
            return (
              <div key={item.title}>
                <Icon size={24} />
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
export default function ServiceCatalog() {
  const { t } = useTranslation();
  const [active, setActive] = useState(1);
  const items = t('brand.catalog', { returnObjects: true });
  const SelectedIcon = services[active];
  const points = [[20,23],[50,10],[80,23],[80,77],[50,90],[20,77]];
  return (
    <section id="service-catalog" className="section-space">
      <div className="site-container">
        <div className="section-title">
          <div>
            <h2>{t("brand.catalogTitle")}</h2>
            <p>{t("brand.catalogIntro")}</p>
          </div>
          <a href="#packages" className="text-link">
            {t("brand.repairPricing")}
            <ArrowUpRight size={17} />
          </a>
        </div>
        <div className="ecosystem-layout">
        <div className="ecosystem-map" role="group" aria-label={t('motion.selectService')}>
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            {points.map(([x,y], i) => <path key={i} className={active === i ? 'active' : ''} d={`M50 50 L${x} ${y}`} />)}
          </svg>
          <div className="ecosystem-core" aria-hidden="true">DR<span>TECH</span><small>{t('motion.core')}</small></div>
          {items.map((item, i) => {
            const Icon = services[i];
            return (
              <button type="button" aria-pressed={active === i} aria-controls="service-detail" onClick={() => setActive(i)} onFocus={() => setActive(i)} onPointerEnter={e => { if (e.pointerType === 'mouse') setActive(i); }} className={`ecosystem-node ${active === i ? 'active' : ''}`} style={{left: `${points[i][0]}%`, top: `${points[i][1]}%`}} key={item.title}>
                <Icon size={24} />
                <span>{item.title}</span>
              </button>
            );
          })}
        </div>
        <div id="service-detail" className="ecosystem-detail" aria-live="polite" aria-atomic="true">
          <span className="brand-icon"><SelectedIcon size={28}/></span>
          <p className="eyebrow-label">{t('motion.connectedServices')}</p>
          <h3>{items[active].title}</h3><p>{items[active].body}</p>
          <ul>{t(`motion.details.${active}`, {returnObjects: true}).map(detail => <li key={detail}><span />{detail}</li>)}</ul>
          <a className="text-link" href="#contact">{t('experience.getHelp')}<ArrowUpRight size={18}/></a>
        </div>
        </div>
      </div>
    </section>
  );
}
