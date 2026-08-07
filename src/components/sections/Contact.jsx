import { useTranslation } from 'react-i18next'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import { Phone, Send } from 'lucide-react'
import RevealOnScroll from '../ui/RevealOnScroll.jsx'
import { phone, email, waLink, waMessages } from '../../data/content.js'

export default function Contact() {
    const { t } = useTranslation()

    return (
        <section id="contact" className="bg-white px-4 py-20 sm:px-6 lg:px-8">
            <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-[.9fr_1.1fr] md:items-start">
                <RevealOnScroll index={0}>
                    <p className="mb-3 text-caption font-extrabold uppercase text-primary">{t('contact.eyebrow')}</p>
                    <h2 className="text-h1 text-ink">{t('contact.title')}</h2>
                    <p className="mt-4 text-body text-steel">{t('contact.subtitle')}</p>
                    <div className="mt-7 flex flex-col gap-3 sm:flex-row md:flex-col">
                        <a href={waLink(waMessages.contact)} target="_blank" rel="noopener noreferrer" className="button-primary">
                            <FontAwesomeIcon icon={faWhatsapp} className="text-xl" />
                            WhatsApp +94 760846996
                        </a>
                        <a
                            href={`tel:${phone}`}
                            className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full border border-slate-300 px-5 py-3 font-extrabold text-ink transition hover:border-primary hover:text-primary"
                        >
                            <Phone size={18} />
                            {t('contact.ctaCall')}
                        </a>
                    </div>
                </RevealOnScroll>
                <RevealOnScroll index={1} className="card p-6" as="form" action={`https://formsubmit.co/${email}`} method="POST">
                    <input type="hidden" name="_subject" value="New Message from DR TECH Website" />
                    <input type="hidden" name="_captcha" value="false" />
                    <input type="hidden" name="_template" value="table" />
                    <label className="mb-2 block text-sm font-extrabold text-ink" htmlFor="name">
                        {t('contact.form.nameLabel')}
                    </label>
                    <input
                        id="name"
                        name="name"
                        className="mb-4 w-full rounded-lg border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-primary focus:ring-4 focus:ring-sky-100"
                        placeholder={t('contact.form.namePlaceholder')}
                        required
                    />
                    <label className="mb-2 block text-sm font-extrabold text-ink" htmlFor="email">
                        {t('contact.form.emailLabel')}
                    </label>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        className="mb-4 w-full rounded-lg border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-primary focus:ring-4 focus:ring-sky-100"
                        placeholder="you@example.com"
                        required
                    />
                    <label className="mb-2 block text-sm font-extrabold text-ink" htmlFor="message">
                        {t('contact.form.messageLabel')}
                    </label>
                    <textarea
                        id="message"
                        name="message"
                        rows="4"
                        className="mb-5 w-full rounded-lg border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-primary focus:ring-4 focus:ring-sky-100"
                        placeholder={t('contact.form.messagePlaceholder')}
                        required
                    />
                    <button type="submit" className="button-primary w-full">
                        <Send size={18} />
                        {t('contact.form.submit')}
                    </button>
                </RevealOnScroll>
            </div>
        </section>
    )
}
