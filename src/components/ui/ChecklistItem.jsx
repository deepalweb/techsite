export default function ChecklistItem({ children, tone = 'plain' }) {
    if (tone === 'plain') {
        return <div className="rounded-lg bg-slate-50 p-3 font-bold text-ink">{children}</div>
    }
    if (tone === 'panel') {
        return (
            <div className="rounded-lg border border-slate-200 bg-white p-4 text-sm font-bold text-ink">
                {children}
            </div>
        )
    }
    return <p className="text-slate-200">{children}</p>
}
