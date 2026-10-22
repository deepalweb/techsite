import { useEffect } from "react";
import { MotionConfig } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Header, Footer, QuickActions } from "./components/studio/Shell.jsx";
import { canonicalUrl, localeFromPath, pagePathFromPathname } from "./i18n/localePaths.js";
import { HomePage, DetailPage, normalizePage } from "./components/studio/Pages.jsx";

export const pageTitleKeys = {
  "/": "meta.title",
  "/home-it": "studio.homePageTitle",
  "/business": "studio.businessPageTitle",
  "/digital": "studio.digitalPageTitle",
  "/projects": "projects.nav",
  "/about": "studio.aboutPageTitle",
  "/support": "studio.supportPageTitle",
  "/404": "studio.notFoundTitle",
};

export default function App({ initialPath, initialSearch, initialLocale }) {
  const { i18n, t } = useTranslation();
  const pathname = initialPath ?? (typeof window === "undefined" ? "/" : window.location.pathname);
  const locale = initialLocale ?? localeFromPath(pathname);
  const page = normalizePage(pagePathFromPathname(pathname));
  const search = initialSearch ?? (typeof window === "undefined" ? "" : window.location.search);
  const service = new URLSearchParams(search).get("service") || "";

  useEffect(() => {
    const resolvedLocale = i18n.resolvedLanguage || locale;
    document.documentElement.lang = resolvedLocale;
    document.title = page === "/" ? t("meta.title") : `${t(pageTitleKeys[page])} | DR TECH`;
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical)
      canonical.href = page === "/404" ? "https://www.drtech.lk/404" : canonicalUrl(resolvedLocale, page);
    if (window.location.hash) {
      const aliases = { "service-catalog": "repairs", "business-infrastructure": "business", resources: "growth", projects: "growth" };
      const hash = decodeURIComponent(window.location.hash.slice(1));
      const node = document.getElementById(hash) || document.getElementById(aliases[hash]);
      node?.scrollIntoView();
    }
  }, [page, locale, t, i18n.resolvedLanguage]);

  return (
    <MotionConfig reducedMotion="user">
      <Header page={page} />
      <main id="main">{page === "/" ? <HomePage /> : <DetailPage page={page} service={service} />}</main>
      <Footer />
      <QuickActions />
    </MotionConfig>
  );
}
