import { Headset } from 'lucide-react'

export default function MobileMenu({ open, navItems, onNavigate, t }) {
    return (
        <div
            id="mobileMenu"
            aria-hidden={!open}
            inert={!open ? '' : undefined}
            className={`mobile-panel absolute left-4 right-4 top-20 rounded-2xl border border-slate-200 bg-white p-4 shadow-2xl transition xl:hidden ${
                open ? 'visible pointer-events-auto opacity-100' : 'invisible pointer-events-none -translate-y-3 opacity-0'
            }`}
        >
            {navItems.map((item) => (
                <a
                    key={item.href}
                    href={item.href}
                    onClick={onNavigate}
                    className="block rounded-xl px-4 py-3 font-bold text-slate-700"
                >
                    {item.label}
                </a>
            ))}
            <a
                href="#contact"
                onClick={onNavigate}
                className="mt-2 flex items-center justify-center gap-2 rounded-full bg-ink px-5 py-3 font-extrabold text-white"
            >
                <Headset size={18} />
                {t('nav.cta')}
            </a>
        </div>
    )
}
