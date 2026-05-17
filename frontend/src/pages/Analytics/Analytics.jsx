import { AlertTriangle, BarChart3, MoreHorizontal, PieChart as PieIcon, Sparkles, Trophy, TrendingUp, ArrowRight, CheckCircle2 } from "lucide-react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  CartesianGrid,
  XAxis,
  YAxis,
  LineChart,
  Line,
  BarChart,
  Bar,
} from "recharts";
import PageContainer from "../../components/common/PageContainer";
import useAnalytics from "../../hooks/useAnalytics";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const COLORS = ["#38bdf8", "#6366f1", "#10b981", "#f59e0b", "#ef4444", "#a855f7"];

export default function Analytics() {
  const navigate = useNavigate();
  const { overview, trends, status, strategicAreas, rankings, departments, loading, error } = useAnalytics();

  const statusData = status
    ? [
        { name: "Pending", value: status.pending || 0 },
        { name: "In Progress", value: status.in_progress || 0 },
        { name: "Completed", value: status.completed || 0 },
        { name: "At Risk", value: status.at_risk || 0 },
      ]
    : [];

  const trendData = trends?.quarters?.map((q, i) => ({
    quarter: q,
    completion: trends.completion_rates?.[i] || 0,
    progress: trends.avg_progress?.[i] || 0,
  })) || [];

  const areaData = strategicAreas.map((a) => ({
    area: a.strategic_area,
    goals: a.goal_count,
    completion: a.completion_rate,
  }));

  const deptData = departments.map((d) => ({
    department: d.department,
    completion: d.completion_rate,
    avgProgress: d.avg_progress,
  }));

  const healthRows = useMemo(() => {
    const top = [...deptData].sort((a, b) => b.avgProgress - a.avgProgress).slice(0, 2);
    return top.map((d) => {
      const score = Math.max(0, Math.min(100, Math.round(d.avgProgress || 0)));
      const filled = Math.max(1, Math.round(score / 25));
      return {
        label: d.department,
        sub: `${score}% avg progress`,
        colors: Array.from({ length: 4 }).map((_, i) => {
          if (i + 1 > filled) return "bg-slate-600/50";
          if (score >= 80) return "bg-emerald-500/45";
          if (score >= 55) return "bg-cyan-400/40";
          return "bg-amber-500/40";
        }),
      };
    });
  }, [deptData]);

  const lifecycle = useMemo(() => {
    const completion = overview?.completion_rate ?? 0;
    if (completion >= 90) return { phase: "Completed", progress: 100, step: 4 };
    if (completion >= 70) return { phase: "Review", progress: 78, step: 3 };
    if (completion >= 35) return { phase: "Execution & Tracking", progress: 48, step: 2 };
    return { phase: "Draft", progress: 20, step: 1 };
  }, [overview]);

  return (
    <PageContainer>
      <div className="relative overflow-hidden rounded-3xl border border-white/10 p-8 bg-gradient-to-br from-[#111b3d] via-[#0d1530] to-[#0a1024]">
        <div className="absolute -top-20 right-0 w-80 h-80 bg-cyan-400/10 blur-3xl rounded-full" />
        <div className="absolute -bottom-24 left-0 w-96 h-96 bg-indigo-500/10 blur-3xl rounded-full" />
        <div className="relative">
        <h1 className="text-3xl font-bold text-white">Performance Analytics</h1>
        <p className="text-slate-300/90 mt-2 max-w-2xl">Live analytics powered by your current organization data, with deeper breakdowns for progress, risks, and execution quality.</p>
        </div>
      </div>

      {error && <div className="surface-card border-red-500/30 text-red-300 p-4">{error}</div>}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <Metric title="Total Goals" value={overview?.total_goals} icon={BarChart3} />
        <Metric title="Completion Rate" value={`${overview?.completion_rate ?? 0}%`} icon={TrendingUp} />
        <Metric title="Avg Progress" value={`${overview?.avg_progress ?? 0}%`} icon={PieIcon} />
        <Metric title="Active Employees" value={overview?.active_employees ?? 0} icon={Trophy} />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        <div className="xl:col-span-3 surface-card p-6 bg-gradient-to-br from-red-500/[0.08] to-transparent">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2 text-white font-semibold">
              <AlertTriangle className="w-5 h-5 text-red-400" />
              Predicted Risk
            </div>
            <span className="px-2 py-1 bg-red-500/15 text-red-300 text-xs font-semibold rounded border border-red-500/30">HIGH ALERT</span>
          </div>
          <p className="text-5xl font-bold text-white">{status?.at_risk ?? 0}%</p>
          <p className="text-sm text-slate-300 mt-2">of goals currently flagged as delivery risk.</p>
          <div className="mt-6">
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="text-slate-300">Engineering OKRs</span>
              <span className="text-red-300 font-semibold">{Math.min(82, status?.at_risk ?? 0)}% Risk</span>
            </div>
            <div className="h-2 rounded-full bg-white/10 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-red-300 to-red-500" style={{ width: `${Math.min(82, status?.at_risk ?? 0)}%` }} />
            </div>
          </div>
        </div>

        <div className="xl:col-span-6 surface-card p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2 text-white font-semibold">
              <TrendingUp className="w-5 h-5 text-cyan-300" />
              Revenue Target Forecast
            </div>
            <span className="text-cyan-300 text-sm font-semibold">+4.2% AI Boost</span>
          </div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData} margin={{ top: 8, right: 8, left: -20, bottom: 8 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
                <XAxis dataKey="quarter" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip />
                <Line type="monotone" dataKey="progress" stroke="#22d3ee" strokeWidth={3} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="xl:col-span-3 surface-card p-6 border-t-2 border-violet-300/50">
          <div className="flex items-center gap-2 text-white font-semibold mb-4">
            <Sparkles className="w-5 h-5 text-violet-300" />
            Smart Action
          </div>
          <p className="text-slate-300 text-sm leading-relaxed mb-6">
            Reallocate 2 engineers from <span className="text-white font-semibold">Project Alpha</span> to the <span className="text-white font-semibold">Core Platform</span> initiative.
          </p>
          <button
            type="button"
            onClick={() => {
              toast.success("Scenario queued. Redirecting to goals.");
              navigate("/employee/goals");
            }}
            className="w-full py-2.5 rounded-lg border border-white/20 hover:bg-white/5 text-sm font-semibold text-white flex items-center justify-center gap-2"
          >
            Execute Scenario <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="xl:col-span-6 surface-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-white font-semibold text-xl">Organization Health Matrix</h3>
            <button type="button" className="text-slate-400 hover:text-white"><MoreHorizontal className="w-5 h-5" /></button>
          </div>
          <div className="space-y-6">
            {healthRows.length > 0 ? (
              healthRows.map((row) => (
                <HealthRow key={row.label} label={row.label} sub={row.sub} colors={row.colors} />
              ))
            ) : (
              <p className="text-slate-400 text-sm">No department analytics available yet.</p>
            )}
          </div>
        </div>

        <div className="xl:col-span-6 surface-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-white font-semibold text-xl">Strategic Goal Lifecycle</h3>
            <span className="px-2 py-1 text-xs rounded bg-white/10 text-slate-300">Q3 2024</span>
          </div>
          <div className="relative px-4 py-6">
            <div className="absolute left-10 right-10 top-9 h-1 bg-white/10 rounded-full">
              <div className="h-full bg-gradient-to-r from-cyan-300 to-violet-400 rounded-full" style={{ width: `${lifecycle.progress}%` }} />
            </div>
            <div className="relative z-10 flex justify-between">
              <LifeNode label="Draft" active={lifecycle.step >= 1} icon={lifecycle.step > 1} current={lifecycle.step === 1} />
              <LifeNode label="Active" active={lifecycle.step >= 2} icon={lifecycle.step > 2} current={lifecycle.step === 2} />
              <LifeNode label="Review" active={lifecycle.step >= 3} icon={lifecycle.step > 3} current={lifecycle.step === 3} />
              <LifeNode label="Completed" active={lifecycle.step >= 4} current={lifecycle.step === 4} />
            </div>
          </div>
          <div className="flex items-center justify-between mt-4 text-sm">
            <p className="text-slate-300">Current Phase: <span className="text-white font-semibold">{lifecycle.phase}</span></p>
            <button type="button" onClick={() => navigate("/employee/checkins")} className="text-slate-300 hover:text-white flex items-center gap-1">View Details <ArrowRight className="w-4 h-4" /></button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="surface-card p-5 bg-gradient-to-b from-white/[0.04] to-white/[0.015]">
          <h3 className="text-white font-semibold mb-4">Goal Status Distribution</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={statusData} dataKey="value" nameKey="name" innerRadius={70} outerRadius={110} paddingAngle={4}>
                  {statusData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="surface-card p-5 bg-gradient-to-b from-white/[0.04] to-white/[0.015]">
          <h3 className="text-white font-semibold mb-4">Quarterly Trend</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData} margin={{ top: 8, right: 8, left: -20, bottom: 8 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
                <XAxis dataKey="quarter" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip />
                <Line type="monotone" dataKey="completion" stroke="#38bdf8" strokeWidth={3} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="progress" stroke="#818cf8" strokeWidth={3} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 surface-card p-5 bg-gradient-to-b from-white/[0.04] to-white/[0.015]">
          <h3 className="text-white font-semibold mb-4">Strategic Area Performance</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={areaData} margin={{ top: 8, right: 8, left: -24, bottom: 8 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
                <XAxis dataKey="area" stroke="#94a3b8" angle={-20} textAnchor="end" height={68} />
                <YAxis stroke="#94a3b8" />
                <Tooltip />
                <Bar dataKey="goals" fill="#6366f1" radius={[6, 6, 0, 0]} />
                <Bar dataKey="completion" fill="#10b981" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="surface-card p-5 bg-gradient-to-b from-white/[0.04] to-white/[0.015]">
          <h3 className="text-white font-semibold mb-4">Top Contributors</h3>
          <div className="space-y-3">
            {(loading ? [] : rankings).slice(0, 6).map((r) => (
              <div key={r.employee_id} className="p-3 rounded-xl border border-white/10 bg-white/[0.02]">
                <div className="flex items-center justify-between">
                  <p className="text-white text-sm font-medium">{r.employee_name}</p>
                  <span className="text-xs text-cyan-300 font-semibold">{r.completion_rate}%</span>
                </div>
                <p className="text-xs text-slate-400 mt-1">{r.department} • {r.completed_goals}/{r.total_goals} complete</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="surface-card p-5 bg-gradient-to-b from-white/[0.04] to-white/[0.015]">
        <h3 className="text-white font-semibold mb-4">Department Heatmap</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
          {deptData.map((d) => (
            <div key={d.department} className="rounded-xl border border-white/10 p-4 bg-white/[0.02]">
              <p className="text-white font-medium text-sm">{d.department}</p>
              <p className="text-xs text-slate-400 mt-1">Completion {d.completion}%</p>
              <div className="mt-3 h-2 rounded-full bg-white/10 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-cyan-400 to-emerald-400" style={{ width: `${Math.min(d.completion, 100)}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageContainer>
  );
}

function Metric({ title, value, icon: Icon }) {
  return (
    <div className="surface-card p-5">
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase tracking-wider text-slate-400">{title}</p>
        <Icon className="w-4 h-4 text-slate-300" />
      </div>
      <p className="kpi-value text-white mt-2">{value ?? 0}</p>
    </div>
  );
}

function HealthRow({ label, sub, colors }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="min-w-[120px]">
        <p className="text-white text-sm font-semibold">{label}</p>
        <p className="text-slate-400 text-xs">{sub}</p>
      </div>
      <div className="flex gap-2 flex-1">
        {colors.map((c, i) => <div key={i} className={`h-8 flex-1 rounded-md border border-white/10 ${c}`} />)}
      </div>
      <div className="w-10 h-10 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-xs text-slate-300">+3</div>
    </div>
  );
}

function LifeNode({ label, active, current, icon }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${active ? "bg-cyan-400/20 border-cyan-300" : "bg-slate-700/40 border-slate-500/50"}`}>
        {icon ? <CheckCircle2 className="w-4 h-4 text-cyan-300" /> : current ? <div className="w-2.5 h-2.5 rounded-full bg-violet-300" /> : null}
      </div>
      <span className={`text-xs ${active || current ? "text-white" : "text-slate-400"}`}>{label}</span>
    </div>
  );
}
