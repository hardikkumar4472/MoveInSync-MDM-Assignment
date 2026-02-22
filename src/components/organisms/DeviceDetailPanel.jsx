import { motion, AnimatePresence } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { X, Smartphone, Cpu, Hash, MapPin, Calendar, ShieldCheck, History,Activity,CheckCircle2,Clock,ArrowRight} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { selectSelectedDevice, setSelectedDevice } from '../../store/slices/deviceSlice';
import Typography from '../atoms/Typography';
import Button from '../atoms/Button';
export default function DeviceDetailPanel() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const device = useSelector(selectSelectedDevice);
  const onClose = () => dispatch(setSelectedDevice(null));
  if (!device) return null;
  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex justify-end">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-900/40 dark:bg-slate-950/60 backdrop-blur-md"
        />
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="relative w-full md:max-w-2xl bg-white dark:bg-slate-900 h-full shadow-2xl flex flex-col transition-colors duration-300"
        >
          <div className="p-6 md:p-8 border-b border-slate-50 dark:border-slate-800 flex justify-between items-center shrink-0">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-ms-green/10 flex items-center justify-center text-ms-green border border-ms-green/10">
                <Smartphone size={20} className="md:hidden" />
                <Smartphone size={24} className="hidden md:block" />
              </div>
              <div>
                <Typography variant="h4" className="text-lg md:text-xl">{device.id}</Typography>
                <div className="flex items-center gap-2 mt-0.5 md:mt-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <Typography variant="overline" className="text-slate-400 dark:text-slate-500">Active Heartbeat</Typography>
                </div>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="p-2 md:p-3 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg md:rounded-xl text-slate-400 dark:text-slate-500 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar space-y-10 md:space-y-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
               <MetadataCard icon={ShieldCheck} label={t('detail.status')} value={device.status} color="text-ms-green" />
               <MetadataCard icon={MapPin} label={t('inventory.region')} value={device.region} />
               <MetadataCard icon={Cpu} label={t('inventory.appCore')} value={device.appVersion} />
               <MetadataCard icon={Clock} label={t('detail.lastSeen')} value={device.lastSeen} />
            </div>
            <section>
              <h3 className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.25em] mb-6 flex items-center gap-3">
                <div className="w-1 h-3 bg-ms-green rounded-full" />
                {t('detail.title')}
              </h3>
              <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl md:rounded-2xl p-6 md:p-8 border border-slate-100 dark:border-slate-800 space-y-6">
                <DetailRow label="IMEI / Asset Tag" value={device.imei} />
                <DetailRow label="Operating System" value={device.os} />
                <DetailRow label="Security Patch" value="Level 4 (Jan 2026)" />
                <DetailRow label="Hardware Profile" value="MoveInSync MDM-X1" />
              </div>
            </section>
            <section>
              <h3 className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.25em] mb-6 flex items-center gap-3">
                <div className="w-1 h-3 bg-ms-green rounded-full" />
                {t('detail.updateHistory')}
              </h3>
              <div className="space-y-4">
                <TimelineItem 
                  version="v2.4.0-STABLE" 
                  date="Today, 02:45 AM" 
                  status="Successful" 
                  current 
                />
                <TimelineItem 
                  version="v2.3.5-HOTFIX" 
                  date="Feb 12, 2026" 
                  status="Legacy Build" 
                />
                <TimelineItem 
                  version="v2.3.0-STABLE" 
                  date="Jan 28, 2026" 
                  status="Legacy Build" 
                />
              </div>
            </section>
          </div>
          <div className="p-6 md:p-8 border-t border-slate-50 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 flex gap-4 shrink-0">
            <Button variant="primary" className="flex-1 py-5" size="lg">
               Remote Diagnostics
            </Button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
function MetadataCard({ icon: Icon, label, value, color = "text-slate-900 dark:text-white" }) {
  return (
    <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 p-4 md:p-6 rounded-xl md:rounded-2xl hover:bg-white dark:hover:bg-slate-800 transition-colors group">
      <div className="p-2 md:p-2.5 bg-white dark:bg-slate-900 rounded-lg md:rounded-xl border border-slate-100 dark:border-slate-800 w-fit text-slate-400 dark:text-slate-600 group-hover:text-ms-green transition-colors mb-3">
        <Icon size={16} className="md:hidden" />
        <Icon size={18} className="hidden md:block" />
      </div>
      <p className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1">{label}</p>
      <p className={cn("text-xs md:text-sm font-bold tracking-tight", color)}>{value}</p>
    </div>
  );
}
function DetailRow({ label, value }) {
  return (
    <div className="flex justify-between items-center py-1">
      <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">{label}</span>
      <span className="text-sm font-bold text-slate-800 dark:text-slate-200">{value}</span>
    </div>
  );
}
function TimelineItem({ version, date, status, current }) {
  return (
    <div className={cn(
      "flex items-start md:items-center gap-4 md:gap-6 p-4 md:p-5 rounded-lg md:rounded-xl border transition-all",
      current ? "bg-white dark:bg-slate-800 border-ms-green/20 dark:border-ms-green/40 shadow-md shadow-ms-green/5 ring-1 ring-ms-green" : "bg-slate-50/50 dark:bg-slate-800/30 border-slate-100 dark:border-slate-800"
    )}>
      <div className={cn(
        "w-9 h-9 md:w-10 md:h-10 rounded-lg md:rounded-xl flex items-center justify-center border shrink-0",
        current ? "bg-ms-green text-white border-ms-green" : "bg-white dark:bg-slate-900 text-slate-300 dark:text-slate-700 border-slate-100 dark:border-slate-800"
      )}>
        <CheckCircle2 size={16} className="md:hidden" />
        <CheckCircle2 size={18} className="hidden md:block" />
      </div>
      <div className="flex-1">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-1 gap-1">
          <p className="text-sm font-bold text-slate-900 dark:text-white">{version}</p>
          <p className="text-[8px] md:text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">{date}</p>
        </div>
        <div className="flex items-center gap-3">
           <span className={cn("text-[8px] md:text-[9px] font-black uppercase tracking-widest", current ? "text-ms-green" : "text-slate-400 dark:text-slate-600")}>{status}</span>
        </div>
      </div>
    </div>
  );
}
