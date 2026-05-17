import { useState, useEffect } from "react";
import { Award, Trophy, Star, TrendingUp, Target, Zap, Heart, Crown } from "lucide-react";
import { motion } from "framer-motion";

const MOCK_DATA = {
  badges: [
    { id: 1, name: "Code Excellence", icon: "💻", earned: true, date: "2024-05-15", description: "Consistently deliver clean, well-documented code" },
    { id: 2, name: "Team Player", icon: "🤝", earned: true, date: "2024-04-20", description: "Outstanding collaboration and teamwork" },
    { id: 3, name: "Innovation", icon: "💡", earned: true, date: "2024-03-10", description: "Innovative solutions and creative thinking" },
    { id: 4, name: "Leadership", icon: "👑", earned: false, locked: true, description: "Demonstrate leadership qualities" },
    { id: 5, name: "Problem Solver", icon: "🎯", earned: true, date: "2024-02-28", description: "Excellent problem-solving skills" },
    { id: 6, name: "Customer Focus", icon: "❤️", earned: false, locked: true, description: "Exceptional customer service" },
    { id: 7, name: "Fast Learner", icon: "⚡", earned: true, date: "2024-01-15", description: "Quick to learn new technologies" },
    { id: 8, name: "Mentor", icon: "🎓", earned: false, locked: true, description: "Help others grow and develop" },
  ],
  recognitions: [
    {
      id: 1,
      from: "Sarah Manager",
      title: "Outstanding Code Quality",
      message: "Your recent refactoring work saved us 2 weeks of tech debt. Excellent work!",
      date: "2024-05-15",
      badge: "Code Excellence",
      visibility: "public"
    },
    {
      id: 2,
      from: "John Team Lead",
      title: "Team Leadership",
      message: "Great job mentoring the junior developers and organizing knowledge sharing sessions.",
      date: "2024-04-20",
      badge: "Team Player",
      visibility: "public"
    },
    {
      id: 3,
      from: "Sarah Manager",
      title: "Innovative Solution",
      message: "Your approach to solving the performance issue was creative and effective.",
      date: "2024-03-10",
      badge: "Innovation",
      visibility: "private"
    },
  ],
  milestones: [
    { id: 1, title: "First Goal Completed", date: "2024-01-15", icon: Target },
    { id: 2, title: "5 Goals Completed", date: "2024-03-20", icon: Trophy },
    { id: 3, title: "100% Quarter Completion", date: "2024-03-31", icon: Star },
    { id: 4, title: "First Recognition", date: "2024-02-10", icon: Award },
  ],
  stats: {
    totalBadges: 5,
    totalRecognitions: 8,
    goalsCompleted: 12,
    quarterStreak: 2
  }
};

export default function Achievements() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("badges");

  useEffect(() => {
    setTimeout(() => {
      setData(MOCK_DATA);
      setLoading(false);
    }, 800);
  }, []);

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
      <div>
        <h1 className="text-2xl font-bold text-white">My Achievements</h1>
        <p className="text-sm text-gray-400">Celebrate your accomplishments and recognition</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-yellow-500/10 to-yellow-600/5 border border-yellow-500/20 rounded-2xl p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-yellow-500/10 flex items-center justify-center border border-yellow-500/20">
              <Award className="text-yellow-400" size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-400">Badges Earned</p>
              <p className="text-2xl font-bold text-yellow-400">{data.stats.totalBadges}</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 border border-purple-500/20 rounded-2xl p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20">
              <Heart className="text-purple-400" size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-400">Recognitions</p>
              <p className="text-2xl font-bold text-purple-400">{data.stats.totalRecognitions}</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 border border-emerald-500/20 rounded-2xl p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
              <Trophy className="text-emerald-400" size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-400">Goals Completed</p>
              <p className="text-2xl font-bold text-emerald-400">{data.stats.goalsCompleted}</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-500/20 rounded-2xl p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
              <Zap className="text-blue-400" size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-400">Quarter Streak</p>
              <p className="text-2xl font-bold text-blue-400">{data.stats.quarterStreak}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-white/10">
        {["badges", "recognitions", "milestones"].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 font-medium text-sm transition-colors relative ${
              activeTab === tab ? "text-blue-400" : "text-gray-400 hover:text-white"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
            {activeTab === tab && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500"
              />
            )}
          </button>
        ))}
      </div>

      {/* Badges Tab */}
      {activeTab === "badges" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white">Achievement Badges</h2>
            <p className="text-sm text-gray-400">{data.badges.filter(b => b.earned).length} of {data.badges.length} earned</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {data.badges.map((badge, index) => (
              <motion.div
                key={badge.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className={`relative rounded-2xl p-6 text-center transition-all ${
                  badge.earned
                    ? "bg-gradient-to-br from-yellow-500/10 to-yellow-600/5 border border-yellow-500/20 hover:border-yellow-500/40"
                    : "bg-white/2 border border-white/5 opacity-50"
                }`}
              >
                {badge.locked && (
                  <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
                    <span className="text-xs">🔒</span>
                  </div>
                )}
                <div className="text-5xl mb-3">{badge.icon}</div>
                <h3 className="text-sm font-bold text-white mb-1">{badge.name}</h3>
                <p className="text-xs text-gray-400 mb-2">{badge.description}</p>
                {badge.earned && (
                  <p className="text-xs text-yellow-400 font-semibold">Earned {badge.date}</p>
                )}
                {badge.locked && (
                  <p className="text-xs text-gray-500">Keep working to unlock!</p>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Recognitions Tab */}
      {activeTab === "recognitions" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white">Recognition History</h2>
            <p className="text-sm text-gray-400">{data.recognitions.length} total</p>
          </div>

          <div className="space-y-4">
            {data.recognitions.map((recognition, index) => (
              <motion.div
                key={recognition.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-gradient-to-br from-purple-500/5 to-purple-600/5 border border-purple-500/20 rounded-2xl p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-sm font-bold text-purple-300">
                      {recognition.from.split(" ").map(n => n[0]).join("").toUpperCase()}
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-white">{recognition.title}</h3>
                      <p className="text-sm text-gray-400">From {recognition.from} • {recognition.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {recognition.badge && (
                      <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 text-xs font-semibold rounded-lg border border-yellow-500/30">
                        {recognition.badge}
                      </span>
                    )}
                    <span className="text-xs text-gray-500">
                      {recognition.visibility === "public" ? "👥" : "🔒"}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-gray-300 leading-relaxed">{recognition.message}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Milestones Tab */}
      {activeTab === "milestones" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white">Career Milestones</h2>
            <p className="text-sm text-gray-400">{data.milestones.length} achieved</p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-white/10"></div>

            <div className="space-y-6">
              {data.milestones.map((milestone, index) => {
                const Icon = milestone.icon;
                return (
                  <motion.div
                    key={milestone.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="relative flex items-start gap-4"
                  >
                    {/* Timeline Dot */}
                    <div className="relative z-10 w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center border-4 border-[#060D1F] shadow-lg shadow-blue-500/20">
                      <Icon className="text-white" size={20} />
                    </div>

                    {/* Content */}
                    <div className="flex-1 bg-white/2 border border-white/5 rounded-2xl p-5 hover:border-white/10 transition-colors">
                      <h3 className="text-base font-semibold text-white mb-1">{milestone.title}</h3>
                      <p className="text-sm text-gray-400">{milestone.date}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
