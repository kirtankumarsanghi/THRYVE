export default function DashboardCard({ title, subtitle, action, children, className = "" }) {
  return (
    <div className={`bg-card/40 backdrop-blur-xl border border-border/60 rounded-2xl p-6 shadow-xl ${className}`}>
      {(title || subtitle || action) && (
        <div className="flex items-start justify-between gap-4 mb-5">
          <div>
            {title && <h3 className="text-lg font-semibold text-white">{title}</h3>}
            {subtitle && <p className="text-sm text-gray-400 mt-1">{subtitle}</p>}
          </div>
          {action && <div>{action}</div>}
        </div>
      )}
      {children}
    </div>
  );
}
