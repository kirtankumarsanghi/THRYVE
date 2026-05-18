import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useManager } from "../../context/ManagerContext";
import { getGoals } from "../../api/goalsApi";
import { ArrowLeft, User, Target, Activity, Lock, CheckCircle2, Clock, ChevronRight, Star, TrendingUp, Search, Bell, HelpCircle, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import LiveDataNotice from "../../components/common/LiveDataNotice";

const fade = (d = 0) => ({ initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, transition: { delay: d } });

export default function EmployeeReview() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { team, refreshData } = useManager();
  const [goals, setGoals] = useState([]);
  const [loadingGoals, setLoadingGoals] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Find employee in team data by employee_id (which comes as number from backend)
  const employee = team.find(emp =>
    String(emp.employee_id) === String(id) || String(emp.id) === String(id)
  );

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refreshData();
    await fetchGoals();
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const fetchGoals = async () => {
    try {
      const allGoals = await getGoals();
      // Filter goals belonging to this employee
      const empGoals = allGoals.filter(g =>
        String(g.employee_id) === String(id)
      );
      setGoals(empGoals);
    } catch (err) {
      console.error("Failed to load goals:", err);
    } finally {
      setLoadingGoals(false);
    }
  };

  useEffect(() => {
    fetchGoals();
  }, [id]);

  if (!employee) {
    return (
      <div className="min-h-screen bg-[#040914]">
        {/* Top Navigation Bar */}
        <div className="border-b border-white/5 bg-[#0B132C]/50 backdrop-blur-sm sticky top-0 z-50">
          <div className="max-w-[1800px] mx-auto px-8 py-4 flex items-center justify-between">
            <h1 className="text-xl font-bold text-white">Thryve.</h1>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">SYSTEM LIVE</span>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-[1800px] mx-auto px-8 py-8">
          <button onClick={() => navigate("/manager/team")} className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors text-sm font-bold">
            <ArrowLeft size={16} /> Back to Team
          </button>
          <div className="bg-[#0B132C] backdrop-blur-xl border border-white/[0.06] rounded-2xl p-12 text-center">
            <User size={40} className="mx-auto mb-4 text-gray-600" />
            <h2 className="text-xl font-bold text-white mb-2">Employee Not Found</h2>
            <p className="text-gray-400 mb-6">This employee may not be part of your team or the ID is invalid.</p>
            <Link to="/manager/team" className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-500 hover:bg-indigo-600 text-white font-bold rounded-xl transition-colors">
              View My Team
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const rate = Math.round(employee.completion_rate || 0);
  const score = Math.round(rate / 20);
  const initials = employee.employee_name?.split(" ").map(n => n[0]).join("") || "?";

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
              <Link to="/manager/team" className="hover:text-white transition-colors">Team</Link>
              <ChevronRight size={14} />
              <span className="text-indigo-400">{employee.employee_name}</span>
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
        {/* Back */}
        <button onClick={() => navigate("/manager/team")} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm font-bold">
          <ArrowLeft size={16} /> Back to Team
        </button>

        <LiveDataNotice source="Employee Goals + Analytics APIs" hint="Real-time employee performance and goal data" />

        {/* Profile Header */}
        <motion.div {...fade(0)} className="bg-[#0B132C] backdrop-blur-xl border border-white/[0.06] rounded-2xl p-6 lg:p-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-2xl font-black text-white shadow-xl">
              {initials}
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-white mb-1">{employee.employee_name}</h1>
              <p className="text-sm text-indigo-300 font-medium mb-4">{employee.department}</p>
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-2 bg-black/20 px-4 py-2 rounded-xl border border-white/5">
                  <Target size={14} className="text-indigo-400" />
                  <span className="text-sm text-white font-bold">{employee.total_goals || goals.length} Goals</span>
                </div>
                <div className="flex items-center gap-2 bg-black/20 px-4 py-2 rounded-xl border border-white/5">
                  <Activity size={14} className="text-emerald-400" />
                  <span className="text-sm text-white font-bold">{rate}% Complete</span>
                </div>
                <div className="flex items-center gap-2 bg-black/20 px-4 py-2 rounded-xl border border-white/5">
                  <TrendingUp size={14} className="text-amber-400" />
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={12} fill={i < score ? "currentColor" : "transparent"} className={i < score ? "text-amber-400" : "text-gray-600"} />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Progress Ring */}
            <div className="flex-shrink-0">
              <div className="relative w-24 h-24">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="3" />
                  <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#818cf8" strokeWidth="3" strokeDasharray={`${rate}, 100`} strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-xl font-black text-white">{rate}%</span>
                  <span className="text-[9px] text-gray-500 font-bold uppercase">Overall</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Goals */}
        <motion.div {...fade(0.15)} className="bg-[#0B132C] backdrop-blur-xl border border-white/[0.06] rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-white">Goals & Objectives</h2>
            <span className="text-xs text-gray-500 font-bold">{goals.length} total</span>
          </div>

          {loadingGoals ? (
            <div className="flex justify-center py-8">
              <div className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : goals.length === 0 ? (
            <div className="text-center py-10 bg-black/20 border border-white/5 rounded-xl">
              <Target size={28} className="mx-auto mb-3 text-gray-600" />
              <p className="text-gray-400 font-medium">No goals found for this employee.</p>
              <p className="text-xs text-gray-500 mt-1">Goals will appear here when they are created.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {goals.map((goal) => {
                const statusCls = goal.approval_status === "approved"
                  ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                  : goal.approval_status === "rejected"
                  ? "bg-red-500/10 text-red-400 border-red-500/20"
                  : "bg-amber-500/10 text-amber-400 border-amber-500/20";

                return (
                  <div key={goal.id} className="bg-black/20 border border-white/5 rounded-xl p-5 hover:border-indigo-500/20 transition-all group">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors leading-tight pr-2">{goal.title}</h3>
                      <span className={`flex-shrink-0 inline-flex items-center px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider rounded border ${statusCls}`}>
                        {goal.approval_status || "pending"}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 mb-4 line-clamp-2">{goal.description}</p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-[10px] font-bold">
                        <span className="text-gray-500 uppercase tracking-wider">Progress</span>
                        <span className="text-white">{goal.progress || 0}%</span>
                      </div>
                      <div className="h-1.5 bg-black/40 border border-white/5 rounded-full overflow-hidden">
                        <div className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500" style={{ width: `${goal.progress || 0}%` }} />
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/5">
                      <span className="text-[10px] text-gray-500 font-bold uppercase">{goal.quarter} · W{goal.weightage || 0}%</span>
                      {goal.is_locked && <Lock size={12} className="text-amber-400" />}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
