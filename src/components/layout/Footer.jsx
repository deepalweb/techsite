import { useTranslation } from 'react-i18next'
import { Phone, Mail, MapPin, Truck } from 'lucide-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookF, faLinkedinIn, faYoutube, faTiktok } from '@fortawesome/free-brands-svg-icons'
import { phone, phoneDisplay, email, socials } from '../../data/content.js'

const SERVICE_HREFS = ['#repairs', '#packages', '#services', '#growth']
const QUICK_LINK_HREFS = ['#about', '#contact', '#faq', '#home']

export default function Footer() {
    const { t } = useTranslation()
    const year = new Date().getFullYear()

    return (
        <footer id="footer" className="relative overflow-hidden bg-ink px-4 pb-8 pt-16 text-white sm:px-6 lg:px-8">
            <div className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-40 left-1/4 h-80 w-80 rounded-full bg-secondary/10 blur-3xl" />

            <div className="relative mx-auto max-w-7xl">
                <div className="grid gap-10 border-b border-white/10 pb-12 sm:grid-cols-2 lg:grid-cols-[1.35fr_.75fr_.75fr_1fr]">
                    <div>
                        <a href="#home" className="inline-flex items-center gap-4" aria-label={t('nav.ariaHome')}>
                            <img src="/logo.png" alt="DR TECH SERVICES" width="960" height="960" loading="lazy" decoding="async" className="h-24 w-24 object-contain" />
                            <span className="text-2xl font-extrabold">DR TECH SERVICES</span>
                        </a>
                        <p className="mt-4 max-w-sm leading-7 text-slate-400">{t('footer.tagline')}</p>
                        <div className="mt-6 flex gap-3">
                            <a href={socials.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-slate-300 transition hover:border-primary hover:bg-primary hover:text-white">
                                <FontAwesomeIcon icon={faFacebookF} />
                            </a>
                            <a href={socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-slate-300 transition hover:border-primary hover:bg-primary hover:text-white">
                                <FontAwesomeIcon icon={faLinkedinIn} />
                            </a>
                            <a href={socials.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-slate-300 transition hover:border-primary hover:bg-primary hover:text-white">
                                <FontAwesomeIcon icon={faYoutube} />
                            </a>
                            <a href={socials.tiktok} target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-slate-300 transition hover:border-primary hover:bg-primary hover:text-white">
                                <FontAwesomeIcon icon={faTiktok} />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-sm font-extrabold uppercase tracking-[.16em] text-white">{t('footer.servicesHeading')}</h3>
                        <nav className="mt-5 space-y-3 text-sm font-semibold text-slate-400" aria-label={t('footer.ariaServicesNav')}>
                            {t('footer.servicesLinks', { returnObjects: true }).map((label, index) => (
                                <a key={label} href={SERVICE_HREFS[index]} className="block transition hover:translate-x-1 hover:text-teal-300">
                                    {label}
                                </a>
                            ))}
                        </nav>
                    </div>

                    <div>
                        <h3 className="text-sm font-extrabold uppercase tracking-[.16em] text-white">{t('footer.quickLinksHeading')}</h3>
                        <nav className="mt-5 space-y-3 text-sm font-semibold text-slate-400" aria-label={t('footer.ariaLinksNav')}>
                            <a href="#projects" className="block transition hover:text-teal-300">{t('projects.nav')}</a>
                            {t('footer.quickLinks', { returnObjects: true }).map((label, index) => (
                                <a key={label} href={QUICK_LINK_HREFS[index]} className="block transition hover:translate-x-1 hover:text-teal-300">
                                    {label}
                                </a>
                            ))}
                        </nav>
                    </div>

                    <div>
                        <h3 className="text-sm font-extrabold uppercase tracking-[.16em] text-white">{t('footer.contactHeading')}</h3>
                        <div className="mt-5 space-y-4 text-sm text-slate-400">
                            <a href={`tel:${phone}`} className="flex items-start gap-3 transition hover:text-teal-300">
                                <Phone size={16} className="mt-1 w-4 text-teal-300" />
                                <span>{phoneDisplay}</span>
                            </a>
                            <a href={`mailto:${email}`} className="flex items-start gap-3 break-all transition hover:text-teal-300">
                                <Mail size={16} className="mt-1 w-4 shrink-0 text-teal-300" />
                                <span>{email}</span>
                            </a>
                            <p className="flex items-start gap-3">
                                <MapPin size={16} className="mt-1 w-4 shrink-0 text-teal-300" />
                                <span>{t('footer.coverage')}</span>
                            </p>
                            <p className="flex items-start gap-3">
                                <Truck size={16} className="mt-1 w-4 shrink-0 text-teal-300" />
                                <span>{t('footer.deliveryNote')}</span>
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-3 pt-7 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
                    <p>&copy; {year} {t('footer.copyright')}</p>
                    <p>{t('footer.bottomTagline')}</p>
                </div>
            </div>
        </footer>
    )
}
