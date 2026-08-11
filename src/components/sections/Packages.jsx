import { useTranslation } from 'react-i18next'
import { ArrowRight, Building2, Gauge, Stethoscope, Wifi } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading.jsx'
import PricingCard from '../ui/PricingCard.jsx'
import RevealOnScroll from '../ui/RevealOnScroll.jsx'
import { waLink, waMessages, prices } from '../../data/content.js'

export default function Packages() {
    const { t } = useTranslation()
    const items = t('packages.items', { returnObjects: true })
    const action = (message, label = items.basicVisit.cta) => (
        <a className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink px-5 py-3 font-extrabold text-white transition hover:bg-slate-700" href={waLink(message)} target="_blank" rel="noopener noreferrer">
            {label}<ArrowRight size={16} />
        </a>
    )

    return (
        <section id="packages" className="bg-slate-100/80 px-4 py-20 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
                <SectionHeading eyebrow={t('packages.eyebrow')} title={t('packages.title')} subtitle={t('packages.subtitle')} />
                <div className="grid gap-5 lg:grid-cols-3">
                    <PricingCard index={0} highlighted icon={<Stethoscope size={22} />} label={items.basicVisit.label} name={items.basicVisit.name} price={prices.basicVisit} features={items.basicVisit.features} cta={action(waMessages.basicVisit)} />
                    <PricingCard index={1} icon={<Gauge size={22} />} label={items.laptopBoost.label} name={items.laptopBoost.name} price={prices.laptopBoost} priceNote={items.laptopBoost.partsNote} features={items.laptopBoost.features} cta={action(waMessages.hero, t('hero.ctaWhatsapp'))} />
                    <PricingCard index={2} icon={<Wifi size={22} />} label={items.wifiPrinter.label} name={items.wifiPrinter.name} price={prices.wifiPrinter} features={items.wifiPrinter.features} footnote={items.wifiPrinter.note} cta={action(waMessages.hero, t('hero.ctaWhatsapp'))} />
                </div>
                <RevealOnScroll className="mt-6 grid gap-6 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200/70 sm:p-8 lg:grid-cols-[auto_1fr_auto] lg:items-center">
                    <span className="icon-tile"><Building2 size={22} /></span>
                    <div>
                        <p className="text-caption font-extrabold uppercase text-primary">{items.smallBizVisit.label}</p>
                        <h3 className="mt-2 text-h3 text-ink">{items.smallBizVisit.name}</h3>
                        <p className="mt-2 font-extrabold text-primary">{prices.smallBizVisit}</p>
                    </div>
                    <a href="#services" className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-3 font-extrabold text-ink transition hover:border-primary hover:text-primary">{items.monthlyCare.cta}<ArrowRight size={16} /></a>
                </RevealOnScroll>
            </div>
        </section>
    )
}
