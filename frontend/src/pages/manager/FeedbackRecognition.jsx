import React, { useState } from "react";
import { useManager } from "../../context/ManagerContext";
import { Award, Send, Star, MessageSquare, ThumbsUp, Trophy, Heart } from "lucide-react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

const fade = (d = 0) => ({ initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, transition: { delay: d } });

const BADGES = [
  { id: "star", icon: Star, label: "Star Performer", color: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/20" },
  { id: "team", icon: ThumbsUp, label: "Team Player", color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/20" },
  { id: "innovator", icon: Trophy, label: "Innovator", color: "text-purple-400", bg: "bg-purple-500/10 border-purple-500/20" },
  { id: "leader", icon: Heart, label: "Leadership", color: "text-pink-400", bg: "bg-pink-500/10 border-pink-500/20" },
];

export default function FeedbackRecognition() {
  const { team } = useManager();
  const [selectedMember, setSelectedMember] = useState("");
  const [feedbackText, setFeedbackText] = useState("");
  const [selectedBadge, setSelectedBadge] = useState("");
  const [history, setHistory] = useState([]);

  const handleSubmit = () => {
    if (!selectedMember || !feedbackText.trim()) {
      toast.error("Please select a team member and write feedback.");
      return;
    }
    const member = team.find(m => String(m.employee_id) === selectedMember);
    const badge = BADGES.find(b => b.id === selectedBadge);
    const entry = {
      id: Date.now(),
      employeeName: member?.employee_name || "Unknown",
      initials: member?.employee_name?.split(" ").map(n => n[0]).join("") || "?",
      text: feedbackText,
      badge: badge?.label || null,
      badgeIcon: badge?.id || null,
      timestamp: new Date().toLocaleString(),
    };
    setHistory(prev => [entry, ...prev]);
    setFeedbackText("");
    setSelectedBadge("");
    setSelectedMember("");
    toast.success("Feedback sent successfully!");
  };

  return (
    <div className="p-6 lg:p-8 max-w-[1400px] mx-auto space-y-8">
      <motion.div {...fade(0)}>
        <h1 className="text-2xl font-bold text-white tracking-tight mb-1">Feedback & Recognition</h1>
        <p className="text-sm text-gray-500">Send feedback and recognize your team members' achievements.</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Send Feedback Form */}
        <motion.div {...fade(0.1)} className="lg:col-span-2 bg-[#131B2F]/60 backdrop-blur-xl border border-white/[0.06] rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/[0.06]">
            <MessageSquare className="text-purple-400" size={20} />
            <h2 className="text-lg font-bold text-white">Send Feedback</h2>
          </div>

          <div className="space-y-5">
            {/* Select Team Member */}
            <div>
              <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">Team Member</label>
              <select
                value={selectedMember}
                onChange={(e) => setSelectedMember(e.target.value)}
                className="w-full bg-black/30 border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white font-medium focus:outline-none focus:border-purple-500/40 transition-colors appearance-none cursor-pointer"
              >
                <option value="">Select a team member...</option>
                {team.map(m => (
                  <option key={m.employee_id} value={m.employee_id}>
                    {m.employee_name} — {m.department}
                  </option>
                ))}
              </select>
            </div>

            {/* Badge Selection */}
            <div>
              <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">Recognition Badge (Optional)</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {BADGES.map(b => (
                  <button
                    key={b.id}
                    onClick={() => setSelectedBadge(selectedBadge === b.id ? "" : b.id)}
                    className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all ${
                      selectedBadge === b.id
                        ? `${b.bg} border-current scale-[1.02]`
                        : "bg-black/20 border-white/5 hover:border-white/10"
                    }`}
                  >
                    <b.icon size={20} className={selectedBadge === b.id ? b.color : "text-gray-500"} />
                    <span className={`text-[10px] font-bold uppercase tracking-wider ${selectedBadge === b.id ? b.color : "text-gray-500"}`}>{b.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Feedback Text */}
            <div>
              <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">Your Feedback</label>
              <textarea
                rows={4}
                value={feedbackText}
                onChange={(e) => setFeedbackText(e.target.value)}
                placeholder="Write your feedback here..."
                className="w-full bg-black/30 border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-purple-500/40 resize-none transition-colors"
              />
            </div>

            <button
              onClick={handleSubmit}
              className="flex items-center justify-center gap-2 w-full py-3 bg-purple-500 hover:bg-purple-600 text-white font-bold rounded-xl transition-all shadow-lg shadow-purple-500/20 border border-purple-400/30"
            >
              <Send size={16} /> Send Feedback
            </button>
          </div>
        </motion.div>

        {/* Recent Feedback */}
        <motion.div {...fade(0.2)} className="bg-[#131B2F]/60 backdrop-blur-xl border border-white/[0.06] rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/[0.06]">
            <Award className="text-amber-400" size={20} />
            <h2 className="text-lg font-bold text-white">Recent</h2>
          </div>

          {history.length === 0 ? (
            <div className="text-center py-10">
              <Award size={32} className="mx-auto mb-3 text-gray-600" />
              <p className="text-sm text-gray-400 font-medium">No feedback sent yet.</p>
              <p className="text-xs text-gray-500 mt-1">Sent feedback will appear here.</p>
            </div>
          ) : (
            <div className="space-y-4 max-h-[500px] overflow-y-auto pr-1">
              {history.map(entry => (
                <div key={entry.id} className="p-4 bg-black/20 border border-white/5 rounded-xl">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-[10px] font-bold text-white">
                      {entry.initials}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-white">{entry.employeeName}</p>
                      <p className="text-[10px] text-gray-500">{entry.timestamp}</p>
                    </div>
                  </div>
                  {entry.badge && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider rounded bg-purple-500/10 text-purple-300 border border-purple-500/20 mb-2">
                      🏆 {entry.badge}
                    </span>
                  )}
                  <p className="text-xs text-gray-300 leading-relaxed">{entry.text}</p>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
