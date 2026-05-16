export default function Analytics() {
  return (
    <main className="md:ml-[280px] pt-24 px-margin-mobile md:px-margin-desktop pb-12 min-h-screen">
      {/* Page Header */}
      <div className="mb-8 max-w-container-max mx-auto">
        <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-2">
          Executive Intelligence
        </h2>
        <p className="font-body-base text-body-base text-on-surface-variant max-w-2xl">
          Real-time AI insights, predictive risk analysis, and organization-wide KPI health across all active strategic initiatives.
        </p>
      </div>

      <div className="max-w-container-max mx-auto space-y-8">
        {/* Section 1: Smart AI Insights (Bento Grid) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Predicted Goal Risk Card */}
          <div className="col-span-1 lg:col-span-4 bg-[#0F172A]/40 backdrop-blur-md border border-white/5 rounded-xl p-6 flex flex-col relative overflow-hidden group">
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-error/10 rounded-full blur-[40px] group-hover:bg-error/20 transition-all duration-500"></div>
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-error" style={{ fontVariationSettings: "'FILL' 1" }}>warning</span>
                <h3 className="font-title-md text-title-md text-on-surface">Predicted Risk</h3>
              </div>
              <span className="bg-error/10 text-error font-label-caps text-label-caps px-2 py-1 rounded border border-error/20">
                HIGH ALERT
              </span>
            </div>
            <div className="mt-auto">
              <div className="font-display-xl text-[48px] font-bold text-on-surface leading-none mb-2">14%</div>
              <p className="font-body-sm text-body-sm text-on-surface-variant mb-4">
                of Q3 enterprise goals show systemic blockers.
              </p>
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-on-surface-variant font-body-sm">Engineering OKRs</span>
                  <span className="text-error font-title-md text-[14px]">82% Risk</span>
                </div>
                <div className="w-full bg-surface-variant rounded-full h-1.5 overflow-hidden">
                  <div className="bg-error h-1.5 rounded-full shadow-[0_0_8px_rgba(255,180,171,0.5)]" style={{ width: "82%" }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Quarterly Forecast Card (Charts) */}
          <div className="col-span-1 lg:col-span-5 bg-[#0F172A]/40 backdrop-blur-md border border-white/5 rounded-xl p-6 flex flex-col relative overflow-hidden">
            <div className="absolute -left-20 top-20 w-64 h-64 bg-secondary/5 rounded-full blur-[60px]"></div>
            <div className="flex justify-between items-center mb-6 relative z-10">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>trending_up</span>
                <h3 className="font-title-md text-title-md text-on-surface">Revenue Target Forecast</h3>
              </div>
              <span className="text-secondary font-body-sm text-body-sm flex items-center gap-1">
                +4.2% AI Boost
                <span className="material-symbols-outlined text-[16px]">auto_awesome</span>
              </span>
            </div>
            {/* Abstract Chart Visual */}
            <div className="flex-1 mt-4 relative h-[140px] flex items-end border-b border-l border-outline-variant/20 pb-2 pl-2">
              {/* Chart Background Lines */}
              <div className="absolute inset-0 flex flex-col justify-between pt-2 pointer-events-none opacity-20">
                <div className="w-full border-t border-outline-variant border-dashed h-0"></div>
                <div className="w-full border-t border-outline-variant border-dashed h-0"></div>
                <div className="w-full border-t border-outline-variant border-dashed h-0"></div>
              </div>
              {/* Simulated Area Chart */}
              <div className="relative w-full h-[120px] overflow-hidden ml-2">
                <svg className="absolute bottom-0 left-0 w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 100">
                  <defs>
                    <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="rgba(76, 215, 246, 0.2)" />
                      <stop offset="100%" stopColor="rgba(76, 215, 246, 0)" />
                    </linearGradient>
                  </defs>
                  <path d="M0,60 L20,70 L40,40 L60,50 L80,20 L100,10 L100,100 L0,100 Z" fill="url(#chartGradient)" />
                  <path className="text-secondary drop-shadow-[0_0_6px_rgba(76,215,246,0.8)]" d="M0,60 L20,70 L40,40 L60,50 L80,20 L100,10" fill="none" stroke="currentColor" strokeWidth="2" vectorEffect="non-scaling-stroke" />
                  <path className="text-secondary opacity-50" d="M100,10 L120,5" fill="none" stroke="currentColor" strokeDasharray="4,4" strokeWidth="2" vectorEffect="non-scaling-stroke" />
                </svg>
              </div>
            </div>
            <div className="flex justify-between mt-2 text-on-surface-variant font-body-sm text-[11px] uppercase ml-2">
              <span>Jul</span><span>Aug</span><span>Sep</span>
            </div>
          </div>

          {/* AI Recommendation */}
          <div className="col-span-1 lg:col-span-3 bg-gradient-to-b from-surface-container/60 to-surface-container-low border border-primary/20 rounded-xl p-6 relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-tertiary"></div>
            <div className="flex items-center gap-2 mb-4">
              <span className="material-symbols-outlined text-primary text-[20px]">auto_awesome</span>
              <h3 className="font-title-md text-title-md text-on-surface text-[16px]">Smart Action</h3>
            </div>
            <p className="font-body-base text-body-base text-on-surface-variant mb-6 text-[14px] leading-relaxed">
              Reallocate 2 engineers from <span className="text-on-surface font-medium border-b border-outline-variant/30">Project Alpha</span> to the <span className="text-on-surface font-medium border-b border-outline-variant/30">Core Platform</span> initiative. This mitigates the 82% risk factor and stabilizes the Q3 delivery pipeline.
            </p>
            <button className="w-full py-2.5 rounded-lg border border-primary/30 text-primary font-title-md text-[14px] hover:bg-primary/5 transition-colors flex justify-center items-center gap-2">
              Execute Scenario
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>
        </div>

        {/* Section 2 & 3 Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Shared KPIs & Org Health */}
          <div className="bg-[#0F172A]/40 backdrop-blur-md border border-white/5 rounded-xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-title-md text-title-md text-on-surface">Organization Health Matrix</h3>
              <button className="text-on-surface-variant hover:text-primary transition-colors">
                <span className="material-symbols-outlined">more_horiz</span>
              </button>
            </div>
            <div className="space-y-6">
              {/* KPI Row 1 */}
              <div className="flex items-center gap-4">
                <div className="w-32 flex-shrink-0">
                  <p className="font-body-sm text-body-sm text-on-surface font-medium">Customer Succ.</p>
                  <p className="font-body-sm text-[11px] text-on-surface-variant">NPS & Churn</p>
                </div>
                {/* Heatmap Matrix */}
                <div className="flex-1 flex gap-1">
                  <div className="h-8 flex-1 bg-[#10b981]/20 border border-[#10b981]/40 rounded shadow-[inset_0_0_8px_rgba(16,185,129,0.1)]"></div>
                  <div className="h-8 flex-1 bg-[#10b981]/40 border border-[#10b981]/60 rounded shadow-[inset_0_0_8px_rgba(16,185,129,0.2)]"></div>
                  <div className="h-8 flex-1 bg-[#10b981]/20 border border-[#10b981]/40 rounded"></div>
                  <div className="h-8 flex-1 bg-surface-variant rounded"></div>
                </div>
                {/* Avatars */}
                <div className="flex -space-x-2 flex-shrink-0">
                  <div className="w-8 h-8 rounded-full border-2 border-surface-container bg-primary-container text-on-primary-container flex items-center justify-center text-xs font-bold">
                    JD
                  </div>
                  <div className="w-8 h-8 rounded-full border-2 border-surface-container bg-secondary-container text-on-secondary-container flex items-center justify-center text-xs font-bold">
                    SC
                  </div>
                </div>
              </div>
              {/* KPI Row 2 */}
              <div className="flex items-center gap-4">
                <div className="w-32 flex-shrink-0">
                  <p className="font-body-sm text-body-sm text-on-surface font-medium">Product Dev</p>
                  <p className="font-body-sm text-[11px] text-on-surface-variant">Feature Velocity</p>
                </div>
                {/* Heatmap Matrix */}
                <div className="flex-1 flex gap-1">
                  <div className="h-8 flex-1 bg-[#f59e0b]/20 border border-[#f59e0b]/40 rounded"></div>
                  <div className="h-8 flex-1 bg-error/40 border border-error/60 rounded shadow-[inset_0_0_8px_rgba(255,180,171,0.2)]"></div>
                  <div className="h-8 flex-1 bg-surface-variant rounded"></div>
                  <div className="h-8 flex-1 bg-surface-variant rounded"></div>
                </div>
                {/* Avatars */}
                <div className="flex -space-x-2 flex-shrink-0">
                  <div className="w-8 h-8 rounded-full border-2 border-surface-container bg-tertiary-container text-on-tertiary-container flex items-center justify-center text-xs font-bold">
                    MK
                  </div>
                  <div className="w-8 h-8 rounded-full border-2 border-surface-container bg-surface-bright flex items-center justify-center text-xs text-on-surface font-medium">
                    +3
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Goal Lifecycle Visualization */}
          <div className="bg-[#0F172A]/40 backdrop-blur-md border border-white/5 rounded-xl p-6 flex flex-col">
            <div className="flex justify-between items-center mb-8">
              <h3 className="font-title-md text-title-md text-on-surface">Strategic Goal Lifecycle</h3>
              <span className="bg-surface-variant text-on-surface-variant font-label-caps text-[10px] px-2 py-1 rounded">
                Q3 2024
              </span>
            </div>
            <div className="relative flex-1 flex flex-col justify-center py-4">
              {/* Horizontal Track */}
              <div className="absolute top-1/2 left-4 right-4 h-1 bg-surface-variant -translate-y-1/2 rounded-full overflow-hidden">
                {/* Progress Fill */}
                <div className="h-full w-[65%] bg-gradient-to-r from-secondary to-primary shadow-[0_0_10px_rgba(192,193,255,0.5)] rounded-full"></div>
              </div>
              {/* Nodes */}
              <div className="relative z-10 flex justify-between items-center w-full px-2">
                {/* Node 1: Draft (Completed) */}
                <div className="flex flex-col items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center shadow-[0_0_15px_rgba(76,215,246,0.4)] ring-4 ring-surface-container">
                    <span className="material-symbols-outlined text-[14px] text-surface-container-lowest font-bold">check</span>
                  </div>
                  <span className="font-label-caps text-on-surface text-[11px]">Draft</span>
                </div>
                {/* Node 2: Active (In Progress) */}
                <div className="flex flex-col items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center shadow-[0_0_20px_rgba(192,193,255,0.6)] ring-4 ring-surface-container relative">
                    <div className="absolute inset-0 rounded-full border-2 border-primary animate-ping opacity-20"></div>
                  </div>
                  <span className="font-label-caps text-primary text-[11px]">Active</span>
                </div>
                {/* Node 3: Review */}
                <div className="flex flex-col items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-surface-variant border-2 border-outline-variant flex items-center justify-center ring-4 ring-surface-container"></div>
                  <span className="font-label-caps text-on-surface-variant text-[11px]">Review</span>
                </div>
                {/* Node 4: Complete */}
                <div className="flex flex-col items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-surface-variant border-2 border-outline-variant flex items-center justify-center ring-4 ring-surface-container"></div>
                  <span className="font-label-caps text-on-surface-variant text-[11px]">Complete</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
