export default function Team() {
  const teamMembers = [
    { id: 1, name: "Alex Larson", role: "Product Manager", avatar: "AL", goals: 12, completion: 85, status: "active" },
    { id: 2, name: "Sarah Chen", role: "Engineering Lead", avatar: "SC", goals: 8, completion: 92, status: "active" },
    { id: 3, name: "Michael Kim", role: "Senior Developer", avatar: "MK", goals: 10, completion: 78, status: "active" },
    { id: 4, name: "Jessica Davis", role: "UX Designer", avatar: "JD", goals: 6, completion: 95, status: "active" },
    { id: 5, name: "Robert Taylor", role: "Data Analyst", avatar: "RT", goals: 7, completion: 88, status: "active" },
    { id: 6, name: "Emily Wilson", role: "Marketing Manager", avatar: "EW", goals: 9, completion: 82, status: "active" },
  ];

  return (
    <main className="md:ml-[280px] pt-24 md:pt-24 px-margin-mobile md:px-margin-desktop pb-24 max-w-container-max mx-auto min-h-screen">
      {/* Header Section */}
      <header className="mb-10">
        <div className="flex items-center gap-2 text-on-surface-variant mb-2">
          <span className="font-label-caps text-label-caps tracking-widest uppercase text-secondary">
            Team Management
          </span>
        </div>
        <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface">
          Team Overview
        </h2>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-[#0F172A] border border-white/5 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="material-symbols-outlined text-primary text-[32px]">groups</span>
            <span className="text-on-surface-variant font-body-sm text-body-sm">Total</span>
          </div>
          <div className="font-display-xl text-[36px] font-bold text-on-surface leading-none mb-1">6</div>
          <p className="font-body-sm text-body-sm text-on-surface-variant">Team Members</p>
        </div>

        <div className="bg-[#0F172A] border border-white/5 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="material-symbols-outlined text-secondary text-[32px]">flag</span>
            <span className="text-on-surface-variant font-body-sm text-body-sm">Active</span>
          </div>
          <div className="font-display-xl text-[36px] font-bold text-on-surface leading-none mb-1">52</div>
          <p className="font-body-sm text-body-sm text-on-surface-variant">Total Goals</p>
        </div>

        <div className="bg-[#0F172A] border border-white/5 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="material-symbols-outlined text-tertiary text-[32px]">trending_up</span>
            <span className="text-on-surface-variant font-body-sm text-body-sm">Average</span>
          </div>
          <div className="font-display-xl text-[36px] font-bold text-on-surface leading-none mb-1">87%</div>
          <p className="font-body-sm text-body-sm text-on-surface-variant">Completion Rate</p>
        </div>

        <div className="bg-[#0F172A] border border-white/5 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="material-symbols-outlined text-primary text-[32px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
            <span className="text-on-surface-variant font-body-sm text-body-sm">Status</span>
          </div>
          <div className="font-display-xl text-[36px] font-bold text-on-surface leading-none mb-1">100%</div>
          <p className="font-body-sm text-body-sm text-on-surface-variant">Active Members</p>
        </div>
      </div>

      {/* Team Members Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teamMembers.map((member) => (
          <div key={member.id} className="bg-[#0F172A] border border-white/5 rounded-xl p-6 hover:border-primary/30 transition-all cursor-pointer">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-title-md text-[20px] font-bold">
                {member.avatar}
              </div>
              <div className="flex-1">
                <h3 className="font-title-md text-body-base text-on-surface mb-1">{member.name}</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">{member.role}</p>
              </div>
              <span className="px-2 py-1 rounded text-[10px] font-label-caps uppercase tracking-wider bg-[#004e5c] text-[#acedff] border border-[#003640]">
                {member.status}
              </span>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-body-sm text-body-sm text-on-surface-variant">Active Goals</span>
                <span className="font-title-md text-body-sm text-on-surface font-bold">{member.goals}</span>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-body-sm text-body-sm text-on-surface-variant">Completion Rate</span>
                  <span className="font-title-md text-body-sm text-on-surface font-bold">{member.completion}%</span>
                </div>
                <div className="h-2 w-full bg-surface-container-highest rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary rounded-full shadow-[0_0_10px_rgba(192,193,255,0.5)]"
                    style={{ width: `${member.completion}%` }}
                  ></div>
                </div>
              </div>

              <button className="w-full py-2 px-4 bg-surface-variant/30 hover:bg-surface-variant/50 text-on-surface rounded-lg font-body-sm text-body-sm transition-colors flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-[18px]">visibility</span>
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
