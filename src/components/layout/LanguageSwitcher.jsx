import { useTranslation } from 'react-i18next'

const LANGUAGES = [
    { code: 'en', label: 'EN' },
    { code: 'si', label: 'සි' },
    { code: 'ta', label: 'த' },
]

export default function LanguageSwitcher({ className = '' }) {
    const { i18n, t } = useTranslation()

    return (
        <div className={`language-switcher ${className}`} role="group" aria-label={t('nav.ariaChooseLanguage')}>
            {LANGUAGES.map(({ code, label }) => (
                <button
                    key={code}
                    type="button"
                    className={`language-button ${i18n.resolvedLanguage === code ? 'active' : ''}`}
                    aria-pressed={i18n.resolvedLanguage === code}
                    onClick={() => i18n.changeLanguage(code)}
                >
                    {label}
                </button>
            ))}
        </div>
    )
}
