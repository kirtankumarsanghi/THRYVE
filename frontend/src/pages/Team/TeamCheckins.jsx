import { ClipboardList, CheckCircle2, Clock, MessageSquare } from "lucide-react";

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
  pending:     { label: "Pending",      classes: "bg-gray-500/15 text-gray-400 border-gray-500/20",          icon: Clock },
};

function Initials({ name }) {
  const init = name.split(" ").map(n => n[0]).join("").toUpperCase();
  return (
    <div className="w-9 h-9 rounded-full bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-xs font-bold text-purple-300 flex-shrink-0">
      {init}
    </div>
  );
}

export default function TeamCheckins() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <ClipboardList className="text-purple-400" size={24} />
        <div>
          <h1 className="text-2xl font-bold text-white">Team Check-ins</h1>
          <p className="text-sm text-gray-400">Q2 2025 · {CHECKINS.filter(c => c.status === "completed").length} of {CHECKINS.length} submitted</p>
        </div>
      </div>

      {/* Progress overview */}
      <div className="bg-purple-500/5 border border-purple-500/15 rounded-2xl p-5 mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-400">Team submission rate</span>
          <span className="text-sm font-bold text-white">
            {Math.round((CHECKINS.filter(c => c.status === "completed").length / CHECKINS.length) * 100)}%
          </span>
        </div>
        <div className="h-2 bg-white/5 rounded-full">
          <div
            className="h-full rounded-full bg-gradient-to-r from-purple-500 to-purple-400"
            style={{ width: `${(CHECKINS.filter(c => c.status === "completed").length / CHECKINS.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="space-y-4">
        {CHECKINS.map(c => {
          const status = statusConfig[c.status];
          const StatusIcon = status.icon;
          return (
            <div key={c.id} className="bg-white/2 border border-white/8 rounded-2xl p-6 hover:border-purple-500/20 transition-colors">
              <div className="flex items-start gap-4">
                <Initials name={c.employee} />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="text-sm font-semibold text-white">{c.employee}</p>
                      <p className="text-xs text-gray-500">{c.quarter} Check-in</p>
                    </div>
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold border ${status.classes}`}>
                      <StatusIcon size={12} />
                      {status.label}
                    </span>
                  </div>

                  {c.status !== "pending" && (
                    <div className="mt-3 space-y-3">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs text-gray-500">Progress</span>
                        <div className="flex-1 h-1.5 bg-white/5 rounded-full">
                          <div
                            className="h-full rounded-full bg-purple-500"
                            style={{ width: `${c.progress}%` }}
                          />
                        </div>
                        <span className="text-xs text-white font-medium">{c.progress}%</span>
                      </div>
                      <div className="bg-white/3 rounded-xl p-3">
                        <p className="text-xs text-gray-500 mb-1 font-semibold uppercase tracking-wider">Highlights</p>
                        <p className="text-sm text-gray-300">{c.highlights}</p>
                      </div>
                      {c.blockers && c.blockers !== "None." && c.blockers !== "None currently." && (
                        <div className="bg-orange-500/5 border border-orange-500/15 rounded-xl p-3">
                          <p className="text-xs text-orange-400 mb-1 font-semibold uppercase tracking-wider">Blockers</p>
                          <p className="text-sm text-gray-300">{c.blockers}</p>
                        </div>
                      )}
                    </div>
                  )}

                  {c.status === "pending" && (
                    <p className="text-sm text-gray-600 mt-2 italic">Employee hasn't submitted their check-in yet.</p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
