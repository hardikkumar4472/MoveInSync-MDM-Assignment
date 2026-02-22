import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';
import { motion } from "framer-motion";
import { useTranslation } from 'react-i18next';
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-slate-900 p-6 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-xl shadow-slate-200/50 dark:shadow-none">
        <p className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 tracking-widest mb-3 border-b border-slate-50 dark:border-slate-800 pb-2">{label}</p>
        <div className="space-y-2">
          {payload.map((entry, index) => (
            <div key={index} className="flex justify-between items-center gap-6 min-w-[140px]">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: entry.color }} />
                <span className="text-[10px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-widest leading-normal">{entry.name}</span>
              </div>
              <span className="text-[11px] font-bold text-slate-900 dark:text-white tracking-tight">{entry.value.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};
export default function RegionHeatmap({ data, onRegionClick }) {
  const { t } = useTranslation();
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-slate-900 p-10 h-[500px] flex flex-col transition-colors duration-300"
    >
      <div className="flex justify-between items-center mb-10">
        <div>
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-[0.2em] leading-relaxed mb-1 py-1">{t('charts.geographic')}</h3>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t('charts.distribution')}</p>
        </div>
        <div className="flex gap-4">
           <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-ms-green" />
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Target v2.4.0</span>
           </div>
        </div>
      </div>
      
      <div className="flex-1 w-full h-full min-h-0 min-w-0 -ml-8 relative">
        <ResponsiveContainer width="100%" height="100%" minWidth={0} debounce={300}>
          <BarChart
            data={data}
            onClick={(state) => {
              if (state && state.activeLabel) {
                onRegionClick(state.activeLabel);
              }
            }}
            margin={{ top: 0, right: 0, left: 0, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="currentColor" className="text-slate-100 dark:text-slate-800" />
            <XAxis 
              dataKey="region" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 700 }}
              dy={15}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 700 }}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'currentColor', className: 'text-slate-50 dark:text-slate-800' }} />
            <Legend 
              verticalAlign="top" 
              align="right" 
              iconType="circle" 
              wrapperStyle={{ paddingBottom: '30px', fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.1em' }} 
            />
            <Bar dataKey="v2.4.0" stackId="a" fill="#43b02a" radius={[0, 0, 0, 0]} barSize={32} />
            <Bar dataKey="v2.3.5" stackId="a" fill="#5ec448" />
            <Bar dataKey="v2.3.0" stackId="a" fill="#7ad866" />
            <Bar dataKey="v2.2.0" stackId="a" fill="#95eb84" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
