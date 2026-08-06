import { motion, useReducedMotion } from 'framer-motion'

export default function RevealOnScroll({ children, index = 0, className = '', as = 'div', ...rest }) {
    const reduceMotion = useReducedMotion()
    const Component = motion[as] ?? motion.div
    const delay = Math.min(index % 6, 5) * 0.07

    return (
        <Component
            className={className}
            initial={reduceMotion ? false : { opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
            {...rest}
        >
            {children}
        </Component>
    )
}
