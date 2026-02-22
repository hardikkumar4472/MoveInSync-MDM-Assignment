import { motion } from 'framer-motion';
import { ArrowUpDown, Clock, ChevronRight, ChevronLeft, Search, Filter } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Badge from '../atoms/Badge';
import Button from '../atoms/Button';
import Typography from '../atoms/Typography';
import Card from '../molecules/Card';
import { cn } from '../../lib/utils';
export default function InventoryTable({ devices, onDeviceClick, onSort, searchTerm, onSearchChange, filters, onFilterChange, pagination, onPageChange, isEmpty, emptyComponent
}) {
  const { t } = useTranslation();
  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="relative group flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-ms-green transition-colors" size={18} />
          <input 
            type="text" 
            placeholder="Search Asset..." 
            aria-label="Search assets by ID or IMEI"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-12 pr-4 py-3 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl w-full text-xs font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-ms-green/20 focus:bg-white dark:focus:bg-slate-900 outline-none transition-all shadow-inner focus-visible:ring-ms-green"
          />
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <FilterSelect 
            label="Region" 
            ariaLabel="Filter by Region"
            value={filters.region} 
            onChange={(val) => onFilterChange('region', val)}
            options={['All', 'Bangalore', 'Mumbai', 'Delhi', 'Hyderabad', 'Chennai', 'Pune']}
          />
          <FilterSelect 
            label="Version" 
            ariaLabel="Filter by Version"
            value={filters.version} 
            onChange={(val) => onFilterChange('version', val)}
            options={['All', 'v2.4.0', 'v2.3.6', 'v2.3.5', 'v2.3.0', 'v2.2.0']}
          />
          <FilterSelect 
            label="Status" 
            ariaLabel="Filter by Status"
            value={filters.status} 
            onChange={(val) => onFilterChange('status', val)}
            options={['All', 'Up-to-date', 'Outdated', 'Failed', 'Inactive']}
          />
          <button 
            onClick={() => {
              onFilterChange('region', 'All');
              onFilterChange('version', 'All');
              onFilterChange('status', 'All');
              onSearchChange('');
            }}
            className="text-[10px] text-ms-green font-black uppercase tracking-widest hover:text-ms-green-dark transition-colors px-2"
          >
            Reset
          </button>

        </div>
      </div>
      <div className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col min-h-[400px]">
        <div className="overflow-x-auto custom-scrollbar flex-1">
          {isEmpty ? (
            <div className="h-full flex items-center justify-center py-20 px-6">
              {emptyComponent}
            </div>
          ) : (
            <table className="w-full text-left">
              <thead className="sticky top-0 z-10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md">
                <tr className="border-b border-slate-50 dark:border-slate-800">
                  <SortableHeader label={t('inventory.assetId')} onClick={() => onSort('id')} />
                  <Header label={t('inventory.appCore')} />
                  <Header label={t('inventory.region')} />
                  <SortableHeader label={t('inventory.heartbeat')} onClick={() => onSort('lastSeen')} />
                  <Header label={t('inventory.health')} center />
                  <th className="px-8 py-5" aria-label="Actions"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                {devices.map((device, index) => (
                  <motion.tr 
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-20px" }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    key={device.id} 
                    onClick={() => onDeviceClick(device)}
                    onKeyDown={(e) => e.key === 'Enter' && onDeviceClick(device)}
                    tabIndex={0}
                    aria-label={`Device ${device.id}, click for details`}
                    className="group hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer focus:bg-slate-50 dark:focus:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-ms-green"
                  >
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-ms-green/5 flex items-center justify-center text-ms-green group-hover:bg-ms-green group-hover:text-white group-focus:bg-ms-green group-focus:text-white transition-all shadow-sm">
                          <span className="text-[10px] font-black uppercase">MS</span>
                        </div>
                        <span className="text-sm font-black text-slate-900 dark:text-white tracking-tight">{device.id}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <Typography variant="caption" className="font-bold text-slate-700 dark:text-slate-300">{device.appVersion}</Typography>
                    </td>
                    <td className="px-6 py-5">
                      <Typography variant="caption" className="font-bold uppercase tracking-wider">{device.region}</Typography>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2">
                        <Clock size={12} className="text-slate-300 dark:text-slate-600" />
                        <Typography variant="caption" className="font-medium">{device.lastSeen}</Typography>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-center">
                      <Badge variant={getBadgeVariant(device.status)}>{device.status}</Badge>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center group-hover:bg-ms-green group-hover:text-white group-focus:bg-ms-green group-focus:text-white text-slate-300 transition-all ml-auto">
                        <ChevronRight size={18} />
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        {!isEmpty && (
          <nav aria-label="Pagination" className="p-6 border-t border-slate-50 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6 bg-slate-50/30 dark:bg-slate-900">
            <Typography variant="label">
              Showing <span className="text-slate-900 dark:text-white">{pagination.from}-{pagination.to}</span> of {pagination.total} Assets
            </Typography>
            <div className="flex items-center gap-2">
              <PaginationButton ariaLabel="Previous page" disabled={pagination.currentPage === 1} onClick={() => onPageChange(pagination.currentPage - 1)}>
                <ChevronLeft size={16} />
              </PaginationButton>
              <div className="flex items-center gap-1 mx-2">
                {[...Array(pagination.totalPages)].map((_, i) => (
                  <button
                    key={i}
                    aria-label={`Page ${i + 1}`}
                    aria-current={pagination.currentPage === i + 1 ? "page" : undefined}
                    onClick={() => onPageChange(i + 1)}
                    className={cn(
                      "w-8 h-8 rounded-lg text-[10px] font-black transition-all",
                      pagination.currentPage === i + 1 
                        ? "bg-ms-green text-white shadow-lg shadow-ms-green/20" 
                        : "text-slate-400 hover:bg-white dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
                    )}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
              <PaginationButton ariaLabel="Next page" disabled={pagination.currentPage === pagination.totalPages} onClick={() => onPageChange(pagination.currentPage + 1)}>
                <ChevronRight size={16} />
              </PaginationButton>
            </div>
          </nav>
        )}
      </div>
    </div>
  );
}
function Header({ label, center }) {
  return (
    <th 
      scope="col"
      className={cn("px-6 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400", center && "text-center")}
    >
      {label}
    </th>
  );
}
function SortableHeader({ label, onClick }) {
  return (
    <th 
      scope="col"
      className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 cursor-pointer hover:text-ms-green transition-colors focus-within:text-ms-green outline-none" 
      onClick={onClick}
    >
      <button 
        className="flex items-center gap-2 uppercase tracking-[0.2em] font-bold focus:outline-none"
        aria-label={`Sort by ${label}`}
      >
        {label} <ArrowUpDown size={10} />
      </button>
    </th>
  );
}
function FilterSelect({ label, value, options, onChange, ariaLabel }) {
  return (
    <div className="relative">
      <select 
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label={ariaLabel}
        className="block w-full min-w-[140px] bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 py-2.5 pl-4 pr-10 rounded-xl text-[10px] font-black uppercase tracking-widest focus:ring-2 focus:ring-ms-green/20 outline-none appearance-none cursor-pointer hover:bg-white dark:hover:bg-slate-900 transition-all shadow-sm focus-visible:ring-ms-green"
      >
        {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
      </select>
      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
        <ChevronRight size={14} className="rotate-90" />
      </div>
    </div>
  );
}
function PaginationButton({ children, disabled, onClick }) {
  return (
    <button 
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "p-2.5 rounded-xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-500 shadow-sm transition-all",
        disabled ? "opacity-30 cursor-not-allowed" : "hover:bg-ms-green hover:text-white hover:border-ms-green active:scale-95"
      )}
    >
      {children}
    </button>
  );
}
function getBadgeVariant(status) {
  switch (status) {
    case 'Up-to-date': return 'success';
    case 'Outdated': return 'warning';
    case 'Failed': return 'danger';
    case 'Inactive': return 'default';
    default: return 'default';
  }
}
