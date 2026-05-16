import DashboardCard from '../common/DashboardCard';
import { Lightbulb, AlertTriangle, Info } from 'lucide-react';

export default function InsightCard({ insight }) {
  const getConfig = (type) => {
    switch(type) {
      case 'positive': return { icon: Lightbulb, color: 'text-emerald-400', bg: 'bg-emerald-400/10', border: 'border-emerald-400/20' };
      case 'risk': return { icon: AlertTriangle, color: 'text-red-400', bg: 'bg-red-400/10', border: 'border-red-400/20' };
      case 'info': return { icon: Info, color: 'text-cyan-400', bg: 'bg-cyan-400/10', border: 'border-cyan-400/20' };
      default: return { icon: Info, color: 'text-primary', bg: 'bg-primary/10', border: 'border-primary/20' };
    }
  };

  const config = getConfig(insight.type);
  const Icon = config.icon;

  return (
    <DashboardCard className={`border ${config.border} bg-card/20 hover:bg-card/40 transition-colors`}>
      <div className="flex gap-4">
        <div className={`p-3 rounded-xl ${config.bg} ${config.color} h-fit`}>
          <Icon size={20} />
        </div>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h4 className="text-sm font-semibold text-white capitalize">{insight.type} Insight</h4>
            <span className="text-[10px] uppercase tracking-wider text-gray-400 bg-dark/50 px-2 py-0.5 rounded-full">
              {insight.impact} Impact
            </span>
          </div>
          <p className="text-sm text-gray-300 leading-relaxed">{insight.text}</p>
        </div>
      </div>
    </DashboardCard>
  );
}
