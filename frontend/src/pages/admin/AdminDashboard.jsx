import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { useAdmin } from '../../context/AdminContext';
import { useNavigate } from 'react-router-dom';
import LiveDataNotice from '../../components/common/LiveDataNotice';

const STATUS_COLORS = {
  Draft: '#908fa0',
  Submitted: '#4cd7f6',
  Approved: '#c0c1ff',
  'In Progress': '#ddb7ff',
  Completed: '#10b981',
  pending: '#4cd7f6',
  approved: '#c0c1ff',
  in_progress: '#ddb7ff',
  completed: '#10b981',
};

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { departments, users, kpis, auditLogs, loading } = useAdmin();

  // Derive stats from real data
  const totalEmployees = users?.length || kpis?.total_employees || 0;
  const totalGoals = kpis?.total_goals || 0;
  const pendingApprovals = kpis?.pending_approvals || 0;
  const completionRate = kpis?.completion_rate || kpis?.check_in_completion || 0;

  const stats = [
    { label: "Total Employees", value: String(totalEmployees), icon: "groups", color: "error" },
    { label: "Goals Submitted", value: String(totalGoals), icon: "flag", color: "secondary" },
    { label: "Pending Approvals", value: String(pendingApprovals), icon: "pending_actions", color: "error", badge: pendingApprovals > 0 },
    { label: "Completion Rate", value: `${Math.round(completionRate)}%`, icon: "task_alt", color: "primary" },
    { label: "Departments", value: String(departments?.length || 0), icon: "apartment", color: "tertiary" },
  ];

  // Build goal status data for chart from kpis
  const goalStatusData = kpis?.status_distribution
    ? Object.entries(kpis.status_distribution).map(([name, value]) => ({
        name: name.charAt(0).toUpperCase() + name.slice(1).replace('_', ' '),
        value,
        color: STATUS_COLORS[name] || '#908fa0',
      })).filter(d => d.value > 0)
    : [];

  // Department heatmap from real department data
  const deptRows = (departments || []).map(dept => ({
    name: dept.name || dept.department || 'Unknown',
    completion: dept.completion_rate || dept.avg_progress || 0,
    goalCount: dept.goal_count || dept.total_goals || 0,
    employeeCount: dept.employee_count || 0,
  }));

  const getHeatmapColor = (value) => {
    if (value === 0) return 'bg-surface-variant';
    if (value >= 90) return 'bg-[#10b981]/40 border-[#10b981]/60';
    if (value >= 75) return 'bg-[#f59e0b]/40 border-[#f59e0b]/60';
    return 'bg-error/40 border-error/60';
  };

  const getActionColor = (action) => {
    if (action?.includes('approved') || action?.includes('approve')) return 'text-secondary';
    if (action?.includes('rejected') || action?.includes('reject')) return 'text-error';
    if (action?.includes('created') || action?.includes('create')) return 'text-primary';
    if (action?.includes('updated') || action?.includes('update')) return 'text-tertiary';
    if (action?.includes('deleted') || action?.includes('delete')) return 'text-error';
    return 'text-on-surface-variant';
  };

  if (loading) {
    return (
      <main className="pt-8 px-margin-mobile md:px-margin-desktop pb-24 max-w-container-max mx-auto min-h-screen flex items-center justify-center">
        <div className="text-center">
          <span className="material-symbols-outlined text-error text-[48px] animate-spin">progress_activity</span>
          <p className="text-on-surface-variant mt-4">Loading admin dashboard...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-8 px-margin-mobile md:px-margin-desktop pb-24 max-w-container-max mx-auto min-h-screen">
      <LiveDataNotice source="Admin + Analytics APIs" hint="Role changes, approvals, and audits are reflected here automatically." />
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

      {/* Top Stats Row */}
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
        {/* Left: Department Overview */}
        <div className="bg-[#0F172A] border border-white/5 rounded-xl p-6">
          <h3 className="font-title-md text-title-md text-on-surface mb-6 flex items-center gap-2">
            <span className="material-symbols-outlined text-error">grid_view</span>
            Department Performance
          </h3>
          {deptRows.length > 0 ? (
            <div className="space-y-3">
              {deptRows.map((dept, index) => (
                <div key={index} className="flex items-center gap-4 p-3 rounded-lg bg-surface-container/30 border border-outline-variant/10">
                  <div className="flex-1">
                    <p className="font-body-sm text-body-sm text-on-surface font-medium">{dept.name}</p>
                    <p className="font-body-sm text-[12px] text-on-surface-variant">
                      {dept.employeeCount} employees · {dept.goalCount} goals
                    </p>
                  </div>
                  <div className={`${getHeatmapColor(dept.completion)} border rounded-lg px-3 py-2 text-center font-body-sm text-body-sm text-on-surface font-bold min-w-[60px]`}>
                    {Math.round(dept.completion)}%
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
          ) : (
            <div className="text-center py-8 text-on-surface-variant text-sm">
              No department data available yet.
            </div>
          )}
        </div>

        {/* Right: Recent Audit Log */}
        <div className="bg-[#0F172A] border border-white/5 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-title-md text-title-md text-on-surface flex items-center gap-2">
              <span className="material-symbols-outlined text-error">shield</span>
              Recent Audit Log
            </h3>
            <button
              onClick={() => navigate('/admin/audit')}
              className="font-body-sm text-body-sm text-primary hover:text-primary-fixed transition-colors flex items-center gap-1"
            >
              View All
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>
          <div className="space-y-3 max-h-[400px] overflow-y-auto custom-scrollbar pr-2">
            {auditLogs.length > 0 ? auditLogs.slice(0, 10).map((log) => (
              <div key={log.id} className="flex items-start gap-3 p-3 rounded-lg bg-surface-container/30 border border-outline-variant/10 hover:border-outline-variant/30 transition-colors">
                <span className="material-symbols-outlined text-on-surface-variant text-[18px] mt-0.5">
                  history
                </span>
                <div className="flex-1 min-w-0">
                  <p className="font-body-sm text-[13px] text-on-surface leading-relaxed">
                    <span className="font-semibold">{log.user_email || `User #${log.user_id}`}</span>
                    {' '}
                    <span className={`${getActionColor(log.action)} font-medium`}>{log.action?.replace(/_/g, ' ')}</span>
                    {' '}
                    <span className="text-on-surface-variant">{log.target}</span>
                  </p>
                  <p className="font-body-sm text-[11px] text-on-surface-variant mt-1">
                    {log.timestamp ? new Date(log.timestamp).toLocaleString() : ''}
                  </p>
                </div>
              </div>
            )) : (
              <div className="text-center py-8 text-on-surface-variant text-sm">
                No audit logs yet. Actions will appear here automatically.
              </div>
            )}
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
            {goalStatusData.length > 0 ? (
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
            ) : (
              <div className="flex items-center justify-center h-[300px] text-on-surface-variant text-sm">
                No goal data available yet.
              </div>
            )}
          </div>

          {/* Legend and Stats */}
          <div className="flex flex-col justify-center space-y-4">
            {goalStatusData.length > 0 ? goalStatusData.map((item, index) => {
              const total = goalStatusData.reduce((sum, d) => sum + d.value, 0);
              return (
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
                      ({Math.round((item.value / total) * 100)}%)
                    </span>
                  </div>
                </div>
              );
            }) : (
              <div className="text-center py-8 text-on-surface-variant text-sm">
                Create goals to see status distribution.
              </div>
            )}
            {goalStatusData.length > 0 && (
              <div className="pt-4 border-t border-outline-variant/10">
                <div className="flex items-center justify-between">
                  <span className="font-title-md text-body-base text-on-surface font-semibold">Total Goals</span>
                  <span className="font-display-xl text-[32px] font-bold text-primary">
                    {goalStatusData.reduce((sum, item) => sum + item.value, 0)}
                  </span>
                </div>
              </div>
            )}
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
