import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import i18n from "./i18n";
import "./index.css";
import "./visual-direction.css";
import App from "./App.jsx";
import { normalizePage } from "./components/studio/Pages.jsx";
import { localeFromPath, pagePathFromPathname } from "./i18n/localePaths.js";

const root = document.getElementById("root");
const locale = localeFromPath(window.location.pathname);
const page = normalizePage(pagePathFromPathname(window.location.pathname));
i18n.changeLanguage(locale);
const tree = (
  <StrictMode>
    <App initialPath={page} initialLocale={locale} />
  </StrictMode>
);
if (root.hasChildNodes() && root.dataset.page === page && root.dataset.locale === locale && !new URLSearchParams(window.location.search).has("service"))
  hydrateRoot(root, tree);
else createRoot(root).render(tree);
