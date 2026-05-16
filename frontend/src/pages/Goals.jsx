export default function Goals() {
  return (
    <main className="md:ml-[280px] pt-24 md:pt-24 px-margin-mobile md:px-margin-desktop pb-24 max-w-container-max mx-auto min-h-screen">
      {/* Header Section */}
      <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-on-surface-variant mb-2">
            <span className="font-label-caps text-label-caps tracking-widest uppercase text-secondary">
              Q3 Performance Cycle
            </span>
            <span className="w-1 h-1 rounded-full bg-outline-variant"></span>
            <span className="font-body-sm text-body-sm">Jul 1 - Sep 30</span>
          </div>
          <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface">
            Quarterly Check-in
          </h2>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-surface-container-high border border-outline-variant/20 rounded-lg p-1 flex">
            <button className="px-4 py-1.5 rounded-md font-title-md text-body-sm text-on-surface-variant hover:text-on-surface transition-colors">
              Q1
            </button>
            <button className="px-4 py-1.5 rounded-md font-title-md text-body-sm text-on-surface-variant hover:text-on-surface transition-colors">
              Q2
            </button>
            <button className="px-4 py-1.5 rounded-md font-title-md text-body-sm bg-surface-variant text-on-surface shadow-sm border border-outline-variant/30">
              Q3
            </button>
            <button className="px-4 py-1.5 rounded-md font-title-md text-body-sm text-on-surface-variant hover:text-on-surface transition-colors">
              Q4
            </button>
          </div>
        </div>
      </header>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Completion Tracker */}
        <div className="lg:col-span-12 bg-[#0F172A] border border-white/5 rounded-xl p-6 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-50"></div>
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4 w-full md:w-auto">
              <div className="w-16 h-16 rounded-full bg-surface-variant border-2 border-primary/30 flex items-center justify-center relative shadow-[0_0_20px_rgba(192,193,255,0.15)]">
                <svg className="w-14 h-14 transform -rotate-90">
                  <circle className="text-surface-container-highest" cx="28" cy="28" fill="transparent" r="26" stroke="currentColor" strokeWidth="4"></circle>
                  <circle className="text-primary drop-shadow-[0_0_8px_rgba(192,193,255,0.8)]" cx="28" cy="28" fill="transparent" r="26" stroke="currentColor" strokeDasharray="163" strokeDashoffset="40" strokeWidth="4"></circle>
                </svg>
                <span className="absolute font-title-md text-body-sm font-bold text-on-surface">75%</span>
              </div>
              <div>
                <h3 className="font-title-md text-title-md text-on-surface mb-1">Check-in Progress</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">3 of 4 key objectives reviewed</p>
              </div>
            </div>
            <div className="flex-1 w-full flex items-center justify-end gap-2 md:gap-4">
              <div className="flex flex-col items-center gap-1 opacity-50">
                <div className="w-8 h-8 rounded-full bg-surface-container-highest flex items-center justify-center text-on-surface-variant border border-outline-variant/30">
                  <span className="material-symbols-outlined text-[16px]">edit_document</span>
                </div>
                <span className="font-label-caps text-[10px] text-on-surface-variant">Draft</span>
              </div>
              <div className="h-px w-8 bg-outline-variant/30"></div>
              <div className="flex flex-col items-center gap-1">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary border border-primary/50 shadow-[0_0_10px_rgba(192,193,255,0.2)]">
                  <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>person</span>
                </div>
                <span className="font-label-caps text-[10px] text-primary">Self Eval</span>
              </div>
              <div className="h-px w-8 bg-primary/30"></div>
              <div className="flex flex-col items-center gap-1">
                <div className="w-8 h-8 rounded-full bg-surface-container-highest flex items-center justify-center text-on-surface-variant border border-outline-variant/30">
                  <span className="material-symbols-outlined text-[16px]">manage_accounts</span>
                </div>
                <span className="font-label-caps text-[10px] text-on-surface-variant">Manager</span>
              </div>
              <div className="h-px w-8 bg-outline-variant/30"></div>
              <div className="flex flex-col items-center gap-1 opacity-50">
                <div className="w-8 h-8 rounded-full bg-surface-container-highest flex items-center justify-center text-on-surface-variant border border-outline-variant/30">
                  <span className="material-symbols-outlined text-[16px]">task_alt</span>
                </div>
                <span className="font-label-caps text-[10px] text-on-surface-variant">Final</span>
              </div>
            </div>
            <button className="w-full md:w-auto px-6 py-2.5 bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 rounded-lg font-title-md text-body-sm transition-all shadow-[0_0_15px_rgba(192,193,255,0.05)] hover:shadow-[0_0_20px_rgba(192,193,255,0.15)]">
              Continue Review
            </button>
          </div>
        </div>

        {/* Objectives Section */}
        <div className="lg:col-span-8 space-y-6">
          {/* Objective 1 */}
          <div className="bg-[#0F172A] border border-white/5 rounded-xl p-6 relative overflow-hidden backdrop-blur-sm">
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
            <div className="flex justify-between items-start mb-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-label-caps uppercase tracking-wider bg-[#004e5c] text-[#acedff] border border-[#003640]">
                    On Track
                  </span>
                  <span className="font-label-caps text-label-caps text-on-surface-variant">OBJ-01</span>
                </div>
                <h3 className="font-title-md text-title-md text-on-surface">Expand Enterprise Market Share</h3>
              </div>
              <button className="text-on-surface-variant hover:text-primary transition-colors">
                <span className="material-symbols-outlined">more_horiz</span>
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between font-body-sm text-body-sm mb-2">
                  <span className="text-on-surface-variant">Secure 5 new Fortune 500 logos</span>
                  <span className="text-on-surface font-title-md">4 / 5</span>
                </div>
                <div className="h-2 w-full bg-surface-container-highest rounded-full overflow-hidden">
                  <div className="h-full bg-secondary w-[80%] rounded-full shadow-[0_0_10px_rgba(76,215,246,0.5)]"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between font-body-sm text-body-sm mb-2">
                  <span className="text-on-surface-variant">Increase ACV by 15%</span>
                  <span className="text-on-surface font-title-md">12% / 15%</span>
                </div>
                <div className="h-2 w-full bg-surface-container-highest rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-[80%] rounded-full shadow-[0_0_10px_rgba(192,193,255,0.5)]"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Objective 2 */}
          <div className="bg-[#0F172A] border border-white/5 rounded-xl p-6 relative overflow-hidden backdrop-blur-sm">
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-error/5 rounded-full blur-3xl pointer-events-none"></div>
            <div className="flex justify-between items-start mb-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-label-caps uppercase tracking-wider bg-error-container/40 text-error border border-error/20">
                    At Risk
                  </span>
                  <span className="font-label-caps text-label-caps text-on-surface-variant">OBJ-02</span>
                </div>
                <h3 className="font-title-md text-title-md text-on-surface">Launch AI Predictive Analytics</h3>
              </div>
              <button className="text-on-surface-variant hover:text-primary transition-colors">
                <span className="material-symbols-outlined">more_horiz</span>
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between font-body-sm text-body-sm mb-2">
                  <span className="text-on-surface-variant">Complete Beta with 50 customers</span>
                  <span className="text-on-surface font-title-md">15 / 50</span>
                </div>
                <div className="h-2 w-full bg-surface-container-highest rounded-full overflow-hidden relative">
                  <div className="h-full bg-error w-[30%] rounded-full shadow-[0_0_10px_rgba(255,180,171,0.5)]"></div>
                  <div className="absolute top-0 bottom-0 left-[30%] w-0.5 bg-error/50 animate-pulse"></div>
                </div>
                <p className="mt-2 text-[12px] text-error/80 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">warning</span>
                  Blocked by API rate limits
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Review Thread */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="bg-[#0F172A] border border-white/5 rounded-xl p-6 flex-1 flex flex-col">
            <h3 className="font-title-md text-title-md text-on-surface mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[20px]">forum</span>
              Review Thread
            </h3>
            <div className="flex-1 space-y-6 overflow-y-auto pr-2 custom-scrollbar">
              <div className="relative pl-4 border-l border-outline-variant/20">
                <div className="absolute -left-[1.35rem] top-0 w-10 h-10 rounded-full bg-surface-variant border border-outline-variant/30 flex items-center justify-center font-title-md text-body-sm font-bold text-on-surface z-10">
                  AL
                </div>
                <div className="ml-6 bg-surface-container/50 border border-outline-variant/10 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-title-md text-body-sm font-semibold text-on-surface">Alex Larson</span>
                    <span className="font-body-sm text-[12px] text-on-surface-variant">2 days ago</span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                    Self-evaluation submitted. I've highlighted the challenges we're facing with the AI beta rollout in OBJ-02.
                  </p>
                </div>
              </div>
              <div className="relative pl-4 border-l border-outline-variant/20">
                <div className="absolute -left-[1.35rem] top-0 w-10 h-10 rounded-full bg-secondary/20 border border-secondary/30 flex items-center justify-center font-title-md text-body-sm font-bold text-secondary z-10">
                  <span className="material-symbols-outlined text-[20px]">engineering</span>
                </div>
                <div className="ml-6 bg-surface-container/50 border border-outline-variant/10 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-title-md text-body-sm font-semibold text-on-surface">Sarah Chen (Manager)</span>
                    <span className="font-body-sm text-[12px] text-on-surface-variant">Yesterday</span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                    Reviewed. Let's discuss resourcing for the API blockers during our 1:1 tomorrow. Great work on the Enterprise logos.
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-outline-variant/10 relative">
              <textarea
                className="w-full bg-surface-container border border-outline-variant/20 rounded-lg p-3 text-body-sm text-on-surface placeholder-on-surface-variant/50 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none resize-none h-20 transition-all"
                placeholder="Add a comment..."
              ></textarea>
              <button className="absolute bottom-6 right-3 text-primary hover:text-primary-fixed bg-primary/10 hover:bg-primary/20 p-1.5 rounded-md transition-colors">
                <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>send</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.02);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </main>
  );
}
