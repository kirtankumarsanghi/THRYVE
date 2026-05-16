import BackButton from "../../components/common/BackButton";

export default function ManagerApprovals() {
  const approvals = [
    { id: 1, employee: "John Doe", type: "Goal Review", title: "Q3 Revenue Goals", date: "2024-03-15", status: "pending" },
    { id: 2, employee: "Jane Smith", type: "Check-in", title: "Quarterly Check-in", date: "2024-03-14", status: "pending" },
    { id: 3, employee: "Mike Johnson", type: "Goal Update", title: "Product Launch Goals", date: "2024-03-13", status: "pending" },
    { id: 4, employee: "Sarah Williams", type: "Goal Review", title: "Q3 Marketing Goals", date: "2024-03-12", status: "pending" },
    { id: 5, employee: "Tom Brown", type: "Check-in", title: "Mid-Quarter Review", date: "2024-03-11", status: "pending" },
  ];

  return (
    <main className="pt-8 px-margin-mobile md:px-margin-desktop pb-24 max-w-container-max mx-auto min-h-screen">
      <BackButton to="/manager/dashboard" label="Back to Dashboard" />
      
      <header className="mb-10 mt-6">
        <div className="flex items-center gap-2 text-on-surface-variant mb-2">
          <span className="material-symbols-outlined text-tertiary text-[20px]">pending_actions</span>
          <span className="font-label-caps text-label-caps tracking-widest uppercase text-tertiary">
            Action Required
          </span>
          <span className="min-w-[24px] h-6 px-2 flex items-center justify-center bg-error text-on-primary rounded-full text-[10px] font-bold shadow-[0_0_10px_rgba(255,180,171,0.5)]">
            {approvals.length}
          </span>
        </div>
        <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface">
          Pending Approvals
        </h2>
        <p className="font-body-base text-body-base text-on-surface-variant mt-2">
          Review and approve team member submissions
        </p>
      </header>

      <div className="space-y-4">
        {approvals.map((approval) => (
          <div key={approval.id} className="bg-[#0F172A] border border-white/5 rounded-xl p-6 hover:border-tertiary/30 transition-all">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start gap-4 flex-1">
                <div className="w-12 h-12 rounded-full bg-tertiary/20 text-tertiary flex items-center justify-center font-title-md font-bold border-2 border-tertiary/30">
                  {approval.employee.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-title-md text-body-base text-on-surface">{approval.title}</h3>
                    <span className="px-2 py-0.5 rounded text-[10px] font-label-caps uppercase tracking-wider bg-error/20 text-error border border-error/30">
                      {approval.status}
                    </span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mb-1">{approval.employee}</p>
                  <div className="flex items-center gap-3 text-[12px] text-on-surface-variant">
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">category</span>
                      {approval.type}
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">calendar_today</span>
                      {approval.date}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex gap-3">
                <button className="px-4 py-2 bg-error/10 text-error border border-error/20 hover:bg-error/20 rounded-lg font-body-sm text-body-sm transition-all">
                  Reject
                </button>
                <button className="px-4 py-2 bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 rounded-lg font-body-sm text-body-sm transition-all flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">visibility</span>
                  Review
                </button>
                <button className="px-4 py-2 bg-secondary/10 text-secondary border border-secondary/20 hover:bg-secondary/20 rounded-lg font-body-sm text-body-sm transition-all flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">check_circle</span>
                  Approve
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
