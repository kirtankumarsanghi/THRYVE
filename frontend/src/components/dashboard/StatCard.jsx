export default function StatCard({
  title,
  value,
  change,
  trend,
  trendDirection,
  badge,
  icon: Icon,
}) {
  // Support both simple (change) and rich (trend/badge/icon) variants
  const displayChange = change || trend;
  const isPositive = trendDirection === "up" || (displayChange && displayChange.startsWith("+"));

  return (
    <div className="bg-[#101935] border border-[#1E2A4A] rounded-3xl p-6 hover:border-[#8B7FFF] transition-all">
      <div className="flex items-center justify-between">
        <p className="text-gray-400 text-sm">
          {title}
        </p>

        {Icon && (
          <div className="p-2 bg-[#8B7FFF]/10 rounded-xl">
            <Icon size={18} className="text-[#8B7FFF]" />
          </div>
        )}
      </div>

      <h2 className="text-4xl font-bold mt-3">
        {value}
      </h2>

      <div className="flex items-center gap-2 mt-3">
        {displayChange && (
          <p className={`text-sm ${isPositive ? "text-emerald-400" : "text-amber-400"}`}>
            {displayChange}
          </p>
        )}

        {badge && (
          <span className="text-xs bg-[#8B7FFF]/10 text-[#8B7FFF] px-2 py-0.5 rounded-full">
            {badge}
          </span>
        )}
      </div>
    </div>
  );
}
