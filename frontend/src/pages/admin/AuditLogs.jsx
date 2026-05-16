import { useState } from "react";
import BackButton from "../../components/common/BackButton";
import Breadcrumb from "../../components/common/Breadcrumb";

export default function AuditLogs() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterAction, setFilterAction] = useState("all");

  const auditLogs = [
    { id: 1, timestamp: "2024-03-15 14:32:15", actor: "Manager Priya", action: "approved", target: "Goal #12 for Arjun", details: "Approved Q3 revenue goal with 30% weightage" },
    { id: 2, timestamp: "2024-03-15 14:15:42", actor: "Admin Sarah", action: "created", target: "Review Cycle Q3 2024", details: "Created new review cycle with deadline 2024-09-30" },
    { id: 3, timestamp: "2024-03-15 13:58:30", actor: "Manager John", action: "rejected", target: "Goal #45 for Mike", details: "Rejected goal due to unclear success metrics" },
    { id: 4, timestamp: "2024-03-15 13:42:18", actor: "Employee Lisa", action: "submitted", target: "Quarterly Check-in", details: "Submitted Q3 check-in with 85% completion" },
    { id: 5, timestamp: "2024-03-15 13:30:55", actor: "Manager David", action: "approved", target: "Goal #78 for Emma", details: "Approved product launch goal" },
    { id: 6, timestamp: "2024-03-15 13:15:22", actor: "Admin Tom", action: "updated", target: "User permissions for Team Lead", details: "Updated role from Employee to Manager" },
    { id: 7, timestamp: "2024-03-15 12:58:40", actor: "Manager Rachel", action: "commented", target: "Goal #23 for Alex", details: "Added feedback on progress update" },
    { id: 8, timestamp: "2024-03-15 12:45:10", actor: "Employee Mark", action: "updated", target: "Goal #56 progress", details: "Updated progress from 60% to 75%" },
    { id: 9, timestamp: "2024-03-15 12:30:33", actor: "Admin Sarah", action: "exported", target: "Q2 Performance Report", details: "Exported CSV report with 156 records" },
    { id: 10, timestamp: "2024-03-15 12:15:05", actor: "Manager Chris", action: "approved", target: "Check-in for Jessica", details: "Approved quarterly check-in submission" },
    { id: 11, timestamp: "2024-03-15 11:55:28", actor: "Employee Anna", action: "created", target: "Goal #89", details: "Created new goal for Q3: Customer Retention" },
    { id: 12, timestamp: "2024-03-15 11:40:15", actor: "Admin Tom", action: "disabled", target: "User account for John Smith", details: "Disabled account due to termination" },
  ];

  const filteredLogs = auditLogs.filter(log => {
    const matchesSearch = log.actor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.target.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.details.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAction = filterAction === "all" || log.action === filterAction;
    return matchesSearch && matchesAction;
  });

  const getActionColor = (action) => {
    switch (action) {
      case "approved": return "text-secondary";
      case "rejected": return "text-error";
      case "created": return "text-primary";
      case "updated": return "text-tertiary";
      case "deleted": return "text-error";
      case "disabled": return "text-error";
      case "exported": return "text-primary";
      case "submitted": return "text-secondary";
      case "commented": return "text-on-surface-variant";
      default: return "text-on-surface-variant";
    }
  };

  const getActionIcon = (action) => {
    switch (action) {
      case "approved": return "check_circle";
      case "rejected": return "cancel";
      case "created": return "add_circle";
      case "updated": return "edit";
      case "deleted": return "delete";
      case "disabled": return "block";
      case "exported": return "download";
      case "submitted": return "send";
      case "commented": return "comment";
      default: return "history";
    }
  };

  return (
    <main className="pt-8 px-margin-mobile md:px-margin-desktop pb-24 max-w-container-max mx-auto min-h-screen">
      <Breadcrumb />
      <BackButton to="/admin/dashboard" label="Back to Dashboard" />

      <header className="mb-10 mt-6">
        <div className="flex items-center gap-2 text-on-surface-variant mb-2">
          <span className="material-symbols-outlined text-error text-[20px]">shield</span>
          <span className="font-label-caps text-label-caps tracking-widest uppercase text-error">
            Security & Compliance
          </span>
        </div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface">
              Audit Logs
            </h2>
            <p className="font-body-base text-body-base text-on-surface-variant mt-2">
              System-wide activity tracking and compliance monitoring
            </p>
          </div>
          <button className="px-6 py-3 bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 rounded-lg font-title-md text-body-sm transition-all flex items-center justify-center gap-2 w-full md:w-auto">
            <span className="material-symbols-outlined text-[20px]">download</span>
            Export Logs
          </button>
        </div>
      </header>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-[#0F172A] border border-white/5 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-error/20 border border-error/30 flex items-center justify-center">
              <span className="material-symbols-outlined text-error text-[20px]">history</span>
            </div>
            <div>
              <div className="font-display-xl text-[28px] font-bold text-on-surface leading-none">{auditLogs.length}</div>
              <p className="font-body-sm text-[12px] text-on-surface-variant">Total Events</p>
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
                {auditLogs.filter(l => l.action === "approved").length}
              </div>
              <p className="font-body-sm text-[12px] text-on-surface-variant">Approvals</p>
            </div>
          </div>
        </div>

        <div className="bg-[#0F172A] border border-white/5 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center">
              <span className="material-symbols-outlined text-primary text-[20px]">add_circle</span>
            </div>
            <div>
              <div className="font-display-xl text-[28px] font-bold text-on-surface leading-none">
                {auditLogs.filter(l => l.action === "created").length}
              </div>
              <p className="font-body-sm text-[12px] text-on-surface-variant">Created</p>
            </div>
          </div>
        </div>

        <div className="bg-[#0F172A] border border-white/5 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-tertiary/20 border border-tertiary/30 flex items-center justify-center">
              <span className="material-symbols-outlined text-tertiary text-[20px]">edit</span>
            </div>
            <div>
              <div className="font-display-xl text-[28px] font-bold text-on-surface leading-none">
                {auditLogs.filter(l => l.action === "updated").length}
              </div>
              <p className="font-body-sm text-[12px] text-on-surface-variant">Updates</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-[#0F172A] border border-white/5 rounded-xl p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">
              search
            </span>
            <input
              type="text"
              placeholder="Search by actor, target, or details..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-surface-container border border-outline-variant/20 rounded-lg pl-10 pr-4 py-3 text-body-base text-on-surface placeholder-on-surface-variant/50 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 outline-none transition-all"
            />
          </div>

          <select
            value={filterAction}
            onChange={(e) => setFilterAction(e.target.value)}
            className="w-full bg-surface-container border border-outline-variant/20 rounded-lg px-4 py-3 text-body-base text-on-surface focus:border-primary/50 focus:ring-2 focus:ring-primary/20 outline-none transition-all appearance-none cursor-pointer"
          >
            <option value="all">All Actions</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
            <option value="created">Created</option>
            <option value="updated">Updated</option>
            <option value="deleted">Deleted</option>
            <option value="submitted">Submitted</option>
            <option value="exported">Exported</option>
          </select>
        </div>
      </div>

      {/* Audit Log Timeline */}
      <div className="bg-[#0F172A] border border-white/5 rounded-xl p-6">
        <h3 className="font-title-md text-title-md text-on-surface mb-6 flex items-center gap-2">
          <span className="material-symbols-outlined text-error">timeline</span>
          Activity Timeline
        </h3>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-tertiary opacity-20"></div>

          <div className="space-y-6">
            {filteredLogs.map((log) => (
              <div key={log.id} className="relative pl-16">
                {/* Timeline Dot */}
                <div className={`absolute left-0 w-12 h-12 rounded-full border-2 flex items-center justify-center ${
                  log.action === "approved" ? "bg-secondary/20 border-secondary/40" :
                  log.action === "rejected" ? "bg-error/20 border-error/40" :
                  log.action === "created" ? "bg-primary/20 border-primary/40" :
                  "bg-surface-variant border-outline-variant/40"
                }`}>
                  <span className={`material-symbols-outlined text-[20px] ${getActionColor(log.action)}`}>
                    {getActionIcon(log.action)}
                  </span>
                </div>

                {/* Log Content */}
                <div className="bg-surface-container/50 border border-outline-variant/10 rounded-xl p-4 hover:border-outline-variant/30 transition-all">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <p className="font-body-sm text-body-sm text-on-surface leading-relaxed">
                        <span className="font-semibold">{log.actor}</span>
                        {' '}
                        <span className={`${getActionColor(log.action)} font-medium`}>{log.action}</span>
                        {' '}
                        <span className="text-on-surface-variant">{log.target}</span>
                      </p>
                      <p className="font-body-sm text-[12px] text-on-surface-variant mt-2">{log.details}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-on-surface-variant mt-3 pt-3 border-t border-outline-variant/10">
                    <span className="material-symbols-outlined text-[14px]">schedule</span>
                    <span>{log.timestamp}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {filteredLogs.length === 0 && (
          <div className="p-12 text-center">
            <span className="material-symbols-outlined text-[64px] text-on-surface-variant opacity-20 block mb-4">search_off</span>
            <h3 className="font-title-md text-title-md text-on-surface mb-2">No logs found</h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
