import { AlertTriangle, TrendingUp, Sparkles, ArrowRight, MoreHorizontal, CheckCircle2 } from "lucide-react";
import { AreaChart, Area, ResponsiveContainer, XAxis, Tooltip } from "recharts";
import PageContainer from "../../components/common/PageContainer";

const revenueData = [
  { name: 'JUL', value: 300 },
  { name: '', value: 280 },
  { name: '', value: 320 },
  { name: 'AUG', value: 400 },
  { name: '', value: 380 },
  { name: 'SEP', value: 450 },
];

export default function Analytics() {
  return (
    <PageContainer>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Executive Intelligence</h1>
        <p className="text-gray-400">Real-time AI insights, predictive risk analysis, and organization-wide KPI health across all active strategic initiatives.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Predicted Risk */}
        <div className="rounded-2xl border border-border bg-card p-6 relative overflow-hidden flex flex-col justify-between" style={{ background: 'radial-gradient(circle at top right, rgba(255, 100, 100, 0.05), transparent 50%), #1a1b26' }}>
          <div>
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2 text-white font-semibold">
                <AlertTriangle className="w-5 h-5 text-red-400" />
                Predicted Risk
              </div>
              <span className="px-2 py-1 bg-red-500/10 text-red-400 text-xs font-semibold rounded uppercase tracking-wide border border-red-500/20">
                High Alert
              </span>
            </div>
            
            <div className="mb-2">
              <span className="text-5xl font-bold text-white tracking-tight">14%</span>
            </div>
            <p className="text-sm text-gray-400 mb-8 max-w-[200px]">of Q3 enterprise goals show systemic blockers.</p>
          </div>
          
          <div>
            <div className="flex justify-between text-xs font-semibold mb-2">
              <span className="text-gray-400">Engineering OKRs</span>
              <span className="text-red-400">82% Risk</span>
            </div>
            <div className="h-1.5 w-full bg-dark rounded-full overflow-hidden">
              <div className="h-full bg-red-400 rounded-full" style={{ width: '82%' }}></div>
            </div>
          </div>
        </div>

        {/* Revenue Target Forecast */}
        <div className="rounded-2xl border border-border bg-card p-6 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2 text-white font-semibold">
              <TrendingUp className="w-5 h-5 text-cyan-400" />
              Revenue Target Forecast
            </div>
            <div className="text-cyan-400 text-sm font-semibold flex items-center gap-1">
              +4.2% AI Boost <Sparkles className="w-3 h-3" />
            </div>
          </div>
          <div className="flex-1 min-h-[160px] -mx-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#22d3ee" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 11}} dy={10} />
                <Tooltip contentStyle={{ backgroundColor: '#1a1b26', borderColor: '#2e303e' }} itemStyle={{ color: '#22d3ee' }} />
                <Area type="monotone" dataKey="value" stroke="#22d3ee" strokeWidth={2} fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Smart Action */}
        <div className="rounded-2xl border border-primary/30 bg-card p-6 relative flex flex-col">
           {/* Top accent line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-cyan-400 rounded-t-2xl"></div>
          
          <div className="flex items-center gap-2 text-white font-semibold mb-6">
            <Sparkles className="w-5 h-5 text-primary" />
            Smart Action
          </div>
          
          <p className="text-gray-300 text-sm leading-relaxed mb-8 flex-1">
            Reallocate 2 engineers from <span className="text-white font-semibold">Project Alpha</span> to the <span className="text-white font-semibold">Core Platform</span> initiative. This mitigates the 82% risk factor and stabilizes the Q3 delivery pipeline.
          </p>
          
          <button className="w-full py-2.5 px-4 rounded-lg border border-border text-sm font-semibold text-white hover:bg-dark/50 transition-colors flex items-center justify-center gap-2">
            Execute Scenario <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Organization Health Matrix */}
        <div className="rounded-2xl border border-border bg-card p-6">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-white font-semibold text-lg">Organization Health Matrix</h3>
            <button className="text-gray-400 hover:text-white"><MoreHorizontal className="w-5 h-5" /></button>
          </div>
          
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-semibold text-sm">Customer Succ.</p>
                <p className="text-gray-500 text-xs">NPS & Churn</p>
              </div>
              <div className="flex items-center gap-6">
                <div className="flex gap-1.5">
                  {[1, 2, 3].map(i => <div key={`cs-1-${i}`} className="w-6 h-6 rounded bg-emerald-500/80"></div>)}
                  {[1, 2].map(i => <div key={`cs-2-${i}`} className="w-6 h-6 rounded bg-dark border border-border"></div>)}
                </div>
                <div className="flex -space-x-2">
                  <img src="https://i.pravatar.cc/100?img=1" className="w-7 h-7 rounded-full border border-card" alt="Avatar 1" />
                  <img src="https://i.pravatar.cc/100?img=2" className="w-7 h-7 rounded-full border border-card" alt="Avatar 2" />
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-semibold text-sm">Product Dev</p>
                <p className="text-gray-500 text-xs">Feature Velocity</p>
              </div>
              <div className="flex items-center gap-6">
                <div className="flex gap-1.5">
                  <div className="w-6 h-6 rounded bg-amber-600/80"></div>
                  <div className="w-6 h-6 rounded bg-rose-400/80"></div>
                  {[1, 2, 3].map(i => <div key={`pd-1-${i}`} className="w-6 h-6 rounded bg-dark border border-border"></div>)}
                </div>
                <div className="flex -space-x-2">
                  <img src="https://i.pravatar.cc/100?img=3" className="w-7 h-7 rounded-full border border-card" alt="Avatar 3" />
                  <div className="w-7 h-7 rounded-full border border-card bg-dark flex items-center justify-center text-[10px] font-semibold text-white">+3</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Strategic Goal Lifecycle */}
        <div className="rounded-2xl border border-border bg-card p-6 flex flex-col justify-between">
           <div className="flex items-center justify-between mb-8">
            <h3 className="text-white font-semibold text-lg">Strategic Goal Lifecycle</h3>
            <span className="px-2 py-1 bg-dark text-gray-400 text-xs font-semibold rounded border border-border">Q3 2024</span>
          </div>
          
          <div className="relative mb-10 mt-6 px-4">
            {/* Connecting Line */}
            <div className="absolute top-1/2 left-8 right-8 h-0.5 -translate-y-1/2 bg-dark">
              <div className="h-full bg-cyan-400" style={{ width: '35%' }}></div>
            </div>
            
            <div className="relative flex justify-between">
              <div className="flex flex-col items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-cyan-400 flex items-center justify-center z-10 shadow-[0_0_15px_rgba(34,211,238,0.4)]">
                  <CheckCircle2 className="w-5 h-5 text-black" />
                </div>
                <span className="text-xs font-semibold text-white">Draft</span>
              </div>
              
              <div className="flex flex-col items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-card border-2 border-primary flex items-center justify-center z-10">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                </div>
                <span className="text-xs font-semibold text-white">Active</span>
              </div>
              
              <div className="flex flex-col items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-dark border-2 border-border flex items-center justify-center z-10">
                </div>
                <span className="text-xs font-semibold text-gray-500">Review</span>
              </div>
              
              <div className="flex flex-col items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-dark border-2 border-border flex items-center justify-center z-10">
                </div>
                <span className="text-xs font-semibold text-gray-500">Completed</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between mt-auto">
            <div className="text-sm text-gray-400">Current Phase: <span className="text-white font-semibold">Execution & Tracking</span></div>
            <button className="text-sm text-gray-400 hover:text-white flex items-center gap-1 font-semibold transition-colors">
              View Details <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
