import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useManager } from "../../context/ManagerContext";
import { useAuth } from "../../context/AuthContext";
import {
  TrendingUp, Activity, Users, Gavel,
  Download, Search, Filter, MoreVertical, Star, ChevronRight,
  CheckCircle2, Clock, Target, AlertCircle, RefreshCw, Bell, HelpCircle,
  Award, BarChart3, FileText, UserPlus
} from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line
} from "recharts";
import { motion } from "framer-motion";
import LiveDataNotice from "../../components/common/LiveDataNotice";

const VELOCITY_DATA = [
  { name: "W1", velocity: 45, capacity: 60 },
  { name: "W4", velocity: 52, capacity: 62 },
  { name: "W8", velocity: 68, capacity: 65 },
  { name: "W12", velocity: 82, capacity: 70 },
  { name: "NOW", velocity: 95, capacity: 75 },
];

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, delay },
});

export default function ManagerDashboard() {
  const { team, pendingApprovals, loading, refreshData } = useManager();
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const avgCompletion = useMemo(() => {
    if (!team.length) return 0;
    return Math.round(team.reduce((s, m) => s + (m.completion_rate || 0), 0) / team.length);
  }, [team]);

  const avgScore = useMemo(() => ((avgCompletion / 100) * 5).toFixed(1), [avgCompletion]);

  const onTrackCount = useMemo(() => team.filter(m => (m.completion_rate || 0) >= 60).length, [team]);
  const atRiskCount = useMemo(() => team.filter(m => (m.completion_rate || 0) < 60 && (m.completion_rate || 0) > 0).length, [team]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refreshData();
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const stats = [
    { label: "Avg Output Score", value: `${avgScore}`, unit: "/5.0", icon: TrendingUp, color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20", sub: "+12.4% vs last quarter" },
    { label: "Utilization Rate", value: `${avgCompletion}%`, icon: Activity, color: "text-indigo-400", bg: "bg-indigo-500/10 border-indigo-500/20", progress: avgCompletion },
    { label: "Team Members", value: team.length, icon: Users, color: "text-cyan-400", bg: "bg-cyan-500/10 border-cyan-500/20", sub: `${onTrackCount} on track · ${atRiskCount} at risk` },
    { label: "Pending Decisions", value: pendingApprovals.length, icon: Gavel, color: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/20", sub: "Requires your attention", urgent: pendingApprovals.length > 0 },
  ];

  return (
    <div className="max-w-[1800px] mx-auto px-8 py-8 space-y-6">
      {/* Dashboard Header */}

        {/* Breadcrumb & Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <motion.div {...fade(0)}>
          <div className="flex items-center gap-2 text-sm text-slate-400 mb-2">
            <span>Management</span>
            <ChevronRight size={14} />
            <span className="text-purple-400">{user?.department || "Engineering"}</span>
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Welcome back, {user?.full_name?.split(" ")[0] || "Manager"}
          </h1>
          <p className="text-sm text-gray-500 mt-1">Here's your team overview for this quarter.</p>
        </motion.div>
        
        <motion.div {...fade(0.1)} className="flex flex-col items-end gap-3">
          <div className="flex items-center gap-4">
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                type="text" 
                placeholder="Search team..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-[#0B132C] border border-white/10 rounded-xl pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-purple-500 w-[250px] transition-all"
              />
            </div>
            
            <button 
              onClick={handleRefresh}
              className="p-2 hover:bg-white/5 border border-white/5 hover:border-white/20 rounded-xl transition-all"
              disabled={isRefreshing}
              title="Refresh Data"
            >
              <RefreshCw size={18} className={`text-gray-400 ${isRefreshing ? 'animate-spin text-white' : ''}`} />
            </button>
            
            <button className="flex items-center gap-2 px-5 py-2 bg-purple-500 hover:bg-purple-600 text-white text-sm font-bold rounded-xl transition-all shadow-lg shadow-purple-500/20 border border-purple-400/30">
              <Download size={16} /> Export PDF
            </button>
          </div>
        </motion.div>
      </div>

        <LiveDataNotice source="Manager + Analytics APIs" hint="Real-time data from team goals, approvals, and check-ins" />

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              {...fade(0.1 + i * 0.05)}
              className="bg-[#0B132C] backdrop-blur-xl border border-white/[0.06] rounded-2xl p-6 relative overflow-hidden group hover:border-indigo-500/20 transition-all duration-300"
            >
              <div className="flex justify-between items-start mb-4">
                <span className="text-[11px] font-bold text-gray-500 uppercase tracking-[0.15em]">{s.label}</span>
                <div className={`w-9 h-9 rounded-xl ${s.bg} border flex items-center justify-center`}>
                  <s.icon size={16} className={s.color} />
                </div>
              </div>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-3xl font-black text-white">{s.value}</span>
                {s.unit && <span className="text-sm font-bold text-gray-600">{s.unit}</span>}
              </div>
              {s.progress !== undefined ? (
                <div className="w-full h-1.5 bg-black/40 rounded-full overflow-hidden border border-white/5 mt-1">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${s.progress}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                  />
                </div>
              ) : (
                <p className={`text-[11px] ${s.urgent ? "text-amber-400" : "text-gray-500"} font-semibold flex items-center gap-1`}>
                  {s.urgent && <AlertCircle size={11} />} {s.sub}
                </p>
              )}
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Velocity Chart */}
          <motion.div {...fade(0.35)} className="lg:col-span-2 bg-[#0B132C] backdrop-blur-xl border border-white/[0.06] rounded-2xl p-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-lg font-bold text-white mb-1">Team Velocity vs. Capacity</h2>
                <p className="text-xs text-gray-500">Weekly performance tracking</p>
              </div>
              <div className="flex items-center gap-5 text-[10px] font-bold tracking-[0.15em]">
                <span className="flex items-center gap-2 text-gray-400"><span className="w-2.5 h-2.5 rounded-sm bg-indigo-500" /> VELOCITY</span>
                <span className="flex items-center gap-2 text-gray-400"><span className="w-2.5 h-2.5 rounded-sm bg-gray-600" /> CAPACITY</span>
              </div>
            </div>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={VELOCITY_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "#6B7280", fontSize: 10, fontWeight: 700 }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: "#6B7280", fontSize: 10, fontWeight: 600 }} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "rgba(11,19,44,0.95)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "12px", boxShadow: "0 8px 32px rgba(0,0,0,0.4)" }}
                    itemStyle={{ color: "#fff", fontWeight: "bold", fontSize: 12 }}
                    labelStyle={{ color: "#9CA3AF", fontSize: 10, fontWeight: 700 }}
                  />
                  <Line type="monotone" dataKey="capacity" stroke="#4B5563" strokeWidth={2} strokeDasharray="6 4" dot={false} />
                  <Line type="monotone" dataKey="velocity" stroke="#818cf8" strokeWidth={3} dot={{ fill: "#0B132C", stroke: "#818cf8", strokeWidth: 2, r: 4 }} activeDot={{ r: 6, fill: "#818cf8" }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Priority Approvals */}
            <motion.div {...fade(0.4)} className="bg-[#0B132C] backdrop-blur-xl border border-white/[0.06] rounded-2xl p-6">
              <div className="flex justify-between items-center mb-5">
                <h3 className="text-white font-bold">Priority Approvals</h3>
                <span className="bg-indigo-500/15 text-indigo-300 border border-indigo-500/25 text-[10px] uppercase px-2.5 py-1 rounded-lg font-bold tracking-wider">
                  {pendingApprovals.length} New
                </span>
              </div>
              <div className="space-y-3">
                {pendingApprovals.length === 0 ? (
                  <div className="text-center py-6">
                    <CheckCircle2 className="text-emerald-400 mx-auto mb-2" size={28} />
                    <p className="text-sm text-gray-400 font-medium">All caught up!</p>
                  </div>
                ) : (
                  pendingApprovals.slice(0, 3).map((item) => (
                    <div key={item.id} className="p-4 bg-black/20 border border-white/5 rounded-xl hover:border-indigo-500/20 transition-colors">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="text-sm font-bold text-white leading-tight truncate pr-2">{item.title}</h4>
                        <Clock size={12} className="text-gray-600 flex-shrink-0 mt-0.5" />
                      </div>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0">
                          {item.employee_name?.split(" ").map(n => n[0]).join("") || "?"}
                        </div>
                        <span className="text-xs font-medium text-gray-400 truncate">{item.employee_name}</span>
                      </div>
                      <Link
                        to="/manager/approvals"
                        className="block w-full text-center bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 border border-indigo-500/20 text-[11px] uppercase tracking-wider font-bold py-2 rounded-lg transition-colors"
                      >
                        Review
                      </Link>
                    </div>
                  ))
                )}
                {pendingApprovals.length > 3 && (
                  <Link to="/manager/approvals" className="block text-center text-xs text-indigo-400 hover:text-indigo-300 font-bold py-2">
                    View all {pendingApprovals.length} approvals →
                  </Link>
                )}
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div {...fade(0.45)} className="bg-[#0B132C] backdrop-blur-xl border border-white/[0.06] rounded-2xl p-6">
              <h3 className="text-white font-bold mb-4">Quick Actions</h3>
              <div className="space-y-2">
                {[
                  { label: "View Team Goals", path: "/manager/team-goals", icon: Target, color: "text-indigo-400" },
                  { label: "Schedule 1-on-1", path: "/manager/one-on-ones", icon: Clock, color: "text-cyan-400" },
                  { label: "Team Check-ins", path: "/manager/checkins", icon: CheckCircle2, color: "text-emerald-400" },
                  { label: "Export Reports", path: "/manager/reports", icon: Download, color: "text-amber-400" },
                ].map(({ label, path, icon: Icon, color }) => (
                  <Link
                    key={path}
                    to={path}
                    className="flex items-center gap-3 px-4 py-3 bg-white/[0.02] hover:bg-white/[0.06] border border-white/5 hover:border-white/10 rounded-xl transition-all group"
                  >
                    <Icon size={16} className={color} />
                    <span className="text-sm font-medium text-gray-300 group-hover:text-white flex-1">{label}</span>
                    <ChevronRight size={14} className="text-gray-600 group-hover:text-gray-400 transition-colors" />
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Direct Reports Table */}
        <motion.div {...fade(0.5)} className="bg-[#0B132C] backdrop-blur-xl border border-white/[0.06] rounded-2xl p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div>
              <h3 className="text-lg font-bold text-white">Direct Reports</h3>
              <p className="text-xs text-gray-500 mt-1">{team.length} team members · Performance overview</p>
            </div>
            <div className="flex gap-2">
              <Link to="/manager/team" className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white text-sm font-medium rounded-xl transition-colors border border-white/5">
                <Users size={14} /> View All
              </Link>
            </div>
          </div>

          {team.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <Users size={32} className="mx-auto mb-3 text-gray-600" />
              <p className="font-medium">No team members found</p>
              <p className="text-xs mt-1">Team data will appear when employees are assigned to you.</p>
            </div>
          ) : (
            <div className="overflow-x-auto -mx-6 px-6">
              <table className="w-full text-left min-w-[640px]">
                <thead>
                  <tr className="border-b border-white/[0.06] text-[10px] font-bold text-gray-500 uppercase tracking-[0.15em]">
                    <th className="pb-4 pl-1">Employee</th>
                    <th className="pb-4">Department</th>
                    <th className="pb-4">Progress</th>
                    <th className="pb-4">Status</th>
                    <th className="pb-4">Score</th>
                    <th className="pb-4 text-right pr-1"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04]">
                  {team.map((member) => {
                    const rate = Math.round(member.completion_rate || 0);
                    const score = Math.round(rate / 20);
                    const status = rate >= 75 ? { label: "On Track", cls: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" }
                      : rate >= 40 ? { label: "In Progress", cls: "bg-blue-500/10 text-blue-400 border-blue-500/20" }
                      : rate > 0 ? { label: "At Risk", cls: "bg-amber-500/10 text-amber-400 border-amber-500/20" }
                      : { label: "Not Started", cls: "bg-gray-500/10 text-gray-400 border-gray-500/20" };

                    return (
                      <tr key={member.employee_id} className="hover:bg-white/[0.02] transition-colors group">
                        <td className="py-4 pl-1">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-sm text-white shadow-lg flex-shrink-0">
                              {member.employee_name?.split(" ").map(n => n[0]).join("") || "?"}
                            </div>
                            <div>
                              <p className="text-sm font-bold text-white">{member.employee_name}</p>
                              <p className="text-[11px] text-gray-500">{member.employee_email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4">
                          <span className="text-xs font-semibold text-indigo-300">{member.department}</span>
                        </td>
                        <td className="py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-20 h-1.5 bg-black/40 border border-white/5 rounded-full overflow-hidden">
                              <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all" style={{ width: `${rate}%` }} />
                            </div>
                            <span className="text-xs font-bold text-white w-8">{rate}%</span>
                          </div>
                        </td>
                        <td className="py-4">
                          <span className={`inline-flex items-center px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-lg border ${status.cls}`}>
                            {status.label}
                          </span>
                        </td>
                        <td className="py-4">
                          <div className="flex gap-0.5">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star key={i} size={13} fill={i < score ? "currentColor" : "transparent"} className={i < score ? "text-amber-400" : "text-gray-700"} />
                            ))}
                          </div>
                        </td>
                        <td className="py-4 text-right pr-1">
                          <Link
                            to={`/manager/review/${member.employee_id}`}
                            className="inline-flex items-center gap-1 text-xs text-gray-500 hover:text-indigo-400 font-bold transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                          >
                            Review <ChevronRight size={12} />
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>
      </div>
  );
}
