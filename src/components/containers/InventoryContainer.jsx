import { useState, useMemo } from 'react';
import InventoryTable from '../organisms/InventoryTable';
import { EmptyState } from '../molecules/StateFeedback';
import { Search } from 'lucide-react';
export default function InventoryContainer({ devices, onDeviceClick, initialFilter = {} }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    region: initialFilter.region || 'All',
    status: 'All'
  });
  const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const filteredDevices = useMemo(() => {
    let result = [...devices];
    if (searchTerm) {
      result = result.filter(d => 
        d.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.imei.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (filters.region !== 'All') {
      result = result.filter(d => d.region === filters.region);
    }
    if (filters.status !== 'All') {
      result = result.filter(d => d.status === filters.status);
    }
    result.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
    return result;
  }, [devices, searchTerm, filters, sortConfig]);
  const totalPages = Math.ceil(filteredDevices.length / itemsPerPage);
  const paginatedDevices = filteredDevices.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };
  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };
  const hasActiveFilters = searchTerm !== "" || filters.region !== 'All' || filters.status !== 'All';
  return (
    <div className="space-y-6">
      <InventoryTable 
        devices={paginatedDevices}
        onDeviceClick={onDeviceClick}
        onSort={handleSort}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        filters={filters}
        onFilterChange={handleFilterChange}
        pagination={{
          currentPage,
          totalPages,
          total: filteredDevices.length,
          from: (currentPage - 1) * itemsPerPage + 1,
          to: Math.min(currentPage * itemsPerPage, filteredDevices.length)
        }}
        onPageChange={setCurrentPage}
        isEmpty={filteredDevices.length === 0}
        emptyComponent={
          <EmptyState 
            title={hasActiveFilters ? "No Matching Assets" : "Inventory Empty"}
            description={hasActiveFilters ? "Try adjusting your search or filters to locate specific devices." : "No devices are currently registered in the MDM system."}
            icon={Search}
          />
        }
      />
    </div>
  );
}
