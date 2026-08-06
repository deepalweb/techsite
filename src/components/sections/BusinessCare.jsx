import { useTranslation } from 'react-i18next'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import { Check, ChevronRight, Store } from 'lucide-react'
import RevealOnScroll from '../ui/RevealOnScroll.jsx'
import { waLink, waMessages, prices } from '../../data/content.js'

export default function BusinessCare() {
    const { t } = useTranslation()
    const tiers = t('businessCare.tiers', { returnObjects: true })
    const features = t('businessCare.features', { returnObjects: true })

    return (
        <section id="services" className="relative overflow-hidden bg-[#0b1b2e] px-4 py-20 text-white sm:px-6 lg:px-8">
            <div className="absolute -right-40 top-0 h-96 w-96 rounded-full bg-teal-400/10 blur-3xl" />
            <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
                <RevealOnScroll>
                    <p className="text-caption font-extrabold uppercase text-teal-300">{t('businessCare.eyebrow')}</p>
                    <h2 className="mt-4 text-h1">{t('businessCare.title')}</h2>
                    <p className="mt-5 max-w-xl text-body text-slate-300">{t('businessCare.subtitle')}</p>
                    <div className="mt-8 grid gap-3 sm:grid-cols-2">
                        {features.map((feature) => (
                            <p key={feature} className="flex items-center gap-3 text-sm font-bold text-slate-200">
                                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-teal-300/15 text-teal-300"><Check size={14} strokeWidth={3} /></span>{feature}
                            </p>
                        ))}
                    </div>
                    <p className="mt-8 flex items-start gap-3 rounded-xl border border-white/10 bg-white/[.06] p-4 text-sm leading-6 text-slate-300"><Store size={19} className="mt-0.5 shrink-0 text-teal-300" />{t('businessCare.ctaBlock.subtitle')}</p>
                </RevealOnScroll>

                <RevealOnScroll index={1} className="rounded-3xl border border-teal-300/30 bg-white p-6 text-ink shadow-2xl shadow-black/30 sm:p-8">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                        <div>
                            <span className="rounded-full bg-teal-50 px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-teal-700">{t('packages.items.monthlyCare.label')}</span>
                            <h3 className="mt-4 text-h2">{tiers.growth.name}</h3>
                            <p className="mt-2 max-w-lg leading-7 text-steel">{tiers.growth.desc}</p>
                        </div>
                        <div className="rounded-2xl bg-slate-50 px-5 py-4 text-right">
                            <p className="text-3xl font-extrabold text-ink">{prices.growth}</p>
                            <p className="text-sm font-bold text-steel">{t('businessCare.perMonth')}</p>
                        </div>
                    </div>
                    <div className="my-7 h-px bg-slate-200" />
                    <div className="grid gap-4 sm:grid-cols-2">
                        {features.map((feature) => <p key={feature} className="flex items-center gap-3 font-bold"><Check size={17} className="shrink-0 text-teal-600" />{feature}</p>)}
                    </div>
                    <a href={waLink(waMessages.monthlyCare)} target="_blank" rel="noopener noreferrer" className="button-primary mt-8 w-full">
                        <FontAwesomeIcon icon={faWhatsapp} className="text-xl" />{t('businessCare.ctaBlock.cta')}<ChevronRight size={18} />
                    </a>
                    <div className="mt-6 grid gap-3 border-t border-slate-200 pt-5 text-sm sm:grid-cols-2">
                        <p><strong>{tiers.starter.name}: </strong><span className="text-steel">{prices.starter}{t('businessCare.perMonth')}</span></p>
                        <p><strong>{tiers.pro.name}: </strong><span className="text-steel">{prices.pro}{t('businessCare.perMonth')}</span></p>
                    </div>
                </RevealOnScroll>
            </div>
        </section>
    )
}
