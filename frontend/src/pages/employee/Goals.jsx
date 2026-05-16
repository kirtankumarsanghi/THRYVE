import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function EmployeeGoals() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");

  const goals = [
    { 
      id: 1, 
      title: "Launch Enterprise Portal", 
      description: "Develop and deploy a comprehensive enterprise portal for internal use",
      thrustArea: "Innovation & Growth",
      progress: 85, 
      status: "In Progress", 
      dueDate: "2024-03-30",
      weightage: 30,
      metrics: "Complete development and deploy to production"
    },
    { 
      id: 2, 
      title: "Improve Customer Satisfaction", 
      description: "Increase customer satisfaction score through improved support processes",
      thrustArea: "Customer Success",
      progress: 100, 
      status: "Completed", 
      dueDate: "2024-03-15",
      weightage: 25,
      metrics: "Achieve 90% satisfaction rate"
    },
    { 
      id: 3, 
      title: "Team Training Program", 
      description: "Conduct comprehensive training program for new team members",
      thrustArea: "Team Development",
      progress: 60, 
      status: "In Progress", 
      dueDate: "2024-04-10",
      weightage: 20,
      metrics: "Train 15 team members"
    },
    { 
      id: 4, 
      title: "Process Optimization", 
      description: "Streamline operational processes to improve efficiency",
      thrustArea: "Operational Excellence",
      progress: 40, 
      status: "In Progress", 
      dueDate: "2024-04-20",
      weightage: 15,
      metrics: "Reduce process time by 30%"
    },
    { 
      id: 5, 
      title: "Revenue Growth Initiative", 
      description: "Implement strategies to increase quarterly revenue",
      thrustArea: "Financial Performance",
      progress: 20, 
      status: "Not Started", 
      dueDate: "2024-04-30",
      weightage: 10,
      metrics: "Achieve 15% revenue increase"
    },
  ];

  const filteredGoals = goals.filter(goal => {
    if (activeTab === "all") return true;
    if (activeTab === "active") return goal.status === "In Progress";
    if (activeTab === "completed") return goal.status === "Completed";
    return true;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed": return "bg-secondary/20 text-secondary border-secondary/30";
      case "In Progress": return "bg-primary/20 text-primary border-primary/30";
      case "Not Started": return "bg-on-surface-variant/20 text-on-surface-variant border-on-surface-variant/30";
      default: return "bg-on-surface-variant/20 text-on-surface-variant border-on-surface-variant/30";
    }
  };

  return (
    <main className="pt-8 px-margin-mobile md:px-margin-desktop pb-24 max-w-container-max mx-auto min-h-screen">
      <header className="mb-10">
        <div className="flex items-center gap-2 text-on-surface-variant mb-2">
          <span className="material-symbols-outlined text-secondary text-[20px]">flag</span>
          <span className="font-label-caps text-label-caps tracking-widest uppercase text-secondary">
            Objectives & Key Results
          </span>
        </div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface">
              My Goals
            </h2>
            <p className="font-body-base text-body-base text-on-surface-variant mt-2">
              Track and manage your quarterly objectives
            </p>
          </div>
          <button 
            onClick={() => navigate('/employee/goals/create')}
            className="px-6 py-3 bg-primary hover:bg-primary-fixed text-on-primary rounded-lg font-title-md text-body-sm font-semibold transition-all shadow-[0_0_15px_rgba(192,193,255,0.2)] hover:shadow-[0_0_25px_rgba(192,193,255,0.4)] flex items-center justify-center gap-2 w-full md:w-auto"
          >
            <span className="material-symbols-outlined text-[20px]">add_circle</span>
            Create New Goal
          </button>
        </div>
      </header>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div className="bg-[#0F172A] border border-white/5 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center">
              <span className="material-symbols-outlined text-primary text-[20px]">flag</span>
            </div>
            <div>
              <div className="font-display-xl text-[28px] font-bold text-on-surface leading-none">{goals.length}</div>
              <p className="font-body-sm text-[12px] text-on-surface-variant">Total Goals</p>
            </div>
          </div>
        </div>

        <div className="bg-[#0F172A] border border-white/5 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-secondary/20 border border-secondary/30 flex items-center justify-center">
              <span className="material-symbols-outlined text-secondary text-[20px]">check_circle</span>
            </div>
            <div>
              <div className="font-display-xl text-[28px] font-bold text-on-surface leading-none">
                {goals.filter(g => g.status === "Completed").length}
              </div>
              <p className="font-body-sm text-[12px] text-on-surface-variant">Completed</p>
            </div>
          </div>
        </div>

        <div className="bg-[#0F172A] border border-white/5 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-tertiary/20 border border-tertiary/30 flex items-center justify-center">
              <span className="material-symbols-outlined text-tertiary text-[20px]">show_chart</span>
            </div>
            <div>
              <div className="font-display-xl text-[28px] font-bold text-on-surface leading-none">
                {Math.round(goals.reduce((acc, g) => acc + g.progress, 0) / goals.length)}%
              </div>
              <p className="font-body-sm text-[12px] text-on-surface-variant">Avg Progress</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-6 border-b border-outline-variant/10 overflow-x-auto">
        <button
          onClick={() => setActiveTab("all")}
          className={`px-4 py-3 font-body-sm text-body-sm transition-all border-b-2 whitespace-nowrap ${
            activeTab === "all"
              ? "border-primary text-primary"
              : "border-transparent text-on-surface-variant hover:text-on-surface"
          }`}
        >
          All Goals ({goals.length})
        </button>
        <button
          onClick={() => setActiveTab("active")}
          className={`px-4 py-3 font-body-sm text-body-sm transition-all border-b-2 whitespace-nowrap ${
            activeTab === "active"
              ? "border-primary text-primary"
              : "border-transparent text-on-surface-variant hover:text-on-surface"
          }`}
        >
          Active ({goals.filter(g => g.status === "In Progress").length})
        </button>
        <button
          onClick={() => setActiveTab("completed")}
          className={`px-4 py-3 font-body-sm text-body-sm transition-all border-b-2 whitespace-nowrap ${
            activeTab === "completed"
              ? "border-primary text-primary"
              : "border-transparent text-on-surface-variant hover:text-on-surface"
          }`}
        >
          Completed ({goals.filter(g => g.status === "Completed").length})
        </button>
      </div>

      {/* Goals List */}
      <div className="space-y-4">
        {filteredGoals.map((goal) => (
          <div 
            key={goal.id}
            className="bg-[#0F172A] border border-white/5 rounded-xl p-6 hover:border-secondary/30 transition-all cursor-pointer group"
            onClick={() => navigate(`/employee/goals/${goal.id}`)}
          >
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 mb-4">
              <div className="flex-1">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-12 h-12 rounded-lg bg-secondary/20 border border-secondary/30 flex items-center justify-center flex-shrink-0 group-hover:bg-secondary/30 transition-all">
                    <span className="material-symbols-outlined text-secondary text-[24px]">flag</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-title-md text-title-md text-on-surface mb-2 group-hover:text-secondary transition-colors">
                      {goal.title}
                    </h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mb-3">
                      {goal.description}
                    </p>
                    <div className="flex flex-wrap items-center gap-3 text-[12px] text-on-surface-variant">
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">category</span>
                        {goal.thrustArea}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">calendar_today</span>
                        Due: {goal.dueDate}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">percent</span>
                        Weightage: {goal.weightage}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <span className={`px-3 py-1 rounded-full text-[10px] font-label-caps uppercase tracking-wider border ${getStatusColor(goal.status)}`}>
                  {goal.status}
                </span>
                <div className="text-right">
                  <div className="font-display-xl text-[24px] font-bold text-on-surface leading-none mb-1">
                    {goal.progress}%
                  </div>
                  <p className="font-body-sm text-[10px] text-on-surface-variant uppercase tracking-wider">Progress</p>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[12px]">
                <span className="text-on-surface-variant">Overall Progress</span>
                <span className="text-on-surface font-medium">{goal.progress}%</span>
              </div>
              <div className="w-full h-2 bg-surface-variant rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-secondary to-primary rounded-full transition-all duration-500"
                  style={{ width: `${goal.progress}%` }}
                />
              </div>
            </div>

            {/* Metrics */}
            <div className="mt-4 pt-4 border-t border-outline-variant/10">
              <div className="flex items-center gap-2 text-[12px]">
                <span className="material-symbols-outlined text-primary text-[16px]">bar_chart</span>
                <span className="text-on-surface-variant">Success Metric:</span>
                <span className="text-on-surface font-medium">{goal.metrics}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredGoals.length === 0 && (
        <div className="bg-[#0F172A] border border-white/5 rounded-xl p-12 text-center">
          <span className="material-symbols-outlined text-[64px] text-on-surface-variant opacity-20 block mb-4">flag</span>
          <h3 className="font-title-md text-title-md text-on-surface mb-2">No goals found</h3>
          <p className="font-body-sm text-body-sm text-on-surface-variant mb-6">
            {activeTab === "all" 
              ? "Create your first goal to get started"
              : `No ${activeTab} goals at the moment`
            }
          </p>
          {activeTab === "all" && (
            <button 
              onClick={() => navigate('/employee/goals/create')}
              className="px-6 py-3 bg-primary hover:bg-primary-fixed text-on-primary rounded-lg font-title-md text-body-sm font-semibold transition-all inline-flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-[20px]">add_circle</span>
              Create New Goal
            </button>
          )}
        </div>
      )}
    </main>
  );
}
