// Keep content visible immediately; reserve entrance motion for the hero.
export default function RevealOnScroll({
  children,
  index,
  className = "",
  as: Component = "div",
  ...rest
}) {
  return (
    <Component className={className} {...rest}>
      {children}
    </Component>
  );
}
