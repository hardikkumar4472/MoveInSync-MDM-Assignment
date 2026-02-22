import { cn } from "../../lib/utils";
import { motion } from "framer-motion";
import Typography from "../atoms/Typography";
import Card from "./Card";
export default function KPICard({ title, value, subtext, icon: Icon, color, trend }) {
  return (
    <Card className="p-4 md:p-5 group">
      <div className={cn(
        "absolute top-0 right-0 w-32 h-32 md:w-48 md:h-48 -mr-8 -mt-8 md:-mr-12 md:-mt-12 rounded-full opacity-[0.03] dark:opacity-[0.07] blur-3xl transition-transform duration-700 group-hover:scale-150 group-hover:opacity-10 dark:group-hover:opacity-20", 
        color
      )} />
      <div className="absolute inset-0 opacity-[0.01] dark:opacity-[0.02] pointer-events-none mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
      <div className="flex justify-between items-start mb-3 md:mb-5 relative z-10">
        <div className={cn(
          "p-2.5 md:p-4 rounded-lg md:rounded-xl relative transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg",
          color.includes('bg-ms-green') 
            ? "bg-ms-green/10 text-ms-green dark:bg-ms-green/20" 
            : cn(color.replace('bg-', 'bg-opacity-10 text-'), "dark:bg-opacity-20")
        )}>
          <Icon className="w-5 h-5 md:w-6 md:h-6 relative z-10" />
          <div className={cn("absolute inset-0 rounded-xl blur-lg opacity-0 group-hover:opacity-40 transition-opacity", color)} />
        </div>
        
        {trend && (
          <span className={cn(
            "text-[10px] font-black uppercase tracking-[0.15em] px-3 py-1.5 rounded-lg border transition-colors",
            trend > 0 
              ? "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-100/50 dark:border-emerald-500/20" 
              : "bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-100/50 dark:border-rose-500/20"
          )}>
            {trend > 0 ? "+" : ""}{trend}%
          </span>
        )}
      </div>
      <div className="relative z-10">
        <Typography variant="label" className="mb-1.5 md:mb-2 uppercase tracking-[0.2em]">{title}</Typography>
        <div className="flex flex-col sm:flex-row items-baseline gap-1 md:gap-3">
          <Typography variant="kpi">{value}</Typography>
          {subtext && (
            <span className="text-slate-400 dark:text-slate-500 text-[9px] md:text-[10px] font-bold uppercase tracking-widest bg-slate-50 dark:bg-slate-800/50 px-1.5 md:px-2 py-0.5 md:py-1 rounded-md border border-slate-100 dark:border-slate-800">
              {subtext}
            </span>
          )}
        </div>
      </div>
      <div className={cn("absolute bottom-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-500", color)} />
    </Card>
  );
}
