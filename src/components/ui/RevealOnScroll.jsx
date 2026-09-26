import { motion, useReducedMotion } from 'framer-motion';
export default function RevealOnScroll({
  children,
  index,
  className = "",
  as: Component = "div",
  ...rest
}) {
  const reduced = useReducedMotion();
  const Animated = motion[Component];
  return (
    <Animated initial={reduced ? false : { opacity: 0, y: 24 }} whileInView={{opacity: 1, y: 0}} viewport={{once: true, amount: .08}} transition={{duration: .45, delay: Math.min(index || 0, 3) * .06}} className={className} {...rest}>
      {children}
    </Animated>
  );
}
