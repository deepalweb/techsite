import { useTranslation } from 'react-i18next'
import { Headset } from 'lucide-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import { waLink, waMessages } from '../../data/content.js'

export default function FloatingActions() {
    const { t } = useTranslation()

    return (
        <div className="floating-actions fixed inset-x-3 bottom-3 z-50 grid grid-cols-[.8fr_1.2fr] gap-2 rounded-2xl border border-slate-200 bg-white/95 p-2 shadow-2xl backdrop-blur md:inset-x-auto md:bottom-6 md:right-5 md:flex md:flex-col md:border-0 md:bg-transparent md:p-0 md:shadow-none">
            <a
                href="#contact"
                className="flex h-12 items-center justify-center gap-2 rounded-xl bg-ink px-4 font-bold text-white md:hidden"
                aria-label={t('experience.getHelp')}
            >
                <Headset size={22} />
                <span>{t('experience.getHelp')}</span>
            </a>
            <a
                href={waLink(waMessages.floatingAction)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 px-4 font-bold text-white shadow-xl md:h-16 md:w-16 md:rounded-full md:px-0"
                aria-label={t('floatingActions.ariaWhatsapp')}
            >
                <FontAwesomeIcon icon={faWhatsapp} className="text-3xl" />
                <span className="md:hidden">WhatsApp</span>
            </a>
        </div>
    )
}
