import { Award, MessageSquare, Target, Zap } from "lucide-react";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import PageContainer from "../../components/common/PageContainer";
import SectionHeader from "../../components/common/SectionHeader";
import LiveDataNotice from "../../components/common/LiveDataNotice";
import { calculateGoalProgress, useGoals } from "../../context/GoalContext";

function formatDate(value) {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString();
}

export default function Achievements() {
  const navigate = useNavigate();
  const { goals = [], loading } = useGoals();

  const completedGoals = useMemo(
    () => goals.filter((goal) => (goal.status || "").toLowerCase() === "completed"),
    [goals]
  );

  const recognitions = useMemo(
    () => goals
      .filter((goal) => (goal.approval_status || "").toLowerCase() === "approved")
      .map((goal) => ({
        id: goal.id,
        title: `Goal approved: ${goal.title}`,
        from: goal.manager_name || "Manager",
        date: goal.updated_at || goal.created_at,
        message: goal.manager_comment || "Your goal was approved and is now active.",
      }))
      .slice(0, 8),
    [goals]
  );

  const badges = useMemo(() => {
    const progressCount = goals.filter((goal) => calculateGoalProgress(goal) >= 70).length;
    return [
      { id: "first-goal", name: "Starter", unlocked: goals.length >= 1, criteria: "Create your first goal" },
      { id: "execution", name: "Execution", unlocked: progressCount >= 3, criteria: "3 goals above 70% progress" },
      { id: "finisher", name: "Finisher", unlocked: completedGoals.length >= 1, criteria: "Complete 1 goal" },
      { id: "high-impact", name: "High Impact", unlocked: completedGoals.length >= 5, criteria: "Complete 5 goals" },
    ];
  }, [goals, completedGoals]);

  const milestones = useMemo(
    () => completedGoals.map((goal) => ({
      id: goal.id,
      title: goal.title,
      date: goal.updated_at || goal.target_date,
      progress: calculateGoalProgress(goal),
    })).slice(0, 10),
    [completedGoals]
  );

  return (
    <PageContainer>
      <SectionHeader
        title="My Achievements"
        subtitle="Live achievements generated from completed and approved goals."
      />
      <LiveDataNotice source="Goals API" hint="Employee updates and manager approvals automatically appear here." />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Stat title="Badges Unlocked" value={badges.filter((badge) => badge.unlocked).length} icon={Award} />
        <Stat title="Recognitions" value={recognitions.length} icon={MessageSquare} />
        <Stat title="Goals Completed" value={completedGoals.length} icon={Target} />
        <Stat title="Momentum Goals" value={goals.filter((goal) => calculateGoalProgress(goal) >= 70).length} icon={Zap} />
      </div>

      <div className="surface-card p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white font-semibold text-lg">Badges</h3>
          <button type="button" onClick={() => navigate("/employee/goals/create")} className="px-4 py-2 rounded-lg border border-blue-400/30 text-blue-200 hover:bg-blue-500/15 text-sm">
            Work On New Goal
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
          {badges.map((badge) => (
            <div key={badge.id} className={`rounded-xl border p-4 ${badge.unlocked ? "border-emerald-400/30 bg-emerald-500/10" : "border-white/10 bg-white/[0.02]"}`}>
              <p className="text-white font-semibold">{badge.name}</p>
              <p className="text-xs text-slate-400 mt-1">{badge.criteria}</p>
              <p className={`text-xs mt-2 ${badge.unlocked ? "text-emerald-300" : "text-slate-500"}`}>
                {badge.unlocked ? "Unlocked" : "Locked"}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <div className="surface-card p-6">
          <h3 className="text-white font-semibold text-lg mb-4">Recognition History</h3>
          {loading ? <p className="text-slate-400 text-sm">Loading recognition...</p> : recognitions.length === 0 ? <p className="text-slate-400 text-sm">No recognitions yet.</p> : (
            <div className="space-y-3">
              {recognitions.map((item) => (
                <button key={item.id} type="button" onClick={() => navigate(`/employee/goals/${item.id}`)} className="w-full text-left rounded-xl border border-white/10 bg-white/[0.02] p-4 hover:border-blue-300/35">
                  <p className="text-white font-medium">{item.title}</p>
                  <p className="text-xs text-slate-400 mt-1">From {item.from} • {formatDate(item.date)}</p>
                  <p className="text-xs text-slate-300 mt-2">{item.message}</p>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="surface-card p-6">
          <h3 className="text-white font-semibold text-lg mb-4">Completion Milestones</h3>
          {milestones.length === 0 ? <p className="text-slate-400 text-sm">No milestones yet.</p> : (
            <div className="space-y-3">
              {milestones.map((item) => (
                <button key={item.id} type="button" onClick={() => navigate(`/employee/goals/${item.id}`)} className="w-full text-left rounded-xl border border-white/10 bg-white/[0.02] p-4 hover:border-emerald-300/35">
                  <p className="text-white font-medium">{item.title}</p>
                  <p className="text-xs text-slate-400 mt-1">{formatDate(item.date)}</p>
                  <p className="text-xs text-emerald-300 mt-2">Completion {item.progress}%</p>
                </button>
              ))}
            </div>
          )}
        </div>
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
