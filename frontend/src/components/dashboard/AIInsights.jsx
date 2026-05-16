import { Sparkles } from 'lucide-react';
import InsightCard from './InsightCard';
import { mockInsights } from '../../data/mockData';

export default function AIInsights() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-6">
        <Sparkles size={20} className="text-primary" />
        <h3 className="font-semibold text-lg text-white">Thryve AI Insights</h3>
      </div>
      
      <div className="space-y-4">
        {mockInsights.map(insight => (
          <InsightCard key={insight.id} insight={insight} />
        ))}
      </div>
    </div>
  );
}
