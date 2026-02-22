import { Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { cn } from '../../lib/utils';
import Typography from '../atoms/Typography';
import Button from '../atoms/Button';
import Card from './Card';
export default function PropagationCard({ userRole, onShowScheduling }) {
  const { t } = useTranslation();
  const isAnalyst = userRole === 'analyst';
  
  return (
    <Card className="p-12 text-slate-900 dark:text-white flex flex-col justify-between group">
      <div className="relative z-10">
        <Typography variant="label" className="text-ms-green mb-6">{t('propagation.title')}</Typography>
        <Typography variant="h3" as="h3" className="mb-4 leading-tight italic">
          {t('propagation.maintenance').split(': ')[0]}: <br/> 
          <span className="text-slate-400 dark:text-slate-500 not-italic font-bold">{t('propagation.maintenance').split(': ')[1]}</span>
        </Typography>
        <div className="h-px w-full bg-slate-100 dark:bg-slate-800 my-8" />
        <div className="space-y-6 text-sm font-bold">
          <div className="flex justify-between">
            <span className="text-slate-400 dark:text-slate-500 uppercase tracking-widest text-[10px]">{t('propagation.epoch')}</span>
            <span className="text-slate-900 dark:text-white">Feb 24, 02:00 AM</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400 dark:text-slate-500 uppercase tracking-widest text-[10px]">{t('propagation.build')}</span>
            <span className="text-slate-900 dark:text-white">MDM-2.4.0-STABLE</span>
          </div>
        </div>
      </div>
      <div className="mt-12 relative z-10">
        <Button 
          onClick={onShowScheduling} 
          disabled={isAnalyst}
          className={cn("w-full transition-all", isAnalyst && "opacity-40 grayscale")}
          title={isAnalyst ? "Analyst account: No scheduling permissions" : ""}
        >
          {t('propagation.wizard')}
        </Button>
      </div>
      <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity">
        <Globe size={180} className="text-ms-green" />
      </div>
      <div className="absolute top-0 right-0 w-64 h-64 bg-ms-green/5 rounded-full blur-[100px] -mr-32 -mt-32" />
    </Card>
  );
}
