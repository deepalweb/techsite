import { useTranslation } from "react-i18next";
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
        <div className="catalog-grid">
          {t("brand.catalog", { returnObjects: true }).map((item, i) => {
            const Icon = services[i];
            return (
              <a href="#contact" className="catalog-card" key={item.title}>
                <Icon size={24} />
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </div>
                <ArrowUpRight className="catalog-arrow" size={17} />
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
