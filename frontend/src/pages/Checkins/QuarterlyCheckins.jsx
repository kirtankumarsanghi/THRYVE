import { useMemo } from "react";
import { CalendarClock, CircleCheckBig, ClipboardList, Send, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import PageContainer from "../../components/common/PageContainer";
import SectionHeader from "../../components/common/SectionHeader";
import { useGoals, calculateGoalProgress } from "../../context/GoalContext";

export default function QuarterlyCheckins() {
  const navigate = useNavigate();
  const { goals = [], loading } = useGoals();

  const currentQuarter = useMemo(() => {
    const month = new Date().getMonth() + 1;
    if (month <= 3) return "Q1";
    if (month <= 6) return "Q2";
    if (month <= 9) return "Q3";
    return "Q4";
  }, []);

  const quarterGoals = useMemo(
    () => goals.filter((goal) => (goal.quarter || "").toUpperCase() === currentQuarter),
    [goals, currentQuarter]
  );

  const completed = quarterGoals.filter((g) => (g.status || "").toLowerCase() === "completed").length;
  const avgProgress = quarterGoals.length
    ? Math.round(quarterGoals.reduce((sum, goal) => sum + calculateGoalProgress(goal), 0) / quarterGoals.length)
    : 0;

  return (
    <PageContainer>
      <SectionHeader
        title={`${currentQuarter} Check-ins`}
        subtitle="Review progress, update outcomes, and keep your goals aligned each quarter."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="surface-card p-5">
          <p className="text-xs uppercase tracking-wider text-slate-400 mb-2">Goals This Quarter</p>
          <p className="kpi-value text-white">{quarterGoals.length}</p>
        </div>
        <div className="surface-card p-5">
          <p className="text-xs uppercase tracking-wider text-slate-400 mb-2">Completed</p>
          <p className="kpi-value text-emerald-300">{completed}</p>
        </div>
        <div className="surface-card p-5">
          <p className="text-xs uppercase tracking-wider text-slate-400 mb-2">Average Progress</p>
          <p className="kpi-value text-blue-300">{avgProgress}%</p>
        </div>
      </div>

      <div className="surface-card p-6">
        <h3 className="text-white font-semibold text-lg mb-4 flex items-center gap-2">
          <ClipboardList className="w-5 h-5 text-blue-400" />
          Goal Check-in Tracker
        </h3>

        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-16 rounded-xl bg-white/5 animate-pulse" />
            ))}
          </div>
        ) : quarterGoals.length === 0 ? (
          <div className="text-center py-14 border border-dashed border-white/10 rounded-2xl">
            <CalendarClock className="w-10 h-10 text-slate-500 mx-auto mb-3" />
            <p className="text-slate-300 font-medium">No goals in {currentQuarter}</p>
            <p className="text-xs text-slate-500 mt-1">Create a goal to start submitting quarterly updates.</p>
            <button
              type="button"
              onClick={() => navigate("/employee/goals/create")}
              className="mt-4 px-4 py-2 rounded-lg bg-blue-500/20 border border-blue-400/30 text-blue-200 hover:bg-blue-500/30 transition-colors"
            >
              Create Goal
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {quarterGoals.map((goal) => {
              const progress = calculateGoalProgress(goal);
              return (
                <button
                  type="button"
                  key={goal.id}
                  onClick={() => navigate(`/employee/goals/${goal.id}`)}
                  className="w-full text-left p-4 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] hover:border-blue-300/30 transition-all"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:justify-between">
                    <div>
                      <p className="text-white font-medium">{goal.title}</p>
                      <p className="text-xs text-slate-400 mt-1">
                        {(goal.strategic_area || "General")} • {(goal.approval_status || "pending").toUpperCase()}
                      </p>
                    </div>
                    <div className="min-w-[190px]">
                      <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                        <span>Progress</span>
                        <span className="text-white">{progress}%</span>
                      </div>
                      <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                        <div className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500" style={{ width: `${progress}%` }} />
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button
          type="button"
          onClick={() => {
            toast.success("Draft check-in opened");
            navigate("/employee/goals");
          }}
          className="surface-card p-5 text-left hover:border-blue-300/40 transition-all"
        >
          <Send className="w-5 h-5 text-blue-300 mb-2" />
          <p className="text-white font-semibold">Submit Check-in</p>
          <p className="text-xs text-slate-400 mt-1">Send progress update for manager review.</p>
        </button>
        <button
          type="button"
          onClick={() => navigate("/employee/analytics")}
          className="surface-card p-5 text-left hover:border-emerald-300/30 transition-all"
        >
          <TrendingUp className="w-5 h-5 text-emerald-300 mb-2" />
          <p className="text-white font-semibold">View Progress Trends</p>
          <p className="text-xs text-slate-400 mt-1">Analyze momentum across your current quarter.</p>
        </button>
      </div>

      {quarterGoals.length > 0 && (
        <div className="text-xs text-slate-500 flex items-center gap-2">
          <CircleCheckBig className="w-4 h-4 text-emerald-400" />
          Click any goal row to update details and quarterly outcomes.
        </div>
      )}
    </PageContainer>
  );
}
