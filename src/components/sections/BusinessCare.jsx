import { useTranslation } from "react-i18next";
import { Check } from "lucide-react";
import { waLink, prices } from "../../data/content.js";
export default function BusinessCare() {
  const { t } = useTranslation();
  const tiers = t("businessCare.tiers", { returnObjects: true });
  return (
    <section id="services" className="business-section section-space">
      <div className="site-container">
        <div className="section-title centered">
          <h2>{t("brand.businessTitle")}</h2>
          <p>{t("businessCare.subtitle")}</p>
        </div>
        <div className="plans-grid">
          {["starter", "growth", "pro"].map((key) => (
            <article
              className={`plan-card ${key === "growth" ? "plan-featured" : ""}`}
              key={key}
            >
              <h3>{tiers[key].name}</h3>
              <p className="plan-description">{tiers[key].desc}</p>
              <p className="plan-price">
                {prices[key]}
                <span>{t("businessCare.perMonth")}</span>
              </p>
              <a
                className={key === "growth" ? "button-primary" : "plan-button"}
                href={waLink(
                  `Hi DR TECH, I would like to discuss the ${tiers[key].name} business IT care plan (${prices[key]}/month). Please help confirm the scope for my business.`,
                )}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("brand.discussPlan")}
              </a>
            </article>
          ))}
        </div>
        <div className="plan-scope">
          <h3>{t("brand.scopeTitle")}</h3>
          <div>
            {t("businessCare.features", { returnObjects: true }).map((item) => (
              <span key={item}>
                <Check size={16} />
                {item}
              </span>
            ))}
          </div>
          <p>{t("brand.scopeNote")}</p>
        </div>
      </div>
    </section>
  );
}
