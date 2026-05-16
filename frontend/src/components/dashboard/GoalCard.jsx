import DashboardCard from './DashboardCard';
import { MoreHorizontal, Target } from 'lucide-react';
import { getStatusStyles } from '../../utils/formatters';

export default function GoalCard({ id, title, description, thrustArea, progress, status, weightage, dueDate, milestones, onSelect }) {
  const getProgressColor = (status) => {
    switch(status) {
      case 'On Track': return 'bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.5)]';
      case 'At Risk': return 'bg-red-400 shadow-[0_0_10px_rgba(248,113,113,0.5)]';
      case 'Delayed': return 'bg-orange-400 shadow-[0_0_10px_rgba(251,146,60,0.5)]';
      case 'Completed': return 'bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.5)]';
      default: return 'bg-[#8B7FFF] shadow-[0_0_10px_rgba(139,127,255,0.5)]';
    }
  };

  return (
    <DashboardCard className="group hover:border-[#8B7FFF]/50 transition-all cursor-pointer" onClick={onSelect}>
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#0c1324]/50 rounded-lg text-[#8B7FFF]">
            <Target size={20} />
          </div>
          <div>
            <h4 className="text-white font-semibold group-hover:text-[#8B7FFF] transition-colors">{title}</h4>
            <p className="text-gray-400 text-xs">{thrustArea} • {weightage}% Weight</p>
          </div>
        </div>
        <button className="text-gray-500 hover:text-white transition-colors p-1">
          <MoreHorizontal size={18} />
        </button>
      </div>

      <div className="mb-4 flex items-center justify-between">
        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${getStatusStyles(status)}`}>
          {status}
        </span>
        <span className="text-sm font-medium text-white">{progress}%</span>
      </div>

      <div className="w-full bg-[#0c1324]/80 rounded-full h-1.5 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-1000 ${getProgressColor(status)}`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </DashboardCard>
  );
}
