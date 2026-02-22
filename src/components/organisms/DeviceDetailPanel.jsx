import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { X, Smartphone, Cpu, Hash, MapPin, Calendar, ShieldCheck, History, Activity, CheckCircle2, Clock, ArrowRight, AlertCircle, Download, Bell, Settings } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { cn } from '../../lib/utils';
import { selectSelectedDevice, setSelectedDevice } from '../../store/slices/deviceSlice';
import Typography from '../atoms/Typography';
import Button from '../atoms/Button';
import Badge from '../atoms/Badge';

import AuditTimeline from '../molecules/AuditTimeline';

export default function DeviceDetailPanel() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const device = useSelector(selectSelectedDevice);
  const onClose = () => dispatch(setSelectedDevice(null));
  useEffect(() => {
    if (device) {
      window.history.pushState({ type: 'deviceDetail' }, '');
      
      const handlePopState = () => {
        onClose();
      };

      window.addEventListener('popstate', handlePopState);
      return () => window.removeEventListener('popstate', handlePopState);
    }
  }, [device]);

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
          {/* Header */}
          <div className="p-6 md:p-8 border-b border-slate-50 dark:border-slate-800 flex justify-between items-center shrink-0 bg-white dark:bg-slate-900">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-ms-green/10 flex items-center justify-center text-ms-green border border-ms-green/10">
                <Smartphone size={24} />
              </div>
              <div>
                <Typography variant="h4" className="text-xl">{device.id}</Typography>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-0.5">{device.model}</p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="p-3 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl text-slate-400 dark:text-slate-500 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar space-y-10">
            {/* Metadata Grid */}
            <div className="grid grid-cols-2 gap-4">
               <MetadataCard icon={ShieldCheck} label="Compliance" value={device.compliance || 'Unknown'}>
                  <Badge variant={device.compliance === 'compliant' ? 'success' : device.compliance === 'outdated' ? 'warning' : 'danger'}>
                    {device.compliance}
                  </Badge>
               </MetadataCard>
               <MetadataCard icon={MapPin} label={t('inventory.region')} value={device.region} />
               <MetadataCard icon={Cpu} label={t('inventory.appCore')} value={device.appVersion} />
               <MetadataCard icon={Clock} label={t('detail.lastSeen')} value={device.lastSeen} />
            </div>

            {/* Static Specs Section */}
            <section>
              <h3 className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.25em] mb-6 flex items-center gap-3">
                <div className="w-1 h-3 bg-ms-green rounded-full" />
                Hardware Specifications
              </h3>
              <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-8 border border-slate-100 dark:border-slate-800 space-y-6">
                <DetailRow label="Asset IMEI" value={device.imei} />
                <DetailRow label="OS Version" value={device.os} />
                <DetailRow label="Device Model" value={device.model} />
                <DetailRow label="Storage" value={device.disk || "64GB / 128GB"} />
                <DetailRow label="Battery Health" value={device.battery || "94%"} />
              </div>
            </section>

            {/* Audit History Timeline */}
            <section>
              <h3 className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.25em] mb-6 flex items-center gap-3">
                <div className="w-1 h-3 bg-ms-green rounded-full" />
                {t('detail.updateHistory')}
              </h3>
              <AuditTimeline 
                history={device.auditHistory} 
                emptyMessage="No historical deployment logs for this asset" 
              />
            </section>
          </div>
          
          <div className="p-8 border-t border-slate-50 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-800/30 flex gap-4 shrink-0">
            <Button variant="primary" className="flex-1 py-5" size="lg">
               Initiate Remote Wipe
            </Button>
            <Button variant="outline" className="px-6 border-slate-200" onClick={onClose}>
               Close
            </Button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

function MetadataCard({ icon: Icon, label, value, children, color = "text-slate-900 dark:text-white" }) {
  return (
    <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 p-6 rounded-2xl hover:bg-white dark:hover:bg-slate-800 transition-all group">
      <div className="flex justify-between items-start mb-4">
        <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 text-slate-400 group-hover:text-ms-green transition-colors">
          <Icon size={18} />
        </div>
        {children}
      </div>
      <p className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1">{label}</p>
      <p className={cn("text-sm font-bold tracking-tight", color)}>{value}</p>
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

