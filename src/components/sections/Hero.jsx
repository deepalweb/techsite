import { useTranslation } from 'react-i18next'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowDown, MapPin } from 'lucide-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import { waLink, waMessages } from '../../data/content.js'

export default function Hero() {
    const { t } = useTranslation()
    const reduceMotion = useReducedMotion()
    const enter = (delay = 0) => reduceMotion
        ? { initial: false }
        : { initial: { opacity: 0, y: 22 }, animate: { opacity: 1, y: 0 }, transition: { duration: .7, delay } }

    return (
        <header id="home" className="hero">
            <div className="relative z-10 mx-auto flex min-h-[720px] max-w-7xl items-center px-4 pb-20 pt-32 sm:px-6 sm:pt-36 lg:px-8 lg:pb-24 lg:pt-40">
                <div className="min-w-0 max-w-3xl">
                    <motion.div {...enter(.05)}
                        className="eyebrow mb-6 inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-bold text-cyan-50 backdrop-blur"
                    >
                        <MapPin size={16} />
                        {t('hero.eyebrow')}
                    </motion.div>
                    <motion.h1 {...enter(.12)}
                        className="hero-title max-w-4xl text-display tracking-normal"
                    >
                        {t('hero.titleLine1')}
                    </motion.h1>
                    <motion.p {...enter(.2)}
                        className="hero-copy mt-6 max-w-2xl text-body text-slate-200"
                    >
                        {t('hero.subtitle')}
                    </motion.p>
                    <motion.div {...enter(.3)}
                        className="hero-actions mt-8 flex flex-col gap-3 sm:flex-row"
                    >
                        <motion.a
                            whileHover={{ y: -3 }}
                            whileTap={{ scale: 0.97 }}
                            href={waLink(waMessages.hero)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="button-primary"
                        >
                            <FontAwesomeIcon icon={faWhatsapp} className="text-xl" />
                            {t('hero.ctaWhatsapp')}
                        </motion.a>
                        <a href="#packages" className="button-secondary"><ArrowDown size={18} />{t('hero.ctaPackages')}</a>
                    </motion.div>
                </div>
            </div>
        </header>
    )
}
