import { cn } from "../../lib/utils";
import { motion } from "framer-motion";
import { memo } from "react";
const Button = memo(({ children, onClick, variant = 'primary', size = 'md',className,disabled = false,type = "button",ariaLabel}) => {
  const variants = {
    primary: "bg-ms-green text-white shadow-ms-green/20 hover:bg-ms-green-dark border-transparent",
    secondary: "bg-white dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800",
    outline: "bg-transparent border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800",
    ghost: "bg-transparent text-slate-500 dark:text-slate-400 hover:text-ms-green dark:hover:text-ms-green hover:bg-slate-50 dark:hover:bg-slate-800 border-transparent",
    danger: "bg-rose-500 text-white shadow-rose-500/20 hover:bg-rose-600 border-transparent",
    restricted: "bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed border border-transparent dark:border-slate-700"
  };
  const sizes = {
    sm: "px-4 py-2 text-[10px]",
    md: "px-6 py-3.5 text-xs",
    lg: "px-10 py-5 text-sm",
    icon: "p-3"
  };
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      aria-disabled={disabled}
      whileHover={!disabled ? { scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      className={cn(
        "rounded-full font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 border",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ms-green focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950",
        variants[variant],
        sizes[size],
        className
      )}
    >
      {children}
    </motion.button>
  );
});
Button.displayName = 'Button';
export default Button;
