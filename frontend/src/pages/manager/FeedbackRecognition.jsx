import { useState, useEffect } from "react";
import { Award, MessageSquare, ThumbsUp, Star, Send, Plus, TrendingUp, Heart, Zap } from "lucide-react";
import { motion } from "framer-motion";

const MOCK_FEEDBACK_HISTORY = [
  {
    id: 1,
    type: "recognition",
    employee: "Marcus Lee",
    title: "Outstanding Code Quality",
    message: "Marcus consistently delivers clean, well-documented code. His recent refactoring saved us 2 weeks of tech debt.",
    date: "2024-05-15",
    badge: "Code Excellence",
    visibility: "public"
  },
  {
    id: 2,
    type: "feedback",
    employee: "Sofia Garcia",
    title: "Growth Opportunity",
    message: "Great progress on the new feature! Consider breaking down larger PRs for easier review. Let's pair program next week.",
    date: "2024-05-12",
    visibility: "private"
  },
  {
    id: 3,
    type: "recognition",
    employee: "Alex Johnson",
    title: "Team Leadership",
    message: "Alex stepped up to mentor junior developers and organized knowledge sharing sessions. True team player!",
    date: "2024-05-10",
    badge: "Leadership",
    visibility: "public"
  },
];

const RECOGNITION_BADGES = [
  { id: 1, name: "Code Excellence", icon: "💻", color: "purple" },
  { id: 2, name: "Team Player", icon: "🤝", color: "blue" },
  { id: 3, name: "Innovation", icon: "💡", color: "yellow" },
  { id: 4, name: "Leadership", icon: "👑", color: "orange" },
  { id: 5, name: "Problem Solver", icon: "🎯", color: "emerald" },
  { id: 6, name: "Customer Focus", icon: "❤️", color: "red" },
];

const TEAM_MEMBERS = [
  "Alex Johnson",
  "Priya Patel",
  "Marcus Lee",
  "Sofia Garcia",
  "Jordan Kim",
  "Chris Taylor",
];

function Initials({ name }) {
  const init = name.split(" ").map(n => n[0]).join("").toUpperCase();
  return (
    <div className="w-10 h-10 rounded-full bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-sm font-bold text-purple-300">
      {init}
    </div>
  );
}

export default function FeedbackRecognition() {
  const [feedbackHistory, setFeedbackHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("give");
  const [feedbackType, setFeedbackType] = useState("recognition");
  
  // Form state
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [selectedBadge, setSelectedBadge] = useState(null);
  const [visibility, setVisibility] = useState("public");

  useEffect(() => {
    setTimeout(() => {
      setFeedbackHistory(MOCK_FEEDBACK_HISTORY);
      setLoading(false);
    }, 800);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log({ selectedEmployee, title, message, selectedBadge, visibility, feedbackType });
    // Reset form
    setSelectedEmployee("");
    setTitle("");
    setMessage("");
    setSelectedBadge(null);
  };

  const stats = {
    totalGiven: feedbackHistory.length,
    recognitions: feedbackHistory.filter(f => f.type === "recognition").length,
    feedback: feedbackHistory.filter(f => f.type === "feedback").length,
  };

  if (loading) {
    return (
      <div className="p-6 max-w-7xl mx-auto space-y-6 animate-pulse">
        <div className="h-8 bg-white/5 rounded w-48"></div>
        <div className="grid grid-cols-3 gap-4">
          {[1, 2, 3].map(i => <div key={i} className="h-24 bg-white/5 rounded-2xl"></div>)}
        </div>
        <div className="h-96 bg-white/5 rounded-2xl"></div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 fade-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Feedback & Recognition</h1>
        <p className="text-sm text-gray-400">Recognize achievements and provide constructive feedback</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-purple-500/5 border border-purple-500/10 rounded-2xl p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20">
              <MessageSquare className="text-purple-400" size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-400">Total Given</p>
              <p className="text-2xl font-bold text-white">{stats.totalGiven}</p>
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

        <div className="bg-blue-500/5 border border-blue-500/10 rounded-2xl p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
              <ThumbsUp className="text-blue-400" size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-400">Feedback</p>
              <p className="text-2xl font-bold text-blue-400">{stats.feedback}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-white/10">
        <button
          onClick={() => setActiveTab("give")}
          className={`px-6 py-3 font-medium text-sm transition-colors relative ${
            activeTab === "give"
              ? "text-purple-400"
              : "text-gray-400 hover:text-white"
          }`}
        >
          Give Feedback
          {activeTab === "give" && (
            <motion.div
              layoutId="activeTab"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-500"
            />
          )}
        </button>
        <button
          onClick={() => setActiveTab("history")}
          className={`px-6 py-3 font-medium text-sm transition-colors relative ${
            activeTab === "history"
              ? "text-purple-400"
              : "text-gray-400 hover:text-white"
          }`}
        >
          History
          {activeTab === "history" && (
            <motion.div
              layoutId="activeTab"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-500"
            />
          )}
        </button>
      </div>

      {/* Give Feedback Tab */}
      {activeTab === "give" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/2 border border-white/5 rounded-2xl p-6"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Type Selection */}
            <div>
              <label className="text-sm font-semibold text-gray-400 mb-3 block">Type</label>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setFeedbackType("recognition")}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors ${
                    feedbackType === "recognition"
                      ? "bg-emerald-500/20 text-emerald-400 border-2 border-emerald-500/40"
                      : "bg-white/5 text-gray-400 border-2 border-white/10 hover:border-white/20"
                  }`}
                >
                  <Award size={18} />
                  Recognition
                </button>
                <button
                  type="button"
                  onClick={() => setFeedbackType("feedback")}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors ${
                    feedbackType === "feedback"
                      ? "bg-blue-500/20 text-blue-400 border-2 border-blue-500/40"
                      : "bg-white/5 text-gray-400 border-2 border-white/10 hover:border-white/20"
                  }`}
                >
                  <MessageSquare size={18} />
                  Constructive Feedback
                </button>
              </div>
            </div>

            {/* Employee Selection */}
            <div>
              <label className="text-sm font-semibold text-gray-400 mb-2 block">Select Team Member</label>
              <select
                value={selectedEmployee}
                onChange={(e) => setSelectedEmployee(e.target.value)}
                className="w-full px-4 py-3 bg-[#060D1F] border border-white/10 rounded-xl text-white focus:border-purple-500/50 focus:outline-none transition-colors"
                required
              >
                <option value="">Choose an employee...</option>
                {TEAM_MEMBERS.map(member => (
                  <option key={member} value={member}>{member}</option>
                ))}
              </select>
            </div>

            {/* Badge Selection (only for recognition) */}
            {feedbackType === "recognition" && (
              <div>
                <label className="text-sm font-semibold text-gray-400 mb-3 block">Select Badge</label>
                <div className="grid grid-cols-3 gap-3">
                  {RECOGNITION_BADGES.map(badge => (
                    <button
                      key={badge.id}
                      type="button"
                      onClick={() => setSelectedBadge(badge)}
                      className={`flex flex-col items-center gap-2 p-4 rounded-xl transition-all ${
                        selectedBadge?.id === badge.id
                          ? `bg-${badge.color}-500/20 border-2 border-${badge.color}-500/40`
                          : "bg-white/5 border-2 border-white/10 hover:border-white/20"
                      }`}
                    >
                      <span className="text-3xl">{badge.icon}</span>
                      <span className="text-xs font-medium text-white">{badge.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Title */}
            <div>
              <label className="text-sm font-semibold text-gray-400 mb-2 block">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Outstanding Performance on Q1 Goals"
                className="w-full px-4 py-3 bg-[#060D1F] border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-purple-500/50 focus:outline-none transition-colors"
                required
              />
            </div>

            {/* Message */}
            <div>
              <label className="text-sm font-semibold text-gray-400 mb-2 block">Message</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your feedback or recognition message..."
                rows={5}
                className="w-full px-4 py-3 bg-[#060D1F] border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-purple-500/50 focus:outline-none transition-colors resize-none"
                required
              />
            </div>

            {/* Visibility */}
            <div>
              <label className="text-sm font-semibold text-gray-400 mb-3 block">Visibility</label>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setVisibility("public")}
                  className={`flex-1 px-4 py-3 rounded-xl font-medium transition-colors ${
                    visibility === "public"
                      ? "bg-purple-500/20 text-purple-400 border-2 border-purple-500/40"
                      : "bg-white/5 text-gray-400 border-2 border-white/10 hover:border-white/20"
                  }`}
                >
                  Public (Team can see)
                </button>
                <button
                  type="button"
                  onClick={() => setVisibility("private")}
                  className={`flex-1 px-4 py-3 rounded-xl font-medium transition-colors ${
                    visibility === "private"
                      ? "bg-purple-500/20 text-purple-400 border-2 border-purple-500/40"
                      : "bg-white/5 text-gray-400 border-2 border-white/10 hover:border-white/20"
                  }`}
                >
                  Private (1-on-1)
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-xl font-semibold transition-colors"
            >
              <Send size={18} />
              Send {feedbackType === "recognition" ? "Recognition" : "Feedback"}
            </button>
          </form>
        </motion.div>
      )}

      {/* History Tab */}
      {activeTab === "history" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          {feedbackHistory.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`bg-white/2 border rounded-2xl p-5 ${
                item.type === "recognition"
                  ? "border-emerald-500/20 bg-emerald-500/5"
                  : "border-blue-500/20 bg-blue-500/5"
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <Initials name={item.employee} />
                  <div>
                    <h3 className="text-base font-semibold text-white">{item.title}</h3>
                    <p className="text-sm text-gray-400">{item.employee} • {item.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {item.badge && (
                    <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-semibold rounded-lg border border-emerald-500/30">
                      {item.badge}
                    </span>
                  )}
                  <span className={`px-3 py-1 text-xs font-semibold rounded-lg ${
                    item.type === "recognition"
                      ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                      : "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                  }`}>
                    {item.type === "recognition" ? <Award size={12} className="inline mr-1" /> : <MessageSquare size={12} className="inline mr-1" />}
                    {item.type === "recognition" ? "Recognition" : "Feedback"}
                  </span>
                </div>
              </div>
              <p className="text-sm text-gray-300 leading-relaxed mb-3">{item.message}</p>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>{item.visibility === "public" ? "👥 Public" : "🔒 Private"}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
