import { useTranslation } from "react-i18next";
import { ArrowUpRight, Laptop, Building2, Globe } from "lucide-react";
const icons = [Laptop, Building2, Globe];
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
              <a
                className="path-card"
                key={item.title}
                href={["#service-catalog", "#services", "#growth"][i]}
              >
                <span className="brand-icon">
                  <Icon size={27} />
                </span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
                <span className="path-link">
                  {item.cta}
                  <ArrowUpRight size={18} />
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
