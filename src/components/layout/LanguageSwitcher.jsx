import { useTranslation } from "react-i18next";
import { localizedPath, pagePathFromPathname } from "../../i18n/localePaths.js";

const LANGUAGES = [
  { code: "en", label: "EN" },
  { code: "si", label: "සි" },
  { code: "ta", label: "த" },
];

export default function LanguageSwitcher({ className = "" }) {
  const { i18n, t } = useTranslation();
  const changeLanguage = (code) => {
    const page = pagePathFromPathname(window.location.pathname);
    window.location.assign(`${localizedPath(code, page)}${window.location.search}${window.location.hash}`);
  };
  return <div className={`language-switcher ${className}`} role="group" aria-label={t("nav.ariaChooseLanguage")}>
    {LANGUAGES.map(({ code, label }) => <button key={code} type="button" className={`language-button ${i18n.resolvedLanguage === code ? "active" : ""}`} aria-pressed={i18n.resolvedLanguage === code} onClick={() => changeLanguage(code)}>{label}</button>)}
  </div>;
}

