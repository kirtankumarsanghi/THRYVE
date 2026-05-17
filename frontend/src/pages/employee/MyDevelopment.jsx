import { BookOpen, Target, TrendingUp } from "lucide-react";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import PageContainer from "../../components/common/PageContainer";
import SectionHeader from "../../components/common/SectionHeader";
import LiveDataNotice from "../../components/common/LiveDataNotice";
import { calculateGoalProgress, useGoals } from "../../context/GoalContext";

function getCategory(area) {
  if (!area) return "General";
  const value = area.toLowerCase();
  if (value.includes("tech") || value.includes("engineering")) return "Technical";
  if (value.includes("lead") || value.includes("people") || value.includes("manager")) return "Leadership";
  if (value.includes("comm") || value.includes("feedback")) return "Communication";
  return "Business";
}

export default function MyDevelopment() {
  const navigate = useNavigate();
  const { goals = [], loading } = useGoals();

  const skills = useMemo(() => {
    const grouped = new Map();
    goals.forEach((goal) => {
      const key = goal.strategic_area || "General";
      const progress = calculateGoalProgress(goal);
      if (!grouped.has(key)) {
        grouped.set(key, { name: key, values: [] });
      }
      grouped.get(key).values.push(progress);
    });

    return Array.from(grouped.values())
      .map((item, index) => {
        const level = Math.round(item.values.reduce((a, b) => a + b, 0) / item.values.length);
        return {
          id: `${item.name}-${index}`,
          name: item.name,
          level,
          target: Math.min(100, Math.max(60, level + 12)),
          category: getCategory(item.name),
        };
      })
      .sort((a, b) => b.level - a.level)
      .slice(0, 6);
  }, [goals]);

  const learningPaths = useMemo(
    () => goals
      .filter((goal) => (goal.status || "").toLowerCase() !== "completed")
      .map((goal) => ({
        id: goal.id,
        title: goal.title,
        progress: calculateGoalProgress(goal),
        quarter: goal.quarter || "Current",
        status: (goal.approval_status || "pending").toUpperCase(),
      }))
      .slice(0, 6),
    [goals]
  );

  const careerGoals = useMemo(
    () => goals
      .map((goal) => ({
        id: goal.id,
        title: goal.title,
        progress: calculateGoalProgress(goal),
        deadline: goal.target_date,
        quarter: goal.quarter || "-",
      }))
      .sort((a, b) => b.progress - a.progress)
      .slice(0, 5),
    [goals]
  );

  const avgSkillLevel = skills.length
    ? Math.round(skills.reduce((sum, skill) => sum + skill.level, 0) / skills.length)
    : 0;

  return (
    <PageContainer>
      <SectionHeader
        title="My Development"
        subtitle="Live growth insights generated from your current goals and check-ins."
      />
      <LiveDataNotice source="Goals API" hint="When you update goals or check-ins, this page refreshes with real values." />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="surface-card p-5">
          <div className="flex items-center gap-3">
            <TrendingUp className="w-5 h-5 text-cyan-300" />
            <div>
              <p className="text-xs uppercase tracking-wider text-slate-400">Average Capability</p>
              <p className="kpi-value text-white">{avgSkillLevel}%</p>
            </div>
          </div>
        </div>
        <div className="surface-card p-5">
          <div className="flex items-center gap-3">
            <BookOpen className="w-5 h-5 text-violet-300" />
            <div>
              <p className="text-xs uppercase tracking-wider text-slate-400">Active Development Goals</p>
              <p className="kpi-value text-white">{learningPaths.length}</p>
            </div>
          </div>
        </div>
        <div className="surface-card p-5">
          <div className="flex items-center gap-3">
            <Target className="w-5 h-5 text-emerald-300" />
            <div>
              <p className="text-xs uppercase tracking-wider text-slate-400">Completed Goals</p>
              <p className="kpi-value text-white">{goals.filter((goal) => (goal.status || "").toLowerCase() === "completed").length}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="surface-card p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white font-semibold text-lg">Skill Areas</h3>
          <button type="button" onClick={() => navigate("/employee/goals/create")} className="px-4 py-2 rounded-lg border border-blue-400/30 text-blue-200 hover:bg-blue-500/15 text-sm">
            Add Development Goal
          </button>
        </div>
        {loading ? (
          <div className="space-y-3">{[1, 2, 3].map((i) => <div key={i} className="h-16 rounded-xl bg-white/5 animate-pulse" />)}</div>
        ) : skills.length === 0 ? (
          <p className="text-slate-400 text-sm">No skill signals yet. Create a goal to start tracking development.</p>
        ) : (
          <div className="space-y-3">
            {skills.map((skill) => (
              <div key={skill.id} className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-white font-medium">{skill.name}</p>
                  <span className="text-xs text-slate-300">{skill.category}</span>
                </div>
                <div className="h-2 rounded-full bg-white/10 overflow-hidden mb-2">
                  <div className="h-full bg-gradient-to-r from-cyan-400 to-blue-500" style={{ width: `${skill.level}%` }} />
                </div>
                <p className="text-xs text-slate-400">Current {skill.level}% • Target {skill.target}%</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <div className="surface-card p-6">
          <h3 className="text-white font-semibold text-lg mb-4">Development Pipeline</h3>
          <div className="space-y-3">
            {learningPaths.length === 0 ? (
              <p className="text-slate-400 text-sm">No active development goals.</p>
            ) : (
              learningPaths.map((item) => (
                <button key={item.id} type="button" onClick={() => navigate(`/employee/goals/${item.id}`)} className="w-full text-left rounded-xl border border-white/10 bg-white/[0.02] p-4 hover:border-blue-300/35">
                  <p className="text-white font-medium">{item.title}</p>
                  <p className="text-xs text-slate-400 mt-1">{item.quarter} • {item.status}</p>
                  <div className="h-2 rounded-full bg-white/10 overflow-hidden mt-3">
                    <div className="h-full bg-blue-500" style={{ width: `${item.progress}%` }} />
                  </div>
                </button>
              ))
            )}
          </div>
        </div>

        <div className="surface-card p-6">
          <h3 className="text-white font-semibold text-lg mb-4">Top Career Goals</h3>
          <div className="space-y-3">
            {careerGoals.length === 0 ? (
              <p className="text-slate-400 text-sm">No goals yet.</p>
            ) : (
              careerGoals.map((goal) => (
                <button key={goal.id} type="button" onClick={() => navigate(`/employee/goals/${goal.id}`)} className="w-full text-left rounded-xl border border-white/10 bg-white/[0.02] p-4 hover:border-emerald-300/35">
                  <p className="text-white font-medium">{goal.title}</p>
                  <p className="text-xs text-slate-400 mt-1">{goal.quarter} • Target {goal.deadline || "TBD"}</p>
                  <p className="text-xs text-emerald-300 mt-2">Progress {goal.progress}%</p>
                </button>
              ))
            )}
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
