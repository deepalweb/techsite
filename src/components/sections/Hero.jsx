import { useTranslation } from "react-i18next";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, ArrowRight, MapPin, Check, Laptop } from "lucide-react";

export default function Hero() {
  const { t } = useTranslation();
  const reduced = useReducedMotion();
  return (
    <header id="home" className="new-hero">
      <div className="hero-shell">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="hero-editorial"
        >
          <p className="hero-location">
            <span />
            {t("experience.local")}
          </p>
          <h1>
            {t("experience.headline")}{" "}
            <span>{t("experience.headlineAccent")}</span>
          </h1>
          <p className="hero-description">{t("experience.intro")}</p>
          <div className="flex flex-wrap gap-3 mt-8">
            <a href="#contact" className="button-primary">
              {t("experience.getHelp")}
              <ArrowUpRight size={20} />
            </a>
            <a href="#services" className="button-secondary">
              {t("nav.businessCare")}
              <ArrowRight size={18} />
            </a>
          </div>
          <div className="hero-promises">
            <span>
              <Check size={16} />
              {t("experience.estimate")}
            </span>
            <span>
              <MapPin size={16} />
              {t("stats.visitAvailable")}
            </span>
          </div>
        </motion.div>
        <motion.div
          className="hero-visual"
          initial={reduced ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.12 }}
        >
          <img
            src="/assets/hero-repair-option.png"
            alt={t("experience.imageAlt")}
            width="1024"
            height="1024"
            fetchpriority="high"
          />
          <div className="photo-label">
            <span className="photo-number">01 / DR TECH</span>
            <span>{t("experience.photoLabel")}</span>
          </div>
          <div className="hero-note">
            <div className="note-icon">
              <Laptop size={24} />
            </div>
            <div>
              <strong>{t("experience.noteTitle")}</strong>
              <p>{t("experience.noteBody")}</p>
            </div>
            <Check className="text-teal-600 shrink-0" size={20} />
          </div>
        </motion.div>
      </div>
      <div className="hero-bottom">
        <span>{t("experience.supportFor")}</span>
        <span>
          Colombo <i /> Kotte <i /> Maharagama
        </span>
        <a href="#repairs">
          {t("experience.explore")}
          <ArrowRight size={16} />
        </a>
      </div>
    </header>
  );
}
