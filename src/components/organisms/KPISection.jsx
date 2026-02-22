import { useMemo } from 'react';
import { TabletSmartphone, CheckCircle, AlertTriangle, XCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import KPICard from '../molecules/KPICard';
export default function KPISection({ data }) {
  const { t } = useTranslation();
  const stats = useMemo(() => {
    const totalDevices = data.length;
    const upToDate = data.filter(d => d.status === "Up-to-date").length;
    const failed = data.filter(d => d.status === "Failed").length;
    const inactive = data.filter(d => d.lastSeenDays > 7).length;
    const upToDatePercent = totalDevices > 0 ? Math.round((upToDate / totalDevices) * 100) : 0;
    return [
      {
        id: 'total',
        title: t('stats.totalDevices'),
        value: totalDevices.toLocaleString(),
        icon: TabletSmartphone,
        color: "bg-indigo-500"
      },
      {
        id: 'compliance',
        title: t('stats.fleetCompliance'),
        value: `${upToDatePercent}%`,
        subtext: `${upToDate} / ${totalDevices}`,
        icon: CheckCircle,
        color: "bg-ms-green"
      },
      {
        id: 'inactive',
        title: t('stats.inactiveAssets'),
        value: inactive,
        subtext: "Seen > 7d",
        icon: AlertTriangle,
        color: "bg-amber-500"
      },
      {
        id: 'failures',
        title: t('stats.updateFailures'),
        value: failed,
        subtext: "In Queue",
        icon: XCircle,
        color: "bg-rose-500"
      }
    ];
  }, [data, t]);

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
      {stats.map(stat => (
        <KPICard key={stat.id} {...stat} />
      ))}
    </div>
  );
}
