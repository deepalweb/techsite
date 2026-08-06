import { useTranslation } from 'react-i18next'
import { ArrowRight, Check, Clock3, Home, MapPin, Store } from 'lucide-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import RevealOnScroll from '../ui/RevealOnScroll.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'
import { prices, waLink, waMessages } from '../../data/content.js'

export default function Repairs() {
    const { t } = useTranslation()
    const homeItems = t('repairs.home.items', { returnObjects: true }).slice(0, 6)
    const businessItems = t('repairs.business.items', { returnObjects: true }).slice(0, 6)

    const SupportList = ({ items, tone }) => (
        <div className="grid gap-x-5 gap-y-4 sm:grid-cols-2">
            {items.map((item) => (
                <div key={item} className="flex items-start gap-3 font-bold text-ink">
                    <span className={`mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full ${tone === 'home' ? 'bg-sky-100 text-primary' : 'bg-teal-100 text-teal-700'}`}>
                        <Check size={14} strokeWidth={3} />
                    </span>
                    <span>{item}</span>
                </div>
            ))}
        </div>
    )

    return (
        <section id="repairs" className="px-4 py-20 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
                <SectionHeading eyebrow={t('repairs.eyebrow')} title={t('repairs.title')} subtitle={t('repairs.subtitle')} />
                <div className="grid items-stretch gap-6 lg:grid-cols-2">
                    <RevealOnScroll index={0} className="support-path support-path-home flex h-full flex-col overflow-hidden rounded-2xl border border-sky-200 bg-white shadow-xl shadow-slate-900/[.06]">
                        <div className="h-1.5 bg-gradient-to-r from-sky-500 to-cyan-400" />
                        <div className="flex flex-1 flex-col p-6 sm:p-8">
                            <div className="flex items-center gap-4">
                                <span className="icon-tile shrink-0">
                                    <Home size={22} />
                                </span>
                                <div>
                                    <p className="text-caption font-extrabold uppercase text-primary">{t('repairs.home.label')}</p>
                                    <h3 className="mt-1 text-h3 text-ink">{t('repairs.home.title')}</h3>
                                </div>
                            </div>
                            <p className="mt-5 leading-7 text-steel">{t('repairs.home.subtitle')}</p>
                            <div className="mt-7"><SupportList items={homeItems} tone="home" /></div>
                            <div className="mt-8 grid gap-3 border-y border-slate-100 py-5 text-sm sm:grid-cols-2">
                                <p className="flex items-center gap-2 font-bold text-steel"><MapPin size={17} className="text-primary" />{t('stats.visitAvailable')}</p>
                                <p className="flex items-center gap-2 font-bold text-steel"><Clock3 size={17} className="text-primary" />{prices.diagnosisFrom} · {t('stats.diagnosisFrom')}</p>
                            </div>
                            <p className="mt-5 text-sm font-semibold leading-6 text-steel">{t('repairs.home.note')}</p>
                            <a href={waLink(waMessages.hero)} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-ink px-5 py-3 font-extrabold text-white transition hover:-translate-y-0.5 hover:bg-slate-700">
                                <FontAwesomeIcon icon={faWhatsapp} className="text-lg" />{t('hero.ctaWhatsapp')}<ArrowRight size={16} />
                            </a>
                        </div>
                    </RevealOnScroll>

                    <RevealOnScroll index={1} className="support-path support-path-business flex h-full flex-col overflow-hidden rounded-2xl border border-teal-200 bg-white shadow-xl shadow-slate-900/[.06]">
                        <div className="h-1.5 bg-gradient-to-r from-teal-500 to-emerald-400" />
                        <div className="flex flex-1 flex-col p-6 sm:p-8">
                            <div className="flex items-center gap-4">
                                <span className="icon-tile shrink-0">
                                    <Store size={22} />
                                </span>
                                <div>
                                    <p className="text-caption font-extrabold uppercase text-primary">{t('repairs.business.label')}</p>
                                    <h3 className="mt-1 text-h3 text-ink">{t('repairs.business.title')}</h3>
                                </div>
                            </div>
                            <p className="mt-5 leading-7 text-steel">{t('repairs.business.subtitle')}</p>
                            <div className="mt-7"><SupportList items={businessItems} tone="business" /></div>
                            <div className="mt-8 grid gap-3 border-y border-slate-100 py-5 text-sm sm:grid-cols-2">
                                <p className="flex items-center gap-2 font-bold text-steel"><Store size={17} className="text-teal-600" />{t('stats.monthly')} {t('stats.businessItCare')}</p>
                                <p className="flex items-center gap-2 font-bold text-steel"><Clock3 size={17} className="text-teal-600" />{prices.starter}{t('businessCare.perMonth')}</p>
                            </div>
                            <p className="mt-5 text-sm font-semibold leading-6 text-steel">{t('repairs.business.note')}</p>
                            <a href={waLink(waMessages.monthlyCare)} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-teal-600 to-emerald-500 px-5 py-3 font-extrabold text-white shadow-lg shadow-teal-600/20 transition hover:-translate-y-0.5">
                                <FontAwesomeIcon icon={faWhatsapp} className="text-lg" />{t('businessCare.ctaBlock.cta')}<ArrowRight size={16} />
                            </a>
                        </div>
                    </RevealOnScroll>
                </div>
            </div>
        </section>
    )
}
