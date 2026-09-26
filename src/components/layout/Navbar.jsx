import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Menu, X } from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher.jsx";
import MobileMenu from "./MobileMenu.jsx";

export default function Navbar() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  const navItems = [
    { href: "#home", label: t("brand.navHome") },
    { href: "#service-catalog", label: t("brand.navServices") },
    { href: "#business-infrastructure", label: t("brand.navBusiness") },
    { href: "#about", label: t("nav.about") },
  ];

  return (
    <nav className="fixed left-0 right-0 top-4 z-50 px-4">
      <div className="site-nav mx-auto max-w-6xl rounded-[28px] px-4 sm:px-6">
        <div className="flex min-h-16 flex-wrap items-center justify-between gap-y-2 py-2">
          <a
            href="#home"
            className="flex items-center gap-3"
            aria-label={t("nav.ariaHome")}
          >
            <img
              src="/logo.png"
              alt="DR TECH SERVICES"
              width="960"
              height="960"
              className="h-14 w-14 object-contain drop-shadow-md"
            />
            <span className="hidden text-lg font-extrabold tracking-normal text-ink sm:inline">
              DR TECH
            </span>
          </a>
          <div className="hidden items-center gap-0.5 xl:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="nav-link rounded-full px-2.5 py-2 text-sm font-bold text-slate-700"
              >
                {item.label}
              </a>
            ))}
            <a
              className="ml-2 whitespace-nowrap rounded-full bg-ink px-5 py-3 text-sm font-extrabold text-white transition hover:bg-slate-700"
              href="#contact"
            >
              {t("experience.getHelp")}
            </a>
          </div>
          <LanguageSwitcher className="ml-auto mr-2 xl:ml-2 xl:mr-0" />
          <button
            id="menuButton"
            type="button"
            className="grid h-11 w-11 place-items-center rounded-full border border-slate-200 text-ink xl:hidden"
            aria-label={open ? t("nav.ariaCloseMenu") : t("nav.ariaOpenMenu")}
            aria-expanded={open}
            aria-controls="mobileMenu"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
        <MobileMenu
          open={open}
          navItems={navItems}
          onNavigate={() => setOpen(false)}
          t={t}
        />
      </div>
    </nav>
  );
}
