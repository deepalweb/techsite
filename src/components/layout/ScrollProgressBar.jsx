import { useEffect, useState } from 'react'

export default function ScrollProgressBar() {
    const [width, setWidth] = useState(0)

    useEffect(() => {
        function updateProgress() {
            const max = document.documentElement.scrollHeight - window.innerHeight
            setWidth(max > 0 ? (window.scrollY / max) * 100 : 0)
        }
        updateProgress()
        window.addEventListener('scroll', updateProgress, { passive: true })
        return () => window.removeEventListener('scroll', updateProgress)
    }, [])

    return (
        <div
            className="fixed left-0 top-0 z-[80] h-[3px] bg-gradient-to-r from-primary via-secondary to-accent"
            style={{ width: `${width}%`, boxShadow: '0 0 18px rgba(14, 165, 233, .65)' }}
        />
    )
}
