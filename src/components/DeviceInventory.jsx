import { useState, useMemo, useEffect } from 'react';
import { Search, Filter, ArrowUpDown, ChevronRight, ChevronLeft, MoreHorizontal, Clock } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const StatusBadge = ({ status }) => {
  const styles = {
    "Up-to-date": "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-100 dark:border-emerald-500/20",
    "Outdated": "bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-100 dark:border-amber-500/20",
    "Failed": "bg-rose-50 dark:bg-rose-500/10 text-rose-700 dark:text-rose-400 border-rose-100 dark:border-rose-500/20",
    "Inactive": "bg-slate-50 dark:bg-slate-500/10 text-slate-500 dark:text-slate-400 border-slate-100 dark:border-slate-500/20",
  };
  return (
    <span className={cn("px-2.5 py-0.5 rounded-lg text-[10px] font-bold uppercase tracking-widest border shadow-sm", styles[status] || styles.Inactive)}>
      {status}
    </span>
  );
};
export default function DeviceInventory({ devices, onDeviceClick, initialFilter = {} }) {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    region: initialFilter.region || "All",
    version: "All",
    status: "All"
  });
  const [sortConfig, setSortConfig] = useState({ key: 'lastSeen', direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  useEffect(() => {
    if (initialFilter.region) {
      setFilters(prev => ({ ...prev, region: initialFilter.region }));
    }
  }, [initialFilter.region]);
  const filteredDevices = useMemo(() => {
    return devices
      .filter(device => {
        const matchesSearch = device.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            device.imei.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRegion = filters.region === "All" || device.region === filters.region;
        const matchesVersion = filters.version === "All" || device.appVersion === filters.version;
        const matchesStatus = filters.status === "All" || device.status === filters.status;
        return matchesSearch && matchesRegion && matchesVersion && matchesStatus;
      })
      .sort((a, b) => {
        if (!sortConfig.key) return 0;
        const aVal = a[sortConfig.key];
        const bVal = b[sortConfig.key];
        if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
  }, [devices, searchTerm, filters, sortConfig]);
  const totalItems = filteredDevices.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedDevices = filteredDevices.slice(startIndex, startIndex + itemsPerPage);
  const toggleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filters]);
  const regions = ["All", ...new Set(devices.map(d => d.region))];
  const versions = ["All", ...new Set(devices.map(d => d.appVersion))];
  const statuses = ["All", "Up-to-date", "Outdated", "Failed", "Inactive"];
  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 overflow-hidden flex flex-col shadow-sm transition-colors duration-300">
      <div className="p-8 border-b border-slate-50 dark:border-slate-800 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest leading-relaxed mb-1 py-1">{t('inventory.title')}</h3>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              {totalItems > 0 ? (
                <>Displaying {startIndex + 1}-{Math.min(startIndex + itemsPerPage, totalItems)} of {totalItems} assets</>
              ) : (
                <>No matching records found</>
              )}
            </p>
          </div>
          <div className="flex items-center gap-2 md:gap-3 w-full md:w-auto">
            <div className="relative group flex-1 md:flex-none">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-ms-green transition-colors" size={16} />
              <input 
                type="text" 
                placeholder="Search Asset..." 
                className="pl-10 pr-4 py-2.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl w-full md:w-[280px] text-xs font-bold text-slate-900 dark:text-white focus:ring-1 focus:ring-ms-green focus:bg-white dark:focus:bg-slate-900 outline-none transition-all shadow-inner"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="p-2.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-400 dark:text-slate-500 hover:text-ms-green hover:bg-white dark:hover:bg-slate-900 transition-all shrink-0 shadow-sm">
              <Filter size={18} />
            </button>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-4 md:gap-6 overflow-x-auto no-scrollbar pb-2">
          {[
            { label: t('inventory.region'), value: filters.region, options: regions, key: 'region' },
            { label: 'Version', value: filters.version, options: versions, key: 'version' },
            { label: 'Status', value: filters.status, options: statuses, key: 'status' }
          ].map((f) => (
            <div key={f.key} className="space-y-1.5 shrink-0">
              <label className="text-[9px] uppercase tracking-widest font-bold text-slate-400 ml-0.5">{f.label}</label>
              <select 
                className="block w-full min-w-[120px] bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 py-2 pl-3 pr-8 rounded-xl text-[10px] font-bold uppercase tracking-widest focus:ring-1 focus:ring-ms-green appearance-none cursor-pointer hover:bg-white dark:hover:bg-slate-900 transition-all shadow-sm"
                value={f.value}
                onChange={(e) => setFilters(prev => ({...prev, [f.key]: e.target.value}))}
              >
                {f.options.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
          ))}
          <button 
            onClick={() => setFilters({region: "All", version: "All", status: "All"})}
            className="md:pt-4 text-[10px] text-ms-green font-bold uppercase tracking-widest hover:text-ms-green-dark transition-colors shrink-0"
          >
            Reset Filters
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-x-auto overflow-y-auto max-h-[600px] custom-scrollbar">
        <table className="w-full text-left">
          <thead className="sticky top-0 z-10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md">
            <tr className="border-b border-slate-50 dark:border-slate-800">
              <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 cursor-pointer hover:text-ms-green" onClick={() => toggleSort('id')}>
                <div className="flex items-center gap-2">{t('inventory.assetId')} <ArrowUpDown size={10} /></div>
              </th>
              <th className="px-6 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">{t('inventory.appCore')}</th>
              <th className="px-6 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">{t('inventory.osBuild')}</th>
              <th className="px-6 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">{t('inventory.region')}</th>
              <th className="px-6 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 cursor-pointer hover:text-ms-green" onClick={() => toggleSort('lastSeen')}>
                <div className="flex items-center gap-2">{t('inventory.heartbeat')} <ArrowUpDown size={10} /></div>
              </th>
              <th className="px-6 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 text-center">{t('inventory.health')}</th>
              <th className="px-8 py-5"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
            <AnimatePresence mode="popLayout">
              {paginatedDevices.map((device) => (
                <motion.tr 
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  key={device.id} 
                  className="group hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-all cursor-pointer"
                  onClick={() => onDeviceClick(device)}
                >
                  <td className="px-8 py-5">
                    <div className="flex flex-col">
                      <span className="font-bold text-slate-900 dark:text-white group-hover:text-ms-green transition-colors">{device.id}</span>
                      <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold tracking-widest uppercase mt-0.5">{device.imei}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{device.appVersion}</span>
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-xs font-medium text-slate-600 dark:text-slate-400">{device.os}</span>
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">{device.region}</span>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                      <Clock size={12} className="text-slate-300 dark:text-slate-600" />
                      <span className="text-xs font-medium text-slate-600 dark:text-slate-400">{device.lastSeen}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <StatusBadge status={device.status} />
                  </td>
                  <td className="px-8 py-5 text-right">
                    <div className="p-1.5 rounded-lg border border-slate-100 dark:border-slate-800 group-hover:border-ms-green/20 group-hover:bg-ms-green/5 transition-all inline-block">
                      <ChevronRight size={14} className="text-slate-300 dark:text-slate-600 group-hover:text-ms-green group-hover:translate-x-0.5 transition-all" />
                    </div>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
      {totalItems === 0 ? (
        <div className="p-16 text-center border-t border-slate-50">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest italic">No operational assets found matching criteria</p>
        </div>
      ) : (
        <div className="px-8 py-6 border-t border-slate-50 dark:border-slate-800 flex items-center justify-between bg-white dark:bg-slate-900">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            Page <span className="text-slate-900">{currentPage}</span> / <span className="text-slate-900">{totalPages}</span>
          </div> 
          <div className="flex items-center gap-1.5">
            <button 
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 rounded-xl text-slate-400 hover:text-ms-green hover:bg-slate-50 disabled:opacity-30 transition-all border border-slate-100"
            >
              <ChevronLeft size={16} />
            </button>
            <div className="flex items-center gap-1.5">
              {[...Array(totalPages)].map((_, i) => {
                const pageNum = i + 1;
                if (pageNum === 1 || pageNum === totalPages || (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)) {
                  return (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={cn(
                        "w-8 h-8 flex items-center justify-center rounded-xl text-[10px] font-bold transition-all border",
                        currentPage === pageNum 
                          ? "bg-ms-green text-white border-ms-green shadow-lg shadow-ms-green/20" 
                          : "text-slate-400 hover:text-ms-green hover:border-ms-green/20 bg-white border-slate-100"
                      )}
                    >
                      {pageNum}
                    </button>
                  );
                } else if (pageNum === currentPage - 2 || pageNum === currentPage + 2) {
                  return <div key={pageNum} className="w-4 flex justify-center text-slate-300"><MoreHorizontal size={10} /></div>;
                }
                return null;
              })}
            </div>
            <button 
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 rounded-xl text-slate-400 hover:text-ms-green hover:bg-slate-50 disabled:opacity-30 transition-all border border-slate-100"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
