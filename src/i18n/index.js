import { studioEn, studioSi, studioTa } from "./studio.js";
import { redesignEn, redesignSi, redesignTa } from "./redesign.js";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import en from "./en.json";
import si from "./si.json";
import ta from "./ta.json";
import motionEn from "./motion-en.json";
import motionSi from "./motion-si.json";
import motionTa from "./motion-ta.json";
import { projectsEn, projectsSi, projectsTa } from "./projects.js";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          ...en,
          studio: { ...studioEn, ...redesignEn },
          motion: motionEn,
          projects: projectsEn,
        },
      },
      si: {
        translation: {
          ...si,
          studio: { ...studioSi, ...redesignSi },
          motion: motionSi,
          projects: projectsSi,
        },
      },
      ta: {
        translation: {
          ...ta,
          studio: { ...studioTa, ...redesignTa },
          motion: motionTa,
          projects: projectsTa,
        },
      },
    },
    fallbackLng: "en",
    supportedLngs: ["en", "si", "ta"],
    interpolation: { escapeValue: false },
    detection: {
      order: ["querystring", "localStorage", "navigator"],
      lookupQuerystring: "lang",
      lookupLocalStorage: "drtech-language",
      caches: ["localStorage"],
    },
  });

export default i18n;
