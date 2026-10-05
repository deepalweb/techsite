import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ArrowUpRight,
  ArrowRight,
  Check,
  MapPin,
  MessageCircle,
  Phone,
  Network,
  ShieldCheck,
  Headphones,
  Code2,
  Github,
} from "lucide-react";
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
    <section
      id="home"
      className="studio-hero workstation-hero"
    >
      <picture className="hero-backdrop">
        <source
          media="(max-width: 900px)"
          srcSet="/assets/hero-workstation-v2-mobile.webp"
        />
        <img
          src="/assets/hero-workstation-v2.webp"
          alt={t("studio.workstationAlt")}
          width="1680"
          height="945"
          fetchpriority="high"
        />
      </picture>
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <p className="hero-kicker">
            <MapPin size={15} />
            {t("studio.heroKicker")}
          </p>
          <h1>
            <span className="hero-question">{t("studio.identity")}</span>{" "}
            <span className="hero-answer">{t("studio.identityAccent")}</span>
          </h1>
          <p className="hero-benefit">{t("studio.heroTitle")}</p>
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
          <ul className="hero-promises">
            {[t("studio.heroNote"), t("studio.heroRemote")].map((text) => (
              <li key={text}>
                <Check size={15} />
                {text}
              </li>
            ))}
          </ul>
        </div>
        <div className="hero-art-space" aria-hidden="true" />
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
  const [active, setActive] = useState("computer");
  return (
    <section id="repairs" className="studio-section problem-section">
      <div className="wrap">
        <div className="section-heading">
          <h2>{t("studio.helpTitle")}</h2>
          <p>{t("studio.helpIntro")}</p>
        </div>
        <div className="service-editorial">
          <div className="service-stage" aria-hidden="true">
            <span className="section-caption">
              DR TECH / 0
              {["computer", "wifi", "printer", "software"].indexOf(active) + 1}
            </span>
            <ServiceVisual type={active} />
            <div className="service-signal">
              <i />
              <i />
              <i />
            </div>
          </div>
          <div className="problem-grid">
            {t("studio.problems", { returnObjects: true }).map((item, i) => {
              return (
                <a
                  key={item.id}
                  href={`/support?service=${item.id}`}
                  className="problem-link"
                  data-active={active === item.id}
                  onMouseEnter={() => setActive(item.id)}
                  onFocus={() => setActive(item.id)}
                >
                  <span className="service-number">0{i + 1}</span>
                  <div className="service-row-copy">
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                    {problemPrices[item.id] && (
                      <p className="problem-price">{problemPrices[item.id]}</p>
                    )}
                  </div>
                  <ArrowUpRight className="problem-arrow" size={18} />
                </a>
              );
            })}
            <a
              className="problem-link unsure-row"
              href="/support?service=other"
            >
              <span className="service-number">05</span>
              <h3>{t("studio.notSure")}</h3>
              <ArrowUpRight size={22} />
            </a>
          </div>
        </div>
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
          <Process compact />
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
export function Process({ compact = false }) {
  const { t } = useTranslation();
  return (
    <section className={`process-section ${compact ? "process-compact" : ""}`}>
      <div className={compact ? "" : "wrap"}>
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
export function WorkGallery() {
  const { t } = useTranslation();
  return (
    <section className="studio-section real-work">
      <div className="wrap">
        <div className="section-heading">
          <h2>{t("studio.workTitle")}</h2>
          <p>{t("studio.workNote")}</p>
        </div>
        <div className="work-gallery">
          {["computer", "wifi"].map((id, i) => (
            <div key={id}>
              <div className="work-placeholder">
                <span>0{i + 1}</span>
                <p>{t("studio.workPlaceholder")}</p>
              </div>
              <p className="work-caption">{t(`studio.problems.${i}.title`)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
export function BusinessTransition() {
  const { t } = useTranslation();
  return (
    <div className="business-transition">
      <div className="wrap">
        <span>{t("studio.chapterHome")}</span>
        <svg viewBox="0 0 640 110" fill="none" aria-hidden="true">
          <path
            d="M0 55H250L310 15H640M250 55H640M250 55L310 95H640"
            stroke="currentColor"
            strokeWidth="1"
          />
          {[
            [10, 55],
            [400, 15],
            [470, 55],
            [540, 95],
          ].map(([cx, cy]) => (
            <circle key={cy} cx={cx} cy={cy} r="4" fill="currentColor" />
          ))}
        </svg>
        <strong>{t("studio.chapterBusiness")}</strong>
      </div>
    </div>
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
          <div className="infrastructure-map">
            <span className="section-caption">DR TECH / BUSINESS IT</span>
            <ol>
              {t("studio.networkLayers", { returnObjects: true }).map(
                (layer, i) => (
                  <li key={layer}>
                    <span>0{i + 1}</span>
                    <strong>{layer}</strong>
                    <i aria-hidden="true" />
                  </li>
                ),
              )}
            </ol>
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
    <section id="growth" className="digital-preview studio-section">
      <div className="wrap">
        <div className="digital-heading">
          <p className="section-caption">{t("studio.digitalAction")}</p>
          <h2>{t("studio.digitalHeadline")}</h2>
          <p>{t("studio.digitalIntro")}</p>
          <a className="understated-link" href="/digital">
            {t("studio.digitalAction")}
            <ArrowUpRight size={16} />
          </a>
        </div>
        <div className="digital-project-grid">
          {[
            projects.find((p) => p.featured),
            projects.find((p) => p.id === "techsite"),
            projects.find((p) => p.id === "inventory"),
          ].map((project) => (
            <ProjectPreview key={project.id} project={project} />
          ))}
        </div>
        <p className="preview-disclaimer">{t("studio.previewNote")}</p>
      </div>
    </section>
  );
}
function ProjectPreview({ project }) {
  const { t } = useTranslation();
  return (
    <article className={`project-preview project-${project.id}${project.featured ? " project-featured" : ""}`}>
      <a
        className="project-screen"
        href={`/projects#project-${project.id}`}
        aria-label={`${t("studio.caseStudy")}: ${project.name}`}
      >
        <div className="browser-chrome" aria-hidden="true">
          <i />
          <i />
          <i />
          <span>{project.name}</span>
        </div>
        {project.id === "techsite" ? (
          <img
            src="/assets/drtech-interface.webp"
            alt={t("projects.techsite.body")}
            width="1440"
            height="900"
            loading="lazy"
          />
        ) : (
          <div className="screenshot-pending">
            <Code2 size={32} strokeWidth={1} />
            <span>{t("studio.previewPending")}</span>
          </div>
        )}
      </a>
      <p className="section-caption">{t(`projects.${project.id}.category`)}</p>
      <h3>{project.name}</h3>
      <p>{t(`projects.${project.id}.body`)}</p>
      <p className="project-meta">
        {t("studio.projectRole")} / {project.tags.join(" · ")}
      </p>
      <p className="project-status">
        {project.id === "techsite"
          ? t("projects.techsite.category")
          : t("studio.projectStatus")}
      </p>
      <div className="project-actions">
      <a className="understated-link" href={`/projects#project-${project.id}`}>
        {t("studio.caseStudy")}
        <ArrowUpRight size={16} />
      </a>
      {project.featured && project.repo && <a className="understated-link project-source" href={`${githubProfile}/${project.repo}`} target="_blank" rel="noopener noreferrer"><Github size={16} />{t("projects.source")}<ArrowUpRight size={16} /></a>}
      </div>
    </article>
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
      <WorkGallery />
      <Trust />
      <BusinessTransition />
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
            <article key={project.id} id={`project-${project.id}`}>
              <div>
                <p className="section-caption">
                  {t(`projects.${project.id}.category`)}
                </p>
                <h2>{project.name}</h2>
                <p>{t(`projects.${project.id}.body`)}</p>
                <div className="portfolio-proof">
                  {project.id === "techsite" ? (
                    <img
                      src="/assets/drtech-interface.webp"
                      alt={t("projects.techsite.body")}
                      width="1440"
                      height="900"
                      loading="lazy"
                    />
                  ) : (
                    <p className="screenshot-pending">
                      {t("studio.previewPending")}
                    </p>
                  )}
                </div>
                <p className="project-meta">
                  {t("studio.projectRole")} /{" "}
                  {t(`projects.${project.id}.capability`)}
                </p>
                <p className="project-status">
                  {project.id === "techsite"
                    ? t("projects.techsite.category")
                    : t("studio.projectStatus")}
                </p>
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
          <WorkGallery />
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
          <DigitalPreview />
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
