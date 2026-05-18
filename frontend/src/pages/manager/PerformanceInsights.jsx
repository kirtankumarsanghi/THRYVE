import React, { useMemo } from "react";
import { useManager } from "../../context/ManagerContext";
import { TrendingUp, BarChart2, Star, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { motion } from "framer-motion";

const fade = (d = 0) => ({ initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, transition: { delay: d } });

export default function PerformanceInsights() {
  const { team, loading } = useManager();

  const sorted = useMemo(() => [...team].sort((a, b) => (b.completion_rate || 0) - (a.completion_rate || 0)), [team]);
  const topPerformers = useMemo(() => sorted.filter(m => (m.completion_rate || 0) >= 75), [sorted]);
  const avgRate = useMemo(() => {
    if (!team.length) return 0;
    return Math.round(team.reduce((s, m) => s + (m.completion_rate || 0), 0) / team.length);
  }, [team]);
  const atRiskCount = useMemo(() => team.filter(m => (m.completion_rate || 0) < 40 && (m.completion_rate || 0) > 0).length, [team]);

  const chartData = useMemo(() =>
    sorted.slice(0, 8).map(m => ({
      name: m.employee_name?.split(" ")[0] || "?",
      rate: Math.round(m.completion_rate || 0),
    })), [sorted]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8 max-w-[1600px] mx-auto space-y-8">
      <motion.div {...fade(0)}>
        <h1 className="text-2xl font-bold text-white tracking-tight mb-1">Performance Insights</h1>
        <p className="text-sm text-gray-500">Deep dive into team metrics, rankings, and output analysis.</p>
      </motion.div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {[
          { label: "Team Avg Completion", value: `${avgRate}%`, icon: TrendingUp, color: "text-indigo-400", bg: "bg-indigo-500/10 border-indigo-500/20", sub: `${team.length} members`, up: true },
          { label: "Top Performers", value: `${topPerformers.length}/${team.length}`, icon: Star, color: "text-cyan-400", bg: "bg-cyan-500/10 border-cyan-500/20", sub: "≥75% completion", up: true },
          { label: "At Risk Members", value: atRiskCount, icon: BarChart2, color: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/20", sub: "<40% completion", up: false },
        ].map((s, i) => (
          <motion.div key={i} {...fade(0.1 + i * 0.05)} className="bg-[#131B2F]/60 backdrop-blur-xl border border-white/[0.06] p-6 rounded-2xl flex items-center justify-between">
            <div>
              <p className="text-[11px] font-bold text-gray-500 uppercase tracking-[0.15em] mb-2">{s.label}</p>
              <h2 className="text-3xl font-black text-white mb-1">{s.value}</h2>
              <p className={`text-[10px] font-bold flex items-center gap-1 ${s.up ? "text-emerald-400" : "text-amber-400"}`}>
                {s.up ? <ArrowUpRight size={11} /> : <ArrowDownRight size={11} />} {s.sub}
              </p>
            </div>
            <div className={`w-12 h-12 rounded-xl ${s.bg} border flex items-center justify-center`}>
              <s.icon size={22} className={s.color} />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart */}
        <motion.div {...fade(0.25)} className="bg-[#131B2F]/60 backdrop-blur-xl border border-white/[0.06] p-6 rounded-2xl">
          <h2 className="text-lg font-bold text-white mb-6">Completion Rates</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "#6B7280", fontSize: 11, fontWeight: 700 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: "#6B7280", fontSize: 10 }} domain={[0, 100]} />
                <Tooltip contentStyle={{ backgroundColor: "rgba(19,27,47,0.95)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "12px" }} itemStyle={{ color: "#fff", fontWeight: "bold" }} />
                <Bar dataKey="rate" radius={[6, 6, 0, 0]}>
                  {chartData.map((e, i) => <Cell key={i} fill={e.rate >= 75 ? "#818CF8" : e.rate >= 40 ? "#6366F1" : "#F59E0B"} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Leaderboard */}
        <motion.div {...fade(0.3)} className="bg-[#131B2F]/60 backdrop-blur-xl border border-white/[0.06] p-6 rounded-2xl">
          <h2 className="text-lg font-bold text-white mb-6">Leaderboard</h2>
          <div className="space-y-3 max-h-[340px] overflow-y-auto pr-1">
            {sorted.map((m, idx) => {
              const rate = Math.round(m.completion_rate || 0);
              const init = m.employee_name?.split(" ").map(n => n[0]).join("") || "?";
              const rankCls = idx === 0 ? "bg-amber-500/20 text-amber-400 border-amber-500/30"
                : idx === 1 ? "bg-gray-400/15 text-gray-300 border-gray-400/25"
                : idx === 2 ? "bg-orange-500/15 text-orange-400 border-orange-500/25"
                : "bg-white/5 text-gray-500 border-white/5";
              return (
                <div key={m.employee_id} className="flex items-center gap-3 p-3 bg-black/20 border border-white/5 rounded-xl hover:border-white/10 transition-colors">
                  <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black border ${rankCls}`}>{idx + 1}</span>
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0">{init}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-white truncate">{m.employee_name}</p>
                    <p className="text-[10px] text-gray-500">{m.department}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-14 h-1.5 bg-black/40 border border-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full" style={{ width: `${rate}%` }} />
                    </div>
                    <span className="text-xs font-bold text-white w-8 text-right">{rate}%</span>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
