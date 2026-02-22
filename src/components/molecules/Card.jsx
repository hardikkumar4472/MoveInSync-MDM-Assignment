import { cn } from "../../lib/utils";
import { motion } from "framer-motion";
import { memo } from "react";
const Card = memo(({ children, className, hoverable = true,animate = true }) => {
  const Component = animate ? motion.div : 'div';
  return (
    <Component
      initial={animate ? { opacity: 0, y: 30 } : undefined}
      whileInView={animate ? { opacity: 1, y: 0 } : undefined}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      whileHover={hoverable ? { y: -5 } : undefined}
      className={cn(
        "bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-xl md:rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm transition-all duration-300 relative overflow-hidden",
        hoverable && "hover:shadow-xl dark:hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)]",
        className
      )}
    >
      {children}
    </Component>
  );
});

Card.displayName = 'Card';

export default Card;
