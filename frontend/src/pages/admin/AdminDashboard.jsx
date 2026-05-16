import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

export default function AdminDashboard() {
  // Mock data for stats
  const stats = [
    { label: "Total Employees", value: "156", icon: "groups", color: "error" },
    { label: "Goals Submitted", value: "342", icon: "flag", color: "secondary" },
    { label: "Pending Approvals", value: "23", icon: "pending_actions", color: "error", badge: true },
    { label: "Check-in Completion", value: "87%", icon: "task_alt", color: "primary" },
    { label: "Active Review Cycle", value: "Q3 2024", icon: "calendar_month", color: "tertiary" },
  ];

  // Department completion heatmap data
  const departments = [
    { name: "Engineering", q1: 92, q2: 88, q3: 85, q4: 0 },
    { name: "Product", q1: 95, q2: 91, q3: 89, q4: 0 },
    { name: "Marketing", q1: 88, q2: 85, q3: 82, q4: 0 },
    { name: "Sales", q1: 90, q2: 87, q3: 84, q4: 0 },
    { name: "HR", q1: 94, q2: 92, q3: 90, q4: 0 },
    { name: "Finance", q1: 96, q2: 94, q3: 91, q4: 0 },
  ];

  // Recent audit log
  const auditLogs = [
    { id: 1, timestamp: "14:32", actor: "Manager Priya", action: "approved", target: "Goal #12 for Arjun" },
    { id: 2, timestamp: "14:15", actor: "Admin Sarah", action: "created", target: "Review Cycle Q3 2024" },
    { id: 3, timestamp: "13:58", actor: "Manager John", action: "rejected", target: "Goal #45 for Mike" },
    { id: 4, timestamp: "13:42", actor: "Employee Lisa", action: "submitted", target: "Quarterly Check-in" },
    { id: 5, timestamp: "13:30", actor: "Manager David", action: "approved", target: "Goal #78 for Emma" },
    { id: 6, timestamp: "13:15", actor: "Admin Tom", action: "updated", target: "User permissions for Team Lead" },
    { id: 7, timestamp: "12:58", actor: "Manager Rachel", action: "commented", target: "Goal #23 for Alex" },
    { id: 8, timestamp: "12:45", actor: "Employee Mark", action: "updated", target: "Goal #56 progress" },
    { id: 9, timestamp: "12:30", actor: "Admin Sarah", action: "exported", target: "Q2 Performance Report" },
    { id: 10, timestamp: "12:15", actor: "Manager Chris", action: "approved", target: "Check-in for Jessica" },
  ];

  // Goal status data for donut chart
  const goalStatusData = [
    { name: 'Draft', value: 45, color: '#908fa0' },
    { name: 'Submitted', value: 78, color: '#4cd7f6' },
    { name: 'Approved', value: 123, color: '#c0c1ff' },
    { name: 'In Progress', value: 89, color: '#ddb7ff' },
    { name: 'Completed', value: 107, color: '#10b981' },
  ];

  const getHeatmapColor = (value) => {
    if (value === 0) return 'bg-surface-variant';
    if (value >= 90) return 'bg-[#10b981]/40 border-[#10b981]/60';
    if (value >= 75) return 'bg-[#f59e0b]/40 border-[#f59e0b]/60';
    return 'bg-error/40 border-error/60';
  };

  const getActionColor = (action) => {
    switch (action) {
      case 'approved': return 'text-secondary';
      case 'rejected': return 'text-error';
      case 'created': return 'text-primary';
      case 'updated': return 'text-tertiary';
      default: return 'text-on-surface-variant';
    }
  };

  return (
    <main className="pt-8 px-margin-mobile md:px-margin-desktop pb-24 max-w-container-max mx-auto min-h-screen">
      {/* Header */}
      <header className="mb-10">
        <div className="flex items-center gap-2 text-on-surface-variant mb-2">
          <span className="material-symbols-outlined text-error text-[20px]">admin_panel_settings</span>
          <span className="font-label-caps text-label-caps tracking-widest uppercase text-error">
            System Administration
          </span>
        </div>
        <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface">
          Admin Dashboard
        </h2>
        <p className="font-body-base text-body-base text-on-surface-variant mt-2">
          Monitor organization-wide performance and manage system settings
        </p>
      </header>

      {/* Top Stats Row - 5 Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-[#0F172A] border border-white/5 rounded-xl p-5 relative">
            <div className="flex items-center justify-between mb-3">
              <span className={`material-symbols-outlined text-${stat.color} text-[28px]`}>
                {stat.icon}
              </span>
              {stat.badge && (
                <span className="absolute top-4 right-4 min-w-[20px] h-5 px-1.5 flex items-center justify-center bg-error text-on-primary rounded-full text-[10px] font-bold shadow-[0_0_10px_rgba(255,180,171,0.5)]">
                  {stat.value}
                </span>
              )}
            </div>
            <div className="font-display-xl text-[28px] font-bold text-on-surface leading-none mb-1">
              {stat.value}
            </div>
            <p className="font-body-sm text-[12px] text-on-surface-variant">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Main Section - Two Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Left: Department Completion Heatmap */}
        <div className="bg-[#0F172A] border border-white/5 rounded-xl p-6">
          <h3 className="font-title-md text-title-md text-on-surface mb-6 flex items-center gap-2">
            <span className="material-symbols-outlined text-error">grid_view</span>
            Department Completion Heatmap
          </h3>
          <div className="overflow-x-auto">
            <div className="min-w-[400px]">
              {/* Header Row */}
              <div className="grid grid-cols-5 gap-2 mb-2">
                <div className="font-body-sm text-[12px] text-on-surface-variant font-semibold">Department</div>
                <div className="font-body-sm text-[12px] text-on-surface-variant font-semibold text-center">Q1</div>
                <div className="font-body-sm text-[12px] text-on-surface-variant font-semibold text-center">Q2</div>
                <div className="font-body-sm text-[12px] text-on-surface-variant font-semibold text-center">Q3</div>
                <div className="font-body-sm text-[12px] text-on-surface-variant font-semibold text-center">Q4</div>
              </div>
              {/* Data Rows */}
              {departments.map((dept, index) => (
                <div key={index} className="grid grid-cols-5 gap-2 mb-2">
                  <div className="font-body-sm text-body-sm text-on-surface py-2">{dept.name}</div>
                  <div className={`${getHeatmapColor(dept.q1)} border rounded-lg p-2 text-center font-body-sm text-body-sm text-on-surface font-bold shadow-[inset_0_0_8px_rgba(0,0,0,0.1)]`}>
                    {dept.q1}%
                  </div>
                  <div className={`${getHeatmapColor(dept.q2)} border rounded-lg p-2 text-center font-body-sm text-body-sm text-on-surface font-bold shadow-[inset_0_0_8px_rgba(0,0,0,0.1)]`}>
                    {dept.q2}%
                  </div>
                  <div className={`${getHeatmapColor(dept.q3)} border rounded-lg p-2 text-center font-body-sm text-body-sm text-on-surface font-bold shadow-[inset_0_0_8px_rgba(0,0,0,0.1)]`}>
                    {dept.q3}%
                  </div>
                  <div className={`${getHeatmapColor(dept.q4)} border rounded-lg p-2 text-center font-body-sm text-body-sm text-on-surface-variant`}>
                    -
                  </div>
                </div>
              ))}
              {/* Legend */}
              <div className="flex items-center gap-4 mt-4 pt-4 border-t border-outline-variant/10">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-[#10b981]/40 border border-[#10b981]/60"></div>
                  <span className="font-body-sm text-[11px] text-on-surface-variant">≥90%</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-[#f59e0b]/40 border border-[#f59e0b]/60"></div>
                  <span className="font-body-sm text-[11px] text-on-surface-variant">75-89%</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-error/40 border border-error/60"></div>
                  <span className="font-body-sm text-[11px] text-on-surface-variant">&lt;75%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Recent Audit Log */}
        <div className="bg-[#0F172A] border border-white/5 rounded-xl p-6">
          <h3 className="font-title-md text-title-md text-on-surface mb-6 flex items-center gap-2">
            <span className="material-symbols-outlined text-error">shield</span>
            Recent Audit Log
          </h3>
          <div className="space-y-3 max-h-[400px] overflow-y-auto custom-scrollbar pr-2">
            {auditLogs.map((log) => (
              <div key={log.id} className="flex items-start gap-3 p-3 rounded-lg bg-surface-container/30 border border-outline-variant/10 hover:border-outline-variant/30 transition-colors">
                <span className="material-symbols-outlined text-on-surface-variant text-[18px] mt-0.5">
                  history
                </span>
                <div className="flex-1 min-w-0">
                  <p className="font-body-sm text-[13px] text-on-surface leading-relaxed">
                    <span className="font-semibold">{log.actor}</span>
                    {' '}
                    <span className={`${getActionColor(log.action)} font-medium`}>{log.action}</span>
                    {' '}
                    <span className="text-on-surface-variant">{log.target}</span>
                  </p>
                  <p className="font-body-sm text-[11px] text-on-surface-variant mt-1">
                    Today at {log.timestamp}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom: Org-wide Goal Status Breakdown */}
      <div className="bg-[#0F172A] border border-white/5 rounded-xl p-6">
        <h3 className="font-title-md text-title-md text-on-surface mb-6 flex items-center gap-2">
          <span className="material-symbols-outlined text-error">donut_large</span>
          Organization-wide Goal Status
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Donut Chart */}
          <div className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={goalStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {goalStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#191f31', 
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px',
                    color: '#dce1fb'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Legend and Stats */}
          <div className="flex flex-col justify-center space-y-4">
            {goalStatusData.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-surface-container/30 border border-outline-variant/10">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-4 h-4 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="font-body-sm text-body-sm text-on-surface">{item.name}</span>
                </div>
                <div className="text-right">
                  <span className="font-title-md text-body-base text-on-surface font-bold">{item.value}</span>
                  <span className="font-body-sm text-[12px] text-on-surface-variant ml-2">
                    ({Math.round((item.value / goalStatusData.reduce((sum, d) => sum + d.value, 0)) * 100)}%)
                  </span>
                </div>
              </div>
            ))}
            <div className="pt-4 border-t border-outline-variant/10">
              <div className="flex items-center justify-between">
                <span className="font-title-md text-body-base text-on-surface font-semibold">Total Goals</span>
                <span className="font-display-xl text-[32px] font-bold text-primary">
                  {goalStatusData.reduce((sum, item) => sum + item.value, 0)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.02);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </main>
  );
}
