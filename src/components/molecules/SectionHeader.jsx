import { memo } from 'react';
import Typography from '../atoms/Typography';
import { cn } from '../../lib/utils';
import { motion } from 'framer-motion';
const SectionHeader = memo(({ title, subtitle, icon: Icon, iconColor = "bg-ms-green",className,rightElement}) => {
  return (
    <div className={cn("flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 pb-6 border-b border-slate-50 dark:border-slate-800", className)}>
      <div className="flex items-center gap-6">
        {Icon && (
          <div className={cn("p-4 rounded-[1.25rem] text-white shadow-lg transition-all duration-300", iconColor)}>
            <Icon size={24} />
          </div>
        )}
        <div>
          <Typography variant="h3" className="mb-1">{title}</Typography>
          <Typography variant="label" className="text-ms-green font-black">{subtitle}</Typography>
        </div>
      </div>
      {rightElement && (
        <div className="flex-shrink-0">
          {rightElement}
        </div>
      )}
    </div>
  );
});
SectionHeader.displayName = 'SectionHeader';
export default SectionHeader;
