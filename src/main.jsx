import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import i18n from "./i18n";
import "./index.css";
import "./visual-direction.css";
import App from "./App.jsx";
const root = document.getElementById("root");
const tree = (
  <StrictMode>
    <App />
  </StrictMode>
);
if (root.hasChildNodes() && i18n.resolvedLanguage === "en" && !new URLSearchParams(window.location.search).has('service'))
  hydrateRoot(root, tree);
else createRoot(root).render(tree);
