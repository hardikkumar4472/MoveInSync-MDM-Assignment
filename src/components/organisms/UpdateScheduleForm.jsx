import { useState } from 'react';
import { CheckCircle, ChevronRight, ChevronLeft, AlertCircle, Layers, MapPin, Settings, Clock,ShieldCheck,AlertTriangle,X
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { versions, regions } from '../../data/mockData';
import { useTranslation } from 'react-i18next';
import { useUI } from '../../context/UIContext';
import Typography from '../atoms/Typography';
import Button from '../atoms/Button';
import SectionHeader from '../molecules/SectionHeader';
export default function UpdateScheduleForm({ onSubmit, onCancel, userRole = 'admin' }) {
  const { t } = useTranslation();
  const { showAlert } = useUI();
  const [isPendingApproval, setIsPendingApproval] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fromVersion: versions[1] || 'v2.3.6',
    toVersion: versions[0] || 'v2.4.0',
    region: 'All',
    deviceGroup: '',
    customTag: '',
    rolloutType: 'Immediate'
  });
  const [errors, setErrors] = useState({});
  const nextStep = () => {
    if (step === 1 && formData.fromVersion === formData.toVersion) {
      setErrors({ version: "Source and target versions cannot be identical." });
      return;
    }
    setErrors({});
    setStep(s => Math.min(s + 1, 4));
  };
  const prevStep = () => setStep(s => Math.max(s - 1, 1));
  const steps = [
    { title: t('schedule.selection'), icon: Layers },
    { title: t('schedule.targeting'), icon: MapPin },
    { title: t('schedule.configuration'), icon: Settings },
    { title: t('schedule.deployment'), icon: CheckCircle },
  ];
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden w-full transition-colors duration-300">
      <div className="bg-white dark:bg-slate-900 px-6 md:px-12 py-10 md:py-14 text-slate-900 dark:text-white relative overflow-hidden border-b border-slate-50 dark:border-slate-800">
        <SectionHeader 
          title={t('schedule.title')}
          subtitle={t('schedule.subtitle')}
          className="border-none mb-0 pb-0"
          rightElement={
            <Button variant="secondary" size="sm" onClick={onCancel} className="hidden md:flex">
               Cancel
            </Button>
          }
        />
        <div className="flex justify-between mt-12 md:mt-16 relative z-10 gap-2 md:gap-4 overflow-x-auto no-scrollbar py-2" role="progressbar" aria-valuenow={step} aria-valuemin="1" aria-valuemax="4">
          {steps.map((s, i) => (
            <div key={i} className="flex flex-col items-center gap-3 group shrink-0" aria-current={step === i + 1 ? "step" : undefined}>
              <div className={cn(
                "w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl flex items-center justify-center transition-all duration-500 border-2",
                step === i + 1 ? "bg-ms-green border-ms-green text-white shadow-xl shadow-ms-green/20 scale-110" : 
                step > i + 1 ? "bg-emerald-50 dark:bg-emerald-500/10 border-emerald-100 dark:border-emerald-500/20 text-ms-green" : "bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 text-slate-200 dark:text-slate-800"
              )}>
                {step > i + 1 ? <CheckCircle size={20} aria-hidden="true" /> : <s.icon size={20} aria-hidden="true" />}
              </div>
              <Typography variant="label" className={cn(
                "transition-colors text-center",
                step === i + 1 ? "text-ms-green" : "text-slate-400"
              )}>{s.title}</Typography>
            </div>
          ))}
          <div className="absolute top-5 md:top-7 left-12 right-12 h-[2px] bg-slate-50 dark:bg-slate-800 -z-10 hidden md:block" />
          <motion.div 
            className="absolute top-5 md:top-7 left-12 h-[2px] bg-ms-green/30 -z-10 hidden md:block"
            initial={{ width: "0%" }}
            animate={{ width: `${(step - 1) * 33.3}%` }}
          />
        </div>
        <div className="absolute top-0 right-0 w-80 h-80 bg-ms-green/5 rounded-full -mr-40 -mt-40 blur-[100px]" />
      </div>
      <div className="p-6 md:p-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            className="min-h-[300px] md:min-h-[350px]"
          >
            {step === 1 && (
              <div className="space-y-8 md:space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
                  <div className="space-y-3">
                    <label htmlFor="fromVersion" className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1">Current Version Baseline</label>
                    <select 
                      id="fromVersion"
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl p-4 md:p-5 focus:ring-1 focus:ring-ms-green outline-none transition-all font-bold text-slate-700 dark:text-slate-300 text-sm md:text-base appearance-none"
                      value={formData.fromVersion}
                      onChange={(e) => setFormData({...formData, fromVersion: e.target.value})}
                    >
                      {versions.map(v => <option key={v} value={v}>{v}</option>)}
                    </select>
                  </div>
                  <div className="space-y-3">
                    <label htmlFor="toVersion" className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1">Target Version Build</label>
                    <select 
                      id="toVersion"
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl p-4 md:p-5 focus:ring-1 focus:ring-ms-green outline-none transition-all font-bold text-slate-700 dark:text-slate-300 text-sm md:text-base appearance-none"
                      value={formData.toVersion}
                      onChange={(e) => setFormData({...formData, toVersion: e.target.value})}
                    >
                      {versions.map(v => <option key={v} value={v}>{v}</option>)}
                    </select>
                  </div>
                </div>
                {errors.version && (
                   <div role="alert" className="bg-rose-50 dark:bg-rose-500/10 border border-rose-100 dark:border-rose-500/20 p-5 rounded-2xl flex items-center gap-4 text-rose-600 dark:text-rose-400 animate-in fade-in slide-in-from-top-2">
                    <AlertCircle size={20} aria-hidden="true" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">{errors.version}</span>
                   </div>
                )}
                <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-8 flex items-start gap-5 border border-slate-100 dark:border-slate-800 transition-colors duration-300">
                  <div className="p-3 bg-white dark:bg-slate-900 rounded-xl text-ms-green shadow-sm border border-slate-100 dark:border-slate-800 transition-colors duration-300">
                    <ShieldCheck size={24} aria-hidden="true" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 dark:text-white text-sm">Automated Integrity Verification</h4>
                    <p className="text-slate-500 dark:text-slate-400 text-[10px] mt-1 uppercase tracking-widest font-black">Ready for Deployment</p>
                  </div>
                </div>
              </div>
            )}
            {step === 2 && (
              <div className="space-y-10">
                 <div className="space-y-3">
                  <label htmlFor="operationalRegion" className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1">Operational Region Cluster</label>
                  <select 
                    id="operationalRegion"
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl p-4 md:p-5 focus:ring-1 focus:ring-ms-green outline-none transition-all font-bold text-slate-700 dark:text-slate-300 text-sm md:text-base appearance-none"
                    value={formData.region}
                    onChange={(e) => setFormData({...formData, region: e.target.value})}
                  >
                    {regions.map(r => <option key={r} value={r}>{r}</option>)}
                  </select>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
                  <div className="space-y-3">
                    <label htmlFor="deviceGroup" className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1">Device Cluster Group</label>
                    <input 
                      id="deviceGroup"
                      type="text"
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl p-4 md:p-5 focus:ring-1 focus:ring-ms-green outline-none transition-all font-bold text-slate-700 dark:text-slate-300 text-sm md:text-base placeholder:text-slate-300 dark:placeholder:text-slate-600"
                      value={formData.deviceGroup}
                      onChange={(e) => setFormData({...formData, deviceGroup: e.target.value})}
                      placeholder="e.g. Production-B"
                    />
                  </div>
                  <div className="space-y-3">
                    <label htmlFor="operationalTag" className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1">Operational Tag</label>
                    <input 
                      id="operationalTag"
                      type="text"
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl p-4 md:p-5 focus:ring-1 focus:ring-ms-green outline-none transition-all font-bold text-slate-700 dark:text-slate-300 text-sm md:text-base placeholder:text-slate-300 dark:placeholder:text-slate-600"
                      value={formData.customTag}
                      onChange={(e) => setFormData({...formData, customTag: e.target.value})}
                      placeholder="e.g. Q1-PATCH"
                    />
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6" role="radiogroup" aria-label="Select rollout type">
                  {[
                    { id: 'Immediate', icon: Layers, label: 'Direct', desc: 'Real-time Push' },
                    { id: 'Scheduled', icon: Clock, label: 'Scheduled', desc: 'Sync Window' },
                    { id: 'Phased', icon: MapPin, label: 'Phased', desc: 'Batch Rollout' },
                  ].map(t => (
                    <button
                      key={t.id}
                      role="radio"
                      aria-checked={formData.rolloutType === t.id}
                      onClick={() => setFormData({...formData, rolloutType: t.id})}
                      className={cn(
                        "p-6 md:p-8 rounded-xl md:rounded-2xl border transition-all text-left flex flex-row md:flex-col items-center md:items-start gap-4 md:gap-5",
                        "focus-visible:ring-2 focus-visible:ring-ms-green outline-none",
                        formData.rolloutType === t.id 
                          ? "bg-white dark:bg-slate-800 border-ms-green shadow-xl shadow-ms-green/5 ring-1 ring-ms-green" 
                          : "bg-slate-50 dark:bg-slate-800/50 border-slate-100 dark:border-slate-800 hover:bg-white dark:hover:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
                      )}
                    >
                      <div className={cn(
                        "p-2.5 md:p-3 w-fit rounded-xl border shrink-0",
                        formData.rolloutType === t.id ? "bg-ms-green text-white border-ms-green" : "bg-white dark:bg-slate-900 text-slate-300 dark:text-slate-700 border-slate-100 dark:border-slate-800"
                      )}>
                        <t.icon size={20} aria-hidden="true" />
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 dark:text-white text-sm md:text-base">{t.label}</p>
                        <p className="text-[8px] md:text-[10px] text-slate-400 dark:text-slate-500 mt-0.5 md:mt-1 font-black uppercase tracking-widest whitespace-nowrap">{t.desc}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
            {step === 4 && (
              <div className="space-y-10">
                <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl md:rounded-2xl p-6 md:p-10 border border-slate-100 dark:border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-y-6 md:gap-y-10 md:gap-x-16" aria-label="Review deployment details">
                  {[
                    { label: 'Transition Path', value: `${formData.fromVersion} → ${formData.toVersion}` },
                    { label: 'Push Topology', value: formData.rolloutType },
                    { label: 'Target Scope', value: `${formData.region} / ${formData.deviceGroup}` },
                    { label: 'Process Audit ID', value: formData.customTag || "System Default" },
                  ].map((item, idx) => (
                    <div key={idx} className="space-y-1.5">
                      <p className="text-[9px] md:text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">{item.label}</p>
                      <p className="font-bold text-slate-900 dark:text-white text-sm md:text-base flex items-center gap-2">{item.value}</p>
                    </div>
                  ))}
                </div>
                <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-100 dark:border-amber-500/20 p-6 md:p-8 rounded-xl md:rounded-2xl flex items-start gap-4 md:gap-6" role="note">
                  <AlertTriangle className="text-amber-500 shrink-0" size={24} aria-hidden="true" />
                  <div className="flex-1">
                    <h4 className="font-bold text-amber-900 dark:text-amber-400 text-sm">Deployment Critical Path Notice</h4>
                    <p className="text-amber-700 dark:text-amber-500/80 text-[10px] md:text-xs mt-2 leading-relaxed font-medium">
                      Operational impact estimation: <span className="font-bold">{formData.region === "All" ? "1,245" : "154"}</span> assets. 
                      Mission critical updates affecting {">"}1,000 nodes require senior authorization.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
        <div className="mt-8 md:mt-16 flex flex-col md:flex-row md:justify-between items-center bg-slate-50/50 dark:bg-slate-800/30 -mx-6 md:-mx-12 -mb-6 md:-mb-12 p-6 md:p-8 border-t border-slate-100 dark:border-slate-800 gap-4">
          <button
            onClick={prevStep}
            disabled={step === 1}
            aria-label="Previous step"
            className={cn(
              "w-full md:w-auto px-8 py-4 rounded-2xl font-bold text-[10px] uppercase tracking-widest flex items-center justify-center gap-2.5 transition-all outline-none cursor-pointer focus-visible:ring-2 focus-visible:ring-slate-400",
              step === 1 ? "hidden md:flex opacity-0 cursor-default" : "bg-white dark:bg-slate-800 text-slate-400 dark:text-slate-500 border border-slate-100 dark:border-slate-700 hover:text-slate-900 dark:hover:text-white shadow-sm"
            )}
          >
            <ChevronLeft size={16} aria-hidden="true" /> {t('schedule.back')}
          </button>  
          {step < 4 ? (
            <button
              onClick={nextStep}
              aria-label="Next step"
              className="w-full md:w-auto px-10 py-4 bg-ms-green text-white rounded-2xl font-bold text-[10px] uppercase tracking-[0.2em] shadow-xl shadow-ms-green/20 hover:bg-ms-green-dark transition-all flex items-center justify-center gap-2.5 cursor-pointer focus-visible:ring-2 focus-visible:ring-ms-green focus-visible:ring-offset-2"
            >
              {t('schedule.next')} <ChevronRight size={16} aria-hidden="true" />
            </button>
          ) : (
            <button
              onClick={() => {
                const isLargeUpdate = formData.region === 'All';
                if (isLargeUpdate) {
                  showAlert({
                    type: 'warning',
                    title: 'Senior Authorization Required',
                    message: 'This update affects >1,000 nodes. Please confirm you have verified the baseline compatibility for a global rollout.',
                    confirmLabel: 'Authorize & Deploy',
                    showCancel: true,
                    cancelLabel: 'Review Settings',
                    onConfirm: () => onSubmit(formData)
                  });
                } else {
                  onSubmit(formData);
                }
              }}
              aria-label="Initiate fleet update deployment"
              className="w-full md:w-auto px-12 py-4 rounded-2xl bg-slate-900 text-white hover:bg-black font-bold text-[10px] uppercase tracking-[0.2em] shadow-xl transition-all outline-none cursor-pointer focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
            >
              {t('schedule.initiate')}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
