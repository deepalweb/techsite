import { useTranslation } from 'react-i18next'
import RevealOnScroll from '../ui/RevealOnScroll.jsx'

export default function Faq() {
    const { t } = useTranslation()
    const items = t('faq.items', { returnObjects: true })
    const faqSchema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: items.map((item) => ({
            '@type': 'Question',
            name: item.q,
            acceptedAnswer: { '@type': 'Answer', text: item.a },
        })),
    }

    return (
        <section id="faq" className="px-4 pb-20 sm:px-6 lg:px-8">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
            <div className="mx-auto max-w-4xl">
                <RevealOnScroll className="mb-10 text-center">
                    <p className="mb-3 text-caption font-extrabold uppercase text-primary">{t('faq.eyebrow')}</p>
                    <h2 className="text-h1 text-ink">{t('faq.title')}</h2>
                </RevealOnScroll>
                <div className="space-y-3">
                    {items.map((item, index) => (
                        <RevealOnScroll key={item.q} index={index} className="card p-5" as="details">
                            <summary className="cursor-pointer font-extrabold text-ink">{item.q}</summary>
                            <p className="mt-3 text-steel">{item.a}</p>
                        </RevealOnScroll>
                    ))}
                </div>
            </div>
        </section>
    )
}
