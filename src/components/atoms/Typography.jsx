import { cn } from "../../lib/utils";
import { memo } from "react";
const Typography = memo(({ children, variant = 'body', className,as: Component = 'p'}) => {
  const variants = {
    h1: "font-display text-4xl md:text-6xl font-black tracking-tighter leading-tight italic text-slate-900 dark:text-white",
    h2: "font-display text-3xl md:text-[3rem] font-black tracking-tight text-slate-800 dark:text-white leading-tight italic",
    h3: "font-display text-2xl md:text-3xl font-bold tracking-tight text-slate-900 dark:text-white",
    h4: "font-display text-xl font-bold text-slate-900 dark:text-white tracking-tight",
    overline: "font-sans text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 dark:text-slate-500 leading-normal",
    label: "font-sans text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 leading-normal",
    body: "font-sans text-slate-500 dark:text-slate-400 font-medium text-base md:text-lg leading-relaxed",
    caption: "font-sans text-xs font-medium text-slate-600 dark:text-slate-400",
    kpi: "font-display text-3xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tighter leading-tight"
  };
  return (
    <Component className={cn(variants[variant], className)}>
      {children}
    </Component>
  );
});
Typography.displayName = 'Typography';
export default Typography;
