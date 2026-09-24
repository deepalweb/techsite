import { useTranslation } from "react-i18next";
import { Check, ArrowUpRight } from "lucide-react";
import { socials } from "../../data/content.js";
export default function About() {
  const { t } = useTranslation();
  return (
    <section id="about" className="section-space about-section">
      <div className="site-container about-layout">
        <div>
          <h2>{t("brand.aboutTitle")}</h2>
          <p className="about-copy">{t("about.bio")}</p>
          <a
            href={socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="founder-link"
          >
            <span className="founder-monogram" aria-hidden="true">
              DR
            </span>
            <span>
              <strong>Deepal Rupasinghe</strong>
              <small>{t("brand.founder")}</small>
            </span>
            <ArrowUpRight size={18} />
          </a>
        </div>
        <div className="credentials">
          {t("about.credentials", { returnObjects: true }).map((item) => (
            <div key={item.title}>
              <Check size={18} />
              <div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
