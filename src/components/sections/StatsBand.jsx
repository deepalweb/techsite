import { useTranslation } from 'react-i18next'
import { CalendarCheck2, House, PackageCheck, Stethoscope } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import RevealOnScroll from '../ui/RevealOnScroll.jsx'
import { prices } from '../../data/content.js'

export default function StatsBand() {
    const { t } = useTranslation()
    const reduceMotion = useReducedMotion()

    const stats = [
        { icon: House, value: t('stats.home'), label: t('stats.visitAvailable'), tile: 'from-sky-500 to-cyan-400', glow: 'shadow-sky-500/25' },
        { icon: PackageCheck, value: t('stats.pickup'), label: t('stats.andDelivery'), tile: 'from-teal-500 to-emerald-400', glow: 'shadow-teal-500/25' },
        { icon: Stethoscope, value: prices.diagnosisFrom, label: t('stats.diagnosisFrom'), tile: 'from-violet-500 to-indigo-400', glow: 'shadow-violet-500/25' },
        { icon: CalendarCheck2, value: t('stats.monthly'), label: t('stats.businessItCare'), tile: 'from-orange-500 to-amber-400', glow: 'shadow-orange-500/25' },
    ]

    return (
        <section className="relative z-20 -mt-1 px-4 sm:px-6 lg:-mt-12 lg:px-8">
            <div className="mx-auto grid max-w-6xl rounded-2xl border border-slate-200 bg-white p-3 shadow-xl shadow-slate-900/10 sm:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat, index) => (
                    <RevealOnScroll key={stat.label} index={index} className="group relative overflow-hidden rounded-xl lg:border-r lg:border-slate-100 lg:last:border-0">
                        <motion.div
                            whileHover={reduceMotion ? undefined : { y: -4 }}
                            transition={{ type: 'spring', stiffness: 320, damping: 22 }}
                            className="relative flex items-center gap-4 rounded-xl p-4 transition-colors duration-300 group-hover:bg-gradient-to-br group-hover:from-sky-50 group-hover:to-teal-50"
                        >
                            <motion.span
                                initial={reduceMotion ? false : { scale: .65, rotate: -10 }}
                                whileInView={{ scale: 1, rotate: 0 }}
                                viewport={{ once: true }}
                                transition={{ type: 'spring', stiffness: 280, damping: 16, delay: index * .08 + .15 }}
                                className={`relative grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br text-white shadow-lg transition-transform duration-300 group-hover:scale-105 ${stat.tile} ${stat.glow}`}
                            >
                                <span className="absolute inset-0 rounded-2xl bg-white/0 transition-colors group-hover:bg-white/10" />
                                <stat.icon size={22} strokeWidth={2.25} className="relative" />
                            </motion.span>
                            <div>
                                <p className="text-base font-extrabold text-ink">{stat.value}</p>
                                <p className="mt-0.5 text-sm font-semibold text-steel">{stat.label}</p>
                            </div>
                        </motion.div>
                    </RevealOnScroll>
                ))}
            </div>
        </section>
    )
}
