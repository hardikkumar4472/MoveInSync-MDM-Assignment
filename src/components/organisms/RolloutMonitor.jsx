import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Download, Settings, CheckCircle, AlertCircle, Pause, Play, X,ChevronRight,Clock,Activity
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { togglePause, setSelectedRollout } from '../../store/slices/rolloutSlice';
export default function RolloutMonitor({ rollouts }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  return (
    <div className="space-y-10">
      <div className="flex justify-between items-end">
        <div>
          <h3 className="text-sm font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em] mb-2">{t('monitor.title')}</h3>
          <p className="text-2xl font-black text-slate-800 dark:text-white tracking-tight">{t('monitor.subtitle')}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-8">
        <AnimatePresence mode="popLayout">
          {rollouts.map((rollout) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.6 }}
              key={rollout.id}
              className={cn(
                "bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-xl md:rounded-2xl p-6 md:p-10 shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden relative group transition-all duration-500",
                rollout.status === 'Paused' && "opacity-80 grayscale-[0.5]"
              )}
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-12">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 rounded-2xl bg-ms-green/5 flex items-center justify-center text-ms-green border border-ms-green/10">
                    <Activity size={28} />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h4 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">{rollout.name}</h4>
                      <span className={cn(
                        "px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border",
                        rollout.status === 'Active' ? "bg-ms-green/10 text-ms-green border-ms-green/20 dark:border-ms-green/30" : "bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-100 dark:border-amber-500/20"
                      )}>
                        {rollout.status}
                      </span>
                    </div>
                    <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest flex items-center gap-2">
                       {rollout.id} <span className="w-1 h-1 bg-slate-200 dark:bg-slate-700 rounded-full" /> {rollout.version}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => dispatch(togglePause(rollout.id))}
                    className={cn(
                      "px-6 py-3 rounded-xl border font-bold text-[10px] uppercase tracking-widest transition-all flex items-center gap-2 cursor-pointer",
                      rollout.status === 'Paused' 
                        ? "bg-amber-50 border-amber-200 text-amber-600 hover:bg-amber-100" 
                        : "border-slate-100 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                    )}
                  >
                    {rollout.status === 'Paused' ? (
                      <><Play size={14} className="fill-current" /> Resume</>
                    ) : (
                      <><Pause size={14} /> Pause</>
                    )}
                  </button>
                  <button 
                    onClick={() => dispatch(setSelectedRollout(rollout))}
                    className="px-6 py-3 rounded-xl bg-ms-green text-white font-bold text-[10px] uppercase tracking-widest shadow-lg shadow-ms-green/20 hover:scale-105 transition-all flex items-center gap-2 cursor-pointer focus:ring-2 focus:ring-ms-green focus:ring-offset-2"
                  >
                    Details
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-6 relative mb-12">
                <StageCard 
                  icon={Bell} 
                  label={t('monitor.notified')} 
                  value={rollout.stages.notified} 
                  total={rollout.stages.scheduled} 
                  active={rollout.progress > 0}
                  color="ms-green"
                />
                <StageCard 
                  icon={Download} 
                  label={t('monitor.downloading')} 
                  value={rollout.stages.downloading} 
                  total={rollout.stages.scheduled} 
                  active={rollout.progress > 20}
                  color="ms-green"
                />
                <StageCard 
                  icon={Settings} 
                  label={t('monitor.installing')} 
                  value={rollout.stages.installing} 
                  total={rollout.stages.scheduled} 
                  active={rollout.progress > 60}
                  color="ms-green"
                />
                <StageCard 
                  icon={CheckCircle} 
                  label={t('monitor.completed')} 
                  value={rollout.stages.completed} 
                  total={rollout.stages.scheduled} 
                  active={rollout.progress === 100}
                  color="ms-green"
                />
                <StageCard 
                  icon={AlertCircle} 
                  label={t('monitor.failed')} 
                  value={rollout.stages.failed} 
                  total={rollout.stages.scheduled} 
                  error
                  color="rose"
                />
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-end">
                   <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Propagation Depth</p>
                   <p className="text-xl font-black text-slate-900 dark:text-white">{rollout.progress}%</p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800 h-3 rounded-full overflow-hidden border border-slate-100 dark:border-slate-700">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${rollout.progress}%` }}
                    className="h-full rounded-full bg-ms-green shadow-[0_0_15px_rgba(67,176,42,0.3)] transition-all duration-1000"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
function StageCard({ icon: Icon, label, value, total, active, error, color }) {
  return (
    <div className={cn(
      "p-6 rounded-2xl border transition-all flex flex-col gap-4 relative overflow-hidden",
      active ? `bg-${color}/5 border-${color}/20 dark:border-${color}/40` : error ? "bg-rose-50 dark:bg-rose-500/10 border-rose-100 dark:border-rose-500/20" : "bg-slate-50 dark:bg-slate-800 border-slate-100 dark:border-slate-700 opacity-60 dark:opacity-40"
    )}>
      <div className={cn(
        "p-3 rounded-xl w-fit border",
        active ? `bg-${color} text-white border-${color}` : error ? "bg-rose-500 text-white border-rose-500" : "bg-white dark:bg-slate-900 text-slate-300 dark:text-slate-700 border-slate-100 dark:border-slate-800"
      )}>
        <Icon size={20} />
      </div>
      <div>
        <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1">{label}</p>
        <div className="flex items-baseline gap-1.5">
          <span className={cn("text-xl font-bold", active ? "text-slate-900 dark:text-white" : error ? "text-rose-600 dark:text-rose-400" : "text-slate-400 dark:text-slate-600")}>{value}</span>
          <span className="text-[10px] font-bold text-slate-300 dark:text-slate-700 uppercase tracking-widest">/ {total}</span>
        </div>
      </div>
    </div>
  );
}
