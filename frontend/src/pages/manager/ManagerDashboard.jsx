export default function ManagerDashboard() {
  return (
    <main className="pt-8 px-margin-mobile md:px-margin-desktop pb-24 max-w-container-max mx-auto min-h-screen">
      <header className="mb-10">
        <div className="flex items-center gap-2 text-on-surface-variant mb-2">
          <span className="material-symbols-outlined text-tertiary text-[20px]">groups</span>
          <span className="font-label-caps text-label-caps tracking-widest uppercase text-tertiary">
            Manager Portal
          </span>
        </div>
        <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface">
          Team Dashboard
        </h2>
        <p className="font-body-base text-body-base text-on-surface-variant mt-2">
          Monitor your team's performance and manage approvals
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-[#0F172A] border border-white/5 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="material-symbols-outlined text-tertiary text-[32px]">groups</span>
          </div>
          <div className="font-display-xl text-[36px] font-bold text-on-surface leading-none mb-1">12</div>
          <p className="font-body-sm text-body-sm text-on-surface-variant">Team Members</p>
        </div>

        <div className="bg-[#0F172A] border border-white/5 rounded-xl p-6 relative">
          <div className="flex items-center justify-between mb-4">
            <span className="material-symbols-outlined text-error text-[32px]">pending_actions</span>
            <span className="absolute top-4 right-4 min-w-[24px] h-6 px-2 flex items-center justify-center bg-error text-on-primary rounded-full text-[12px] font-bold shadow-[0_0_10px_rgba(255,180,171,0.5)]">
              5
            </span>
          </div>
          <div className="font-display-xl text-[36px] font-bold text-on-surface leading-none mb-1">5</div>
          <p className="font-body-sm text-body-sm text-on-surface-variant">Pending Approvals</p>
        </div>

        <div className="bg-[#0F172A] border border-white/5 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="material-symbols-outlined text-secondary text-[32px]">trending_up</span>
          </div>
          <div className="font-display-xl text-[36px] font-bold text-on-surface leading-none mb-1">87%</div>
          <p className="font-body-sm text-body-sm text-on-surface-variant">Team Performance</p>
        </div>

        <div className="bg-[#0F172A] border border-white/5 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="material-symbols-outlined text-primary text-[32px]">assignment</span>
          </div>
          <div className="font-display-xl text-[36px] font-bold text-on-surface leading-none mb-1">8</div>
          <p className="font-body-sm text-body-sm text-on-surface-variant">Check-ins Due</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[#0F172A] border border-white/5 rounded-xl p-6">
          <h3 className="font-title-md text-title-md text-on-surface mb-6 flex items-center gap-2">
            <span className="material-symbols-outlined text-tertiary">groups</span>
            Team Overview
          </h3>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center gap-4 p-3 rounded-lg hover:bg-surface-variant/20 transition-colors">
                <div className="w-10 h-10 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-title-md font-bold">
                  TM
                </div>
                <div className="flex-1">
                  <p className="font-body-sm text-body-sm text-on-surface font-medium">Team Member {i}</p>
                  <p className="font-body-sm text-[12px] text-on-surface-variant">5 active goals</p>
                </div>
                <div className="text-right">
                  <p className="font-title-md text-body-sm text-on-surface font-bold">85%</p>
                  <p className="font-body-sm text-[12px] text-on-surface-variant">Progress</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#0F172A] border border-white/5 rounded-xl p-6">
          <h3 className="font-title-md text-title-md text-on-surface mb-6 flex items-center gap-2">
            <span className="material-symbols-outlined text-error">pending_actions</span>
            Recent Approvals
          </h3>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-4 rounded-lg bg-surface-container/50 border border-outline-variant/10">
                <div className="flex items-start justify-between mb-2">
                  <p className="font-body-sm text-body-sm text-on-surface font-medium">Goal Review Request</p>
                  <span className="px-2 py-0.5 rounded text-[10px] font-label-caps uppercase tracking-wider bg-error/20 text-error border border-error/30">
                    Pending
                  </span>
                </div>
                <p className="font-body-sm text-[12px] text-on-surface-variant mb-3">Team Member {i} - Q3 Goals</p>
                <div className="flex gap-2">
                  <button className="flex-1 py-1.5 px-3 bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 rounded-lg font-body-sm text-[12px] transition-all">
                    Review
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
