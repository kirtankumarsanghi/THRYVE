import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Calendar, CheckCircle2, ClipboardList, Target, TrendingUp, Zap } from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { useGoals, calculateGoalProgress } from "../../context/GoalContext";
import useAnalytics from "../../hooks/useAnalytics";
import LiveDataNotice from "../../components/common/LiveDataNotice";

const STATUS_COLORS = ["#38bdf8", "#6366f1", "#10b981", "#f59e0b"];

export default function Dashboard() {
  const navigate = useNavigate();
  const { goals = [], loading: goalsLoading } = useGoals();
  const { overview, trends, status, loading: analyticsLoading } = useAnalytics();

  const loading = goalsLoading || analyticsLoading;

  const trendData =
    trends?.quarters?.map((q, i) => ({
      quarter: q,
      completion: trends.completion_rates?.[i] || 0,
      progress: trends.avg_progress?.[i] || 0,
    })) || [];

  const statusData = [
    { name: "Pending", value: status?.pending || 0 },
    { name: "In Progress", value: status?.in_progress || 0 },
    { name: "Completed", value: status?.completed || 0 },
    { name: "At Risk", value: status?.at_risk || 0 },
  ];

  const spotlight = useMemo(
    () => [...goals].sort((a, b) => calculateGoalProgress(b) - calculateGoalProgress(a)).slice(0, 4),
    [goals]
  );

  return (
    <div className="app-shell py-6 space-y-6">
      <LiveDataNotice source="Analytics + Goals APIs" hint="Values update when employee check-ins and manager approvals are submitted." />
      <div className="relative overflow-hidden rounded-3xl border border-white/10 p-8 bg-gradient-to-br from-[#101a3f] via-[#0b1431] to-[#091028]">
        <div className="absolute -top-24 -right-10 w-96 h-96 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute -bottom-32 left-0 w-[30rem] h-[30rem] rounded-full bg-indigo-500/10 blur-3xl" />
        <div className="relative flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-cyan-300 mb-3">Live Employee Workspace</p>
            <h1 className="text-3xl lg:text-4xl font-bold text-white">Performance Dashboard</h1>
            <p className="text-slate-300 mt-2 max-w-2xl">
              Track goal velocity, quarterly execution, and progress quality with real-time organizational analytics.
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate("/employee/goals/create")}
            className="px-5 py-3 rounded-xl bg-cyan-400/20 border border-cyan-300/40 text-cyan-100 hover:bg-cyan-400/30 transition-colors inline-flex items-center gap-2"
          >
            <Zap size={16} /> Create Strategic Goal
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-4 gap-4">
        <Kpi title="My Goals" value={goals.length} icon={Target} tone="text-blue-300" />
        <Kpi title="Completed" value={overview?.completed_goals ?? 0} icon={CheckCircle2} tone="text-emerald-300" />
        <Kpi title="Avg Progress" value={`${overview?.avg_progress ?? 0}%`} icon={TrendingUp} tone="text-cyan-300" />
        <Kpi title="Pending Approval" value={overview?.pending_goals ?? 0} icon={ClipboardList} tone="text-amber-300" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-12 gap-6">
        <div className="2xl:col-span-7 surface-card p-6 min-w-0">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-white font-semibold text-lg">Quarterly Performance Trend</h2>
            <button type="button" onClick={() => navigate("/employee/analytics")} className="text-sm text-slate-300 hover:text-white flex items-center gap-1">
              Open Analytics <ArrowRight size={14} />
            </button>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData} margin={{ top: 8, right: 8, left: -20, bottom: 8 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
                <XAxis dataKey="quarter" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip />
                <Line type="monotone" dataKey="completion" stroke="#22d3ee" strokeWidth={3} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="progress" stroke="#818cf8" strokeWidth={3} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="2xl:col-span-5 surface-card p-6 min-w-0">
          <h2 className="text-white font-semibold text-lg mb-5">Status Mix</h2>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={statusData} dataKey="value" nameKey="name" innerRadius={56} outerRadius={88} paddingAngle={4}>
                  {statusData.map((_, i) => <Cell key={i} fill={STATUS_COLORS[i % STATUS_COLORS.length]} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-3">
            {statusData.map((s, i) => (
              <div key={s.name} className="text-xs rounded-lg px-3 py-2 bg-white/[0.03] border border-white/10 flex items-center justify-between">
                <span className="text-slate-300">{s.name}</span>
                <span style={{ color: STATUS_COLORS[i] }} className="font-semibold">{s.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="2xl:col-span-8 surface-card p-6 min-w-0">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-white font-semibold text-lg">Goal Spotlight</h2>
            <button type="button" onClick={() => navigate("/employee/goals")} className="text-sm text-slate-300 hover:text-white flex items-center gap-1">
              View all goals <ArrowRight size={14} />
            </button>
          </div>
          {loading ? (
            <div className="space-y-3">{[1, 2, 3].map((i) => <div key={i} className="h-14 rounded-xl bg-white/5 animate-pulse" />)}</div>
          ) : spotlight.length === 0 ? (
            <div className="text-center py-14 text-slate-400">No goals yet. Start by creating your first strategic goal.</div>
          ) : (
            <div className="space-y-3">
              {spotlight.map((goal) => {
                const progress = calculateGoalProgress(goal);
                return (
                  <button
                    type="button"
                    key={goal.id}
                    onClick={() => navigate(`/employee/goals/${goal.id}`)}
                    className="w-full text-left p-4 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] hover:border-cyan-300/30 transition-all"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:justify-between">
                      <div>
                        <p className="text-white font-medium">{goal.title}</p>
                        <p className="text-xs text-slate-400 mt-1">{goal.strategic_area || "General"} • {goal.quarter || "-"}</p>
                      </div>
                      <div className="w-full sm:w-56">
                        <div className="flex justify-between text-xs text-slate-400 mb-1">
                          <span>Progress</span>
                          <span className="text-white">{progress}%</span>
                        </div>
                        <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                          <div className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500" style={{ width: `${progress}%` }} />
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <div className="2xl:col-span-4 surface-card p-6 min-w-0">
          <h2 className="text-white font-semibold text-lg mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <Action label="Update Quarterly Check-in" icon={Calendar} onClick={() => navigate("/employee/checkins")} />
            <Action label="Open My Progress" icon={TrendingUp} onClick={() => navigate("/employee/analytics")} />
            <Action label="Review Notifications" icon={ClipboardList} onClick={() => navigate("/employee/notifications")} />
            <Action label="Create New Goal" icon={Target} onClick={() => navigate("/employee/goals/create")} />
          </div>
        </div>
      </div>
    </div>
  );
}

function Kpi({ title, value, icon: Icon, tone }) {
  return (
    <div className="surface-card p-5">
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase tracking-wider text-slate-400">{title}</p>
        <Icon className={`w-4 h-4 ${tone}`} />
      </div>
      <p className="kpi-value text-white mt-2">{value}</p>
    </div>
  );
}

function Action({ label, icon: Icon, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full p-3 rounded-xl border border-white/12 bg-white/[0.02] hover:bg-white/[0.05] hover:border-cyan-300/30 text-left transition-all flex items-center justify-between"
    >
      <span className="text-sm text-white flex items-center gap-2"><Icon size={15} className="text-cyan-300" /> {label}</span>
      <ArrowRight size={14} className="text-slate-400" />
    </button>
  );
}
