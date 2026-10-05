import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import i18n from "./i18n";
import "./index.css";
import "./visual-direction.css";
import App from "./App.jsx";
import { normalizePage } from "./components/studio/Pages.jsx";
const root = document.getElementById("root");
const tree = (
  <StrictMode>
    <App />
  </StrictMode>
);
// A static host may serve the home HTML as a fallback for another URL.
// Hydrate only when that prerendered page matches the requested route.
if (root.hasChildNodes() && root.dataset.page === normalizePage(window.location.pathname) && i18n.resolvedLanguage === "en" && !new URLSearchParams(window.location.search).has('service'))
  hydrateRoot(root, tree);
else createRoot(root).render(tree);
