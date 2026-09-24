import { useEffect } from "react";
import { MotionConfig } from "framer-motion";
import ServicePaths from "./components/sections/ServicePaths.jsx";
import { useTranslation } from "react-i18next";
import ScrollProgressBar from "./components/layout/ScrollProgressBar.jsx";
import Navbar from "./components/layout/Navbar.jsx";
import Footer from "./components/layout/Footer.jsx";
import FloatingActions from "./components/layout/FloatingActions.jsx";
import Hero from "./components/sections/Hero.jsx";
import Packages from "./components/sections/Packages.jsx";
import BusinessCare from "./components/sections/BusinessCare.jsx";
import BusinessGrowth from "./components/sections/BusinessGrowth.jsx";
import About from "./components/sections/About.jsx";
import Contact from "./components/sections/Contact.jsx";
import Faq from "./components/sections/Faq.jsx";

export default function App() {
  const { i18n, t } = useTranslation();

  useEffect(() => {
    document.documentElement.lang = i18n.resolvedLanguage;
    document.title = t("meta.title");
  }, [i18n.resolvedLanguage, t]);

  return (
    <MotionConfig reducedMotion="user">
      <a href="#main" className="skip-link">
        {t("experience.explore")}
      </a>
      <ScrollProgressBar />
      <Navbar />
      <Hero />
      <main id="main">
        <ServicePaths />
        <Packages />
        <BusinessCare />
        <BusinessGrowth />
        <About />
        <Contact />
        <Faq />
      </main>
      <Footer />
      <FloatingActions />
    </MotionConfig>
  );
}
