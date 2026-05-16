import { Bell, CheckCircle2 } from "lucide-react";

export default function Notifications() {
  const notifications = [
    { id: 1, type: "approval", title: "Goal Approved", message: "Your Q2 goal 'Increase user retention by 15%' was approved by Sarah Chen.", time: "2 hours ago", read: false },
    { id: 2, type: "feedback", title: "Manager Feedback", message: "Sarah Chen left a comment on your 'Product Launch' goal.", time: "Yesterday", read: false },
    { id: 3, type: "reminder", title: "Check-in Due", message: "Your Q2 quarterly check-in is due in 3 days.", time: "2 days ago", read: true },
    { id: 4, type: "system", title: "Goal Locked", message: "Admin has locked goals for the Q1 review period.", time: "1 week ago", read: true },
  ];

  const typeColors = {
    approval: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    feedback: "text-blue-400 bg-blue-500/10 border-blue-500/20",
    reminder: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20",
    system: "text-gray-400 bg-gray-500/10 border-gray-500/20",
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <Bell className="text-[#8B7FFF]" size={24} />
        <div>
          <h1 className="text-2xl font-bold text-white">Notifications</h1>
          <p className="text-sm text-gray-400">{notifications.filter(n => !n.read).length} unread</p>
        </div>
      </div>

      <div className="space-y-3">
        {notifications.map(n => (
          <div
            key={n.id}
            className={`p-5 rounded-2xl border backdrop-blur-sm flex items-start gap-4 transition-colors ${
              n.read
                ? "bg-white/2 border-white/5"
                : "bg-[#8B7FFF]/5 border-[#8B7FFF]/15"
            }`}
          >
            <div className={`p-2 rounded-lg border flex-shrink-0 ${typeColors[n.type]}`}>
              {n.type === "approval" ? <CheckCircle2 size={16} /> : <Bell size={16} />}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <p className="text-sm font-semibold text-white">{n.title}</p>
                <span className="text-xs text-gray-500">{n.time}</span>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">{n.message}</p>
            </div>
            {!n.read && (
              <div className="w-2 h-2 rounded-full bg-[#8B7FFF] mt-1.5 flex-shrink-0" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
