import { Link } from "react-router-dom";
import { useManager } from "../../context/ManagerContext";
import { Users, TrendingUp, Target, CheckCircle2, Clock, ChevronRight, AlertCircle, Star, Search, Bell, HelpCircle, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import LiveDataNotice from "../../components/common/LiveDataNotice";

const fade = (d = 0) => ({ initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, transition: { delay: d } });

export default function TeamView() {
  const { team, loading, refreshData } = useManager();
  const [searchTerm, setSearchTerm] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refreshData();
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const onTrack = team.filter(m => (m.completion_rate || 0) >= 60).length;
  const atRisk = team.filter(m => (m.completion_rate || 0) < 60 && (m.completion_rate || 0) > 0).length;
  const completed = team.filter(m => (m.completion_rate || 0) >= 100).length;

  // Filter team members based on search
  const filteredTeam = searchTerm
    ? team.filter(member =>
        member.employee_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.employee_email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.department?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : team;

  return (
    <div className="min-h-screen bg-[#040914]">
      {/* Top Navigation Bar */}
      <div className="border-b border-white/5 bg-[#0B132C]/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-[1800px] mx-auto px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <h1 className="text-xl font-bold text-white">Thryve.</h1>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                type="text" 
                placeholder="Search team members..." 
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
            <button 
              onClick={handleRefresh}
              className="p-2 hover:bg-white/5 rounded-lg transition-colors"
              disabled={isRefreshing}
            >
              <RefreshCw size={20} className={`text-slate-400 ${isRefreshing ? 'animate-spin' : ''}`} />
            </button>
            <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
              <Bell size={20} className="text-slate-400" />
            </button>
            <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
              <HelpCircle size={20} className="text-slate-400" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1800px] mx-auto px-8 py-8 space-y-6">
        {/* Header */}
        <motion.div {...fade(0)} className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-indigo-500/15 rounded-2xl flex items-center justify-center border border-indigo-500/25">
              <Users className="text-indigo-400" size={24} />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white tracking-tight">My Team</h1>
              <p className="text-sm text-gray-500">{team.length} direct reports · {filteredTeam.length} showing</p>
            </div>
          </div>
          <Link 
            to="/manager/dashboard"
            className="px-4 py-2 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white text-sm font-medium rounded-xl transition-colors border border-white/5"
          >
            Back to Dashboard
          </Link>
        </motion.div>

        <LiveDataNotice source="Team Analytics API" hint="Real-time team member data and performance metrics" />

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: "On Track", value: onTrack, color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20", icon: TrendingUp },
            { label: "At Risk", value: atRisk, color: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/20", icon: AlertCircle },
            { label: "Completed", value: completed, color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/20", icon: CheckCircle2 },
          ].map((s, i) => (
            <motion.div key={s.label} {...fade(0.1 + i * 0.05)} className="bg-[#0B132C] backdrop-blur-xl border border-white/[0.06] rounded-2xl p-5 flex items-center gap-4">
              <div className={`w-10 h-10 rounded-xl ${s.bg} border flex items-center justify-center`}>
                <s.icon size={18} className={s.color} />
              </div>
              <div>
                <p className="text-2xl font-black text-white">{s.value}</p>
                <p className="text-[11px] text-gray-500 font-bold uppercase tracking-wider">{s.label}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Team Table */}
        <motion.div {...fade(0.25)} className="bg-[#0B132C] backdrop-blur-xl border border-white/[0.06] rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-white/[0.06] flex items-center justify-between">
            <h2 className="text-sm font-bold text-gray-300 uppercase tracking-wider">Team Members</h2>
            <span className="text-xs text-gray-500 font-medium">{filteredTeam.length} members</span>
          </div>

          {filteredTeam.length === 0 ? (
            <div className="p-12 text-center">
              <Users size={32} className="mx-auto mb-3 text-gray-600" />
              <p className="text-gray-400 font-medium">
                {searchTerm ? "No team members match your search." : "No team members assigned."}
              </p>
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm("")}
                  className="mt-4 text-sm text-indigo-400 hover:text-indigo-300 font-medium"
                >
                  Clear search
                </button>
              )}
            </div>
          ) : (
            <div className="divide-y divide-white/[0.04]">
              {filteredTeam.map((member, idx) => {
                const rate = Math.round(member.completion_rate || 0);
                const score = Math.round(rate / 20);
                const status = rate >= 100
                  ? { label: "Complete", cls: "bg-blue-500/10 text-blue-400 border-blue-500/20" }
                  : rate >= 60
                  ? { label: "On Track", cls: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" }
                  : rate > 0
                  ? { label: "At Risk", cls: "bg-amber-500/10 text-amber-400 border-amber-500/20" }
                  : { label: "Not Started", cls: "bg-gray-500/10 text-gray-400 border-gray-500/20" };

                return (
                  <motion.div
                    key={member.employee_id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: idx * 0.03 }}
                    className="px-6 py-4 flex items-center gap-4 hover:bg-white/[0.02] transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-sm font-bold text-white shadow-lg flex-shrink-0">
                      {member.employee_name?.split(" ").map(n => n[0]).join("") || "?"}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-white">{member.employee_name}</p>
                      <p className="text-xs text-indigo-300 font-medium">{member.department}</p>
                    </div>

                    {/* Progress bar */}
                    <div className="hidden sm:block w-32">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Progress</span>
                        <span className="text-xs text-white font-bold">{rate}%</span>
                      </div>
                      <div className="h-1.5 bg-black/40 border border-white/5 rounded-full overflow-hidden">
                        <div className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all" style={{ width: `${rate}%` }} />
                      </div>
                    </div>

                    <span className={`hidden md:inline-flex items-center px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider border ${status.cls}`}>
                      {status.label}
                    </span>

                    <div className="flex items-center gap-1">
                      <Target size={12} className="text-gray-500" />
                      <span className="text-xs text-gray-400 font-bold">{member.total_goals || 0}</span>
                    </div>

                    <Link
                      to={`/manager/review/${member.employee_id}`}
                      className="p-2 text-gray-600 hover:text-indigo-400 hover:bg-indigo-500/10 rounded-lg transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
                    >
                      <ChevronRight size={16} />
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
