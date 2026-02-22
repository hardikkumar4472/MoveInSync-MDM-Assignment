import { cn } from "../../lib/utils";
import { memo } from "react";
const Badge = memo(({ children, variant = 'default', className }) => {
  const variants = {
    default: "bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-slate-100 dark:border-slate-700",
    success: "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-100 dark:border-emerald-500/20",
    warning: "bg-amber-50 dark:bg-amber-500/10 text-amber-800 dark:text-amber-400 border-amber-100 dark:border-amber-500/20",
    danger: "bg-rose-50 dark:bg-rose-500/10 text-rose-700 dark:text-rose-400 border-rose-100 dark:border-rose-500/20",
    info: "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border-indigo-100 dark:border-indigo-500/20",
  };
  return (
    <span className={cn(
      "px-2.5 py-0.5 rounded-lg text-[10px] font-bold uppercase tracking-widest border shadow-sm transition-colors whitespace-nowrap",
      variants[variant],
      className
    )}>
      {children}
    </span>
  );
});
Badge.displayName = 'Badge';
export default Badge;
