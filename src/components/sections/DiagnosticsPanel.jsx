import { useTranslation } from 'react-i18next'
import { motion, useReducedMotion } from 'framer-motion'
import { Home, Store } from 'lucide-react'

export default function DiagnosticsPanel() {
    const { t } = useTranslation()
    const reduceMotion = useReducedMotion()

    return (
        <div className="relative">
            <motion.div
                className="pointer-events-none absolute -inset-10 -z-10 rounded-full bg-gradient-to-br from-primary/30 via-secondary/20 to-transparent blur-3xl"
                animate={reduceMotion ? undefined : { opacity: [0.55, 0.9, 0.55], scale: [1, 1.05, 1] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
                className="diagnostic-panel relative mx-auto max-w-lg overflow-hidden rounded-lg p-5"
                initial={{ opacity: 0, y: 24, rotateX: 10, rotateY: -10 }}
                animate={{ opacity: 1, y: 0, rotateX: 0, rotateY: 0 }}
                transition={{ duration: 1, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
                style={{ transformStyle: 'preserve-3d', transformPerspective: 1200 }}
            >
                {!reduceMotion && <div className="scan-line animate-scan" />}
                <div className="mb-5 flex items-center justify-between border-b border-white/10 pb-4">
                    <div>
                        <p className="text-xs font-bold uppercase tracking-[.22em] text-cyan-200">{t('hero.panel.eyebrow')}</p>
                        <h2 className="mt-1 text-2xl font-extrabold text-white">{t('hero.panel.title')}</h2>
                    </div>
                    <div className="flex gap-2">
                        <span className="h-3 w-3 rounded-full bg-red-400" />
                        <span className="h-3 w-3 rounded-full bg-amber-300" />
                        <span className="h-3 w-3 rounded-full bg-emerald-400" />
                    </div>
                </div>
                <div className="space-y-4">
                    <div className="rounded-lg bg-white/10 p-4">
                        <div className="mb-2 flex items-center justify-between text-sm">
                            <span className="font-bold text-white">{t('hero.panel.scanLabel')}</span>
                            <span className="text-teal-200">98%</span>
                        </div>
                        <div className="h-2 overflow-hidden rounded-full bg-white/10">
                            <motion.div
                                className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-teal-300"
                                initial={{ width: 0 }}
                                animate={{ width: '98%' }}
                                transition={{ duration: 1.2, delay: 0.9, ease: 'easeOut' }}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div className="rounded-lg border border-white/10 bg-white/10 p-4">
                            <Home size={26} className="mb-3 text-cyan-200" />
                            <p className="font-bold text-white">{t('hero.panel.homeRepair')}</p>
                            <p className="text-sm text-slate-300">{t('hero.panel.onSiteDiagnosis')}</p>
                        </div>
                        <div className="rounded-lg border border-white/10 bg-white/10 p-4">
                            <Store size={26} className="mb-3 text-teal-200" />
                            <p className="font-bold text-white">{t('hero.panel.businessSupport')}</p>
                            <p className="text-sm text-slate-300">{t('hero.panel.pcPrinterPosWifi')}</p>
                        </div>
                    </div>
                    <div className="rounded-lg border border-white/10 bg-[#07111f] p-4 font-mono text-sm text-slate-200">
                        <p><span className="text-teal-300">drtech@support</span>: scan --priority urgent</p>
                        <p className="mt-2 text-cyan-200">{t('hero.panel.statusLine')}</p>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}
