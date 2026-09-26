import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import en from './en.json'
import si from './si.json'
import ta from './ta.json'
import motionEn from './motion-en.json'
import motionSi from './motion-si.json'
import motionTa from './motion-ta.json'

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {
            en: { translation: { ...en, motion: motionEn } },
            si: { translation: { ...si, motion: motionSi } },
            ta: { translation: { ...ta, motion: motionTa } },
        },
        fallbackLng: 'en',
        supportedLngs: ['en', 'si', 'ta'],
        interpolation: { escapeValue: false },
        detection: {
            order: ['querystring', 'localStorage', 'navigator'],
            lookupQuerystring: 'lang',
            lookupLocalStorage: 'drtech-language',
            caches: ['localStorage'],
        },
    })

export default i18n
