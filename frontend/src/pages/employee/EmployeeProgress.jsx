import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

export default function EmployeeProgress() {
  const progressData = [
    { month: "Jan", progress: 45, target: 50 },
    { month: "Feb", progress: 62, target: 60 },
    { month: "Mar", progress: 75, target: 70 },
    { month: "Apr", progress: 85, target: 80 },
  ];

  return (
    <main className="pt-8 px-margin-mobile md:px-margin-desktop pb-24 max-w-container-max mx-auto min-h-screen">
      <header className="mb-10">
        <div className="flex items-center gap-2 text-on-surface-variant mb-2">
          <span className="material-symbols-outlined text-secondary text-[20px]">show_chart</span>
          <span className="font-label-caps text-label-caps tracking-widest uppercase text-secondary">
            Performance Tracking
          </span>
        </div>
        <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface">
          My Progress
        </h2>
        <p className="font-body-base text-body-base text-on-surface-variant mt-2">
          Track your performance metrics and achievements over time
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-[#0F172A] border border-white/5 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="material-symbols-outlined text-secondary text-[32px]">show_chart</span>
          </div>
          <div className="font-display-xl text-[36px] font-bold text-on-surface leading-none mb-1">85%</div>
          <p className="font-body-sm text-body-sm text-on-surface-variant">Overall Progress</p>
        </div>

        <div className="bg-[#0F172A] border border-white/5 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="material-symbols-outlined text-primary text-[32px]">flag</span>
          </div>
          <div className="font-display-xl text-[36px] font-bold text-on-surface leading-none mb-1">8/10</div>
          <p className="font-body-sm text-body-sm text-on-surface-variant">Goals Completed</p>
        </div>

        <div className="bg-[#0F172A] border border-white/5 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="material-symbols-outlined text-tertiary text-[32px]">calendar_today</span>
          </div>
          <div className="font-display-xl text-[36px] font-bold text-on-surface leading-none mb-1">Q3</div>
          <p className="font-body-sm text-body-sm text-on-surface-variant">Current Quarter</p>
        </div>

        <div className="bg-[#0F172A] border border-white/5 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="material-symbols-outlined text-primary text-[32px]" style={{ fontVariationSettings: "'FILL' 1" }}>emoji_events</span>
          </div>
          <div className="font-display-xl text-[36px] font-bold text-on-surface leading-none mb-1">12</div>
          <p className="font-body-sm text-body-sm text-on-surface-variant">Achievements</p>
        </div>
      </div>

      <div className="bg-[#0F172A] border border-white/5 rounded-xl p-6">
        <h3 className="font-title-md text-title-md text-on-surface mb-6 flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">trending_up</span>
          Quarterly Performance Trend
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={progressData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis 
              dataKey="month" 
              stroke="#94a3b8"
              style={{ fontSize: '12px' }}
            />
            <YAxis 
              stroke="#94a3b8"
              style={{ fontSize: '12px' }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1e293b', 
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '8px',
                color: '#e2e8f0'
              }}
            />
            <Legend 
              wrapperStyle={{ fontSize: '12px' }}
            />
            <Line 
              type="monotone" 
              dataKey="progress" 
              stroke="#4cd7f6" 
              strokeWidth={3}
              dot={{ fill: '#4cd7f6', r: 5 }}
              name="Actual Progress"
            />
            <Line 
              type="monotone" 
              dataKey="target" 
              stroke="#c0c1ff" 
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={{ fill: '#c0c1ff', r: 4 }}
              name="Target"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Achievements */}
      <div className="mt-8 bg-[#0F172A] border border-white/5 rounded-xl p-6">
        <h3 className="font-title-md text-title-md text-on-surface mb-6 flex items-center gap-2">
          <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>emoji_events</span>
          Recent Achievements
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { title: "Goal Master", desc: "Completed 5 goals this quarter", icon: "flag", color: "secondary" },
            { title: "Early Bird", desc: "Submitted check-in ahead of deadline", icon: "schedule", color: "primary" },
            { title: "Team Player", desc: "Collaborated on 3 team goals", icon: "groups", color: "tertiary" },
            { title: "Consistent Performer", desc: "Maintained 80%+ progress for 3 months", icon: "trending_up", color: "secondary" },
          ].map((achievement, index) => (
            <div key={index} className="p-4 rounded-lg bg-surface-container/50 border border-outline-variant/10 flex items-center gap-4">
              <div className={`w-12 h-12 rounded-full bg-${achievement.color}/20 border border-${achievement.color}/30 flex items-center justify-center flex-shrink-0`}>
                <span className={`material-symbols-outlined text-${achievement.color} text-[24px]`} style={{ fontVariationSettings: "'FILL' 1" }}>
                  {achievement.icon}
                </span>
              </div>
              <div>
                <h4 className="font-body-sm text-body-sm text-on-surface font-medium mb-1">{achievement.title}</h4>
                <p className="font-body-sm text-[12px] text-on-surface-variant">{achievement.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
