import { useState, useEffect } from "react";
import { Target, TrendingUp, AlertCircle, CheckCircle2, Clock, Filter, Search, Plus } from "lucide-react";
import { motion } from "framer-motion";

const MOCK_TEAM_GOALS = [
  {
    id: 1,
    title: "Increase Team Productivity by 25%",
    owner: "Alex Johnson",
    status: "on_track",
    progress: 68,
    startDate: "2024-01-01",
    endDate: "2024-03-31",
    quarter: "Q1",
    contributors: 5,
    milestones: { completed: 3, total: 5 }
  },
  {
    id: 2,
    title: "Launch New Product Feature",
    owner: "Priya Patel",
    status: "at_risk",
    progress: 42,
    startDate: "2024-01-15",
    endDate: "2024-04-15",
    quarter: "Q1",
    contributors: 8,
    milestones: { completed: 2, total: 6 }
  },
  {
    id: 3,
    title: "Reduce Customer Support Response Time",
    owner: "Marcus Lee",
    status: "completed",
    progress: 100,
    startDate: "2024-01-01",
    endDate: "2024-02-28",
    quarter: "Q1",
    contributors: 4,
    milestones: { completed: 4, total: 4 }
  },
  {
    id: 4,
    title: "Improve Code Quality Metrics",
    owner: "Sofia Garcia",
    status: "on_track",
    progress: 55,
    startDate: "2024-02-01",
    endDate: "2024-05-31",
    quarter: "Q2",
    contributors: 6,
    milestones: { completed: 2, total: 4 }
  },
];

const STATUS_CONFIG = {
  on_track: { label: "On Track", color: "emerald", icon: CheckCircle2 },
  at_risk: { label: "At Risk", color: "orange", icon: AlertCircle },
  completed: { label: "Completed", color: "purple", icon: CheckCircle2 },
  delayed: { label: "Delayed", color: "red", icon: Clock },
};

export default function TeamGoals() {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setGoals(MOCK_TEAM_GOALS);
      setLoading(false);
    }, 800);
  }, []);

  const filteredGoals = goals.filter(goal => {
    const matchesFilter = filter === "all" || goal.status === filter;
    const matchesSearch = goal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         goal.owner.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const stats = {
    total: goals.length,
    onTrack: goals.filter(g => g.status === "on_track").length,
    atRisk: goals.filter(g => g.status === "at_risk").length,
    completed: goals.filter(g => g.status === "completed").length,
  };

  if (loading) {
    return (
      <div className="p-6 max-w-7xl mx-auto space-y-6 animate-pulse">
        <div className="h-8 bg-white/5 rounded w-48"></div>
        <div className="grid grid-cols-4 gap-4">
          {[1, 2, 3, 4].map(i => <div key={i} className="h-24 bg-white/5 rounded-2xl"></div>)}
        </div>
        <div className="h-96 bg-white/5 rounded-2xl"></div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Team Goals</h1>
          <p className="text-sm text-gray-400">Track and manage team-wide objectives</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-purple-500 hover:bg-purple-600 text-white rounded-xl font-medium transition-colors">
          <Plus size={18} />
          Create Team Goal
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white/2 border border-white/5 rounded-2xl p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20">
              <Target className="text-purple-400" size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-400">Total Goals</p>
              <p className="text-2xl font-bold text-white">{stats.total}</p>
            </div>
          </div>
        </div>

        <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-2xl p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
              <CheckCircle2 className="text-emerald-400" size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-400">On Track</p>
              <p className="text-2xl font-bold text-emerald-400">{stats.onTrack}</p>
            </div>
          </div>
        </div>

        <div className="bg-orange-500/5 border border-orange-500/10 rounded-2xl p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center border border-orange-500/20">
              <AlertCircle className="text-orange-400" size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-400">At Risk</p>
              <p className="text-2xl font-bold text-orange-400">{stats.atRisk}</p>
            </div>
          </div>
        </div>

        <div className="bg-purple-500/5 border border-purple-500/10 rounded-2xl p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20">
              <TrendingUp className="text-purple-400" size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-400">Completed</p>
              <p className="text-2xl font-bold text-purple-400">{stats.completed}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
          <input
            type="text"
            placeholder="Search goals or owners..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-purple-500/50 focus:outline-none transition-colors"
          />
        </div>
        <div className="flex gap-2">
          {["all", "on_track", "at_risk", "completed"].map(status => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2.5 rounded-xl font-medium text-sm transition-colors ${
                filter === status
                  ? "bg-purple-500 text-white"
                  : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
              }`}
            >
              {status === "all" ? "All" : STATUS_CONFIG[status]?.label}
            </button>
          ))}
        </div>
      </div>

      {/* Goals List */}
      <div className="space-y-4">
        {filteredGoals.map((goal, index) => {
          const statusConfig = STATUS_CONFIG[goal.status];
          const StatusIcon = statusConfig.icon;
          
          return (
            <motion.div
              key={goal.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white/2 border border-white/5 rounded-2xl p-6 hover:border-white/10 transition-colors"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-white">{goal.title}</h3>
                    <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-${statusConfig.color}-500/10 text-${statusConfig.color}-400 border border-${statusConfig.color}-500/20`}>
                      <StatusIcon size={12} />
                      {statusConfig.label}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <span>Owner: <span className="text-white font-medium">{goal.owner}</span></span>
                    <span>•</span>
                    <span>{goal.quarter}</span>
                    <span>•</span>
                    <span>{goal.contributors} Contributors</span>
                    <span>•</span>
                    <span>Milestones: {goal.milestones.completed}/{goal.milestones.total}</span>
                  </div>
                </div>
                <button className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg text-sm font-medium transition-colors">
                  View Details
                </button>
              </div>

              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Progress</span>
                  <span className="text-white font-semibold">{goal.progress}%</span>
                </div>
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${goal.progress}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    className={`h-full bg-${statusConfig.color}-500 rounded-full`}
                  />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {filteredGoals.length === 0 && (
        <div className="text-center py-12 bg-white/2 border border-white/5 rounded-2xl">
          <Target className="mx-auto text-gray-500 mb-3" size={48} />
          <p className="text-gray-400">No goals found matching your criteria</p>
        </div>
      )}
    </div>
  );
}
