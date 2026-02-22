import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Download, Settings, CheckCircle, AlertCircle, Pause, Play, X, ChevronRight, Clock, Activity, Calendar } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { togglePause, approveRollout, cancelRollout, setSelectedRollout } from '../../store/slices/rolloutSlice';
import { useUI } from '../../context/UIContext';
import Typography from '../atoms/Typography';
import Badge from '../atoms/Badge';
import Button from '../atoms/Button';

export default function RolloutMonitor({ rollouts, userRole }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { showAlert } = useUI();
  const [showFailures, setShowFailures] = useState(null);

  const handlePause = (id, currentStatus) => {
    const action = currentStatus === 'Paused' ? 'Resume' : 'Pause';
    showAlert({
      type: 'warning',
      title: `${action} Rollout?`,
      message: `Are you sure you want to ${action.toLowerCase()} this propagation process? This may affect device sync windows.`,
      confirmLabel: `Yes, ${action}`,
      showCancel: true,
      onConfirm: () => dispatch(togglePause(id))
    });
  };

  const handleCancel = (id) => {
    showAlert({
      type: 'error',
      title: 'Cancel Rollout?',
      message: 'This will permanently terminate the update rollout. Some devices may remain in a partial state.',
      confirmLabel: 'Delete & Abort',
      showCancel: true,
      onConfirm: () => dispatch(cancelRollout(id))
    });
  };

  return (
    <div className="space-y-10">
      <div className="flex justify-between items-end">
        <div>
          <h3 className="text-sm font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em] mb-2">Live Propagation</h3>
          <p className="text-2xl font-black text-slate-800 dark:text-white tracking-tight">Active Fleet Rollouts</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8">
        <AnimatePresence mode="popLayout">
          {rollouts.map((rollout) => (
            <motion.div
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              key={rollout.id}
              className={cn(
                "bg-white dark:bg-slate-900 rounded-[2rem] p-8 md:p-12 shadow-sm border border-slate-100 dark:border-slate-800 relative group transition-all duration-500",
                rollout.status === 'Paused' && "border-amber-200 bg-amber-50/10",
                rollout.status === 'Pending Approval' && "border-indigo-100 bg-indigo-50/10 dark:bg-indigo-500/5 shadow-lg shadow-indigo-500/5"
              )}
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-16">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 rounded-2xl bg-ms-green/5 flex items-center justify-center text-ms-green border border-ms-green/10">
                    <Activity size={32} />
                  </div>
                  <div>
                    <div className="flex items-center gap-4 mb-1.5">
                      <h4 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">{rollout.name}</h4>
                      <Badge variant={
                        rollout.status === 'Active' ? 'success' : 
                        rollout.status === 'Pending Approval' ? 'info' : 'warning'
                      } className={cn(rollout.status === 'Pending Approval' && "animate-pulse")}>
                        {rollout.status}
                      </Badge>
                    </div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-3">
                       {rollout.id} <span className="w-1.5 h-1.5 bg-slate-200 rounded-full" /> {rollout.toVersion}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  {rollout.status === 'Pending Approval' && (
                    <Button 
                      variant="primary"
                      disabled={userRole !== 'admin'}
                      onClick={userRole === 'admin' ? () => {
                        showAlert({
                          type: 'warning',
                          title: 'Approve Mandatory Update?',
                          message: 'This rollout affects critical infrastructure (>1000 nodes). Do you authorize global propagation?',
                          confirmLabel: 'Approve & Release',
                          showCancel: true,
                          onConfirm: () => dispatch(approveRollout(rollout.id))
                        });
                      } : undefined}
                      className={cn("px-8 py-4 !rounded-2xl bg-ms-green border-ms-green", userRole !== 'admin' && "opacity-40 grayscale")}
                      title={userRole !== 'admin' ? "Administrator account required for authorization" : ""}
                    >
                      Authorize Rollout
                    </Button>
                  )}
                  <button 
                    onClick={() => handlePause(rollout.id, rollout.status)} 
                    disabled={rollout.status === 'Pending Approval' || userRole === 'analyst'}
                    className={cn(
                      "p-4 rounded-2xl bg-slate-50 hover:bg-slate-100 text-slate-600 transition-all border border-slate-100",
                      (rollout.status === 'Pending Approval' || userRole === 'analyst') && "opacity-30 cursor-not-allowed"
                    )}
                    title={
                      userRole === 'analyst' ? "Analyst account: Read-only access" :
                      rollout.status === 'Pending Approval' ? "Actions restricted until approval" : ""
                    }
                  >
                    {rollout.status === 'Paused' ? <Play size={20} fill="currentColor" /> : <Pause size={20} />}
                  </button>
                  <button 
                    onClick={() => handleCancel(rollout.id)} 
                    disabled={rollout.status === 'Pending Approval' || userRole === 'analyst'}
                    className={cn(
                      "p-4 rounded-2xl bg-rose-50 hover:bg-rose-100 text-rose-600 transition-all border border-rose-100",
                      (rollout.status === 'Pending Approval' || userRole === 'analyst') && "opacity-30 cursor-not-allowed"
                    )}
                    title={
                      userRole === 'analyst' ? "Analyst account: Read-only access" :
                      rollout.status === 'Pending Approval' ? "Actions restricted until approval" : ""
                    }
                  >
                    <X size={20} />
                  </button>
                  <button onClick={() => dispatch(setSelectedRollout(rollout))} className="px-8 py-4 rounded-2xl bg-slate-900 hover:bg-black text-white font-black text-[10px] uppercase tracking-widest transition-all shadow-xl shadow-slate-900/10">
                    Analytics Dashboard
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-16">
                <StageItem icon={Calendar} label="Scheduled" value={rollout.stages.scheduled} active={true} />
                <StageItem icon={Bell} label="Notified" value={rollout.stages.notified} active={rollout.progress > 0} />
                <StageItem icon={Download} label="Downloading" value={rollout.stages.downloading} active={rollout.progress > 20} />
                <StageItem icon={Settings} label="Installing" value={rollout.stages.installing} active={rollout.progress > 50} />
                <StageItem icon={CheckCircle} label="Completed" value={rollout.stages.completed} active={rollout.progress === 100} />
                <StageItem 
                  icon={AlertCircle} 
                  label="Failed" 
                  value={rollout.stages.failed} 
                  error={rollout.stages.failed > 0} 
                  onClick={() => setShowFailures(rollout.id === showFailures ? null : rollout.id)}
                />
              </div>

              <AnimatePresence>
                {showFailures === rollout.id && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden mb-12 border-t border-slate-50 pt-8"
                  >
                    <div className="flex justify-between items-center mb-6">
                       <h5 className="text-[10px] font-black text-rose-500 uppercase tracking-widest">Failure Diagnostics</h5>
                       <button onClick={() => setShowFailures(null)} className="text-slate-400 hover:text-slate-900"><X size={16} /></button>
                    </div>
                    <div className="space-y-3">
                       {[
                         { id: 'DEV-2841', error: 'IO Timeout during APK download', icon: AlertCircle },
                         { id: 'DEV-1092', error: 'Signature Verification Failed', icon: AlertCircle },
                         { id: 'DEV-7732', error: 'Insufficient Disk Space (45MB remaining)', icon: AlertCircle },
                       ].map(err => (
                         <div key={err.id} className="flex items-center justify-between p-4 bg-rose-50/50 rounded-xl border border-rose-100">
                           <div className="flex items-center gap-3">
                              <err.icon size={16} className="text-rose-500" />
                              <span className="text-xs font-black text-slate-800">{err.id}</span>
                           </div>
                           <span className="text-[10px] font-bold text-rose-600/70">{err.error}</span>
                         </div>
                       ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="space-y-6">
                <div className="flex justify-between items-end">
                   <div>
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Fleet Convergence</p>
                     <p className="text-3xl font-black text-slate-900 dark:text-white">{rollout.progress}%</p>
                   </div>
                   <div className="text-right">
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Est. Remaining</p>
                     <p className="text-sm font-black text-slate-700 dark:text-slate-400">02h 14m</p>
                   </div>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800/50 h-4 rounded-full p-1 border border-slate-100 dark:border-slate-800">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${rollout.progress}%` }}
                    className="h-full rounded-full bg-gradient-to-r from-ms-green to-emerald-400 shadow-lg shadow-ms-green/20"
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

function StageItem({ icon: Icon, label, value, active, error, onClick }) {
  return (
    <button 
      onClick={onClick}
      disabled={!onClick}
      className={cn(
        "p-6 rounded-[1.5rem] border text-left transition-all group flex flex-col gap-4 active:scale-95",
        active ? "bg-white dark:bg-slate-800 border-ms-green/20 dark:border-ms-green/40 shadow-sm" : 
        error ? "bg-rose-50 border-rose-100 text-rose-600" :
        "bg-slate-50 dark:bg-slate-800/50 border-slate-100 dark:border-slate-800 opacity-60"
      )}
    >
      <div className={cn(
        "p-2 rounded-lg w-fit",
        active ? "bg-ms-green text-white" : error ? "bg-rose-500 text-white" : "bg-slate-100 dark:bg-slate-900 text-slate-400"
      )}>
        <Icon size={16} />
      </div>
      <div>
        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-0.5">{label}</p>
        <p className={cn("text-lg font-black", active ? "text-slate-900 dark:text-white" : error ? "text-rose-600" : "text-slate-300")}>
          {value.toLocaleString()}
        </p>
      </div>
    </button>
  );
}
