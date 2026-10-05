import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ArrowUpRight,
  Menu,
  X,
  MessageCircle,
  Phone,
  ArrowRight,
} from "lucide-react";
import LanguageSwitcher from "../layout/LanguageSwitcher.jsx";
import {
  phone,
  phoneDisplay,
  email,
  socials,
  waLink,
  waMessages,
} from "../../data/content.js";
export function Header({ page }) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const toggle = useRef(null);
  useEffect(() => {
    function escape(e) {
      if (e.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
    }
    if (open) document.addEventListener("keydown", escape);
    return () => document.removeEventListener("keydown", escape);
  }, [open]);
  const links = [
    ["/home-it", "home"],
    ["/business", "business"],
    ["/digital", "digitalAction"],
    ["/home-it#packages", "pricing"],
    ["/about", "about"],
  ];
  return (
    <header className="studio-header">
      <a className="studio-skip" href="#main">
        {t("studio.skip")}
      </a>
      <div className="studio-nav wrap">
        <a className="wordmark" href="/" aria-label="DR TECH home">
          <img src="/assets/brand-mark.webp" alt="" width="44" height="44" />
          <span>
            DR TECH<small>{t("studio.restored")}</small>
          </span>
        </a>
        <nav className="desktop-links" aria-label={t("studio.services")}>
          {links.map(([href, key]) => (
            <a
              key={key}
              href={href}
              aria-current={href === page ? "page" : undefined}
            >
              {t(`studio.${key}`)}
            </a>
          ))}
        </nav>
        <div className="nav-tools">
          <LanguageSwitcher />
          <a className="action action-small desktop-support" href="/support">
            {t("studio.support")}
            <ArrowUpRight size={15} />
          </a>
          <button
            className="menu-toggle"
            ref={toggle}
            type="button"
            aria-label={t(open ? "nav.ariaCloseMenu" : "nav.ariaOpenMenu")}
            aria-expanded={open}
            aria-controls="studio-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      {open && (
        <nav
          id="studio-menu"
          className="mobile-links"
          aria-label={t("studio.services")}
        >
          {links.map(([href, key]) => (
            <a key={key} href={href}>
              {t(`studio.${key}`)}
              <ArrowRight size={16} />
            </a>
          ))}
          <a className="action" href="/support">
            {t("studio.support")}
          </a>
        </nav>
      )}
    </header>
  );
}
export function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="studio-footer">
      <div className="wrap footer-grid">
        <div>
          <a className="footer-brand" href="/">
            DR TECH<span>Services</span>
          </a>
          <p>{t("studio.footerLine")}</p>
          <p>{t("studio.location")}</p>
        </div>
        <div>
          <h2>{t("studio.services")}</h2>
          <a href="/home-it">{t("studio.home")}</a>
          <a href="/business">{t("studio.business")}</a>
          <a href="/digital">{t("studio.digitalAction")}</a>
          <a href="/projects">{t("projects.nav")}</a>
        </div>
        <div>
          <h2>{t("studio.contact")}</h2>
          <a href={`tel:${phone}`}>{phoneDisplay}</a>
          <a href={`mailto:${email}`}>{email}</a>
          <a href="/support">{t("studio.support")}</a>
        </div>
        <div>
          <h2>{t("studio.elsewhere")}</h2>
          <a href={socials.facebook} target="_blank" rel="noopener noreferrer">
            Facebook
            <ArrowUpRight size={13} />
          </a>
          <a href={socials.linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn
            <ArrowUpRight size={13} />
          </a>
          <a href={socials.youtube} target="_blank" rel="noopener noreferrer">
            YouTube
            <ArrowUpRight size={13} />
          </a>
        </div>
      </div>
      <div className="wrap footer-bottom">
        <span>
          © {new Date().getFullYear()} DR TECH Services. {t("studio.rights")}
        </span>
        <a href="/about">{t("studio.about")}</a>
      </div>
    </footer>
  );
}
export function QuickActions() {
  const { t } = useTranslation();
  return (
    <div className="mobile-dock">
      <a href="/support">
        <ArrowUpRight size={18} />
        {t("studio.support")}
      </a>
      <a
        href={waLink(waMessages.contact)}
        target="_blank"
        rel="noopener noreferrer"
      >
        <MessageCircle size={18} />
        WhatsApp
      </a>
      <a href={`tel:${phone}`} aria-label={t("studio.call")}>
        <Phone size={18} />
      </a>
    </div>
  );
}
