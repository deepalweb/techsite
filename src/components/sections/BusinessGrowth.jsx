import { useTranslation } from 'react-i18next'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import { ArrowRight, Check, MapPin, Smartphone } from 'lucide-react'
import RevealOnScroll from '../ui/RevealOnScroll.jsx'
import { waLink, waMessages } from '../../data/content.js'

export default function BusinessGrowth() {
    const { t } = useTranslation()
    const categories = t('growth.table.rows', { returnObjects: true })
    const services = t('growth.servicesPanel.items', { returnObjects: true })

    return (
        <section id="growth" className="bg-white px-4 py-20 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
                <RevealOnScroll className="mx-auto mb-12 max-w-3xl text-center">
                    <p className="text-caption font-extrabold uppercase text-primary">{t('growth.eyebrow')}</p>
                    <h2 className="mt-4 text-h1 text-ink">{t('growth.imageCaption.title')}</h2>
                    <p className="mt-5 text-body text-steel">{t('growth.imageCaption.desc')} {t('growth.lead1')}</p>
                </RevealOnScroll>

                <div className="grid overflow-hidden rounded-[2rem] bg-slate-50 shadow-xl shadow-slate-900/[.08] ring-1 ring-slate-200/70 lg:grid-cols-[.9fr_1.1fr]">
                    <RevealOnScroll className="relative min-h-[440px] bg-slate-100">
                        <img src="/assets/business-growth-before-after.png" alt="Google Business Profile before and after digital setup" width="1369" height="1149" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
                        <div className="absolute inset-x-5 bottom-5 rounded-2xl bg-ink/95 p-5 text-white backdrop-blur sm:inset-x-7 sm:bottom-7">
                            <p className="flex items-center gap-2 text-sm font-extrabold text-teal-300"><MapPin size={17} />{t('growth.table.eyebrow')}</p>
                            <p className="mt-2 font-bold leading-6">{t('growth.lead2')}</p>
                        </div>
                    </RevealOnScroll>

                    <RevealOnScroll index={1} className="p-6 sm:p-8 lg:p-10">
                        <p className="text-caption font-extrabold uppercase text-primary">{t('growth.servicesPanel.eyebrow')}</p>
                        <h3 className="mt-3 text-h2 text-ink">{t('growth.servicesPanel.title')}</h3>
                        <p className="mt-4 leading-7 text-steel">{t('growth.servicesPanel.lead')}</p>
                        <div className="mt-7 grid gap-x-5 gap-y-4 sm:grid-cols-2">
                            {services.slice(0, 5).map((service) => (
                                <p key={service} className="flex items-start gap-3 text-sm font-bold text-ink">
                                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-teal-100 text-teal-700"><Check size={12} strokeWidth={3} /></span>{service}
                                </p>
                            ))}
                        </div>
                        <div className="mt-8 rounded-2xl bg-sky-50 p-5 sm:flex sm:items-center sm:justify-between sm:gap-5">
                            <div><p className="font-extrabold text-ink">{t('growth.closingCta.title')}</p><p className="mt-1 text-sm leading-6 text-steel">{t('growth.closingCta.tagline')}</p></div>
                            <a href={waLink(waMessages.businessOnline)} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex shrink-0 items-center gap-2 font-extrabold text-emerald-700 sm:mt-0"><FontAwesomeIcon icon={faWhatsapp} />{t('growth.imageCaption.cta')}<ArrowRight size={15} /></a>
                        </div>
                    </RevealOnScroll>
                </div>

                <RevealOnScroll className="mt-8 flex flex-wrap items-center justify-center gap-2">
                    <span className="mr-2 flex items-center gap-2 text-sm font-extrabold text-ink"><Smartphone size={17} className="text-primary" />{t('growth.table.title')}:</span>
                    {categories.map(({ category }) => <span key={category} className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-steel">{category}</span>)}
                </RevealOnScroll>
            </div>
        </section>
    )
}
