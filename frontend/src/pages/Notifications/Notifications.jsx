import { Bell, CheckCircle2, Clock3, MessageSquare } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageContainer from "../../components/common/PageContainer";
import SectionHeader from "../../components/common/SectionHeader";
import LiveDataNotice from "../../components/common/LiveDataNotice";
import { getNotifications } from "../../api/notificationsApi";

function formatDate(value) {
  if (!value) return "Recently";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Recently";
  return date.toLocaleString();
}

export default function Notifications() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const loadNotifications = async () => {
      setLoading(true);
      try {
        const data = await getNotifications(50);
        if (isMounted) {
          setItems(data?.items || []);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    loadNotifications();
    return () => {
      isMounted = false;
    };
  }, []);

  const notifications = useMemo(() => {
    return items.map((item) => ({
      ...item,
      kind:
        item.type === "goal_approved" ? "approval" :
        item.type === "checkin_reviewed" ? "feedback" :
        "reminder",
    }));
  }, [items]);

  return (
    <PageContainer>
      <SectionHeader
        title="Notifications"
        subtitle="Live system events from goals, check-ins, and manager actions."
      />
      <LiveDataNotice source="Notifications API" hint="This canonical feed is shared across employee, manager, and admin experiences." />

      <div className="surface-card p-6">
        <div className="flex items-center justify-between mb-4">
          <p className="text-white font-semibold">Recent Activity</p>
          <button type="button" onClick={() => navigate("/employee/checkins")} className="px-4 py-2 rounded-lg border border-blue-400/30 text-blue-200 hover:bg-blue-500/15 text-sm">
            Submit New Check-in
          </button>
        </div>
        {loading ? (
          <div className="space-y-3">{[1, 2, 3].map((i) => <div key={i} className="h-16 rounded-xl bg-white/5 animate-pulse" />)}</div>
        ) : notifications.length === 0 ? (
          <p className="text-slate-400 text-sm">No notifications yet. Create or update a goal to generate activity.</p>
        ) : (
          <div className="space-y-3">
            {notifications.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => navigate(item.route || "/employee/goals")}
                className="w-full text-left rounded-xl border border-white/10 bg-white/[0.02] p-4 hover:border-blue-300/35"
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 text-cyan-300">
                    {item.kind === "approval" ? <CheckCircle2 className="w-4 h-4" /> : item.kind === "feedback" ? <MessageSquare className="w-4 h-4" /> : <Clock3 className="w-4 h-4" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-medium">{item.title}</p>
                    <p className="text-xs text-slate-300 mt-1">{item.message}</p>
                    <p className="text-xs text-slate-500 mt-2">{formatDate(item.time)}</p>
                  </div>
                  <Bell className="w-4 h-4 text-slate-500" />
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </PageContainer>
  );
}
