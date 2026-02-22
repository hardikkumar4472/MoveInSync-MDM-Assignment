import { useState, useMemo, useEffect } from 'react';
import { CheckCircle, ChevronRight, ChevronLeft, AlertCircle, Layers, MapPin, Settings, Clock, ShieldCheck, AlertTriangle, X } from 'lucide-react';
import { cn } from '../../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { versions, regions } from '../../data/mockData';
import { useTranslation } from 'react-i18next';
import { useUI } from '../../context/UIContext';
import { useSelector } from 'react-redux';
import { selectAllDevices } from '../../store/slices/deviceSlice';
import Typography from '../atoms/Typography';
import Button from '../atoms/Button';
import SectionHeader from '../molecules/SectionHeader';

export default function UpdateScheduleForm({ onSubmit, onCancel, userRole = 'admin' }) {
  const { t } = useTranslation();
  const { showAlert } = useUI();
  const devices = useSelector(selectAllDevices);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fromVersion: 'v2.3.6',
    toVersion: 'v2.4.0',
    region: 'All',
    deviceGroup: '',
    customTag: '',
    rolloutType: 'Immediate',
    scheduledDate: '',
    phasedPercent: 20,
    phasedInterval: 6
  });
  const [errors, setErrors] = useState({});

  const matchingDevicesCount = useMemo(() => {
    return devices.filter(d => 
      (formData.region === 'All' || d.region === formData.region) &&
      (d.appVersion === formData.fromVersion)
    ).length;
  }, [devices, formData.region, formData.fromVersion]);

  const versionComparison = useMemo(() => {
    const v1 = formData.fromVersion.replace('v', '').split('.').map(Number);
    const v2 = formData.toVersion.replace('v', '').split('.').map(Number);
    for (let i = 0; i < Math.max(v1.length, v2.length); i++) {
      const a = v1[i] || 0;
      const b = v2[i] || 0;
      if (a > b) return -1; // Lower
      if (a < b) return 1;  // Higher
    }
    return 0; // Equal
  }, [formData.fromVersion, formData.toVersion]);

  const validateStep = (currentStep) => {
    const newErrors = {};
    if (currentStep === 1) {
      if (versionComparison === -1) {
        newErrors.version = "Target version cannot be lower than current version.";
      } else if (versionComparison === 0) {
        newErrors.version = "Source and target versions cannot be identical.";
      }
    }
    if (currentStep === 2) {
      if (matchingDevicesCount === 0) {
        newErrors.region = `Warning: No devices found in ${formData.region} with version ${formData.fromVersion}.`;
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0 || (currentStep === 2 && matchingDevicesCount === 0);
  };

  const nextStep = () => {
    const isValid = validateStep(step);
    if (isValid || (step === 2 && matchingDevicesCount === 0)) {
       if (step === 2 && matchingDevicesCount === 0 && !errors.regionConfirmed) {
         setErrors({ ...errors, regionConfirmed: true });
         return;
       }
       setStep(s => Math.min(s + 1, 4));
    }
  };

  const prevStep = () => setStep(s => Math.max(s - 1, 1));
  useEffect(() => {
    const handleNavigationBack = (e) => {
      if (step > 1) {
        setStep(s => s - 1);
      }
    };

    if (step > 1) {
      window.history.pushState({ step }, '');
    }

    window.addEventListener('popstate', handleNavigationBack);
    return () => window.removeEventListener('popstate', handleNavigationBack);
  }, [step]);

  const steps = [
    { title: "Version Selection", icon: Layers },
    { title: "Target Selection", icon: MapPin },
    { title: "Rollout Type", icon: Clock },
    { title: "Review & Confirm", icon: CheckCircle },
  ];

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden w-full transition-colors duration-300">
      <div className="bg-white dark:bg-slate-900 px-6 md:px-12 py-10 md:py-14 text-slate-900 dark:text-white relative overflow-hidden border-b border-slate-50 dark:border-slate-800">
        <SectionHeader 
          title="Schedule Fleet Update"
          subtitle="Enterprise update propagation wizard"
          className="border-none mb-0 pb-0"
          rightElement={<Button variant="secondary" size="sm" onClick={onCancel}>Cancel</Button>}
        />
        <div className="flex justify-between mt-12 md:mt-16 relative z-10 gap-2 md:gap-4 overflow-x-auto no-scrollbar py-2">
          {steps.map((s, i) => (
            <div key={i} className="flex flex-col items-center gap-3 shrink-0">
              <div className={cn(
                "w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl flex items-center justify-center transition-all duration-500 border-2",
                step === i + 1 ? "bg-ms-green border-ms-green text-white shadow-xl shadow-ms-green/20 scale-110" : 
                step > i + 1 ? "bg-emerald-50 dark:bg-emerald-500/10 border-emerald-100 dark:border-emerald-500/20 text-ms-green" : "bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 text-slate-200"
              )}>
                {step > i + 1 ? <CheckCircle size={20} /> : <s.icon size={20} />}
              </div>
              <Typography variant="label" className={cn("text-[9px] uppercase font-bold tracking-widest", step === i + 1 ? "text-ms-green" : "text-slate-400")}>{s.title}</Typography>
            </div>
          ))}
          <div className="absolute top-5 md:top-7 left-12 right-12 h-[2px] bg-slate-50 dark:bg-slate-800 -z-10 hidden md:block" />
        </div>
      </div>

      <div className="p-6 md:p-12">
        <AnimatePresence mode="wait">
          <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            {step === 1 && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">From Version</label>
                    <select 
                      className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 rounded-xl p-4 font-bold text-slate-700 dark:text-slate-300"
                      value={formData.fromVersion}
                      onChange={(e) => setFormData({...formData, fromVersion: e.target.value})}
                    >
                      {versions.map(v => <option key={v} value={v}>{v}</option>)}
                    </select>
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">To Version</label>
                    <select 
                      className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 rounded-xl p-4 font-bold text-slate-700 dark:text-slate-300"
                      value={formData.toVersion}
                      onChange={(e) => setFormData({...formData, toVersion: e.target.value})}
                    >
                      {versions.map(v => <option key={v} value={v}>{v}</option>)}
                    </select>
                  </div>
                </div>
                {errors.version && (
                  <div className="bg-rose-50 text-rose-600 p-4 rounded-xl border border-rose-100 flex items-center gap-3">
                    <AlertCircle size={18} />
                    <span className="text-xs font-bold uppercase tracking-tight">{errors.version}</span>
                  </div>
                )}
                <div className="bg-emerald-50 dark:bg-emerald-500/5 p-6 rounded-2xl flex items-center gap-4 border border-emerald-100 dark:border-emerald-500/20">
                  <ShieldCheck className="text-ms-green" size={24} />
                  <div>
                    <p className="font-bold text-slate-800 dark:text-white text-sm">Compatibility Verification</p>
                    <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest mt-0.5">Automated Check: Pass</p>
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Target Region</label>
                  <select 
                    className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 rounded-xl p-4 font-bold text-slate-700 dark:text-slate-300"
                    value={formData.region}
                    onChange={(e) => setFormData({...formData, region: e.target.value})}
                  >
                    <option value="All">All Regions</option>
                    {regions.map(r => <option key={r} value={r}>{r}</option>)}
                  </select>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Device Group</label>
                    <input 
                      className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 rounded-xl p-4 font-bold text-slate-700" 
                      placeholder="e.g. Production Cluster A"
                      value={formData.deviceGroup}
                      onChange={(e) => setFormData({...formData, deviceGroup: e.target.value})}
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Customization Tag</label>
                    <input 
                      className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 rounded-xl p-4 font-bold text-slate-700" 
                      placeholder="e.g. Q1-Standard"
                      value={formData.customTag}
                      onChange={(e) => setFormData({...formData, customTag: e.target.value})}
                    />
                  </div>
                </div>
                {matchingDevicesCount === 0 && (
                  <div className="bg-amber-50 text-amber-700 p-4 rounded-xl border border-amber-100 flex items-center gap-3">
                    <AlertTriangle size={18} />
                    <span className="text-xs font-bold uppercase">Warning: Zero devices currently match this selection.</span>
                  </div>
                )}
              </div>
            )}

            {step === 3 && (
              <div className="space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {['Immediate', 'Scheduled', 'Phased'].map(type => (
                    <button
                      key={type}
                      onClick={() => setFormData({...formData, rolloutType: type})}
                      className={cn(
                        "p-8 rounded-2xl border-2 transition-all text-left",
                        formData.rolloutType === type ? "border-ms-green bg-emerald-50/20" : "border-slate-100 bg-slate-50"
                      )}
                    >
                      <Typography variant="h4" className="mb-1">{type}</Typography>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Rollout Mode</p>
                    </button>
                  ))}
                </div>
                {formData.rolloutType === 'Scheduled' && (
                  <div className="p-8 bg-slate-50 rounded-2xl border border-slate-100 space-y-4">
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Deployment Date & Time</label>
                    <input type="datetime-local" className="w-full p-4 rounded-xl border-slate-200" />
                  </div>
                )}
                {formData.rolloutType === 'Phased' && (
                  <div className="p-8 bg-slate-50 rounded-2xl border border-slate-100 grid grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Percent per phase</label>
                      <input type="number" className="w-full p-4 rounded-xl border-slate-200 font-bold" value={formData.phasedPercent} onChange={(e) => setFormData({...formData, phasedPercent: e.target.value})} />
                    </div>
                    <div className="space-y-4">
                      <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Interval (Hours)</label>
                      <input type="number" className="w-full p-4 rounded-xl border-slate-200 font-bold" value={formData.phasedInterval} onChange={(e) => setFormData({...formData, phasedInterval: e.target.value})} />
                    </div>
                  </div>
                )}
              </div>
            )}

            {step === 4 && (
              <div className="space-y-8">
                <div className="bg-slate-50 dark:bg-slate-800/50 p-10 rounded-[2rem] border border-slate-100 grid grid-cols-2 gap-12">
                  <div>
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">Version Transition</p>
                    <p className="text-xl font-black text-slate-900">{formData.fromVersion} → {formData.toVersion}</p>
                  </div>
                  <div>
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">Target Scope</p>
                    <p className="text-xl font-black text-slate-900">{formData.region} / {formData.deviceGroup || "Fleet"}</p>
                  </div>
                  <div>
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">Rollout Strategy</p>
                    <p className="text-xl font-black text-slate-900">{formData.rolloutType}</p>
                  </div>
                  <div>
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">Impact Count</p>
                    <p className="text-xl font-black text-slate-900">{matchingDevicesCount} Assets</p>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="mt-12 flex justify-between items-center border-t border-slate-100 pt-8">
          <Button variant="secondary" onClick={prevStep} disabled={step === 1}>
            <ChevronLeft size={16} /> Back
          </Button>
          
          <div className="flex items-center gap-4">
            {step === 4 && matchingDevicesCount > 1000 && userRole === 'ops' && (
              <div className="flex items-center gap-2 text-amber-600 bg-amber-50 px-4 py-2 rounded-xl border border-amber-100">
                <AlertCircle size={14} />
                <span className="text-[10px] font-black uppercase tracking-tight">Admin Approval Required</span>
              </div>
            )}
            
            {step < 4 ? (
              <Button onClick={nextStep} className="px-10">Next Step <ChevronRight size={16} /></Button>
            ) : (
              <Button 
                onClick={() => {
                  if (matchingDevicesCount > 1000) {
                    if (userRole === 'ops') {
                      showAlert({
                        type: 'info',
                        title: 'Approval Requested',
                        message: 'As an Operations user, deployments affecting >1,000 devices require Product Head approval. Your request has been queued.',
                        confirmLabel: 'Close',
                        onConfirm: () => {
                          onSubmit({ ...formData, status: 'Pending Approval' });
                        }
                      });
                    } else {
                      showAlert({
                        type: 'warning',
                        title: 'Mandatory Update Verification',
                        message: `This update affects ${matchingDevicesCount} nodes. As Admin, do you confirm this critical infrastructure deployment?`,
                        confirmLabel: 'Deploy Fleet',
                        showCancel: true,
                        onConfirm: () => onSubmit({ ...formData, status: 'Active' })
                      });
                    }
                  } else {
                    onSubmit({ ...formData, status: 'Active' });
                  }
                }} 
                className="px-12 transition-all"
                variant={matchingDevicesCount > 1000 && userRole === 'ops' ? 'secondary' : 'primary'}
                title={matchingDevicesCount > 1000 && userRole === 'ops' ? "Restricted: Mandatory updates (>1000 devices) require Admin approval" : ""}
              >
                {matchingDevicesCount > 1000 && userRole === 'ops' ? 'Request Approval' : 'Initiate Rollout'}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

