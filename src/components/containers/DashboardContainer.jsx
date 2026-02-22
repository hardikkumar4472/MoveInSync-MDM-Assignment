import { useState, useCallback, useMemo, useEffect } from 'react';
import { ShieldCheck, Activity, UserCheck, RefreshCw } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import DashboardTemplate from '../templates/DashboardTemplate';
import Navbar from '../organisms/Navbar';
import KPISection from '../organisms/KPISection';
import InventoryContainer from './InventoryContainer';
import PageHeader from '../molecules/PageHeader';
import SectionTitle from '../molecules/SectionTitle';
import PropagationCard from '../molecules/PropagationCard';
import HeatmapCard from '../molecules/HeatmapCard';
import RolloutMonitor from '../organisms/RolloutMonitor';
import AuditLog from '../organisms/AuditLog';
import UpdateScheduleForm from '../organisms/UpdateScheduleForm';
import DeviceDetailPanel from '../organisms/DeviceDetailPanel';
import RolloutDetailPanel from '../organisms/RolloutDetailPanel';
import AlertModal from '../molecules/AlertModal';
import { Skeleton, KPISkeleton, TableSkeleton, ErrorState } from '../molecules/StateFeedback';
import { heatmapData } from '../../data/mockData';
import { useUI } from '../../context/UIContext';
import { selectAllDevices, selectDeviceStatus, selectDeviceError, fetchDevices,setSelectedDevice} from '../../store/slices/deviceSlice';
import { selectAllRollouts, selectRolloutStatus, fetchRollouts, addRollout, simulateProgress } from '../../store/slices/rolloutSlice';
export default function DashboardContainer({ onLogout }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  
  useEffect(() => {
    const timer = setInterval(() => {
      dispatch(simulateProgress());
    }, 5000);
    return () => clearInterval(timer);
  }, [dispatch]);

  const { userRole,activeTab,setActiveTab,setActiveTabQuiet,showSchedulingForm,openSchedulingForm, closeSchedulingForm,alert,showAlert,closeAlert} = useUI();
  const devices = useSelector(selectAllDevices);
  const deviceStatus = useSelector(selectDeviceStatus);
  const deviceError = useSelector(selectDeviceError);
  const rollouts = useSelector(selectAllRollouts);
  const rolloutStatus = useSelector(selectRolloutStatus);
  useEffect(() => {
    if (deviceStatus === 'idle') {
      dispatch(fetchDevices());
    }
  }, [deviceStatus, dispatch]);
  useEffect(() => {
    if (rolloutStatus === 'idle') {
      dispatch(fetchRollouts());
    }
  }, [rolloutStatus, dispatch]);
  const handleRetryDevices = () => dispatch(fetchDevices());
  const handleRetryRollouts = () => dispatch(fetchRollouts());
  const [tableFilter, setTableFilter] = useState({ region: 'All' });
  const roles = useMemo(() => [
    { id: 'admin', label: 'Admin', desc: 'Full Control', icon: ShieldCheck },
    { id: 'ops', label: 'Operations', desc: 'Schedule Only', icon: Activity },
    { id: 'analyst', label: 'Analyst', desc: 'Read Only', icon: UserCheck },
  ], []);
  const handleRegionClick = useCallback((region) => {
    setActiveTabQuiet('inventory');
    setTableFilter({ region });
    setTimeout(() => {
      document.getElementById('device-table')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  }, [setActiveTabQuiet]);
  const handleDeviceClick = useCallback((device) => {
    dispatch(setSelectedDevice(device));
  }, [dispatch]);
  return (
    <DashboardTemplate
      navbar={<Navbar roles={roles} onLogout={onLogout} />}
    >
      <div className="space-y-10 md:space-y-16">
        {!showSchedulingForm && activeTab === 'inventory' && (
          <PageHeader 
            title="MoveInSync"
            subtitle={t('intro.subtitle')}
            description={t('intro.description')}
          />
        )}
        {showSchedulingForm ? (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <UpdateScheduleForm 
              userRole={userRole}
              onCancel={closeSchedulingForm} 
              onSubmit={(data) => { 
                const rolloutId = `ROLL-${Math.floor(Math.random() * 9000) + 1000}`;
                const newRollout = {
                  id: rolloutId,
                  name: data.customTag || "Fleet Update Propagation",
                  toVersion: data.toVersion || "v2.4.0",
                  fromVersion: data.fromVersion || "v2.3.6",
                  status: data.status || 'Active',
                  type: data.rolloutType || 'Immediate',
                  progress: 0,
                  region: data.region || 'All',
                  startTime: new Date().toLocaleString(),
                  stages: { 
                    scheduled: 1200, notified: 0, downloading: 0, 
                    installing: 0, completed: 0, failed: 0 
                  }
                };
                
                dispatch(addRollout(newRollout));
                closeSchedulingForm(); 
                setActiveTab('monitor');
                
                setTimeout(() => {
                  showAlert({
                    type: data.status === 'Pending Approval' ? 'info' : 'success',
                    title: data.status === 'Pending Approval' ? 'Approval Requested' : 'Rollout Initiated',
                    message: data.status === 'Pending Approval' 
                      ? `Your request for ${data.toVersion} in ${data.region} has been submitted for Admin approval.`
                      : `The fleet update to ${data.toVersion} has been successfully queued for ${data.region} nodes.`,
                    confirmLabel: 'Acknowledge'
                  });
                }, 300);
              }}
            />
          </motion.div>
        ) : activeTab === 'monitor' ? (
          rolloutStatus === 'loading' ? (
            <div className="space-y-10">
              <Skeleton className="h-10 w-64" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Skeleton className="h-48 rounded-[2rem]" />
                <Skeleton className="h-48 rounded-[2rem]" />
              </div>
            </div>
          ) : rolloutStatus === 'failed' ? (
            <ErrorState onRetry={handleRetryRollouts} />
          ) : (
            <RolloutMonitor rollouts={rollouts} userRole={userRole} />
          )
        ) : activeTab === 'audit' ? (
          <AuditLog />
        ) : (
          <>
            <section>
              <SectionTitle>{t('stats.title')}</SectionTitle>
              {deviceStatus === 'loading' ? (
                <KPISkeleton />
              ) : deviceStatus === 'failed' ? (
                <div className="h-48" />
              ) : (
                <KPISection data={devices} />
              )}
            </section>
            {deviceStatus === 'failed' ? (
              <ErrorState 
                message={deviceError} 
                onRetry={handleRetryDevices} 
                className="my-12"
              />
            ) : (
              <>
                <section className="grid grid-cols-1 xl:grid-cols-5 gap-10 min-h-[500px]">
                  <div className="xl:col-span-3 flex flex-col">
                    {deviceStatus === 'loading' ? (
                      <Skeleton className="h-[500px] rounded-[2.5rem]" />
                    ) : (
                      <div className="flex-1 min-h-[500px]">
                        <HeatmapCard data={heatmapData} onRegionClick={handleRegionClick} />
                      </div>
                    )}
                  </div>
                  <div className="xl:col-span-2 flex flex-col">
                    {deviceStatus === 'loading' ? (
                      <Skeleton className="h-full min-h-[500px] rounded-[2.5rem]" />
                    ) : (
                      <div className="flex-1">
                        <PropagationCard userRole={userRole} onShowScheduling={openSchedulingForm} />
                      </div>
                    )}
                  </div>
                </section>
                <section id="device-table" className="scroll-mt-32">
                  <div className="flex items-center justify-between mb-10 pb-4">
                    <div>
                      <SectionTitle className="mb-2">{t('inventory.title')}</SectionTitle>
                      <p className="text-2xl font-black text-slate-800 dark:text-white tracking-tight -mt-4 py-2">{t('inventory.subtitle')}</p>
                    </div>
                  </div>
                  {deviceStatus === 'loading' ? (
                    <TableSkeleton />
                  ) : (
                    <InventoryContainer devices={devices} onDeviceClick={handleDeviceClick} initialFilter={tableFilter} />
                  )}
                </section>
              </>
            )}
          </>
        )}
      </div>
      <DeviceDetailPanel />
      <RolloutDetailPanel />
      <AlertModal {...alert} onClose={closeAlert} />
    </DashboardTemplate>
  );
}
