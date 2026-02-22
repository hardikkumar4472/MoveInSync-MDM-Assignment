import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, CheckCircle, Info, X } from 'lucide-react';
import { cn } from '../../lib/utils';
import Button from '../atoms/Button';
import Typography from '../atoms/Typography';
export default function AlertModal({ isOpen, onClose, title, message, type = 'info', confirmLabel = 'OK',onConfirm,showCancel = false,cancelLabel = 'Cancel'
}) {
  const icons = {
    info: { icon: Info, color: 'text-indigo-500', bg: 'bg-indigo-50 dark:bg-indigo-500/10' },
    success: { icon: CheckCircle, color: 'text-ms-green', bg: 'bg-emerald-50 dark:bg-emerald-500/10' },
    error: { icon: AlertCircle, color: 'text-rose-500', bg: 'bg-rose-50 dark:bg-rose-500/10' },
    warning: { icon: AlertCircle, color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-500/10' }
  };
  const { icon: Icon, color, bg } = icons[type] || icons.info;
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/60 backdrop-blur-md"
          /> 
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-sm bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl border border-slate-100 dark:border-slate-800 p-8 md:p-10 overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-ms-green/5 rounded-full -mr-16 -mt-16 blur-3xl pointer-events-none" /> 
            <div className="flex flex-col items-center text-center relative z-10">
              <div className={cn("w-16 h-16 rounded-[2rem] flex items-center justify-center mb-6 shadow-sm border border-transparent", bg)}>
                <Icon size={32} className={color} />
              </div>
              <Typography variant="h3" className="mb-2 text-slate-900 dark:text-white uppercase tracking-tight">
                {title}
              </Typography>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed mb-10">
                {message}
              </p>
              <div className="flex gap-3 w-full">
                {showCancel && (
                  <button
                    onClick={onClose}
                    className="flex-1 py-4 bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-100 dark:hover:bg-slate-700 transition-all border border-slate-100 dark:border-slate-700"
                  >
                    {cancelLabel}
                  </button>
                )}
                <button
                  onClick={() => {
                    if (onConfirm) onConfirm();
                    onClose();
                  }}
                  className={cn(
                    "flex-1 py-4 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-lg transition-all hover:scale-105 active:scale-95",
                    type === 'error' ? 'bg-rose-500 shadow-rose-500/20' : 
                    type === 'warning' ? 'bg-amber-500 shadow-amber-500/20' :
                    'bg-ms-green shadow-ms-green/20'
                  )}
                >
                  {confirmLabel}
                </button>
              </div>
            </div>
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-xl text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              <X size={18} />
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
