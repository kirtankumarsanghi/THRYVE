import DashboardCard from '../common/DashboardCard';

export default function ProgressCard({ title, percentage, subtitle, colorClass = "bg-primary" }) {
  return (
    <DashboardCard className="hover:border-primary/30 transition-colors">
      <div className="flex justify-between items-end mb-4">
        <div>
          <h4 className="text-gray-400 font-medium text-sm">{title}</h4>
          <p className="text-white text-xs mt-1">{subtitle}</p>
        </div>
        <span className="text-2xl font-bold text-white">{percentage}%</span>
      </div>
      <div className="w-full bg-dark/80 rounded-full h-2">
        <div 
          className={`${colorClass} h-2 rounded-full transition-all duration-1000 shadow-[0_0_10px_rgba(139,127,255,0.5)]`} 
          style={{ width: `${percentage}%` }}
        />
      </div>
    </DashboardCard>
  );
}
