import { useTranslation } from "react-i18next";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, BadgeCheck, MapPin } from "lucide-react";
import NetworkScene from '../visuals/NetworkScene.jsx';
export default function Hero() {
  const { t } = useTranslation();
  const reduced = useReducedMotion();
  return (
    <header id="home" className="brand-hero repair-hero">
      <div className="repair-hero-background" aria-hidden="true">
        <img
          src="/assets/hero-repair-option.png"
          alt=""
          width="1536"
          height="1024"
          fetchpriority="high"
          decoding="async"
        />
      </div>
      <div className="site-container hero-layout">
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
        <h1>{t("motion.headline")} <span>{t("motion.headlineAccent")}</span></h1>
        <p className="brand-hero-copy">{t("motion.repairHero.intro")}</p>
        <div className="brand-hero-actions">
          <a className="button-primary" href="#contact">
            {t("motion.repairHero.cta")}
            <ArrowRight size={18} />
          </a>
          <a className="button-secondary" href="#packages">
            {t("motion.repairHero.pricing")}
          </a>
        </div>
        <p className="hero-expertise">
          <BadgeCheck size={18} />
          {t("motion.repairHero.assurance")}
        </p>
      </motion.div>
      <NetworkScene />
      </div>
      <div className="hero-service-line">
        <span>{t("motion.repairHero.laptop")}</span>
        <span>{t("motion.repairHero.printer")}</span>
        <span>{t("brand.business")}</span>
      </div>
    </header>
  );
}
