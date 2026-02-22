import { cn } from "../../lib/utils";
import { CheckCircle2, AlertCircle, Clock, History } from "lucide-react";
import Badge from "../atoms/Badge";

/**
 * AuditTimeline Component
 * A generic and reusable chronological visual timeline.
 * 
 * @param {Array} history - Array of events to display
 * @param {String} emptyMessage - Message to show when history is empty
 */
export default function AuditTimeline({ history = [], emptyMessage = "No history available" }) {
  if (!history || history.length === 0) {
    return (
      <div className="p-8 text-center bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-dashed border-slate-200 dark:border-slate-700">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {history.map((event, idx) => (
        <div key={event.id || idx} className="relative pl-10">
          {/* Vertical threading line */}
          {idx !== history.length - 1 && (
            <div className="absolute left-[19px] top-10 bottom-[-32px] w-px bg-slate-100 dark:bg-slate-800" />
          )}
          
          <div className="absolute left-0 top-0 w-10 h-10 rounded-xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex items-center justify-center text-slate-300 z-10 transition-colors group-hover:border-ms-green/30">
             <History size={18} className={event.status === 'Completed' || event.status === 'success' ? 'text-ms-green' : event.status === 'Failed' || event.status === 'error' ? 'text-rose-500' : 'text-slate-400'} />
          </div>

          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <p className="text-sm font-black text-slate-900 dark:text-white tracking-tight">{event.title || event.targetVersion}</p>
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.1em]">{event.subtitle || `Deployment ID • ${event.id}`}</p>
              </div>
              {event.status && (
                <Badge variant={event.status === 'Completed' || event.status === 'success' ? 'success' : 'danger'}>
                  {event.status}
                </Badge>
              )}
            </div>

            {event.steps && event.steps.length > 0 && (
              <div className="grid grid-cols-1 gap-2">
                {event.steps.map((step, sIdx) => (
                  <div key={sIdx} className={cn(
                    "flex items-center justify-between p-3 rounded-xl border transition-all",
                    step.status === 'success' ? "bg-white dark:bg-slate-800/50 border-slate-50 dark:border-slate-800" :
                    step.status === 'error' ? "bg-rose-50/50 dark:bg-rose-500/5 border-rose-100 dark:border-rose-500/20" :
                    "bg-slate-50/30 border-transparent opacity-50"
                  )}>
                     <div className="flex items-center gap-3">
                        <div className={cn(
                          "w-6 h-6 rounded-lg flex items-center justify-center border",
                          step.status === 'success' ? "bg-ms-green text-white border-ms-green" :
                          step.status === 'error' ? "bg-rose-500 text-white border-rose-500 shadow-lg shadow-rose-500/20" :
                          "bg-white dark:bg-slate-900 text-slate-300 border-slate-100 dark:border-slate-800"
                        )}>
                           {step.status === 'success' ? <CheckCircle2 size={12} /> : 
                            step.status === 'error' ? <AlertCircle size={12} /> : 
                            <Clock size={12} />}
                        </div>
                        <span className={cn(
                          "text-[11px] font-bold",
                          step.status === 'error' ? "text-rose-600" : "text-slate-600 dark:text-slate-400"
                        )}>
                          {step.name}
                          {step.reason && <span className="block text-[9px] font-medium opacity-70 mt-0.5">{step.reason}</span>}
                        </span>
                     </div>
                     <span className="text-[9px] font-black text-slate-400 tracking-widest uppercase">{step.time}</span>
                  </div>
                ))}
              </div>
            )}
            
            {event.description && (
              <p className="text-xs text-slate-500 leading-relaxed italic">{event.description}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
