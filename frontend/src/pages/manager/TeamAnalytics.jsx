import { useState } from "react";
import BackButton from "../../components/common/BackButton";
import Breadcrumb from "../../components/common/Breadcrumb";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell } from "recharts";

export default function TeamAnalytics() {
  const [selectedPeriod, setSelectedPeriod] = useState("Q3-2024");

  const teamMembers = [
    { id: 1, name: "John Doe", goals: 8, completed: 7, progress: 92, status: "On Track" },
    { id: 2, name: "Jane Smith", goals: 10, completed: 9, progress: 95, status: "Excellent" },
    { id: 3, name: "Mike Johnson", goals: 6, completed: 5, progress: 88, status: "On Track" },
    { id: 4, name: "Sarah Williams", goals: 9, completed: 7, progress: 85, status: "On Track" },
    { id: 5, name: "Tom Brown", goals: 7, completed: 5, progress: 75, status: "Needs Attention" },
  ];

  const monthlyProgress = [
    { month: "Jan", team: 65, target: 70 },
    { month: "Feb", team: 72, target: 75 },
    { month: "Mar", team: 85, target: 80 },
    { month: "Apr", team: 87, target: 85 },
  ];

  const goalStatusData = [
    { name: "Completed", value: 33, color: "#4cd7f6" },
    { name: "In Progress", value: 12, color: "#c0c1ff" },
    { name: "Not Started", value: 5, color: "#ddb7ff" },
  ];

  const totalGoals = teamMembers.reduce((sum, member) => sum + member.goals, 0);
  const totalCompleted = teamMembers.reduce((sum, member) => sum + member.completed, 0);
  const avgProgress = Math.round(teamMembers.reduce((sum, member) => sum + member.progress, 0) / teamMembers.length);

  return (
    <main className="pt-8 px-margin-mobile md:px-margin-desktop pb-24 max-w-container-max mx-auto min-h-screen">
      <Breadcrumb />
      <BackButton to="/manager/dashboard" label="Back to Dashboard" />

      <header className="mb-10 mt-6">
        <div className="flex items-center gap-2 text-on-surface-variant mb-2">
          <span className="material-symbols-outlined text-tertiary text-[20px]">analytics</span>
          <span className="font-label-caps text-label-caps tracking-widest uppercase text-tertiary">
            Team Performance
          </span>
        </div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface">
              Team Analytics
            </h2>
            <p className="font-body-base text-body-base text-on-surface-variant mt-2">
              Monitor your team's performance and progress
            </p>
          </div>
          <div className="flex gap-3">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="bg-surface-container border border-outline-variant/20 rounded-lg px-4 py-2.5 text-body-sm text-on-surface focus:border-primary/50 focus:ring-2 focus:ring-primary/20 outline-none transition-all appearance-none cursor-pointer"
            >
              <option value="Q3-2024">Q3 2024</option>
              <option value="Q2-2024">Q2 2024</option>
              <option value="Q1-2024">Q1 2024</option>
            </select>
            <button className="px-6 py-2.5 bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 rounded-lg font-title-md text-body-sm transition-all flex items-center gap-2">
              <span className="material-symbols-outlined text-[20px]">download</span>
              Export
            </button>
          </div>
        </div>
      </header>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-[#0F172A] border border-white/5 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-tertiary/20 border border-tertiary/30 flex items-center justify-center">
              <span className="material-symbols-outlined text-tertiary text-[20px]">groups</span>
            </div>
            <div>
              <div className="font-display-xl text-[28px] font-bold text-on-surface leading-none">{teamMembers.length}</div>
              <p className="font-body-sm text-[12px] text-on-surface-variant">Team Members</p>
            </div>
          </div>
        </div>

        <div className="bg-[#0F172A] border border-white/5 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center">
              <span className="material-symbols-outlined text-primary text-[20px]">flag</span>
            </div>
            <div>
              <div className="font-display-xl text-[28px] font-bold text-on-surface leading-none">{totalGoals}</div>
              <p className="font-body-sm text-[12px] text-on-surface-variant">Total Goals</p>
            </div>
          </div>
        </div>

        <div className="bg-[#0F172A] border border-white/5 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-secondary/20 border border-secondary/30 flex items-center justify-center">
              <span className="material-symbols-outlined text-secondary text-[20px]">check_circle</span>
            </div>
            <div>
              <div className="font-display-xl text-[28px] font-bold text-on-surface leading-none">{totalCompleted}</div>
              <p className="font-body-sm text-[12px] text-on-surface-variant">Completed</p>
            </div>
          </div>
        </div>

        <div className="bg-[#0F172A] border border-white/5 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-secondary/20 border border-secondary/30 flex items-center justify-center">
              <span className="material-symbols-outlined text-secondary text-[20px]">trending_up</span>
            </div>
            <div>
              <div className="font-display-xl text-[28px] font-bold text-on-surface leading-none">{avgProgress}%</div>
              <p className="font-body-sm text-[12px] text-on-surface-variant">Avg Progress</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Monthly Progress Trend */}
        <div className="bg-[#0F172A] border border-white/5 rounded-xl p-6">
          <h3 className="font-title-md text-title-md text-on-surface mb-6 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">show_chart</span>
            Monthly Progress Trend
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyProgress}>
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
              <Legend wrapperStyle={{ fontSize: '12px' }} />
              <Line 
                type="monotone" 
                dataKey="team" 
                stroke="#4cd7f6" 
                strokeWidth={3}
                dot={{ fill: '#4cd7f6', r: 5 }}
                name="Team Progress"
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

        {/* Goal Status Distribution */}
        <div className="bg-[#0F172A] border border-white/5 rounded-xl p-6">
          <h3 className="font-title-md text-title-md text-on-surface mb-6 flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary">donut_small</span>
            Goal Status Distribution
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={goalStatusData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
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
      </div>

      {/* Team Member Performance */}
      <div className="bg-[#0F172A] border border-white/5 rounded-xl p-6">
        <h3 className="font-title-md text-title-md text-on-surface mb-6 flex items-center gap-2">
          <span className="material-symbols-outlined text-tertiary">leaderboard</span>
          Team Member Performance
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-surface-container/50 border-b border-outline-variant/10">
              <tr>
                <th className="px-6 py-4 text-left font-body-sm text-[12px] font-semibold text-on-surface-variant uppercase tracking-wider">
                  Team Member
                </th>
                <th className="px-6 py-4 text-center font-body-sm text-[12px] font-semibold text-on-surface-variant uppercase tracking-wider">
                  Total Goals
                </th>
                <th className="px-6 py-4 text-center font-body-sm text-[12px] font-semibold text-on-surface-variant uppercase tracking-wider">
                  Completed
                </th>
                <th className="px-6 py-4 text-center font-body-sm text-[12px] font-semibold text-on-surface-variant uppercase tracking-wider">
                  Progress
                </th>
                <th className="px-6 py-4 text-right font-body-sm text-[12px] font-semibold text-on-surface-variant uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10">
              {teamMembers.map((member) => (
                <tr key={member.id} className="hover:bg-surface-variant/20 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-tertiary to-primary flex items-center justify-center text-[14px] font-bold text-surface-container-lowest">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="font-body-sm text-body-sm text-on-surface font-medium">{member.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="font-body-sm text-body-sm text-on-surface">{member.goals}</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="font-body-sm text-body-sm text-on-surface">{member.completed}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-3">
                      <div className="w-32 h-2 bg-surface-variant rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-secondary to-primary rounded-full"
                          style={{ width: `${member.progress}%` }}
                        />
                      </div>
                      <span className="font-body-sm text-body-sm text-on-surface font-medium w-12 text-right">{member.progress}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-label-caps uppercase tracking-wider border ${
                      member.status === "Excellent" ? "bg-secondary/20 text-secondary border-secondary/30" :
                      member.status === "On Track" ? "bg-primary/20 text-primary border-primary/30" :
                      "bg-error/20 text-error border-error/30"
                    }`}>
                      {member.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
