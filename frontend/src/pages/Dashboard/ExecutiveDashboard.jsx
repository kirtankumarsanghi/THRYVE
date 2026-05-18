import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Search, Bell, HelpCircle, ChevronRight, Download, Users, Activity, 
  TrendingUp, ClipboardList, Target, Calendar, Filter 
} from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { useGoals, calculateGoalProgress } from "../../context/GoalContext";
import useAnalytics from "../../hooks/useAnalytics";
import LiveDataNotice from "../../components/common/LiveDataNotice";
import { useAuth } from "../../context/AuthContext";

// Custom tooltip
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#0B132C]/90 backdrop-blur-md border border-white/10 rounded-xl p-3 shadow-2xl">
        <p className="text-slate-300 text-xs font-semibold mb-2">{label}</p>
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
            <p className="text-sm font-medium text-white">
              {entry.name}: {typeof entry.value === 'number' ? entry.value.toFixed(1) : entry.value}
            </p>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

function KpiCard({ title, value, suffix = "", subtitle = "", trend = "", trendUp = false, progress = null, highlight = false, icon: Icon }) {
  return (
    <div className={`bg-[#0B132C] border ${highlight ? 'border-indigo-500/30' : 'border-white/5'} rounded-2xl p-6 hover:border-white/10 transition-colors`}>
      <div className="flex items-start justify-between mb-4">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{title}</p>
        {Icon && <Icon size={18} className="text-slate-500" />}
      </div>
      <div className="flex items-baseline gap-2 mb-2">
        <span className="text-4xl font-bold text-white tracking-tight">{value}</span>
        {suffix && <span className="text-lg text-slate-400">{suffix}</span>}
      </div>
      {trend && (
        <p className={`text-xs font-semibold ${trendUp ? 'text-emerald-400' : 'text-slate-400'}`}>
          {trend}
        </p>
      )}
      {subtitle && <p className="text-xs text-slate-400 mt-1">{subtitle}</p>}
      {progress !== null && (
        <div className="mt-4 h-1.5 bg-white/5 rounded-full overflow-hidden">
          <div className="h-full bg-indigo-400 rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
        </div>
      )}
    </div>
  );
}

function ApprovalCard({ title, subtitle, author, time, onReview }) {
  return (
    <div className="bg-white/[0.02] border border-white/5 rounded-xl p-4 hover:bg-white/[0.04] transition-colors">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <p className="text-sm font-bold text-white mb-1">{title}</p>
          <p className="text-xs text-slate-400 line-clamp-1">{subtitle}</p>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-[10px] font-bold text-indigo-300">
            {author.charAt(0)}
          </div>
          <span className="text-xs text-slate-500">{author} • {time}</span>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={onReview}
            className="px-3 py-1.5 bg-indigo-500 hover:bg-indigo-400 text-white text-xs font-semibold rounded-lg transition-colors"
          >
            REVIEW
          </button>
          <button className="px-3 py-1.5 bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-semibold rounded-lg transition-colors">
            DEFER
          </button>
        </div>
      </div>
    </div>
  );
}

function QuickAction({ icon: Icon, label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="bg-[#0B132C] border border-white/5 rounded-xl p-4 hover:bg-white/[0.02] hover:border-white/10 transition-colors flex items-center gap-3 group"
    >
      <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-indigo-500/10 group-hover:border-indigo-500/20 transition-colors">
        <Icon size={18} className="text-slate-400 group-hover:text-indigo-400 transition-colors" />
      </div>
      <span className="text-sm font-semibold text-slate-300 group-hover:text-white transition-colors">{label}</span>
    </button>
  );
}

export default function ExecutiveDashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { goals = [], loading: goalsLoading } = useGoals();
  const { overview, trends, status, loading: analyticsLoading } = useAnalytics();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedQuarter] = useState("Q3 FY24");

  const loading = goalsLoading || analyticsLoading;

  // Calculate metrics
  const avgOutputScore = useMemo(() => {
    if (!goals.length) return "0.00";
    const totalProgress = goals.reduce((sum, goal) => sum + calculateGoalProgress(goal), 0);
    return (totalProgress / goals.length / 20).toFixed(2);
  }, [goals]);

  const utilizationRate = useMemo(() => {
    if (!goals.length) return "0.0";
    const activeGoals = goals.filter(g => g.status !== 'completed').length;
    return ((activeGoals / Math.max(goals.length, 1)) * 100).toFixed(1);
  }, [goals]);

  const openRequisitions = useMemo(() => {
    return goals.filter(g => g.status === 'pending').length;
  }, [goals]);

  const pendingDecisions = useMemo(() => {
    return goals.filter(g => g.status === 'pending' || g.status === 'at_risk').length;
  }, [goals]);

  // Velocity vs Capacity data
  const velocityData = useMemo(() => {
    if (!trends?.quarters) return [];
    return trends.quarters.map((q, i) => ({
      week: `WEEK ${String(i + 1).padStart(2, '0')}`,
      velocity: trends.completion_rates?.[i] || 0,
      capacity: 85 + Math.random() * 15,
    }));
  }, [trends]);

  // Direct reports activity
  const directReports = useMemo(() => {
    const completed = goals.filter(g => g.status === 'completed').length;
    const atRisk = goals.filter(g => g.status === 'at_risk').length;
    
    return [
      {
        id: 1,
        name: user?.full_name || "You",
        role: user?.role || "Employee",
        avatar: null,
        utilization: utilizationRate,
        status: atRisk > 0 ? "BURNOUT RISK" : "ON TRACK",
        statusColor: atRisk > 0 ? "text-red-400" : "text-emerald-400",
        performance: completed > 0 ? "★★★★★" : "★★★☆☆",
      }
    ];
  }, [goals, user, utilizationRate]);

  // Strategic milestones
  const milestones = useMemo(() => {
    const completedGoals = goals.filter(g => g.status === 'completed');
    const inProgressGoals = goals.filter(g => g.status === 'in_progress');
    
    return [
      {
        id: 1,
        name: "API TRANSITION",
        progress: completedGoals.length > 0 ? 92 : 45,
        color: "bg-indigo-400"
      },
      {
        id: 2,
        name: "SECURITY AUDIT",
        progress: inProgressGoals.length > 0 ? 14 : 5,
        color: "bg-red-400"
      }
    ];
  }, [goals]);

  return (
    <div className="min-h-screen bg-[#040914] text-white">
      {/* Top Navigation Bar */}
      <div className="border-b border-white/5 bg-[#0B132C]/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-[1800px] mx-auto px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <h1 className="text-xl font-bold">Thryve.</h1>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                type="text" 
                placeholder="Find reports, projects, or metrics..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-[#0B132C] border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-indigo-500 w-[400px] transition-all"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">SYSTEM LIVE</span>
            </div>
            <button className="p-2 hover:bg-white/5 rounded-lg transition-colors relative">
              <Bell size={20} className="text-slate-400" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
              <HelpCircle size={20} className="text-slate-400" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1800px] mx-auto px-8 py-8 space-y-6">
        
        {/* Breadcrumb & Actions */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-sm text-slate-400 mb-2">
              <span>Engineering</span>
              <ChevronRight size={14} />
              <span className="text-indigo-400">Core Platform Team</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight">Executive Dashboard</h2>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm font-semibold transition-colors">
              {selectedQuarter}
            </button>
            <button className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm font-semibold transition-colors">
              Historical
            </button>
            <button 
              onClick={() => navigate("/employee/analytics")}
              className="px-4 py-2 bg-indigo-500 hover:bg-indigo-400 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2"
            >
              <Download size={16} /> Export PDF
            </button>
          </div>
        </div>

        <LiveDataNotice source="Analytics + Goals APIs" hint="Real-time data from your goals and check-ins" />

        {/* Top KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <KpiCard 
            title="AVG OUTPUT SCORE" 
            value={avgOutputScore}
            suffix="/5.0"
            trend="+12.4% vs last month"
            trendUp={true}
            icon={TrendingUp}
          />
          <KpiCard 
            title="UTILIZATION RATE" 
            value={utilizationRate}
            suffix="%"
            progress={parseFloat(utilizationRate)}
            icon={Activity}
          />
          <KpiCard 
            title="OPEN REQUISITIONS" 
            value={String(openRequisitions).padStart(2, '0')}
            subtitle="2 in final interview stage"
            icon={Users}
          />
          <KpiCard 
            title="PENDING DECISIONS" 
            value={String(pendingDecisions).padStart(2, '0')}
            subtitle="Requires your attention today"
            highlight={true}
            icon={ClipboardList}
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Velocity Chart */}
          <div className="lg:col-span-8 bg-[#0B132C] border border-white/5 rounded-2xl p-6">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold text-white mb-1">Team Velocity vs. Capacity</h3>
                <p className="text-sm text-slate-400">Weekly performance tracking across all engineering sub-units</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-indigo-400"></div>
                  <span className="text-xs font-semibold text-slate-400 uppercase">VELOCITY</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-slate-600"></div>
                  <span className="text-xs font-semibold text-slate-400 uppercase">CAPACITY</span>
                </div>
              </div>
            </div>
            
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={velocityData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
                  <XAxis 
                    dataKey="week" 
                    stroke="#64748b" 
                    tick={{ fill: '#64748b', fontSize: 11, fontWeight: 600 }} 
                    tickLine={false} 
                    axisLine={false} 
                    dy={10} 
                  />
                  <YAxis 
                    stroke="#64748b" 
                    tick={{ fill: '#64748b', fontSize: 11 }} 
                    tickLine={false} 
                    axisLine={false} 
                    dx={-10} 
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Line 
                    type="monotone" 
                    dataKey="velocity" 
                    stroke="#818cf8" 
                    strokeWidth={3} 
                    dot={false}
                    name="Velocity"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="capacity" 
                    stroke="#475569" 
                    strokeWidth={2} 
                    strokeDasharray="5 5" 
                    dot={false}
                    name="Capacity"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Priority Approvals */}
          <div className="lg:col-span-4 bg-[#0B132C] border border-white/5 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-white">Priority Approvals</h3>
              <span className="px-2 py-1 bg-indigo-500/10 text-indigo-400 text-xs font-bold rounded-md">04 New</span>
            </div>
            
            <div className="space-y-4">
              {goals.filter(g => g.status === 'pending').slice(0, 2).map((goal, idx) => (
                <ApprovalCard 
                  key={goal.id}
                  title={idx === 0 ? "Equity Adjustment Request" : "Cloud Spend Waiver"}
                  subtitle={goal.title}
                  author={user?.full_name || "Employee"}
                  time={idx === 0 ? "2h ago" : "5h ago"}
                  onReview={() => navigate(`/employee/goals/${goal.id}`)}
                />
              ))}
            </div>
          </div>

          {/* Direct Reports Activity */}
          <div className="lg:col-span-8 bg-[#0B132C] border border-white/5 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-white">Direct Reports Activity</h3>
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                  <Filter size={16} className="text-slate-400" />
                </button>
                <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                  <Search size={16} className="text-slate-400" />
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <div className="grid grid-cols-12 gap-4 px-4 pb-3 border-b border-white/5">
                <div className="col-span-4 text-xs font-bold text-slate-500 uppercase tracking-wider">NAME & ROLE</div>
                <div className="col-span-2 text-xs font-bold text-slate-500 uppercase tracking-wider">UTILIZATION</div>
                <div className="col-span-2 text-xs font-bold text-slate-500 uppercase tracking-wider">STATUS</div>
                <div className="col-span-2 text-xs font-bold text-slate-500 uppercase tracking-wider">PERFORMANCE</div>
                <div className="col-span-2 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">ACTION</div>
              </div>

              {directReports.map((report) => (
                <div key={report.id} className="grid grid-cols-12 gap-4 px-4 py-4 hover:bg-white/[0.02] rounded-xl transition-colors items-center">
                  <div className="col-span-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-indigo-500/20 border-2 border-indigo-500/30 flex items-center justify-center text-sm font-bold text-indigo-300">
                      {report.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">{report.name}</p>
                      <p className="text-xs text-slate-500 uppercase tracking-wider">{report.role}</p>
                    </div>
                  </div>
                  <div className="col-span-2">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-indigo-400 rounded-full" style={{ width: `${report.utilization}%` }} />
                      </div>
                      <span className="text-xs font-semibold text-white">{report.utilization}%</span>
                    </div>
                  </div>
                  <div className="col-span-2">
                    <span className={`text-xs font-bold uppercase tracking-wider ${report.statusColor}`}>
                      {report.status}
                    </span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-sm text-amber-400">{report.performance}</span>
                  </div>
                  <div className="col-span-2 text-right">
                    <button className="text-xs font-semibold text-slate-400 hover:text-white transition-colors">
                      •••
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <button 
              onClick={() => navigate("/employee/goals")}
              className="w-full mt-4 py-3 text-sm font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              VIEW ALL GOALS
            </button>
          </div>

          {/* Strategic Milestones */}
          <div className="lg:col-span-4 bg-[#0B132C] border border-white/5 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white mb-6">Strategic Milestones</h3>
            
            <div className="space-y-6">
              {milestones.map((milestone) => (
                <div key={milestone.id}>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{milestone.name}</span>
                    <span className="text-sm font-bold text-white">{milestone.progress}%</span>
                  </div>
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <div className={`h-full ${milestone.color} rounded-full transition-all duration-500`} style={{ width: `${milestone.progress}%` }} />
                  </div>
                </div>
              ))}

              <button 
                onClick={() => navigate("/employee/goals")}
                className="w-full mt-6 py-3 bg-white/5 hover:bg-white/10 rounded-xl text-sm font-semibold text-white transition-colors"
              >
                Manage All OKRs
              </button>
            </div>
          </div>

        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <QuickAction 
            icon={Target}
            label="Create Goal"
            onClick={() => navigate("/employee/goals/create")}
          />
          <QuickAction 
            icon={Calendar}
            label="Check-ins"
            onClick={() => navigate("/employee/checkins")}
          />
          <QuickAction 
            icon={TrendingUp}
            label="Analytics"
            onClick={() => navigate("/employee/analytics")}
          />
          <QuickAction 
            icon={ClipboardList}
            label="Notifications"
            onClick={() => navigate("/employee/notifications")}
          />
        </div>

      </div>
    </div>
  );
}
