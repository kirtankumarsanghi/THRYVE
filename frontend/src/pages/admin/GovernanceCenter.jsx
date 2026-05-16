import { useState } from "react";
import BackButton from "../../components/common/BackButton";
import Breadcrumb from "../../components/common/Breadcrumb";

export default function GovernanceCenter() {
  const [selectedGoal, setSelectedGoal] = useState("");
  const [unlockReason, setUnlockReason] = useState("");

  const lockedGoals = [
    { id: "G-001", title: "Launch Enterprise Portal", owner: "John Doe", lockedBy: "Manager Jane" },
    { id: "G-002", title: "Improve Customer Satisfaction", owner: "Mike Johnson", lockedBy: "Manager Sarah" },
    { id: "G-003", title: "Revenue Growth Initiative", owner: "Lisa Anderson", lockedBy: "Manager David" },
  ];

  const cycles = [
    { id: 1, name: "Q3 2024 Review", startDate: "2024-07-01", endDate: "2024-09-30", status: "active" },
    { id: 2, name: "Q4 2024 Planning", startDate: "2024-10-01", endDate: "2024-12-31", status: "upcoming" },
    { id: 3, name: "Q2 2024 Review", startDate: "2024-04-01", endDate: "2024-06-30", status: "closed" },
  ];

  const escalations = [
    { id: 1, type: "Overdue Approval", item: "Goal #45 - Product Launch", assignee: "Manager John", daysOverdue: 5 },
    { id: 2, type: "Missing Check-in", item: "Q3 Check-in - Sarah Williams", assignee: "Employee Sarah", daysOverdue: 3 },
  ];

  const handleUnlock = () => {
    if (!selectedGoal || !unlockReason.trim()) {
      alert("Please select a goal and provide a reason");
      return;
    }
    console.log("Unlocking goal:", selectedGoal, "Reason:", unlockReason);
    setSelectedGoal("");
    setUnlockReason("");
  };

  const handleCycleAction = (cycleId, action) => {
    console.log(`${action} cycle ${cycleId}`);
  };

  return (
    <main className="pt-8 px-margin-mobile md:px-margin-desktop pb-24 max-w-container-max mx-auto min-h-screen">
      <Breadcrumb />
      <BackButton to="/admin/dashboard" label="Back to Dashboard" />

      <header className="mb-10 mt-6">
        <div className="flex items-center gap-2 text-on-surface-variant mb-2">
          <span className="material-symbols-outlined text-error text-[20px]">gavel</span>
          <span className="font-label-caps text-label-caps tracking-widest uppercase text-error">
            System Governance
          </span>
        </div>
        <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface">
          Governance Center
        </h2>
        <p className="font-body-base text-body-base text-on-surface-variant mt-2">
          Manage goal locks, escalation alerts, and review cycles
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Goal Unlock Controls */}
        <div className="bg-[#0F172A] border border-white/5 rounded-xl p-6">
          <h3 className="font-title-md text-title-md text-on-surface mb-6 flex items-center gap-2">
            <span className="material-symbols-outlined text-error">lock_open</span>
            Goal Unlock Controls
          </h3>
          <p className="font-body-sm text-body-sm text-on-surface-variant mb-6">
            Override manager locks for administrative purposes
          </p>

          <div className="space-y-4">
            <div>
              <label className="font-body-sm text-[12px] text-on-surface-variant uppercase tracking-wider mb-2 block">
                Select Locked Goal
              </label>
              <select
                value={selectedGoal}
                onChange={(e) => setSelectedGoal(e.target.value)}
                className="w-full bg-surface-container border border-outline-variant/20 rounded-lg px-4 py-3 text-body-base text-on-surface focus:border-primary/50 focus:ring-2 focus:ring-primary/20 outline-none transition-all appearance-none cursor-pointer"
              >
                <option value="">Choose a goal...</option>
                {lockedGoals.map((goal) => (
                  <option key={goal.id} value={goal.id}>
                    {goal.id} - {goal.title} (Owner: {goal.owner})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="font-body-sm text-[12px] text-on-surface-variant uppercase tracking-wider mb-2 block">
                Unlock Reason (Required for Audit)
                <span className="text-error ml-1">*</span>
              </label>
              <textarea
                value={unlockReason}
                onChange={(e) => setUnlockReason(e.target.value)}
                placeholder="Provide a detailed reason for overriding the lock..."
                rows={4}
                className="w-full bg-surface-container border border-outline-variant/20 rounded-lg px-4 py-3 text-body-base text-on-surface placeholder-on-surface-variant/50 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
              />
            </div>

            <div className="bg-error/5 border border-error/20 rounded-lg p-4 flex gap-3">
              <span className="material-symbols-outlined text-error text-[20px] flex-shrink-0">warning</span>
              <div>
                <p className="font-body-sm text-body-sm text-on-surface font-medium mb-1">
                  Administrative Override
                </p>
                <p className="font-body-sm text-[12px] text-on-surface-variant">
                  This action will be logged in the audit trail and notify the goal owner and manager.
                </p>
              </div>
            </div>

            <button
              onClick={handleUnlock}
              disabled={!selectedGoal || !unlockReason.trim()}
              className="w-full px-6 py-3 bg-error/10 text-error border border-error/20 hover:bg-error/20 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg font-title-md text-body-sm font-semibold transition-all flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-[20px]">lock_open</span>
              Force Unlock Goal
            </button>
          </div>
        </div>

        {/* Review Cycle Monitoring */}
        <div className="bg-[#0F172A] border border-white/5 rounded-xl p-6">
          <h3 className="font-title-md text-title-md text-on-surface mb-6 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">event_repeat</span>
            Active Review Cycles
          </h3>
          <p className="font-body-sm text-body-sm text-on-surface-variant mb-6">
            Manage cycle statuses and deadlines
          </p>

          <div className="space-y-4">
            {cycles.map((cycle) => (
              <div
                key={cycle.id}
                className="p-4 rounded-lg bg-surface-container/50 border border-outline-variant/10 hover:border-outline-variant/30 transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h4 className="font-body-sm text-body-sm text-on-surface font-medium mb-1">{cycle.name}</h4>
                    <p className="font-body-sm text-[12px] text-on-surface-variant">
                      {cycle.startDate} to {cycle.endDate}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-[10px] font-label-caps uppercase tracking-wider border ${
                    cycle.status === "active" ? "bg-secondary/20 text-secondary border-secondary/30" :
                    cycle.status === "upcoming" ? "bg-primary/20 text-primary border-primary/30" :
                    "bg-on-surface-variant/20 text-on-surface-variant border-on-surface-variant/30"
                  }`}>
                    {cycle.status}
                  </span>
                </div>

                <div className="flex gap-2">
                  {cycle.status === "active" && (
                    <>
                      <button
                        onClick={() => handleCycleAction(cycle.id, "extend")}
                        className="flex-1 px-3 py-2 bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 rounded-lg font-body-sm text-[12px] transition-all"
                      >
                        Extend
                      </button>
                      <button
                        onClick={() => handleCycleAction(cycle.id, "close")}
                        className="flex-1 px-3 py-2 bg-error/10 text-error border border-error/20 hover:bg-error/20 rounded-lg font-body-sm text-[12px] transition-all"
                      >
                        Close
                      </button>
                    </>
                  )}
                  {cycle.status === "closed" && (
                    <button
                      onClick={() => handleCycleAction(cycle.id, "reopen")}
                      className="flex-1 px-3 py-2 bg-secondary/10 text-secondary border border-secondary/20 hover:bg-secondary/20 rounded-lg font-body-sm text-[12px] transition-all"
                    >
                      Reopen
                    </button>
                  )}
                  {cycle.status === "upcoming" && (
                    <button
                      onClick={() => handleCycleAction(cycle.id, "activate")}
                      className="flex-1 px-3 py-2 bg-secondary/10 text-secondary border border-secondary/20 hover:bg-secondary/20 rounded-lg font-body-sm text-[12px] transition-all"
                    >
                      Activate
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Escalation Tracking */}
      <div className="bg-[#0F172A] border border-white/5 rounded-xl p-6">
        <h3 className="font-title-md text-title-md text-on-surface mb-6 flex items-center gap-2">
          <span className="material-symbols-outlined text-error">priority_high</span>
          Escalation Alerts
        </h3>
        <p className="font-body-sm text-body-sm text-on-surface-variant mb-6">
          Items requiring immediate attention
        </p>

        {escalations.length > 0 ? (
          <div className="space-y-4">
            {escalations.map((escalation) => (
              <div
                key={escalation.id}
                className="p-5 rounded-xl bg-error/5 border border-error/30 hover:border-error/50 transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-error/20 border-2 border-error/40 flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-error text-[24px]">warning</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-body-sm text-body-sm text-on-surface font-medium mb-1">
                          {escalation.type}
                        </h4>
                        <p className="font-body-sm text-[12px] text-on-surface-variant mb-2">
                          {escalation.item}
                        </p>
                        <div className="flex items-center gap-3 text-[12px]">
                          <span className="text-on-surface-variant">Assignee: {escalation.assignee}</span>
                          <span className="text-error font-medium">{escalation.daysOverdue} days overdue</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <button className="px-4 py-2 bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 rounded-lg font-body-sm text-[12px] transition-all">
                        Send Reminder
                      </button>
                      <button className="px-4 py-2 bg-error/10 text-error border border-error/20 hover:bg-error/20 rounded-lg font-body-sm text-[12px] transition-all">
                        Escalate to Admin
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center border border-outline-variant/10 rounded-xl bg-surface-container/30">
            <span className="material-symbols-outlined text-[64px] text-on-surface-variant opacity-20 block mb-4">
              check_circle
            </span>
            <h3 className="font-title-md text-title-md text-on-surface mb-2">No Active Escalations</h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              All items are on track
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
