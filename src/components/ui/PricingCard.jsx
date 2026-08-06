import RevealOnScroll from './RevealOnScroll.jsx'
import { Check } from 'lucide-react'

export default function PricingCard({ icon, label, name, price, priceNote, features, footnote, cta, highlighted = false, index = 0 }) {
    return (
        <RevealOnScroll index={index} className="h-full">
            <article className={`group flex h-full flex-col rounded-2xl border bg-white p-6 transition duration-300 hover:-translate-y-1 hover:shadow-xl ${highlighted ? 'border-primary shadow-lg shadow-sky-900/10' : 'border-slate-200 shadow-sm'}`}>
                <div className="flex items-start justify-between gap-4">
                    <div className="icon-tile">{icon}</div>
                    <span className={`rounded-full px-3 py-1 text-xs font-extrabold uppercase tracking-wider ${highlighted ? 'bg-sky-100 text-primary' : 'bg-slate-100 text-steel'}`}>{label}</span>
                </div>
                <h3 className="mt-5 text-h3 text-ink">{name}</h3>
                <p className="mt-3 text-2xl font-extrabold text-primary">{price}</p>
                {priceNote && <p className="mt-1 text-sm font-semibold text-steel">{priceNote}</p>}
                <ul className="mt-6 space-y-3 text-steel">
                    {features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3">
                            <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-teal-100 text-teal-700"><Check size={12} strokeWidth={3} /></span>
                            <span>{feature}</span>
                        </li>
                    ))}
                </ul>
                {footnote && <p className="mt-5 border-t border-slate-100 pt-4 text-sm font-semibold leading-6 text-steel">{footnote}</p>}
                {cta && <div className="mt-auto pt-6">{cta}</div>}
            </article>
        </RevealOnScroll>
    )
}
