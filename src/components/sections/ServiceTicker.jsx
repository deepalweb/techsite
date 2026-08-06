import { useTranslation } from 'react-i18next'

export default function ServiceTicker() {
    const { t } = useTranslation()
    const items = t('ticker.items', { returnObjects: true })
    const looped = [...items, ...items]

    return (
        <section className="ticker-shell py-4">
            <div className="marquee-track animate-marquee gap-6 text-sm font-bold uppercase tracking-[.18em] text-slate-200">
                {looped.map((item, index) => (
                    <span key={`${item}-${index}`} className="flex items-center gap-6">
                        <span>{item}</span>
                        <span className="text-teal-300">/</span>
                    </span>
                ))}
            </div>
        </section>
    )
}
