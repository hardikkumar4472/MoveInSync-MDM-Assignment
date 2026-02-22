import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Activity, Server, Clock, Share2, Shield, Info } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { selectSelectedRollout, setSelectedRollout } from '../../store/slices/rolloutSlice';
import { cn } from '../../lib/utils';
import Typography from '../atoms/Typography';

export default function RolloutDetailPanel() {
  const dispatch = useDispatch();
  const rollout = useSelector(selectSelectedRollout);

  // Handle browser back button for mobile UX
  useEffect(() => {
    if (rollout) {
      window.history.pushState({ type: 'rolloutDetail' }, '');
      
      const handlePopState = () => {
        dispatch(setSelectedRollout(null));
      };

      window.addEventListener('popstate', handlePopState);
      return () => window.removeEventListener('popstate', handlePopState);
    }
  }, [rollout, dispatch]);
  return (
    <AnimatePresence>
      {rollout && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => dispatch(setSelectedRollout(null))}
            className="fixed inset-0 bg-slate-950/40 backdrop-blur-md z-[60]"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-xl bg-white dark:bg-slate-900 shadow-2xl z-[70] border-l border-slate-100 dark:border-slate-800 flex flex-col"
          >
            <div className="p-8 border-b border-slate-50 dark:border-slate-800 flex items-center justify-between bg-slate-50/30 dark:bg-slate-800/30">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-ms-green/10 flex items-center justify-center text-ms-green">
                  <Activity size={24} />
                </div>
                <div>
                  <Typography variant="h4">{rollout.name}</Typography>
                  <Typography variant="label" className="text-ms-green">{rollout.id}</Typography>
                </div>
              </div>
              <button
                onClick={() => dispatch(setSelectedRollout(null))}
                className="p-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-800 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all shadow-sm"
              >
                <X size={20} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-8 space-y-10 custom-scrollbar">
              <div className="grid grid-cols-2 gap-4">
                <DetailStat icon={Clock} label="Started" value={rollout.startTime || 'Scheduled'} />
                <DetailStat icon={Server} label="Fleet Region" value={rollout.region || 'Global Fleet'} />
                <DetailStat icon={Share2} label="Build ID" value={rollout.toVersion} />
                <DetailStat icon={Shield} label="Deployment Integrity" value="99.8%" />
              </div>
              <div className="space-y-6">
                <div className="flex items-center gap-2">
                   <Info size={16} className="text-slate-400" />
                   <Typography variant="label" className="text-slate-400">Node Status Distribution</Typography>
                </div>
                <div className="space-y-4">
                  <ProgressBar label="Completed" color="bg-ms-green" value={rollout.stages.completed} total={rollout.stages.scheduled} />
                  <ProgressBar label="In Progress" color="bg-indigo-500" value={rollout.stages.installing + rollout.stages.downloading} total={rollout.stages.scheduled} />
                  <ProgressBar label="Failed" color="bg-rose-500" value={rollout.stages.failed} total={rollout.stages.scheduled} />
                  <ProgressBar label="Pending" color="bg-slate-200" value={rollout.stages.scheduled - (rollout.stages.completed + rollout.stages.installing + rollout.stages.downloading + rollout.stages.failed)} total={rollout.stages.scheduled} />
                </div>
              </div>
              <div className="p-6 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                <Typography variant="label" className="mb-4 block">Deployment Strategy</Typography>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-slate-500">Rollout Type</span>
                    <span className="text-sm font-black text-slate-900 dark:text-white px-3 py-1 bg-white dark:bg-slate-700 rounded-lg shadow-sm">{rollout.type}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-slate-500">Auto-rollback</span>
                    <span className="text-sm font-black text-emerald-500">Enabled</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-8 border-t border-slate-100 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-800/30">
               <button 
                  onClick={() => dispatch(setSelectedRollout(null))}
                  className="w-full py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl hover:scale-[1.02] transition-all"
               >
                 Close Overview
               </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
function DetailStat({ icon: Icon, label, value }) {
  return (
    <div className="p-5 rounded-xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-800 shadow-sm">
      <div className="flex items-center gap-3 mb-3">
        <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-900 text-slate-400">
          <Icon size={16} />
        </div>
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{label}</span>
      </div>
      <p className="text-sm font-black text-slate-800 dark:text-white truncate">{value}</p>
    </div>
  );
}
function ProgressBar({ label, color, value, total }) {
  const percentage = Math.max(0, Math.min(100, (value / total) * 100));
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
        <span className="text-slate-500">{label}</span>
        <span className="text-slate-900 dark:text-white">{value.toLocaleString()} <span className="text-slate-400 font-medium">({Math.round(percentage)}%)</span></span>
      </div>
      <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
        <motion.div 
           initial={{ width: 0 }}
           animate={{ width: `${percentage}%` }}
           className={cn("h-full rounded-full transition-all duration-1000", color)} 
        />
      </div>
    </div>
  );
}
