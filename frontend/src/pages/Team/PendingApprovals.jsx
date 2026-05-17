import { CheckCircle2, XCircle, Clock, MessageSquare, ChevronDown } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

const PENDING = [
  { id: 1, name: "Alex Johnson",  goal: "Increase API response time by 40%",   category: "Technical",   deadline: "Jun 30", priority: "high" },
  { id: 2, name: "Priya Patel",   goal: "Design 3 new onboarding flows",        category: "Design",      deadline: "Jul 15", priority: "medium" },
  { id: 3, name: "Sofia Garcia",  goal: "Migrate frontend to Vite + React 18",  category: "Engineering", deadline: "Jun 20", priority: "high" },
  { id: 4, name: "Jordan Kim",    goal: "Document all internal APIs",            category: "Docs",        deadline: "Jul 1",  priority: "low" },
];

const priorityConfig = {
  high:   "bg-red-500/15 text-red-400 border-red-500/25",
  medium: "bg-orange-500/15 text-orange-400 border-orange-500/25",
  low:    "bg-gray-500/15 text-gray-400 border-gray-500/20",
};

function Initials({ name }) {
  const init = name.split(" ").map(n => n[0]).join("").toUpperCase();
  return (
    <div className="w-9 h-9 rounded-full bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-xs font-bold text-purple-300 flex-shrink-0">
      {init}
    </div>
  );
}

export default function PendingApprovals() {
  const [items, setItems] = useState(PENDING);
  const [comments, setComments] = useState({});

  const handleAction = (id, action) => {
    setItems(prev => prev.filter(item => item.id !== id));
    toast.success(action === "approve" ? "Goal approved" : action === "reject" ? "Goal sent back" : "Approval deferred");
  };

  return (
    <div className="app-shell py-6 max-w-5xl">
      <div className="flex items-center gap-3 mb-8">
        <CheckCircle2 className="text-purple-400" size={24} />
        <div>
          <h1 className="text-2xl font-bold text-white">Pending Approvals</h1>
          <p className="text-sm text-gray-400">{items.length} goals awaiting your review</p>
        </div>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          <CheckCircle2 size={48} className="mx-auto mb-4 opacity-30" />
          <p className="text-lg font-medium text-gray-400">All caught up!</p>
          <p className="text-sm">No pending approvals at this time.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {items.map(item => (
            <div key={item.id} className="surface-card surface-card-hover p-6">
              <div className="flex items-start gap-4">
                <Initials name={item.name} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3 mb-1">
                    <div>
                      <p className="text-sm font-semibold text-white">{item.name}</p>
                      <p className="text-xs text-gray-500">Due {item.deadline}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2.5 py-1 rounded-full text-[11px] font-semibold border ${priorityConfig[item.priority]}`}>
                        {item.priority}
                      </span>
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-purple-500/10 text-purple-400 border border-purple-500/20">
                        {item.category}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-300 mt-2 leading-relaxed">{item.goal}</p>

                  {/* Comment box */}
                  <textarea
                    rows={2}
                    value={comments[item.id] || ""}
                    onChange={e => setComments(prev => ({ ...prev, [item.id]: e.target.value }))}
                    placeholder="Optional feedback for the employee..."
                    className="w-full mt-4 enterprise-input px-4 py-2.5 text-sm text-white placeholder:text-gray-600 resize-none"
                  />

                  {/* Action Buttons */}
                  <div className="flex items-center gap-3 mt-3">
                    <button
                      onClick={() => handleAction(item.id, "approve")}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/25 hover:bg-emerald-500/25 text-sm font-semibold transition-all"
                    >
                      <CheckCircle2 size={16} /> Approve
                    </button>
                    <button
                      onClick={() => handleAction(item.id, "reject")}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 text-sm font-semibold transition-all"
                    >
                      <XCircle size={16} /> Reject
                    </button>
                    <button onClick={() => handleAction(item.id, "defer")} className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/3 text-gray-400 border border-white/8 hover:bg-white/8 text-sm transition-all ml-auto">
                      <Clock size={14} /> Defer
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
