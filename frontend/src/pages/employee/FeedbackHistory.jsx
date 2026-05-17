import { Calendar, MessageSquare, Search, TrendingUp } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageContainer from "../../components/common/PageContainer";
import SectionHeader from "../../components/common/SectionHeader";
import LiveDataNotice from "../../components/common/LiveDataNotice";
import { useGoals } from "../../context/GoalContext";
import { getGoalCheckins } from "../../api/goalsApi";

function formatDate(value) {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString();
}

export default function FeedbackHistory() {
  const navigate = useNavigate();
  const { goals = [] } = useGoals();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      setLoading(true);
      try {
        const checkinResults = await Promise.all(
          goals.map(async (goal) => {
            try {
              const checkins = await getGoalCheckins(goal.id);
              return (checkins || []).map((checkin) => ({
                id: `${goal.id}-${checkin.id}`,
                goalId: goal.id,
                goalTitle: goal.title,
                from: checkin.manager_name || "Manager",
                employeeComment: checkin.comment || "",
                managerComment: checkin.manager_comment || "",
                createdAt: checkin.created_at || checkin.updated_at,
                quarter: checkin.quarter || goal.quarter || "-",
              }));
            } catch (_) {
              return [];
            }
          })
        );

        const flat = checkinResults
          .flat()
          .filter((item) => item.employeeComment || item.managerComment)
          .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));

        if (isMounted) setItems(flat);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    load();
    return () => {
      isMounted = false;
    };
  }, [goals]);

  const filtered = useMemo(
    () => items.filter((item) => `${item.goalTitle} ${item.from} ${item.employeeComment} ${item.managerComment}`.toLowerCase().includes(searchTerm.toLowerCase())),
    [items, searchTerm]
  );

  const stats = {
    total: items.length,
    manager: items.filter((item) => item.managerComment).length,
    employee: items.filter((item) => item.employeeComment).length,
    thisMonth: items.filter((item) => {
      const date = new Date(item.createdAt || 0);
      const now = new Date();
      return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
    }).length,
  };

  return (
    <PageContainer>
      <SectionHeader
        title="Feedback History"
        subtitle="Live check-in conversation history between employee and manager."
      />
      <LiveDataNotice source="Check-ins API" hint="Manager comments appear here after review actions." />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Stat title="Total Threads" value={stats.total} icon={MessageSquare} />
        <Stat title="Manager Feedback" value={stats.manager} icon={TrendingUp} />
        <Stat title="Employee Updates" value={stats.employee} icon={MessageSquare} />
        <Stat title="This Month" value={stats.thisMonth} icon={Calendar} />
      </div>

      <div className="surface-card p-5">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by goal, person, or comment"
            className="w-full pl-9 pr-3 py-2.5 enterprise-input text-white"
          />
        </div>
      </div>

      <div className="surface-card p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white font-semibold text-lg">Conversation Timeline</h3>
          <button type="button" onClick={() => navigate("/employee/checkins")} className="px-4 py-2 rounded-lg border border-blue-400/30 text-blue-200 hover:bg-blue-500/15 text-sm">
            Add Check-in Update
          </button>
        </div>

        {loading ? (
          <div className="space-y-3">{[1, 2, 3].map((i) => <div key={i} className="h-20 rounded-xl bg-white/5 animate-pulse" />)}</div>
        ) : filtered.length === 0 ? (
          <p className="text-slate-400 text-sm">No feedback entries found.</p>
        ) : (
          <div className="space-y-3">
            {filtered.map((item) => (
              <button key={item.id} type="button" onClick={() => navigate(`/employee/goals/${item.goalId}`)} className="w-full text-left rounded-xl border border-white/10 bg-white/[0.02] p-4 hover:border-blue-300/35">
                <p className="text-white font-medium">{item.goalTitle}</p>
                <p className="text-xs text-slate-400 mt-1">{item.quarter} • {formatDate(item.createdAt)}</p>
                {item.employeeComment ? <p className="text-xs text-slate-300 mt-2">Employee: {item.employeeComment}</p> : null}
                {item.managerComment ? <p className="text-xs text-cyan-200 mt-2">Manager: {item.managerComment}</p> : null}
              </button>
            ))}
          </div>
        )}
      </div>
    </PageContainer>
  );
}

function Stat({ title, value, icon: Icon }) {
  return (
    <div className="surface-card p-5">
      <div className="flex items-center gap-3">
        <Icon className="w-5 h-5 text-cyan-300" />
        <div>
          <p className="text-xs uppercase tracking-wider text-slate-400">{title}</p>
          <p className="kpi-value text-white">{value}</p>
        </div>
      </div>
    </div>
  );
}
