import { useState, useEffect } from "react";
import { MessageSquare, Award, TrendingUp, Calendar, Filter, Search } from "lucide-react";
import { motion } from "framer-motion";

const MOCK_FEEDBACK = [
  {
    id: 1,
    type: "recognition",
    from: "Sarah Manager",
    title: "Outstanding Code Quality",
    message: "Your recent refactoring work on the authentication module was exceptional. The code is clean, well-documented, and follows best practices. This saved us significant tech debt and improved our codebase quality.",
    date: "2024-05-15",
    badge: "Code Excellence",
    category: "Technical Skills"
  },
  {
    id: 2,
    type: "feedback",
    from: "Sarah Manager",
    title: "Growth Opportunity - Code Reviews",
    message: "You're doing great work! One area for improvement: try to break down larger PRs into smaller, more focused changes. This makes code reviews easier and faster. Let's pair program next week to discuss strategies.",
    date: "2024-05-12",
    category: "Process Improvement"
  },
  {
    id: 3,
    type: "recognition",
    from: "John Team Lead",
    title: "Excellent Team Collaboration",
    message: "Thank you for stepping up to mentor the junior developers. Your knowledge sharing sessions have been incredibly valuable to the team. Keep up the great work!",
    date: "2024-04-20",
    badge: "Team Player",
    category: "Leadership"
  },
  {
    id: 4,
    type: "feedback",
    from: "Sarah Manager",
    title: "Communication Enhancement",
    message: "Your technical skills are strong. To take it to the next level, focus on communicating progress more proactively. Daily standup updates and Slack messages help the team stay aligned.",
    date: "2024-04-10",
    category: "Communication"
  },
  {
    id: 5,
    type: "recognition",
    from: "Product Manager",
    title: "Customer-Focused Solution",
    message: "Your quick response to the customer issue and creative solution prevented a major escalation. Great problem-solving under pressure!",
    date: "2024-03-28",
    badge: "Problem Solver",
    category: "Customer Focus"
  },
];

const CATEGORIES = ["All", "Technical Skills", "Leadership", "Communication", "Process Improvement", "Customer Focus"];

export default function FeedbackHistory() {
  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setFeedback(MOCK_FEEDBACK);
      setLoading(false);
    }, 800);
  }, []);

  const filteredFeedback = feedback.filter(item => {
    const matchesFilter = filter === "All" || item.category === filter;
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.from.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const stats = {
    total: feedback.length,
    recognitions: feedback.filter(f => f.type === "recognition").length,
    feedback: feedback.filter(f => f.type === "feedback").length,
    thisMonth: feedback.filter(f => new Date(f.date).getMonth() === new Date().getMonth()).length
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
      <div>
        <h1 className="text-2xl font-bold text-white">Feedback History</h1>
        <p className="text-sm text-gray-400">View all feedback and recognition from your manager</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-blue-500/5 border border-blue-500/10 rounded-2xl p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
              <MessageSquare className="text-blue-400" size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-400">Total Feedback</p>
              <p className="text-2xl font-bold text-white">{stats.total}</p>
            </div>
          </div>
        </div>

        <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-2xl p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
              <Award className="text-emerald-400" size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-400">Recognitions</p>
              <p className="text-2xl font-bold text-emerald-400">{stats.recognitions}</p>
            </div>
          </div>
        </div>

        <div className="bg-purple-500/5 border border-purple-500/10 rounded-2xl p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20">
              <TrendingUp className="text-purple-400" size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-400">Growth Feedback</p>
              <p className="text-2xl font-bold text-purple-400">{stats.feedback}</p>
            </div>
          </div>
        </div>

        <div className="bg-orange-500/5 border border-orange-500/10 rounded-2xl p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center border border-orange-500/20">
              <Calendar className="text-orange-400" size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-400">This Month</p>
              <p className="text-2xl font-bold text-orange-400">{stats.thisMonth}</p>
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
            placeholder="Search feedback..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-blue-500/50 focus:outline-none transition-colors"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto">
          {CATEGORIES.map(category => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-4 py-2.5 rounded-xl font-medium text-sm whitespace-nowrap transition-colors ${
                filter === category
                  ? "bg-blue-500 text-white"
                  : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Feedback List */}
      <div className="space-y-4">
        {filteredFeedback.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className={`rounded-2xl p-6 border ${
              item.type === "recognition"
                ? "bg-emerald-500/5 border-emerald-500/20"
                : "bg-blue-500/5 border-blue-500/20"
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                  item.type === "recognition"
                    ? "bg-emerald-500/20 border border-emerald-500/30 text-emerald-300"
                    : "bg-blue-500/20 border border-blue-500/30 text-blue-300"
                }`}>
                  {item.from.split(" ").map(n => n[0]).join("").toUpperCase()}
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white">{item.title}</h3>
                  <p className="text-sm text-gray-400">From {item.from} • {item.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {item.badge && (
                  <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 text-xs font-semibold rounded-lg border border-yellow-500/30">
                    {item.badge}
                  </span>
                )}
                <span className={`px-3 py-1 text-xs font-semibold rounded-lg ${
                  item.type === "recognition"
                    ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                    : "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                }`}>
                  {item.type === "recognition" ? (
                    <><Award size={12} className="inline mr-1" />Recognition</>
                  ) : (
                    <><MessageSquare size={12} className="inline mr-1" />Feedback</>
                  )}
                </span>
              </div>
            </div>

            <p className="text-sm text-gray-300 leading-relaxed mb-3">{item.message}</p>

            <div className="flex items-center justify-between">
              <span className="px-2 py-1 bg-white/5 border border-white/10 rounded-lg text-xs text-gray-400">
                {item.category}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredFeedback.length === 0 && (
        <div className="text-center py-12 bg-white/2 border border-white/5 rounded-2xl">
          <MessageSquare className="mx-auto text-gray-500 mb-3" size={48} />
          <p className="text-gray-400">No feedback found matching your criteria</p>
        </div>
      )}
    </div>
  );
}
