import { useTranslation } from "react-i18next";
import {
  ArrowUpRight,
  ArrowRight,
  Laptop,
  Wifi,
  Printer,
  HardDrive,
  Check,
  MapPin,
  MessageCircle,
  Phone,
  Network,
  ShieldCheck,
  Headphones,
  Code2,
  Github,
  Building2,
} from "lucide-react";
import HardwareScene from "./HardwareScene.jsx";
import ServiceVisual from "./ServiceVisual.jsx";
import Contact from "../sections/Contact.jsx";
import { prices, phone, waLink, socials } from "../../data/content.js";
import {
  projects,
  additionalProjects,
  githubProfile,
} from "../../data/projects.js";
export const pagePaths = [
  "/",
  "/home-it",
  "/business",
  "/digital",
  "/projects",
  "/about",
  "/support",
];
export function normalizePage(path) {
  const trimmed = path.replace(/\/+$/, "") || "/";
  return pagePaths.includes(trimmed) ? trimmed : "/404";
}
export function Hero() {
  const { t } = useTranslation();
  return (
    <section id="home" className="studio-hero">
      <div className="wrap hero-composition">
        <div className="hero-message">
          <p className="location-line">
            <MapPin size={15} />
            {t("studio.location")}
          </p>
          <h1>{t("studio.heroTitle")}</h1>
          <p className="hero-lead">{t("studio.heroIntro")}</p>
          <div className="hero-buttons">
            <a className="action" href="/support">
              {t("studio.support")}
              <ArrowUpRight size={18} />
            </a>
            <a className="quiet-link" href="#packages">
              {t("studio.heroLink")}
              <ArrowRight size={16} />
            </a>
          </div>
          <p className="hero-reassurance">
            <Check size={15} />
            {t("studio.heroNote")}
          </p>
        </div>
        <HardwareScene />
      </div>
      <div className="wrap hero-service-note">
        <span>
          {t("stats.home")} / {t("stats.pickup")} /{" "}
          {t("request.preferences.2.label")}
        </span>
        <a href="#business">
          {t("studio.businessLabel")}
          <ArrowRight size={15} />
        </a>
      </div>
    </section>
  );
}
const problemPrices = {
  computer: prices.basicVisit,
  wifi: prices.wifiPrinter,
  printer: prices.wifiPrinter,
  software: prices.windowsSetup,
};
export function Problems() {
  const { t } = useTranslation();
  return (
    <section id="repairs" className="studio-section problem-section">
      <div className="wrap">
        <div className="section-heading">
          <h2>{t("studio.helpTitle")}</h2>
          <p>{t("studio.helpIntro")}</p>
        </div>
        <div className="problem-grid">
          {t("studio.problems", { returnObjects: true }).map((item) => {
            return (
              <a
                key={item.id}
                href={`/support?service=${item.id}`}
                className="problem-link"
              >
                <ServiceVisual type={item.id} />
                <h3>{item.title}</h3>
                <p>{item.body}</p>
                {problemPrices[item.id] && (
                  <p className="problem-price">{problemPrices[item.id]}</p>
                )}
                <ArrowUpRight className="problem-arrow" size={18} />
              </a>
            );
          })}
        </div>
        <a className="understated-link" href="/support?service=other">
          {t("studio.notSure")}
          <ArrowRight size={16} />
        </a>
      </div>
    </section>
  );
}
export function RepairPrices({ full = false }) {
  const { t } = useTranslation();
  const rows = [
    ["basicVisit", "computer"],
    ["laptopBoost", "computer"],
    ["wifiPrinter", "wifi"],
    ...(full
      ? [
          ["windowsSetup", "software"],
          ["smallBizVisit", "business"],
        ]
      : []),
  ];
  return (
    <section id="packages" className="studio-section pricing-section">
      <div className="wrap pricing-layout">
        <div>
          <p className="section-caption">{t("studio.home")}</p>
          <h2>{t("studio.pricingTitle")}</h2>
          <p className="section-copy">{t("studio.pricingIntro")}</p>
          <p className="price-disclaimer">{t("studio.priceNote")}</p>
        </div>
        <div className="price-list">
          {rows.map(([key, service]) => (
            <a
              className="price-row"
              key={key}
              href={`/support?service=${service}`}
              aria-label={`${t("studio.priceAction")}: ${t(`packages.items.${key}.name`)}`}
            >
              <div>
                <h3>{t(`packages.items.${key}.name`)}</h3>
                <span>{t(`packages.items.${key}.features.0`)}</span>
              </div>
              <strong>
                {prices[key]}
                <ArrowUpRight size={18} />
              </strong>
            </a>
          ))}
          {!full && (
            <a className="understated-link" href="/home-it#packages">
              {t("studio.viewAll")}
              <ArrowRight size={16} />
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
export function Process() {
  const { t } = useTranslation();
  return (
    <section className="process-section">
      <div className="wrap">
        <h2>{t("studio.processTitle")}</h2>
        <ol className="steps-grid">
          {t("studio.process", { returnObjects: true }).map((item, i) => (
            <li key={item.title}>
              <span>0{i + 1}</span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
export function Trust({ full = false }) {
  const { t } = useTranslation();
  return (
    <section id="about" className="studio-section trust-section">
      <div className="wrap trust-layout">
        <div className="founder-card">
          <div className="founder-initials" aria-hidden="true">
            dr<span>.</span>
          </div>
          <div>
            <h3>Deepal Rupasinghe</h3>
            <p>{t("studio.founder")}</p>
            <a
              href={socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
              <ArrowUpRight size={15} />
            </a>
          </div>
        </div>
        <div>
          <h2>{t("studio.trustTitle")}</h2>
          <p className="section-copy">{t("studio.trustBody")}</p>
          <ul className="trust-points">
            {t("studio.trustItems", { returnObjects: true }).map((item) => (
              <li key={item}>
                <Check size={16} />
                {item}
              </li>
            ))}
          </ul>
          {!full && (
            <a className="understated-link" href="/about">
              {t("studio.meet")}
              <ArrowRight size={16} />
            </a>
          )}
          {full && (
            <div className="credential-list">
              {t("about.credentials", { returnObjects: true }).map((item) => (
                <div key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
export function BusinessIntro({ full = false }) {
  const { t } = useTranslation();
  return (
    <section id="business" className="studio-section business-chapter">
      <span id="business-infrastructure" />
      <div className="wrap">
        <div className="business-opening">
          <div>
            <p className="section-caption">{t("studio.businessLabel")}</p>
            <h2>{t("studio.businessTitle")}</h2>
            <p className="section-copy">{t("studio.businessIntro")}</p>
            <a className="action" href="/support?service=business">
              {t("studio.businessAction")}
              <ArrowUpRight size={18} />
            </a>
          </div>
          <div className="business-photo">
            <img src="/assets/hero-network.webp" alt="" loading="lazy" width="1920" height="1280" />
          <div className="business-diagram" aria-hidden="true">
            <div className="diagram-office">
              <Building2 size={52} strokeWidth={1} />
              <span>DR TECH / IT care</span>
            </div>
            <div className="diagram-line" />
            <div className="diagram-nodes">
              <span>
                <Network size={24} />
              </span>
              <span>
                <ShieldCheck size={24} />
              </span>
              <span>
                <Headphones size={24} />
              </span>
            </div>
          </div>
          </div>
        </div>
        <div className="business-benefits">
          {t("studio.businessItems", { returnObjects: true }).map((item, i) => {
            const Icon = [Network, ShieldCheck, Headphones][i];
            return (
              <article key={item.title}>
                <Icon size={23} strokeWidth={1.4} />
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            );
          })}
        </div>
        {!full && (
          <a className="quiet-link" href="/business">
            {t("studio.businessLink")}
            <ArrowRight size={17} />
          </a>
        )}
      </div>
    </section>
  );
}
export function Plans() {
  const { t } = useTranslation();
  return (
    <section id="services" className="studio-section plans-section">
      <div className="wrap">
        <div className="section-heading">
          <h2>{t("studio.plansTitle")}</h2>
          <p>{t("studio.plansIntro")}</p>
        </div>
        <div className="studio-plans">
          {["starter", "growth", "pro"].map((key) => (
            <article key={key}>
              <h3>{t(`businessCare.tiers.${key}.name`)}</h3>
              <p>{t(`businessCare.tiers.${key}.desc`)}</p>
              <strong>
                {prices[key]}
                <small>{t("businessCare.perMonth")}</small>
              </strong>
              <a
                href={waLink(
                  `Hi DR TECH, I would like to discuss the ${key} business IT plan (${prices[key]}/month) and confirm the scope for my business.`,
                )}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("studio.planAction")}
                <ArrowUpRight size={16} />
              </a>
            </article>
          ))}
        </div>
        <p className="plan-footnote">{t("studio.plansNote")}</p>
      </div>
    </section>
  );
}
export function DigitalPreview() {
  const { t } = useTranslation();
  return (
    <section id="growth" className="digital-preview">
      <div className="wrap">
        <Code2 size={26} strokeWidth={1.5} />
        <div>
          <h2>{t("studio.digitalTitle")}</h2>
          <p>{t("studio.digitalIntro")}</p>
        </div>
        <a className="understated-link" href="/digital">
          {t("studio.digitalAction")}
          <ArrowUpRight size={16} />
        </a>
      </div>
    </section>
  );
}
export function FinalSupport() {
  const { t } = useTranslation();
  return (
    <section id="contact" className="studio-final">
      <div className="wrap">
        <div>
          <h2>{t("studio.finalTitle")}</h2>
          <p>{t("studio.finalBody")}</p>
        </div>
        <div className="final-actions">
          <a className="action" href="/support">
            {t("studio.support")}
            <ArrowUpRight size={18} />
          </a>
          <a
            href={waLink("Hi DR TECH, I need IT support.")}
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircle size={18} />
            WhatsApp
          </a>
          <a href={`tel:${phone}`}>
            <Phone size={17} />
            {t("studio.call")}
          </a>
        </div>
      </div>
    </section>
  );
}
export function Questions() {
  const { t } = useTranslation();
  return (
    <section id="faq" className="studio-section studio-faq">
      <div className="wrap faq-layout">
        <h2>{t("studio.faqTitle")}</h2>
        <div>
          {t("faq.items", { returnObjects: true })
            .slice(0, 5)
            .map((item) => (
              <details key={item.q}>
                <summary>
                  {item.q}
                  <span aria-hidden="true">+</span>
                </summary>
                <p>{item.a}</p>
              </details>
            ))}
        </div>
      </div>
    </section>
  );
}
export function HomePage() {
  return (
    <>
      <Hero />
      <Problems />
      <RepairPrices />
      <Process />
      <BusinessIntro />
      <Plans />
      <DigitalPreview />
      <FinalSupport />
    </>
  );
}
export function PageIntro({ title, intro }) {
  const { t } = useTranslation();
  return (
    <div className="page-intro">
      <div className="wrap">
        <a href="/">
          {t("studio.homeReturn")}
          <ArrowRight size={15} />
        </a>
        <h1>{t(title)}</h1>
        {intro && <p>{t(intro)}</p>}
      </div>
    </div>
  );
}
export function ProjectList() {
  const { t } = useTranslation();
  return (
    <section className="studio-section">
      <div className="wrap">
        <div className="portfolio-list">
          {projects.map((project) => (
            <article key={project.id}>
              <div>
                <p className="section-caption">
                  {t(`projects.${project.id}.category`)}
                </p>
                <h2>{project.name}</h2>
                <p>{t(`projects.${project.id}.body`)}</p>
                <ul>
                  {project.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
              </div>
              <a
                className="understated-link"
                href={
                  project.repo
                    ? `${githubProfile}/${project.repo}`
                    : waLink(
                        `Hi Deepal, please tell me about ${project.name} and its current progress.`,
                      )
                }
                target="_blank"
                rel="noopener noreferrer"
              >
                {project.repo ? (
                  <Github size={17} />
                ) : (
                  <MessageCircle size={17} />
                )}{" "}
                {t(project.repo ? "projects.source" : "projects.enquiry")}
                <ArrowUpRight size={17} />
              </a>
            </article>
          ))}
        </div>
        <details className="experiments">
          <summary>{t("projects.more")}</summary>
          <p>{t("projects.moreIntro")}</p>
          {additionalProjects.map((name) => (
            <a
              key={name}
              href={waLink(
                `Hi Deepal, please tell me about ${name} and its current progress.`,
              )}
              target="_blank"
              rel="noopener noreferrer"
            >
              {name}
              <ArrowUpRight size={16} />
            </a>
          ))}
        </details>
      </div>
    </section>
  );
}
export function DetailPage({ page, service }) {
  const { t } = useTranslation();
  switch (page) {
    case "/home-it":
      return (
        <>
          <PageIntro
            title="studio.homePageTitle"
            intro="studio.homePageIntro"
          />
          <Problems />
          <RepairPrices full />
          <Process />
          <Questions />
          <FinalSupport />
        </>
      );
    case "/business":
      return (
        <>
          <PageIntro
            title="studio.businessPageTitle"
            intro="studio.businessPageIntro"
          />
          <BusinessIntro full />
          <Plans />
          <section className="studio-section">
            <div className="wrap business-service-list">
              {t("brand.catalog", { returnObjects: true })
                .slice(1)
                .map((item) => (
                  <article key={item.title}>
                    <h2>{item.title}</h2>
                    <p>{item.body}</p>
                  </article>
                ))}
            </div>
          </section>
          <DigitalPreview />
          <FinalSupport />
        </>
      );
    case "/digital":
      return (
        <>
          <PageIntro
            title="studio.digitalPageTitle"
            intro="studio.digitalPageIntro"
          />
          <section className="studio-section">
            <div className="wrap digital-detail">
              {t("brand.digitalItems", { returnObjects: true }).map((item) => (
                <article key={item.title}>
                  <h2>{item.title}</h2>
                  <p>{item.body}</p>
                  <a
                    className="understated-link"
                    href="/support?service=digital"
                  >
                    {t("studio.support")}
                    <ArrowUpRight size={16} />
                  </a>
                </article>
              ))}
              <a className="portfolio-callout" href="/projects">
                <Code2 size={28} />
                <span>{t("studio.projectsAction")}</span>
                <ArrowRight size={20} />
              </a>
            </div>
          </section>
          <FinalSupport />
        </>
      );
    case "/projects":
      return (
        <>
          <PageIntro title="studio.projectsPageTitle" intro="projects.intro" />
          <ProjectList />
          <FinalSupport />
        </>
      );
    case "/about":
      return (
        <>
          <PageIntro
            title="studio.aboutPageTitle"
            intro="studio.aboutPageIntro"
          />
          <Trust full />
          <FinalSupport />
        </>
      );
    case "/support":
      return (
        <>
          <PageIntro
            title="studio.supportPageTitle"
            intro="studio.supportPageIntro"
          />
          <div className="wrap direct-contact">
            <a
              href={waLink("Hi DR TECH, I need IT support.")}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle size={18} />
              WhatsApp
            </a>
            <a href={`tel:${phone}`}>
              <Phone size={18} />
              {t("studio.call")}
            </a>
          </div>
          <Contact initialService={service} />
        </>
      );
    default:
      return (
        <>
          <PageIntro title="studio.notFoundTitle" intro="studio.notFoundBody" />
          <FinalSupport />
        </>
      );
  }
}
