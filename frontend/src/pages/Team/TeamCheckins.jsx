import { ClipboardList, CheckCircle2, Clock, MessageSquare, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";

const CHECKINS = [
  {
    id: 1, employee: "Alex Johnson", quarter: "Q2 2025", status: "completed",
    progress: 85, highlights: "Shipped the new API gateway. Performance improved by 35%.",
    blockers: "None currently.",
  },
  {
    id: 2, employee: "Priya Patel", quarter: "Q2 2025", status: "in-progress",
    progress: 60, highlights: "Completed 2 of 3 onboarding flow designs.",
    blockers: "Waiting for user research data from the research team.",
  },
  {
    id: 3, employee: "Sofia Garcia", quarter: "Q2 2025", status: "pending",
    progress: 0, highlights: "", blockers: "",
  },
  {
    id: 4, employee: "Marcus Lee", quarter: "Q2 2025", status: "completed",
    progress: 100, highlights: "All analytical dashboards delivered ahead of schedule.",
    blockers: "None.",
  },
];

const statusConfig = {
  completed:   { label: "Completed",   classes: "bg-emerald-500/15 text-emerald-400 border-emerald-500/25", icon: CheckCircle2 },
  "in-progress":{ label: "In Progress", classes: "bg-blue-500/15 text-blue-400 border-blue-500/25",         icon: Clock },
  pending:     { label: "Pending",      classes: "bg-amber-500/15 text-amber-400 border-amber-500/25",      icon: AlertTriangle },
};

function Initials({ name }) {
  const init = name.split(" ").map(n => n[0]).join("").toUpperCase();
  return (
    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-lg text-white shadow-lg flex-shrink-0">
      {init}
    </div>
  );
}

export default function TeamCheckins() {
  const completionRate = Math.round((CHECKINS.filter(c => c.status === "completed").length / CHECKINS.length) * 100);

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center border border-purple-500/30">
            <ClipboardList className="text-purple-400" size={24} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white mb-1">Team Check-ins</h1>
            <p className="text-sm text-gray-400">Q2 2025 • {CHECKINS.filter(c => c.status === "completed").length} of {CHECKINS.length} submitted</p>
          </div>
        </div>
      </div>

      {/* Progress overview */}
      <div className="bg-[#131B2F]/60 backdrop-blur-xl border border-white/5 rounded-2xl p-6 shadow-xl mb-8">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-semibold text-gray-300">Team Submission Rate</span>
          <span className="text-xl font-bold text-white">{completionRate}%</span>
        </div>
        <div className="h-3 bg-black/40 rounded-full overflow-hidden border border-white/5">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${completionRate}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {CHECKINS.map((c, idx) => {
          const status = statusConfig[c.status];
          const StatusIcon = status.icon;
          return (
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              key={c.id} 
              className="bg-[#131B2F]/60 backdrop-blur-xl border border-white/5 rounded-2xl p-6 shadow-xl hover:border-purple-500/30 transition-all duration-300 group"
            >
              <div className="flex flex-col sm:flex-row gap-6">
                <Initials name={c.employee} />
                <div className="flex-1 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-lg font-bold text-white">{c.employee}</p>
                      <p className="text-xs text-purple-300 font-medium">{c.quarter} Check-in</p>
                    </div>
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border shadow-inner ${status.classes}`}>
                      <StatusIcon size={14} />
                      {status.label}
                    </span>
                  </div>

                  {c.status !== "pending" && (
                    <div className="space-y-4 pt-2">
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider w-16">Progress</span>
                        <div className="flex-1 h-2 bg-black/40 rounded-full overflow-hidden border border-white/5">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400"
                            style={{ width: `${c.progress}%` }}
                          />
                        </div>
                        <span className="text-sm text-white font-bold w-10 text-right">{c.progress}%</span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-white/5 border border-white/5 rounded-xl p-4">
                          <p className="text-[10px] text-gray-500 mb-2 font-bold uppercase tracking-wider flex items-center gap-1.5">
                            <CheckCircle2 size={12} className="text-emerald-400" /> Highlights
                          </p>
                          <p className="text-sm text-gray-300 leading-relaxed">{c.highlights}</p>
                        </div>
                        {c.blockers && c.blockers !== "None." && c.blockers !== "None currently." && (
                          <div className="bg-red-500/5 border border-red-500/10 rounded-xl p-4">
                            <p className="text-[10px] text-red-400 mb-2 font-bold uppercase tracking-wider flex items-center gap-1.5">
                              <AlertTriangle size={12} /> Blockers
                            </p>
                            <p className="text-sm text-red-200 leading-relaxed">{c.blockers}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {c.status === "pending" && (
                    <div className="bg-black/20 border border-white/5 rounded-xl p-6 text-center mt-2">
                      <Clock size={24} className="text-gray-500 mx-auto mb-2" />
                      <p className="text-sm font-medium text-gray-400">Waiting for {c.employee.split(" ")[0]} to submit this quarter's check-in.</p>
                      <button className="mt-4 px-4 py-2 bg-white/5 hover:bg-white/10 text-white text-xs font-bold rounded-lg border border-white/10 transition-colors">
                        Send Reminder
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
