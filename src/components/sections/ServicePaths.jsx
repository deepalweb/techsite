import { useTranslation } from "react-i18next";
import { ArrowUpRight, Laptop, Building2, Globe, Wifi, Printer, ShieldCheck, Cloud, Workflow, MessageCircle } from "lucide-react";
import TiltCard from '../ui/TiltCard.jsx';
import TechAsset from '../visuals/TechAsset.jsx';
const icons = [Laptop, Building2, Globe];
const supportingIcons = [[Wifi, Printer], [ShieldCheck, Cloud], [Workflow, MessageCircle]];
export default function ServicePaths() {
  const { t } = useTranslation();
  return (
    <section id="repairs" className="brand-paths section-space">
      <div className="site-container">
        <div className="section-title centered">
          <h2>{t("experience.servicesTitle")}</h2>
          <p>{t("brand.pathsIntro")}</p>
        </div>
        <div className="path-grid">
          {t("brand.paths", { returnObjects: true }).map((item, i) => {
            const Icon = icons[i];
            return (
              <TiltCard key={item.title} className="path-tilt"><a
                className="path-card"
                key={item.title}
                href={["#service-catalog", "#services", "#growth"][i]}
              >
                <div className="path-art" aria-hidden="true">
                  <TechAsset type={['laptop', 'server', 'globe'][i]} />
                  <div className="path-art-badges">{supportingIcons[i].map((Badge, index) => <span className={`asset-badge badge-${index}`} key={index}><Badge size={20} strokeWidth={1.5}/></span>)}</div>
                </div>
                <span className="path-heading-icon" aria-hidden="true">
                  <Icon size={27} />
                </span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
                <span className="path-link">
                  {item.cta}
                  <ArrowUpRight size={18} />
                </span>
              </a></TiltCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
