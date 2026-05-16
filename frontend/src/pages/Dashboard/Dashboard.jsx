import { useState, useEffect } from "react";
import { 
  Target, TrendingUp, ClipboardList, Calendar, 
  Plus, Send, Zap, ChevronRight, Lock
} from "lucide-react";
import { Link } from "react-router-dom";

// Mock API Data
const MOCK_API_DATA = {
  stats: {
    activeGoals: 5,
    totalGoals: 8,
    overallProgress: 62,
    pendingApproval: 2,
    currentQuarter: "Q2 Check-in Open",
  },
  goals: [
    { id: 1, title: "Implement OKR Tracking Protocol", thrust: "Operations", uom: "%", target: 100, q1: 25, q2: 75, progress: 75, status: "Approved" },
    { id: 2, title: "Reduce Cloud Infrastructure Spend", thrust: "Finance", uom: "$K", target: 50, q1: 10, q2: 25, progress: 50, status: "Submitted" },
    { id: 3, title: "Launch Client Portal v2", thrust: "Product", uom: "Milestones", target: 100, q1: 0, q2: 40, progress: 40, status: "Locked" },
    { id: 4, title: "Hire 3 Senior Engineers", thrust: "Talent", uom: "Hires", target: 3, q1: 1, q2: 2, progress: 66, status: "Draft" },
  ],
  insights: [
    { id: 1, title: "High Probability of Success", desc: "Goal 'Implement OKR Tracking Protocol' is trending well above expected velocity. You are 15% ahead of schedule.", color: "emerald" },
    { id: 2, title: "Attention Needed", desc: "Your 'Launch Client Portal v2' goal has stagnated in the last 14 days. Consider adjusting Q2 targets.", color: "orange" },
    { id: 3, title: "Resource Optimization", desc: "Based on your progress, reallocating 10% of focus to 'Cloud Spend' could yield a 20% increase in outcome.", color: "blue" },
  ],
  settings: {
    isCycleLocked: false,
    isQ2WindowOpen: true,
  }
};

const STATUS_STYLES = {
  Draft: "bg-gray-500/10 text-gray-400 border-gray-500/20",
  Submitted: "bg-orange-500/10 text-orange-400 border-orange-500/20",
  Approved: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  Locked: "bg-purple-500/10 text-purple-400 border-purple-500/20",
};

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API fetch
    const fetchData = async () => {
      await new Promise(r => setTimeout(r, 1200));
      setData(MOCK_API_DATA);
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="p-6 max-w-7xl mx-auto space-y-6 animate-pulse">
        <div className="h-8 bg-white/5 rounded w-48 mb-6"></div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map(i => <div key={i} className="h-28 bg-white/5 rounded-2xl border border-white/5"></div>)}
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          <div className="xl:col-span-3 h-80 bg-white/5 rounded-2xl border border-white/5"></div>
          <div className="h-80 bg-white/5 rounded-2xl border border-white/5"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {[1, 2, 3].map(i => <div key={i} className="h-32 bg-white/5 rounded-2xl border border-white/5"></div>)}
        </div>
      </div>
    );
  }

  const { stats, goals, insights, settings } = data;

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 fade-in font-sans">
      
      {/* Header */}
      <div className="mb-2">
        <h1 className="text-2xl font-bold text-white">Employee Dashboard</h1>
        <p className="text-sm text-gray-400">Welcome back. Here is your quarterly overview.</p>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white/2 border border-white/5 rounded-2xl p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
            <Target className="text-blue-400" size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-400 font-medium">Active Goals</p>
            <p className="text-2xl font-bold text-white">{stats.activeGoals} <span className="text-sm text-gray-500">/ {stats.totalGoals}</span></p>
          </div>
        </div>
        
        <div className="bg-white/2 border border-white/5 rounded-2xl p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
            <TrendingUp className="text-emerald-400" size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-400 font-medium">Overall Progress</p>
            <p className="text-2xl font-bold text-white">{stats.overallProgress}%</p>
          </div>
        </div>

        <div className="bg-white/2 border border-white/5 rounded-2xl p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center border border-orange-500/20">
            <ClipboardList className="text-orange-400" size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-400 font-medium">Pending Approval</p>
            <p className="text-2xl font-bold text-white">{stats.pendingApproval}</p>
          </div>
        </div>

        <div className="bg-white/2 border border-white/5 rounded-2xl p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20">
            <Calendar className="text-purple-400" size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-400 font-medium">Current Quarter</p>
            <p className="text-sm font-bold text-purple-300 mt-1">{stats.currentQuarter}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* Goals Summary Table */}
        <div className="xl:col-span-3 bg-white/2 border border-white/5 rounded-2xl overflow-hidden flex flex-col">
          <div className="px-6 py-5 border-b border-white/5 flex justify-between items-center bg-white/[0.01]">
            <h2 className="text-base font-bold text-white">Goals Summary</h2>
            <Link to="/employee/goals" className="text-sm text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1">
              View All <ChevronRight size={16} />
            </Link>
          </div>
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/5 bg-white/[0.02]">
                  <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Goal Title</th>
                  <th className="px-4 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Thrust Area</th>
                  <th className="px-4 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Target</th>
                  <th className="px-4 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Q1 Actual</th>
                  <th className="px-4 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Q2 Actual</th>
                  <th className="px-4 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Progress</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {goals.map((g) => (
                  <tr key={g.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-4">
                      <p className="text-sm font-medium text-white line-clamp-1">{g.title}</p>
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-xs text-gray-300 bg-white/5 px-2.5 py-1 rounded-md border border-white/5">
                        {g.thrust}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-300">
                      {g.target} <span className="text-xs text-gray-500">{g.uom}</span>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-300">{g.q1}</td>
                    <td className="px-4 py-4 text-sm text-gray-300">{g.q2}</td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-full h-1.5 bg-white/10 rounded-full w-16">
                          <div className="h-full bg-blue-500 rounded-full" style={{ width: `${g.progress}%` }} />
                        </div>
                        <span className="text-xs text-gray-400">{g.progress}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className={`inline-flex px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider border ${STATUS_STYLES[g.status]}`}>
                        {g.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="xl:col-span-1 bg-white/2 border border-white/5 rounded-2xl p-6 flex flex-col">
          <h2 className="text-base font-bold text-white mb-5">Quick Actions</h2>
          <div className="space-y-3 flex-1 flex flex-col justify-center">
            
            <button 
              disabled={stats.activeGoals >= stats.totalGoals || settings.isCycleLocked}
              className="w-full flex items-center justify-between p-4 rounded-xl border border-blue-500/30 bg-blue-500/10 hover:bg-blue-500/20 text-blue-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              <div className="flex items-center gap-3">
                {settings.isCycleLocked ? <Lock size={18} /> : <Plus size={18} />}
                <span className="text-sm font-semibold">Add New Goal</span>
              </div>
              <ChevronRight size={16} className="opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </button>

            <button className="w-full flex items-center justify-between p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-white transition-all group">
              <div className="flex items-center gap-3">
                <Send size={18} className="text-orange-400" />
                <span className="text-sm font-semibold">Submit for Approval</span>
              </div>
              <ChevronRight size={16} className="opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </button>

            <button 
              disabled={!settings.isQ2WindowOpen}
              className="w-full flex items-center justify-between p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              <div className="flex items-center gap-3">
                <Calendar size={18} className="text-purple-400" />
                <span className="text-sm font-semibold">Open Q2 Check-in</span>
              </div>
              <ChevronRight size={16} className="opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </button>

          </div>
        </div>
      </div>

      {/* AI Insights Panel */}
      <div className="mt-8">
        <div className="flex items-center gap-2 mb-4">
          <Zap size={18} className="text-yellow-400" />
          <h2 className="text-base font-bold text-white">Thryve AI Insights</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {insights.map(insight => {
            const colors = {
              emerald: "from-emerald-500/10 to-transparent border-emerald-500/20 text-emerald-400",
              orange: "from-orange-500/10 to-transparent border-orange-500/20 text-orange-400",
              blue: "from-blue-500/10 to-transparent border-blue-500/20 text-blue-400",
            };
            
            return (
              <div key={insight.id} className={`bg-gradient-to-br border rounded-2xl p-5 ${colors[insight.color]}`}>
                <h3 className="text-sm font-bold mb-2 flex items-center gap-2">
                  {insight.title}
                </h3>
                <p className="text-xs text-gray-300 leading-relaxed">
                  {insight.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
