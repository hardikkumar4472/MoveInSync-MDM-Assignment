import { motion } from 'framer-motion';
import { AlertCircle, RefreshCw, Box, Search } from 'lucide-react';
import { cn } from '../../lib/utils';
export function Skeleton({ className }) {
  return (
    <div className={cn("animate-pulse bg-slate-100 dark:bg-slate-800 rounded-lg", className)} />
  );
}
export function TableSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-10 w-32" />
        <Skeleton className="h-10 w-32" />
      </div>
      <div className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-100 dark:border-slate-800 overflow-hidden">
        <div className="p-8 space-y-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex items-center justify-between gap-8 pb-6 border-b border-slate-50 dark:border-slate-800 last:border-0 last:pb-0">
              <div className="flex items-center gap-4">
                <Skeleton className="w-10 h-10 rounded-xl" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-3 w-16" />
                </div>
              </div>
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-6 w-24 rounded-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export function KPISkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-100 dark:border-slate-800 space-y-4">
          <div className="flex justify-between items-start">
            <Skeleton className="w-12 h-12 rounded-2xl" />
            <Skeleton className="w-16 h-4" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-8 w-24" />
            <Skeleton className="h-3 w-32" />
          </div>
        </div>
      ))}
    </div>
  );
}
export function ErrorState({ message, onRetry, className }) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className={cn(
        "flex flex-col items-center justify-center p-12 text-center bg-rose-50/50 dark:bg-rose-500/5 border border-rose-100 dark:border-rose-500/20 rounded-[3rem]",
        className
      )}
    >
      <div className="w-16 h-16 bg-white dark:bg-rose-500/20 rounded-2xl shadow-sm flex items-center justify-center text-rose-500 mb-6 border border-rose-100 dark:border-rose-500/20">
        <AlertCircle size={32} />
      </div>
      <h3 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight mb-2">Sync Interrupted</h3>
      <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xs mb-8 font-medium">{message || "We encountered a network anomaly while fetching the latest baseline metadata."}</p>
      {onRetry && (
        <button 
          onClick={onRetry}
          className="flex items-center gap-3 px-8 py-4 bg-slate-900 dark:bg-ms-green text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-slate-900/10 dark:shadow-ms-green/20"
        >
          <RefreshCw size={16} />
          Retry Connection
        </button>
      )}
    </motion.div>
  );
}
export function EmptyState({ title, description, icon: Icon = Box }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex flex-col items-center justify-center p-20 text-center"
    >
      <div className="w-20 h-20 bg-slate-50 dark:bg-slate-800 rounded-[2.5rem] flex items-center justify-center text-slate-300 dark:text-slate-600 mb-8 border border-slate-100 dark:border-slate-700">
        <Icon size={40} />
      </div>
      <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight mb-3">{title || "No Results Found"}</h3>
      <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xs font-medium">{description || "The current filter parameters yielded no matching assets in the global index."}</p>
    </motion.div>
  );
}
