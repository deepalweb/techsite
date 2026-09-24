import { useTranslation } from "react-i18next";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, BadgeCheck, MapPin } from "lucide-react";
export default function Hero() {
  const { t } = useTranslation();
  const reduced = useReducedMotion();
  return (
    <header id="home" className="brand-hero">
      <picture className="hero-background" aria-hidden="true">
        <source media="(max-width: 767px)" srcSet="/assets/hero-network-mobile.webp" />
        <img src="/assets/hero-network.webp" alt="" width="1920" height="1280" fetchpriority="high" decoding="async" />
      </picture>
      <motion.div
        className="brand-hero-content"
        initial={reduced ? false : { opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
      >
        <p className="location-pill">
          <MapPin size={14} />
          {t("brand.coverage")}
        </p>
        <h1>{t("brand.headline")}</h1>
        <p className="brand-hero-copy">{t("brand.intro")}</p>
        <div className="brand-hero-actions">
          <a className="button-primary" href="#contact">
            {t("experience.getHelp")}
            <ArrowRight size={18} />
          </a>
          <a className="button-secondary" href="#services">
            {t("brand.viewPlans")}
          </a>
        </div>
        <p className="hero-expertise">
          <BadgeCheck size={18} />
          {t("brand.expertise")}
        </p>
      </motion.div>
      <div className="hero-service-line">
        <span>{t("brand.home")}</span>
        <span>{t("brand.business")}</span>
        <span>{t("brand.digital")}</span>
      </div>
    </header>
  );
}
