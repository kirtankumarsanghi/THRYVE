import { useNavigate } from "react-router-dom";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

export default function EmployeeDashboard() {
  const navigate = useNavigate();

  const goalStatusData = [
    { name: "Completed", value: 3, color: "#4cd7f6" },
    { name: "In Progress", value: 5, color: "#c0c1ff" },
    { name: "Not Started", value: 2, color: "#ddb7ff" },
  ];

  const recentGoals = [
    { id: 1, title: "Launch Enterprise Portal", progress: 85, status: "In Progress", dueDate: "2024-03-30" },
    { id: 2, title: "Improve Customer Satisfaction", progress: 100, status: "Completed", dueDate: "2024-03-15" },
    { id: 3, title: "Team Training Program", progress: 60, status: "In Progress", dueDate: "2024-04-10" },
  ];

  const upcomingCheckins = [
    { id: 1, title: "Q3 Mid-Quarter Review", date: "2024-03-25", type: "Mid-Quarter" },
    { id: 2, title: "Q3 Final Check-in", date: "2024-04-15", type: "Final" },
  ];

  return (
    <main className="pt-8 px-margin-mobile md:px-margin-desktop pb-24 max-w-container-max mx-auto min-h-screen">
      <header className="mb-10">
        <div className="flex items-center gap-2 text-on-surface-variant mb-2">
          <span className="font-label-caps text-label-caps tracking-widest uppercase text-secondary">
            Welcome Back
          </span>
        </div>
        <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface">
          My Dashboard
        </h2>
        <p className="font-body-base text-body-base text-on-surface-variant mt-2">
          Track your goals, progress, and upcoming check-ins
        </p>
      </header>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-[#0F172A] border border-white/5 rounded-xl p-6 hover:border-secondary/30 transition-all cursor-pointer" onClick={() => navigate('/employee/goals')}>
          <div className="flex items-center justify-between mb-4">
            <span className="material-symbols-outlined text-secondary text-[32px]">flag</span>
          </div>
          <div className="font-display-xl text-[36px] font-bold text-on-surface leading-none mb-1">10</div>
          <p className="font-body-sm text-body-sm text-on-surface-variant">Active Goals</p>
        </div>

        <div className="bg-[#0F172A] border border-white/5 rounded-xl p-6 hover:border-primary/30 transition-all cursor-pointer" onClick={() => navigate('/employee/progress')}>
          <div className="flex items-center justify-between mb-4">
            <span className="material-symbols-outlined text-primary text-[32px]">show_chart</span>
          </div>
          <div className="font-display-xl text-[36px] font-bold text-on-surface leading-none mb-1">75%</div>
          <p className="font-body-sm text-body-sm text-on-surface-variant">Overall Progress</p>
        </div>

        <div className="bg-[#0F172A] border border-white/5 rounded-xl p-6 hover:border-tertiary/30 transition-all cursor-pointer" onClick={() => navigate('/employee/checkins')}>
          <div className="flex items-center justify-between mb-4">
            <span className="material-symbols-outlined text-tertiary text-[32px]">calendar_today</span>
          </div>
          <div className="font-display-xl text-[36px] font-bold text-on-surface leading-none mb-1">2</div>
          <p className="font-body-sm text-body-sm text-on-surface-variant">Upcoming Check-ins</p>
        </div>

        <div className="bg-[#0F172A] border border-white/5 rounded-xl p-6 hover:border-secondary/30 transition-all">
          <div className="flex items-center justify-between mb-4">
            <span className="material-symbols-outlined text-secondary text-[32px]" style={{ fontVariationSettings: "'FILL' 1" }}>emoji_events</span>
          </div>
          <div className="font-display-xl text-[36px] font-bold text-on-surface leading-none mb-1">8</div>
          <p className="font-body-sm text-body-sm text-on-surface-variant">Achievements</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Goal Status Chart */}
        <div className="lg:col-span-1 bg-[#0F172A] border border-white/5 rounded-xl p-6">
          <h3 className="font-title-md text-title-md text-on-surface mb-6 flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary">donut_small</span>
            Goal Status
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={goalStatusData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {goalStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1e293b', 
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '8px',
                  color: '#e2e8f0'
                }}
              />
              <Legend 
                verticalAlign="bottom" 
                height={36}
                iconType="circle"
                wrapperStyle={{ fontSize: '12px' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Goals */}
        <div className="lg:col-span-2 bg-[#0F172A] border border-white/5 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-title-md text-title-md text-on-surface flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">flag</span>
              Recent Goals
            </h3>
            <button 
              onClick={() => navigate('/employee/goals')}
              className="font-body-sm text-body-sm text-primary hover:text-primary-fixed transition-colors flex items-center gap-1"
            >
              View All
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>
          <div className="space-y-4">
            {recentGoals.map((goal) => (
              <div 
                key={goal.id} 
                className="p-4 rounded-lg bg-surface-container/50 border border-outline-variant/10 hover:border-secondary/30 transition-all cursor-pointer"
                onClick={() => navigate(`/employee/goals/${goal.id}`)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h4 className="font-body-sm text-body-sm text-on-surface font-medium mb-1">{goal.title}</h4>
                    <div className="flex items-center gap-3 text-[12px] text-on-surface-variant">
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">calendar_today</span>
                        Due: {goal.dueDate}
                      </span>
                    </div>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-label-caps uppercase tracking-wider ${
                    goal.status === 'Completed' 
                      ? 'bg-secondary/20 text-secondary border border-secondary/30'
                      : 'bg-primary/20 text-primary border border-primary/30'
                  }`}>
                    {goal.status}
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[12px]">
                    <span className="text-on-surface-variant">Progress</span>
                    <span className="text-on-surface font-medium">{goal.progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-surface-variant rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-secondary to-primary rounded-full transition-all duration-500"
                      style={{ width: `${goal.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Upcoming Check-ins */}
      <div className="bg-[#0F172A] border border-white/5 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-title-md text-title-md text-on-surface flex items-center gap-2">
            <span className="material-symbols-outlined text-tertiary">event</span>
            Upcoming Check-ins
          </h3>
          <button 
            onClick={() => navigate('/employee/checkins')}
            className="font-body-sm text-body-sm text-primary hover:text-primary-fixed transition-colors flex items-center gap-1"
          >
            View All
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {upcomingCheckins.map((checkin) => (
            <div 
              key={checkin.id}
              className="p-4 rounded-lg bg-surface-container/50 border border-outline-variant/10 hover:border-tertiary/30 transition-all cursor-pointer"
              onClick={() => navigate('/employee/checkins')}
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-tertiary/20 border border-tertiary/30 flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-tertiary text-[20px]">calendar_today</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-body-sm text-body-sm text-on-surface font-medium mb-1">{checkin.title}</h4>
                  <div className="flex items-center gap-2 text-[12px] text-on-surface-variant">
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">schedule</span>
                      {checkin.date}
                    </span>
                    <span>•</span>
                    <span>{checkin.type}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <button 
          onClick={() => navigate('/employee/goals/create')}
          className="p-6 bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20 hover:border-primary/40 rounded-xl transition-all group text-left"
        >
          <span className="material-symbols-outlined text-primary text-[32px] mb-3 block group-hover:scale-110 transition-transform">add_circle</span>
          <h4 className="font-title-md text-body-base text-on-surface mb-1">Create New Goal</h4>
          <p className="font-body-sm text-[12px] text-on-surface-variant">Define a new quarterly objective</p>
        </button>

        <button 
          onClick={() => navigate('/employee/checkins')}
          className="p-6 bg-gradient-to-br from-tertiary/10 to-primary/10 border border-tertiary/20 hover:border-tertiary/40 rounded-xl transition-all group text-left"
        >
          <span className="material-symbols-outlined text-tertiary text-[32px] mb-3 block group-hover:scale-110 transition-transform">assignment</span>
          <h4 className="font-title-md text-body-base text-on-surface mb-1">Submit Check-in</h4>
          <p className="font-body-sm text-[12px] text-on-surface-variant">Update your quarterly progress</p>
        </button>

        <button 
          onClick={() => navigate('/employee/progress')}
          className="p-6 bg-gradient-to-br from-secondary/10 to-tertiary/10 border border-secondary/20 hover:border-secondary/40 rounded-xl transition-all group text-left"
        >
          <span className="material-symbols-outlined text-secondary text-[32px] mb-3 block group-hover:scale-110 transition-transform">analytics</span>
          <h4 className="font-title-md text-body-base text-on-surface mb-1">View Analytics</h4>
          <p className="font-body-sm text-[12px] text-on-surface-variant">Track your performance metrics</p>
        </button>
      </div>
    </main>
  );
}
