import React, { useState, useEffect } from "react";
import { Target, Search, Plus, ChevronRight, Filter, CheckCircle2, Clock, AlertCircle, Bell, HelpCircle, RefreshCw } from "lucide-react";
import { getGoals } from "../../api/goalsApi";
import { useManager } from "../../context/ManagerContext";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import LiveDataNotice from "../../components/common/LiveDataNotice";

const fade = (d = 0) => ({ initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, transition: { delay: d } });

export default function TeamGoals() {
  const { team, refreshData } = useManager();
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const loadGoals = async () => {
    try {
      const res = await getGoals();
      setGoals(res || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadGoals();
  }, []);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await Promise.all([refreshData(), loadGoals()]);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  // Build a name lookup from team data
  const nameMap = {};
  team.forEach(m => { nameMap[m.employee_id] = m.employee_name; });

  const filtered = goals.filter(g => {
    const matchFilter = filter === "all"
      || (filter === "approved" && g.approval_status === "approved")
      || (filter === "pending" && g.approval_status === "pending")
      || (filter === "rejected" && g.approval_status === "rejected");
    const matchSearch = !search || g.title?.toLowerCase().includes(search.toLowerCase()) || g.description?.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  const statusIcon = (s) => {
    if (s === "approved") return { Icon: CheckCircle2, cls: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" };
    if (s === "rejected") return { Icon: AlertCircle, cls: "bg-red-500/10 text-red-400 border-red-500/20" };
    return { Icon: Clock, cls: "bg-amber-500/10 text-amber-400 border-amber-500/20" };
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#040914]">
      {/* Top Navigation Bar */}
      <div className="border-b border-white/5 bg-[#0B132C]/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-[1800px] mx-auto px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <h1 className="text-xl font-bold text-white">Thryve.</h1>
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <Link to="/manager/dashboard" className="hover:text-white transition-colors">Dashboard</Link>
              <ChevronRight size={14} />
              <span className="text-indigo-400">Team Goals</span>
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
        <motion.div {...fade(0)} className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight mb-1">Team Goals</h1>
            <p className="text-sm text-gray-500">Track and manage OKRs across your team. {goals.length} total goals.</p>
          </div>
          <Link 
            to="/manager/dashboard"
            className="px-4 py-2 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white text-sm font-medium rounded-xl transition-colors border border-white/5"
          >
            Back to Dashboard
          </Link>
        </motion.div>

        <LiveDataNotice source="Goals API" hint="Real-time goal data from all team members" />

        {/* Filters */}
        <motion.div {...fade(0.1)} className="flex flex-col sm:flex-row gap-4">
          <div className="flex gap-1 p-1 bg-[#0B132C] backdrop-blur-xl border border-white/[0.06] rounded-xl overflow-x-auto">
            {[
              { key: "all", label: "All" },
              { key: "pending", label: "Pending" },
              { key: "approved", label: "Approved" },
              { key: "rejected", label: "Rejected" },
            ].map(f => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`px-5 py-2 text-sm font-bold rounded-lg transition-all whitespace-nowrap ${
                  filter === f.key
                    ? "bg-indigo-500/15 text-indigo-300 border border-indigo-500/25"
                    : "text-gray-500 hover:text-white hover:bg-white/5 border border-transparent"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search goals..."
              className="w-full h-full min-h-[44px] bg-[#0B132C] backdrop-blur-xl border border-white/[0.06] rounded-xl pl-11 pr-4 text-sm font-medium text-white placeholder-gray-600 focus:outline-none focus:border-indigo-500/40 transition-colors"
            />
          </div>
        </motion.div>

        {/* Goals Grid */}
        {filtered.length === 0 ? (
          <motion.div {...fade(0.2)} className="bg-[#0B132C] backdrop-blur-xl border border-white/[0.06] rounded-2xl p-12 text-center">
            <Target size={32} className="mx-auto mb-3 text-gray-600" />
            <p className="text-gray-400 font-medium">No goals match your filters.</p>
            {(filter !== "all" || search) && (
              <button 
                onClick={() => { setFilter("all"); setSearch(""); }}
                className="mt-4 text-sm text-indigo-400 hover:text-indigo-300 font-medium"
              >
                Clear filters
              </button>
            )}
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {filtered.map((goal, idx) => {
              const { Icon, cls } = statusIcon(goal.approval_status);
              const owner = nameMap[goal.employee_id] || "Unknown";
              const initials = owner.split(" ").map(n => n[0]).join("");

              return (
                <motion.div
                  key={goal.id}
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.03 }}
                  className="bg-[#0B132C] backdrop-blur-xl border border-white/[0.06] p-5 rounded-2xl hover:border-indigo-500/20 transition-all group"
                >
                  <div className="flex justify-between items-start mb-3">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider rounded border ${cls}`}>
                      <Icon size={10} />
                      {goal.approval_status || "pending"}
                    </span>
                    <span className="text-[10px] text-gray-600 font-bold">{goal.quarter}</span>
                  </div>

                  <h3 className="text-sm font-bold text-white mb-1.5 group-hover:text-indigo-300 transition-colors leading-tight">{goal.title}</h3>
                  <p className="text-xs text-gray-500 mb-5 line-clamp-2">{goal.description}</p>

                  <div className="space-y-1.5 mb-4">
                    <div className="flex justify-between text-[10px] font-bold">
                      <span className="text-gray-500 uppercase tracking-wider">Progress</span>
                      <span className="text-white">{goal.progress || 0}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-black/40 border border-white/5 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${(goal.progress || 0) < 40 ? "bg-amber-500" : "bg-gradient-to-r from-indigo-500 to-purple-500"}`}
                        style={{ width: `${goal.progress || 0}%` }}
                      />
                    </div>
                  </div>

                  <div className="pt-3 border-t border-white/5 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-[9px] font-bold text-white">
                        {initials}
                      </div>
                      <span className="text-[11px] font-medium text-gray-400 truncate max-w-[120px]">{owner}</span>
                    </div>
                    <span className="text-[10px] text-gray-600 font-bold">W{goal.weightage || 0}%</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
