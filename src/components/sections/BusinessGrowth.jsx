import { useTranslation } from "react-i18next";
import {
  Check,
  ArrowUpRight,
  Globe,
  MapPin,
  MessageCircle,
} from "lucide-react";
import { waLink, waMessages } from "../../data/content.js";
export default function BusinessGrowth() {
  const { t } = useTranslation();
  return (
    <section id="growth" className="section-space digital-section">
      <div className="site-container digital-layout">
        <div className="digital-intro">
          <span className="brand-icon">
            <Globe size={28} />
          </span>
          <h2>{t("brand.digitalTitle")}</h2>
          <p>{t("brand.digitalIntro")}</p>
          <a
            href={waLink(waMessages.businessOnline)}
            target="_blank"
            rel="noopener noreferrer"
            className="button-primary"
          >
            {t("brand.digitalCta")}
            <ArrowUpRight size={17} />
          </a>
        </div>
        <div className="digital-services">
          {t("brand.digitalItems", { returnObjects: true }).map((item, i) => {
            const Icon = [MapPin, MessageCircle, Globe][i];
            return (
              <div key={item.title}>
                <Icon size={24} />
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </div>
                <Check size={17} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
