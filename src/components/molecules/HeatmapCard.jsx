import { Globe } from 'lucide-react';
import Card from './Card';
import RegionHeatmap from '../organisms/RegionHeatmap';
export default function HeatmapCard({ data, onRegionClick }) {
  return (
    <Card className="p-0 md:p-2 h-full overflow-hidden transition-colors duration-300 group">
      <div className="absolute top-0 right-0 p-10 opacity-10 pointer-events-none group-hover:scale-110 group-hover:opacity-20 transition-all duration-700">
        <Globe size={120} className="text-ms-green" />
      </div>
      <RegionHeatmap data={data} onRegionClick={onRegionClick} />
    </Card>
  );
}
