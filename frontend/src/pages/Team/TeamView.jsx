import { Users, TrendingUp, Target, CheckCircle2, Clock, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const TEAM_MEMBERS = [
  { id: 1, name: "Alex Johnson",  role: "Senior Engineer",    goals: 5, completed: 3, progress: 72, status: "on-track" },
  { id: 2, name: "Priya Patel",   role: "Product Designer",   goals: 4, completed: 2, progress: 55, status: "at-risk" },
  { id: 3, name: "Marcus Lee",    role: "Data Analyst",       goals: 6, completed: 5, progress: 88, status: "on-track" },
  { id: 4, name: "Sofia Garcia",  role: "Frontend Engineer",  goals: 3, completed: 1, progress: 40, status: "at-risk" },
  { id: 5, name: "Jordan Kim",    role: "Backend Engineer",   goals: 4, completed: 4, progress: 100, status: "complete" },
];

const statusConfig = {
  "on-track": { label: "On Track", classes: "bg-emerald-500/15 text-emerald-400 border-emerald-500/25" },
  "at-risk":  { label: "At Risk",  classes: "bg-orange-500/15 text-orange-400 border-orange-500/25" },
  "complete": { label: "Complete", classes: "bg-blue-500/15 text-blue-400 border-blue-500/25" },
};

function Initials({ name }) {
  const init = name.split(" ").map(n => n[0]).join("").toUpperCase();
  return (
    <div className="w-10 h-10 rounded-full bg-purple-500/20 border-2 border-purple-500/30 flex items-center justify-center text-sm font-bold text-purple-300 flex-shrink-0">
      {init}
    </div>
  );
}

export default function TeamView() {
  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <Users className="text-purple-400" size={24} />
        <div>
          <h1 className="text-2xl font-bold text-white">My Team</h1>
          <p className="text-sm text-gray-400">{TEAM_MEMBERS.length} direct reports</p>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: "On Track",   value: TEAM_MEMBERS.filter(m => m.status === "on-track").length,  color: "text-emerald-400", icon: TrendingUp },
          { label: "At Risk",    value: TEAM_MEMBERS.filter(m => m.status === "at-risk").length,   color: "text-orange-400",  icon: Clock },
          { label: "Completed",  value: TEAM_MEMBERS.filter(m => m.status === "complete").length,  color: "text-blue-400",    icon: CheckCircle2 },
        ].map(({ label, value, color, icon: Icon }) => (
          <div key={label} className="bg-white/3 border border-white/8 rounded-2xl p-5 flex items-center gap-4">
            <Icon size={20} className={color} />
            <div>
              <p className="text-2xl font-bold text-white">{value}</p>
              <p className="text-xs text-gray-500">{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Team Table */}
      <div className="bg-white/2 border border-white/8 rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-white/5">
          <h2 className="text-sm font-semibold text-gray-300">Team Members</h2>
        </div>
        <div className="divide-y divide-white/5">
          {TEAM_MEMBERS.map(member => {
            const status = statusConfig[member.status];
            return (
              <div key={member.id} className="px-6 py-4 flex items-center gap-4 hover:bg-white/3 transition-colors">
                <Initials name={member.name} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white">{member.name}</p>
                  <p className="text-xs text-gray-500">{member.role}</p>
                </div>

                {/* Progress bar */}
                <div className="hidden sm:block w-32">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-500">Progress</span>
                    <span className="text-xs text-white font-medium">{member.progress}%</span>
                  </div>
                  <div className="h-1.5 bg-white/5 rounded-full">
                    <div
                      className="h-full rounded-full bg-purple-500 transition-all"
                      style={{ width: `${member.progress}%` }}
                    />
                  </div>
                </div>

                <span className={`hidden md:inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold border ${status.classes}`}>
                  {status.label}
                </span>

                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <Target size={12} />
                  <span>{member.completed}/{member.goals}</span>
                </div>

                <Link
                  to={`/manager/review/${member.id}`}
                  className="p-2 text-gray-500 hover:text-purple-400 hover:bg-purple-500/10 rounded-lg transition-all"
                >
                  <ChevronRight size={16} />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
