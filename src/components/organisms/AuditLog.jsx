import { motion } from 'framer-motion';
import { History, User, Globe, Layout, ShieldAlert } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Typography from '../atoms/Typography';
import SectionHeader from '../molecules/SectionHeader';
const mockLogs = [
  { id: 1, user: 'Admin User', action: 'Update Scheduled', details: 'v2.4.0 to Bangalore Fleet', time: '2 mins ago', icon: Globe },
  { id: 2, user: 'Ops ', action: 'Rollout Paused', details: 'Emergency Fix (ROLL-883)', time: '15 mins ago', icon: ShieldAlert },
  { id: 3, user: 'Analyst One', action: 'Exported Inventory', details: 'CSV Generation', time: '1 hour ago', icon: Layout },
  { id: 4, user: 'Admin User', action: 'Asset Registered', details: 'DEV-1089 (Mumbai)', time: '3 hours ago', icon: User },
];
export default function AuditLog() {
  const { t } = useTranslation();
  return (
    <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-[2.5rem] p-8 md:p-12 border border-slate-100 dark:border-slate-800 shadow-sm transition-colors duration-300">
      <SectionHeader 
        title={t('audit.title')}
        subtitle={t('audit.subtitle')}
        icon={History}
        iconColor="bg-slate-900 dark:bg-ms-green"
      />
      <div className="space-y-6">
        {mockLogs.map((log, i) => (
          <motion.div 
            layout
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            key={log.id} 
            className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8 p-4 md:p-6 hover:bg-slate-50/50 dark:hover:bg-slate-800/50 rounded-2xl md:rounded-3xl transition-all border border-transparent hover:border-slate-100 dark:hover:border-slate-700 group cursor-default"
          >
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400 dark:text-slate-600 group-hover:bg-white dark:group-hover:bg-slate-800 group-hover:shadow-md group-hover:text-ms-green transition-all border border-transparent group-hover:border-slate-100 dark:group-hover:border-slate-700 shrink-0">
              <log.icon size={20} className="md:hidden" />
              <log.icon size={22} className="hidden md:block" />
            </div>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:flex-1">
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                  <Typography variant="h4" as="span" className="text-sm">{log.user}</Typography>
                  <span className="w-1 h-1 bg-slate-200 dark:bg-slate-700 rounded-full hidden sm:block" />
                  <span className="text-[10px] font-black text-ms-green uppercase tracking-widest bg-ms-green/5 dark:bg-ms-green/10 px-2 py-1 rounded-lg border border-ms-green/10 dark:border-ms-green/20 shrink-0">{log.action}</span>
                </div>
                <Typography variant="caption" className="mt-2 text-slate-500 dark:text-slate-400 font-medium">{log.details}</Typography>
              </div>
              <Typography variant="label" className="bg-slate-50 dark:bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-100 dark:border-slate-700 w-fit">{log.time}</Typography>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
