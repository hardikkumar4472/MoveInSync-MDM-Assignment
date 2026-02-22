import { TabletSmartphone, CheckCircle, AlertTriangle, XCircle } from "lucide-react";
import { cn } from "../lib/utils";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
const KPICard = ({ title, value, subtext, icon: Icon, color, trend }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ y: -5 }}
    className="bg-white dark:bg-slate-900 rounded-2xl md:rounded-[2rem] p-5 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-slate-100 dark:border-slate-800 hover:border-ms-green/30 dark:hover:border-ms-green/30 transition-all relative overflow-hidden group"
  >
    <div className={cn("absolute top-0 right-0 w-32 h-32 md:w-48 md:h-48 -mr-8 -mt-8 md:-mr-12 md:-mt-12 rounded-full opacity-[0.03] dark:opacity-[0.07] blur-3xl transition-transform duration-700 group-hover:scale-150 group-hover:opacity-10 dark:group-hover:opacity-20", color)} />
    <div className="absolute inset-0 opacity-[0.01] dark:opacity-[0.02] pointer-events-none mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />

    <div className="flex justify-between items-start mb-4 md:mb-8">
      <div className={cn(
        "p-2.5 md:p-4 rounded-xl md:rounded-2xl relative transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg",
        color.includes('bg-ms-green') 
          ? "bg-ms-green/10 text-ms-green dark:bg-ms-green/20" 
          : cn(color.replace('bg-', 'bg-opacity-10 text-'), "dark:bg-opacity-20")
      )}>
        <Icon className="w-5 h-5 md:w-6 md:h-6 relative z-10" />
        <div className={cn("absolute inset-0 rounded-2xl blur-lg opacity-0 group-hover:opacity-40 transition-opacity", color)} />
      </div>
      
      {trend && (
        <span className={cn(
          "text-[10px] font-black uppercase tracking-[0.15em] px-3 py-1.5 rounded-full border transition-colors",
          trend > 0 
            ? "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-100/50 dark:border-emerald-500/20" 
            : "bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-100/50 dark:border-rose-500/20"
        )}>
          {trend > 0 ? "+" : ""}{trend}%
        </span>
      )}
    </div>

    <div className="relative z-10">
      <h3 className="text-slate-400 dark:text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mb-1.5 md:mb-2">{title}</h3>
      <div className="flex flex-col sm:flex-row items-baseline gap-1 md:gap-3">
        <span className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tighter leading-tight py-1">{value}</span>
        {subtext && (
          <span className="text-slate-400 dark:text-slate-500 text-[9px] md:text-[10px] font-bold uppercase tracking-widest bg-slate-50 dark:bg-slate-800/50 px-1.5 md:px-2 py-0.5 md:py-1 rounded-md border border-slate-100 dark:border-slate-800">
            {subtext}
          </span>
        )}
      </div>
    </div>
    <div className={cn("absolute bottom-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-500", color)} />
  </motion.div>
);

export default function KPICards({ data }) {
  const { t } = useTranslation();
  const totalSteps = data.length;
  const upToDate = data.filter(d => d.status === "Up-to-date").length;
  const outdated = data.filter(d => d.status === "Outdated").length;
  const failed = data.filter(d => d.status === "Failed").length;
  const inactive = data.filter(d => d.lastSeenDays > 7).length;
  const upToDatePercent = Math.round((upToDate / totalSteps) * 100);
  return (
    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      <KPICard 
        title={t('stats.totalDevices')} 
        value={totalSteps.toLocaleString()} 
        icon={TabletSmartphone} 
        color="bg-indigo-500"
      />
      <KPICard 
        title={t('stats.fleetCompliance')} 
        value={`${upToDatePercent}%`} 
        subtext={`${upToDate} / ${totalSteps}`}
        icon={CheckCircle} 
        color="bg-ms-green"
      />
      <KPICard 
        title={t('stats.inactiveAssets')} 
        value={inactive} 
        subtext="Seen > 7d"
        icon={AlertTriangle} 
        color="bg-amber-500"
      />
      <KPICard 
        title={t('stats.updateFailures')} 
        value={failed} 
        subtext="In Queue"
        icon={XCircle} 
        color="bg-rose-500"
      />
    </div>
  );
}
