import RevealOnScroll from './RevealOnScroll.jsx'

export default function SectionHeading({ eyebrow, title, subtitle, subtitle2, light = false, className = '' }) {
    return (
        <RevealOnScroll className={`mb-12 max-w-4xl ${className}`}>
            <p className={`mb-3 text-caption font-extrabold uppercase ${light ? 'text-teal-300' : 'text-primary'}`}>
                {eyebrow}
            </p>
            <h2 className={`text-h1 ${light ? 'text-white' : 'text-ink'}`}>{title}</h2>
            {subtitle && (
                <p className={`mt-4 text-body ${light ? 'text-slate-300' : 'text-steel'}`}>{subtitle}</p>
            )}
            {subtitle2 && (
                <p className={`mt-3 text-body ${light ? 'text-slate-300' : 'text-steel'}`}>{subtitle2}</p>
            )}
        </RevealOnScroll>
    )
}
