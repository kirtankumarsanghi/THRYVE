import { useState, useEffect } from "react";
import { TrendingUp, TrendingDown, AlertTriangle, Award, Target, Users, BarChart3, Activity } from "lucide-react";
import { motion } from "framer-motion";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const MOCK_INSIGHTS = {
  teamTrend: [
    { month: "Jan", performance: 65, goals: 12 },
    { month: "Feb", performance: 72, goals: 15 },
    { month: "Mar", performance: 68, goals: 14 },
    { month: "Apr", performance: 78, goals: 18 },
    { month: "May", performance: 82, goals: 20 },
  ],
  topPerformers: [
    { name: "Marcus Lee", score: 95, improvement: 12, avatar: "ML" },
    { name: "Jordan Kim", score: 92, improvement: 8, avatar: "JK" },
    { name: "Alex Johnson", score: 88, improvement: 15, avatar: "AJ" },
  ],
  needsAttention: [
    { name: "Sofia Garcia", score: 45, decline: -18, avatar: "SG", reason: "Low goal completion rate" },
    { name: "Chris Taylor", score: 52, decline: -12, avatar: "CT", reason: "Missed check-ins" },
  ],
  goalDistribution: [
    { name: "Completed", value: 45, color: "#10B981" },
    { name: "On Track", value: 30, color: "#8B5CF6" },
    { name: "At Risk", value: 15, color: "#F59E0B" },
    { name: "Overdue", value: 10, color: "#EF4444" },
  ],
  departmentComparison: [
    { dept: "Engineering", score: 82 },
    { dept: "Product", score: 78 },
    { dept: "Design", score: 85 },
    { dept: "Marketing", score: 75 },
  ],
};

const COLORS = ["#10B981", "#8B5CF6", "#F59E0B", "#EF4444"];

function Initials({ name }) {
  const init = name.split(" ").map(n => n[0]).join("").toUpperCase();
  return (
    <div className="w-10 h-10 rounded-full bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-sm font-bold text-purple-300">
      {init}
    </div>
  );
}

export default function PerformanceInsights() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setData(MOCK_INSIGHTS);
      setLoading(false);
    }, 800);
  }, []);

  if (loading) {
    return (
      <div className="p-6 max-w-7xl mx-auto space-y-6 animate-pulse">
        <div className="h-8 bg-white/5 rounded w-48"></div>
        <div className="grid grid-cols-3 gap-4">
          {[1, 2, 3].map(i => <div key={i} className="h-24 bg-white/5 rounded-2xl"></div>)}
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div className="h-80 bg-white/5 rounded-2xl"></div>
          <div className="h-80 bg-white/5 rounded-2xl"></div>
        </div>
      </div>
    );
  }

  const avgPerformance = data.teamTrend[data.teamTrend.length - 1].performance;
  const performanceChange = avgPerformance - data.teamTrend[data.teamTrend.length - 2].performance;

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 fade-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Performance Insights</h1>
        <p className="text-sm text-gray-400">AI-powered analytics and team performance trends</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 border border-purple-500/20 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center border border-purple-500/30">
              <Activity className="text-purple-400" size={20} />
            </div>
            <span className="flex items-center gap-1 text-sm font-semibold text-emerald-400">
              <TrendingUp size={16} />
              +{performanceChange}%
            </span>
          </div>
          <p className="text-sm text-gray-400 mb-1">Team Performance</p>
          <p className="text-3xl font-bold text-white">{avgPerformance}%</p>
        </div>

        <div className="bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 border border-emerald-500/20 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30">
              <Award className="text-emerald-400" size={20} />
            </div>
          </div>
          <p className="text-sm text-gray-400 mb-1">Top Performers</p>
          <p className="text-3xl font-bold text-white">{data.topPerformers.length}</p>
        </div>

        <div className="bg-gradient-to-br from-orange-500/10 to-orange-600/5 border border-orange-500/20 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-orange-500/20 flex items-center justify-center border border-orange-500/30">
              <AlertTriangle className="text-orange-400" size={20} />
            </div>
          </div>
          <p className="text-sm text-gray-400 mb-1">Needs Attention</p>
          <p className="text-3xl font-bold text-white">{data.needsAttention.length}</p>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Trend */}
        <div className="bg-white/2 border border-white/5 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-white">Performance Trend</h3>
              <p className="text-sm text-gray-400">Last 5 months</p>
            </div>
            <TrendingUp className="text-emerald-400" size={24} />
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={data.teamTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
              <XAxis dataKey="month" stroke="#9CA3AF" style={{ fontSize: '12px' }} />
              <YAxis stroke="#9CA3AF" style={{ fontSize: '12px' }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#0B1437', 
                  border: '1px solid rgba(139, 92, 246, 0.3)',
                  borderRadius: '12px',
                  color: '#fff'
                }}
              />
              <Line type="monotone" dataKey="performance" stroke="#8B5CF6" strokeWidth={3} dot={{ fill: '#8B5CF6', r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Goal Distribution */}
        <div className="bg-white/2 border border-white/5 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-white">Goal Status Distribution</h3>
              <p className="text-sm text-gray-400">Current quarter</p>
            </div>
            <Target className="text-purple-400" size={24} />
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={data.goalDistribution}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={5}
                dataKey="value"
              >
                {data.goalDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#0B1437', 
                  border: '1px solid rgba(139, 92, 246, 0.3)',
                  borderRadius: '12px',
                  color: '#fff'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-3 mt-4">
            {data.goalDistribution.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                <span className="text-sm text-gray-300">{item.name}: {item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Department Comparison */}
      <div className="bg-white/2 border border-white/5 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-bold text-white">Department Comparison</h3>
            <p className="text-sm text-gray-400">Average performance scores</p>
          </div>
          <BarChart3 className="text-blue-400" size={24} />
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={data.departmentComparison}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
            <XAxis dataKey="dept" stroke="#9CA3AF" style={{ fontSize: '12px' }} />
            <YAxis stroke="#9CA3AF" style={{ fontSize: '12px' }} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#0B1437', 
                border: '1px solid rgba(139, 92, 246, 0.3)',
                borderRadius: '12px',
                color: '#fff'
              }}
            />
            <Bar dataKey="score" fill="#8B5CF6" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Top Performers & Needs Attention */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Performers */}
        <div className="bg-white/2 border border-white/5 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Award className="text-emerald-400" size={20} />
            <h3 className="text-lg font-bold text-white">Top Performers</h3>
          </div>
          <div className="space-y-3">
            {data.topPerformers.map((performer, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-bold">
                    #{index + 1}
                  </div>
                  <Initials name={performer.name} />
                  <div>
                    <p className="text-sm font-semibold text-white">{performer.name}</p>
                    <p className="text-xs text-gray-400">Score: {performer.score}%</p>
                  </div>
                </div>
                <span className="flex items-center gap-1 text-sm font-semibold text-emerald-400">
                  <TrendingUp size={16} />
                  +{performer.improvement}%
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Needs Attention */}
        <div className="bg-white/2 border border-white/5 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="text-orange-400" size={20} />
            <h3 className="text-lg font-bold text-white">Needs Attention</h3>
          </div>
          <div className="space-y-3">
            {data.needsAttention.map((person, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 bg-orange-500/5 border border-orange-500/10 rounded-xl"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <Initials name={person.name} />
                    <div>
                      <p className="text-sm font-semibold text-white">{person.name}</p>
                      <p className="text-xs text-gray-400">Score: {person.score}%</p>
                    </div>
                  </div>
                  <span className="flex items-center gap-1 text-sm font-semibold text-red-400">
                    <TrendingDown size={16} />
                    {person.decline}%
                  </span>
                </div>
                <p className="text-xs text-orange-400 bg-orange-500/10 px-2 py-1 rounded-lg border border-orange-500/20">
                  {person.reason}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
