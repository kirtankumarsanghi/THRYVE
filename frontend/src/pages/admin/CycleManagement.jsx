import { useState } from "react";
import BackButton from "../../components/common/BackButton";
import Breadcrumb from "../../components/common/Breadcrumb";

export default function CycleManagement() {
  const [cycles, setCycles] = useState([
    { id: 1, name: "Q3 2024 Review", startDate: "2024-07-01", endDate: "2024-09-30", status: "active", submissionRate: 87 },
    { id: 2, name: "Q4 2024 Planning", startDate: "2024-10-01", endDate: "2024-12-31", status: "upcoming", submissionRate: 0 },
    { id: 3, name: "Q2 2024 Review", startDate: "2024-04-01", endDate: "2024-06-30", status: "closed", submissionRate: 94 },
    { id: 4, name: "Q1 2024 Review", startDate: "2024-01-01", endDate: "2024-03-31", status: "closed", submissionRate: 91 },
  ]);

  const activeCycle = cycles.find(c => c.status === "active");
  const upcomingCycle = cycles.find(c => c.status === "upcoming");

  const getStatusColor = (status) => {
    switch (status) {
      case "active": return "bg-secondary/20 text-secondary border-secondary/30";
      case "upcoming": return "bg-primary/20 text-primary border-primary/30";
      case "closed": return "bg-on-surface-variant/20 text-on-surface-variant border-on-surface-variant/30";
      default: return "bg-on-surface-variant/20 text-on-surface-variant border-on-surface-variant/30";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "active": return "schedule";
      case "upcoming": return "event";
      case "closed": return "check_circle";
      default: return "calendar_month";
    }
  };

  const handleCycleAction = (cycleId, action) => {
    console.log(`${action} cycle ${cycleId}`);
    // Update cycle status logic here
  };

  return (
    <main className="pt-8 px-margin-mobile md:px-margin-desktop pb-24 max-w-container-max mx-auto min-h-screen">
      <Breadcrumb />
      <BackButton to="/admin/dashboard" label="Back to Dashboard" />

      <header className="mb-10 mt-6">
        <div className="flex items-center gap-2 text-on-surface-variant mb-2">
          <span className="material-symbols-outlined text-error text-[20px]">event_repeat</span>
          <span className="font-label-caps text-label-caps tracking-widest uppercase text-error">
            Review Cycle Management
          </span>
        </div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface">
              Review Cycles
            </h2>
            <p className="font-body-base text-body-base text-on-surface-variant mt-2">
              Configure organizational review periods and submission deadlines
            </p>
          </div>
          <button className="px-6 py-3 bg-primary hover:bg-primary-fixed text-on-primary rounded-lg font-title-md text-body-sm font-semibold transition-all shadow-[0_0_15px_rgba(192,193,255,0.2)] hover:shadow-[0_0_25px_rgba(192,193,255,0.4)] flex items-center justify-center gap-2 w-full md:w-auto">
            <span className="material-symbols-outlined text-[20px]">add_circle</span>
            Create New Cycle
          </button>
        </div>
      </header>

      {/* Current Cycle Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-[#0F172A] border border-white/5 rounded-xl p-6 border-l-4 border-l-secondary">
          <div className="flex items-center gap-3 mb-3">
            <span className="material-symbols-outlined text-secondary text-[28px]">schedule</span>
            <div>
              <p className="font-body-sm text-[12px] text-on-surface-variant uppercase tracking-wider mb-1">Active Cycle</p>
              <h3 className="font-title-md text-body-base text-on-surface font-bold">
                {activeCycle ? activeCycle.name : "None"}
              </h3>
            </div>
          </div>
        </div>

        <div className="bg-[#0F172A] border border-white/5 rounded-xl p-6 border-l-4 border-l-primary">
          <div className="flex items-center gap-3 mb-3">
            <span className="material-symbols-outlined text-primary text-[28px]">event</span>
            <div>
              <p className="font-body-sm text-[12px] text-on-surface-variant uppercase tracking-wider mb-1">Upcoming Cycle</p>
              <h3 className="font-title-md text-body-base text-on-surface font-bold">
                {upcomingCycle ? upcomingCycle.name : "None"}
              </h3>
            </div>
          </div>
        </div>

        <div className="bg-[#0F172A] border border-white/5 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-secondary/20 border border-secondary/30 flex items-center justify-center">
              <span className="material-symbols-outlined text-secondary text-[20px]">task_alt</span>
            </div>
            <div>
              <div className="font-display-xl text-[28px] font-bold text-on-surface leading-none">
                {activeCycle ? `${activeCycle.submissionRate}%` : "0%"}
              </div>
              <p className="font-body-sm text-[12px] text-on-surface-variant">Submission Rate</p>
            </div>
          </div>
        </div>

        <div className="bg-[#0F172A] border border-white/5 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-tertiary/20 border border-tertiary/30 flex items-center justify-center">
              <span className="material-symbols-outlined text-tertiary text-[20px]">timelapse</span>
            </div>
            <div>
              <div className="font-display-xl text-[28px] font-bold text-on-surface leading-none">14</div>
              <p className="font-body-sm text-[12px] text-on-surface-variant">Days Remaining</p>
            </div>
          </div>
        </div>
      </div>

      {/* Cycles List */}
      <div className="bg-[#0F172A] border border-white/5 rounded-xl p-6">
        <h3 className="font-title-md text-title-md text-on-surface mb-6 flex items-center gap-2">
          <span className="material-symbols-outlined text-error">calendar_month</span>
          All Review Cycles
        </h3>

        <div className="space-y-4">
          {cycles.map((cycle) => (
            <div 
              key={cycle.id}
              className={`p-6 rounded-xl border transition-all ${
                cycle.status === "active"
                  ? "bg-secondary/5 border-secondary/30 shadow-[0_0_15px_rgba(76,215,246,0.1)]"
                  : "bg-surface-container/30 border-outline-variant/10 hover:border-outline-variant/30"
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex items-start gap-4 flex-1">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                    cycle.status === "active" ? "bg-secondary/20 border-2 border-secondary/40" :
                    cycle.status === "upcoming" ? "bg-primary/20 border-2 border-primary/40" :
                    "bg-surface-variant border-2 border-outline-variant/20"
                  }`}>
                    <span className={`material-symbols-outlined text-[28px] ${
                      cycle.status === "active" ? "text-secondary" :
                      cycle.status === "upcoming" ? "text-primary" :
                      "text-on-surface-variant"
                    }`}>
                      {getStatusIcon(cycle.status)}
                    </span>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-title-md text-title-md text-on-surface">{cycle.name}</h4>
                      <span className={`px-3 py-1 rounded-full text-[10px] font-label-caps uppercase tracking-wider border ${getStatusColor(cycle.status)}`}>
                        {cycle.status}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-4 text-[12px] text-on-surface-variant mb-3">
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">calendar_today</span>
                        {cycle.startDate} to {cycle.endDate}
                      </span>
                      {cycle.status !== "upcoming" && (
                        <span className="flex items-center gap-1">
                          <span className="material-symbols-outlined text-[14px]">task_alt</span>
                          Submission: {cycle.submissionRate}%
                        </span>
                      )}
                    </div>

                    {cycle.status !== "upcoming" && (
                      <div className="w-full max-w-md">
                        <div className="flex items-center justify-between text-[12px] mb-2">
                          <span className="text-on-surface-variant">Completion Progress</span>
                          <span className="text-on-surface font-medium">{cycle.submissionRate}%</span>
                        </div>
                        <div className="w-full h-2 bg-surface-variant rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-secondary to-primary rounded-full transition-all duration-500"
                            style={{ width: `${cycle.submissionRate}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {cycle.status === "upcoming" && (
                    <button 
                      onClick={() => handleCycleAction(cycle.id, "activate")}
                      className="px-4 py-2 bg-secondary/10 text-secondary border border-secondary/20 hover:bg-secondary/20 rounded-lg font-body-sm text-body-sm transition-all flex items-center gap-2"
                    >
                      <span className="material-symbols-outlined text-[18px]">play_circle</span>
                      Open Cycle
                    </button>
                  )}
                  {cycle.status === "active" && (
                    <>
                      <button 
                        onClick={() => handleCycleAction(cycle.id, "extend")}
                        className="px-4 py-2 bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 rounded-lg font-body-sm text-body-sm transition-all flex items-center gap-2"
                      >
                        <span className="material-symbols-outlined text-[18px]">schedule</span>
                        Extend
                      </button>
                      <button 
                        onClick={() => handleCycleAction(cycle.id, "close")}
                        className="px-4 py-2 bg-error/10 text-error border border-error/20 hover:bg-error/20 rounded-lg font-body-sm text-body-sm transition-all flex items-center gap-2"
                      >
                        <span className="material-symbols-outlined text-[18px]">lock</span>
                        Close Cycle
                      </button>
                    </>
                  )}
                  {cycle.status === "closed" && (
                    <>
                      <button 
                        onClick={() => handleCycleAction(cycle.id, "reopen")}
                        className="px-4 py-2 bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 rounded-lg font-body-sm text-body-sm transition-all flex items-center gap-2"
                      >
                        <span className="material-symbols-outlined text-[18px]">lock_open</span>
                        Reopen
                      </button>
                      <button 
                        onClick={() => handleCycleAction(cycle.id, "export")}
                        className="px-4 py-2 bg-surface-variant/30 text-on-surface border border-outline-variant/20 hover:bg-surface-variant/50 rounded-lg font-body-sm text-body-sm transition-all flex items-center gap-2"
                      >
                        <span className="material-symbols-outlined text-[18px]">download</span>
                        Export
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
