import { useTranslation } from 'react-i18next'
import { Check } from 'lucide-react'
import RevealOnScroll from '../ui/RevealOnScroll.jsx'

export default function About() {
    const { t } = useTranslation()
    const credentials = t('about.credentials', { returnObjects: true })

    return (
        <section id="about" className="bg-slate-100/80 px-4 py-20 sm:px-6 lg:px-8">
            <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-2 md:items-center">
                <RevealOnScroll index={0} className="overflow-hidden rounded-3xl shadow-2xl shadow-slate-900/15">
                    <img
                        src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=85"
                        alt="DR TECH IT consultation and small business infrastructure planning in Colombo"
                        className="h-full min-h-[360px] w-full object-cover transition duration-700 hover:scale-105"
                    />
                </RevealOnScroll>
                <RevealOnScroll index={1}>
                    <p className="mb-3 text-caption font-extrabold uppercase text-primary">{t('about.eyebrow')}</p>
                    <h2 className="text-h1 text-ink">{t('about.title')}</h2>
                    <p className="mt-5 text-body text-steel">{t('about.bio')}</p>
                    <div className="mt-7 space-y-4">
                        {credentials.map((credential) => (
                            <div key={credential.title} className="flex gap-4">
                                <span className="icon-tile shrink-0">
                                    <Check size={20} />
                                </span>
                                <div>
                                    <h3 className="font-extrabold text-ink">{credential.title}</h3>
                                    <p className="text-steel">{credential.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </RevealOnScroll>
            </div>
        </section>
    )
}
