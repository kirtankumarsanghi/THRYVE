import DashboardCard from "./DashboardCard";

export default function StatCard({ title, value, icon: Icon, trend, trendUp }) {
  return (
    <DashboardCard className="hover:border-primary/30 transition-colors group">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-gray-400 text-sm font-medium mb-1">{title}</p>
          <h3 className="text-3xl font-bold text-white tracking-tight">{value}</h3>
          
          {trend && (
            <div className={`flex items-center gap-1 mt-2 text-sm font-medium ${trendUp ? "text-emerald-400" : "text-red-400"}`}>
              <span>{trendUp ? "↑" : "↓"}</span>
              <span>{trend}</span>
            </div>
          )}
        </div>
        <div className="p-3 bg-dark/50 rounded-xl text-primary group-hover:scale-110 transition-transform">
          {Icon && <Icon size={24} />}
        </div>
      </div>
    </DashboardCard>
  );
}
