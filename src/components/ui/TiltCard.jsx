import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion'

export default function TiltCard({ children, className = '', ...rest }) {
    const reduceMotion = useReducedMotion()
    const x = useMotionValue(0.5)
    const y = useMotionValue(0.5)
    const springX = useSpring(x, { stiffness: 220, damping: 22 })
    const springY = useSpring(y, { stiffness: 220, damping: 22 })
    const rotateX = useTransform(springY, [0, 1], [4, -4])
    const rotateY = useTransform(springX, [0, 1], [-4, 4])

    function handlePointerMove(event) {
        if (reduceMotion || event.pointerType !== 'mouse') return
        const rect = event.currentTarget.getBoundingClientRect()
        x.set((event.clientX - rect.left) / rect.width)
        y.set((event.clientY - rect.top) / rect.height)
    }

    function handlePointerLeave() {
        x.set(0.5)
        y.set(0.5)
    }

    return (
        <motion.div
            className={className}
            style={reduceMotion ? undefined : { rotateX, rotateY, transformPerspective: 900 }}
            onPointerMove={handlePointerMove}
            onPointerLeave={handlePointerLeave}
            whileHover={reduceMotion ? undefined : { y: -3 }}
            transition={{ type: 'spring', stiffness: 260, damping: 24 }}
            {...rest}
        >
            {children}
        </motion.div>
    )
}
