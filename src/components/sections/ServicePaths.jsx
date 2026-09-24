import { useTranslation } from "react-i18next";
import {
  ArrowUpRight,
  Laptop,
  Building2,
  Globe,
  MessageSquare,
  ClipboardCheck,
  Wrench,
} from "lucide-react";
import RevealOnScroll from "../ui/RevealOnScroll.jsx";
const icons = [Laptop, Building2, Globe];
const processIcons = [MessageSquare, ClipboardCheck, Wrench];
export default function ServicePaths() {
  const { t } = useTranslation();
  const paths = t("experience.paths", { returnObjects: true });
  return (
    <section id="repairs" className="service-paths px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <RevealOnScroll className="section-intro">
          <div>
            <p className="eyebrow-label">{t("experience.servicesLabel")}</p>
            <h2 className="text-h1 mt-3">{t("experience.servicesTitle")}</h2>
          </div>
          <p>{t("experience.servicesIntro")}</p>
        </RevealOnScroll>
        <div className="grid gap-5 md:grid-cols-3">
          {paths.map((path, i) => {
            const Icon = icons[i];
            return (
              <RevealOnScroll key={path.title} index={i}>
                <a
                  className="service-choice"
                  href={["#contact", "#services", "#growth"][i]}
                >
                  <div className="flex justify-between items-center">
                    <Icon size={28} />
                    <span className="service-number">0{i + 1}</span>
                  </div>
                  <h3>{path.title}</h3>
                  <p>{path.body}</p>
                  <span className="service-choice-link">
                    {path.cta}
                    <ArrowUpRight size={20} />
                  </span>
                </a>
              </RevealOnScroll>
            );
          })}
        </div>
        <div className="process-strip">
          {t("experience.process", { returnObjects: true }).map((step, i) => {
            const Icon = processIcons[i];
            return (
              <div key={step.title}>
                <span className="process-index">0{i + 1}</span>
                <div>
                  <h3>
                    <Icon size={16} />
                    {step.title}
                  </h3>
                  <p>{step.body}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
