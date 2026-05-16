import { useState } from "react";
import BackButton from "../../components/common/BackButton";
import Breadcrumb from "../../components/common/Breadcrumb";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

export default function OrganizationAnalytics() {
  const [selectedPeriod, setSelectedPeriod] = useState("Q3-2024");

  const quarterlyData = [
    { quarter: "Q1", goals: 120, completed: 95, completion: 79 },
    { quarter: "Q2", goals: 135, completed: 118, completion: 87 },
    { quarter: "Q3", goals: 156, completed: 132, completion: 85 },
    { quarter: "Q4", goals: 0, completed: 0, completion: 0 },
  ];

  const departmentData = [
    { name: "Engineering", goals: 45, completed: 38, avgProgress: 92 },
    { name: "Product", goals: 28, completed: 25, avgProgress: 95 },
    { name: "Marketing", goals: 32, completed: 27, avgProgress: 88 },
    { name: "Sales", goals: 25, completed: 21, avgProgress: 90 },
    { name: "HR", goals: 15, completed: 13, avgProgress: 94 },
    { name: "Finance", goals: 11, completed: 8, avgProgress: 96 },
  ];

  const topPerformers = [
    { name: "Sarah Williams", department: "Sales", goalsCompleted: 12, avgScore: 96 },
    { name: "John Doe", department: "Engineering", goalsCompleted: 11, avgScore: 94 },
    { name: "Emma Wilson", department: "Product", goalsCompleted: 10, avgScore: 93 },
    { name: "Mike Johnson", department: "Marketing", goalsCompleted: 10, avgScore: 91 },
    { name: "Lisa Anderson", department: "HR", goalsCompleted: 9, avgScore: 95 },
  ];

  return (
    <main className="pt-8 px-margin-mobile md:px-margin-desktop pb-24 max-w-container-max mx-auto min-h-screen">
      <Breadcrumb />
      <BackButton to="/admin/dashboard" label="Back to Dashboard" />

      <header className="mb-10 mt-6">
        <div className="flex items-center gap-2 text-on-surface-variant mb-2">
          <span className="material-symbols-outlined text-error text-[20px]">analytics</span>
          <span className="font-label-caps text-label-caps tracking-widest uppercase text-error">
            Performance Insights
          </span>
        </div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface">
              Organization Analytics
            </h2>
            <p className="font-body-base text-body-base text-on-surface-variant mt-2">
              Comprehensive performance metrics and insights
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
              Export Report
            </button>
          </div>
        </div>
      </header>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-[#0F172A] border border-white/5 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-error/20 border border-error/30 flex items-center justify-center">
              <span className="material-symbols-outlined text-error text-[20px]">flag</span>
            </div>
            <div>
              <div className="font-display-xl text-[28px] font-bold text-on-surface leading-none">342</div>
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
              <div className="font-display-xl text-[28px] font-bold text-on-surface leading-none">289</div>
              <p className="font-body-sm text-[12px] text-on-surface-variant">Completed</p>
            </div>
          </div>
        </div>

        <div className="bg-[#0F172A] border border-white/5 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center">
              <span className="material-symbols-outlined text-primary text-[20px]">percent</span>
            </div>
            <div>
              <div className="font-display-xl text-[28px] font-bold text-on-surface leading-none">85%</div>
              <p className="font-body-sm text-[12px] text-on-surface-variant">Completion Rate</p>
            </div>
          </div>
        </div>

        <div className="bg-[#0F172A] border border-white/5 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-tertiary/20 border border-tertiary/30 flex items-center justify-center">
              <span className="material-symbols-outlined text-tertiary text-[20px]">trending_up</span>
            </div>
            <div>
              <div className="font-display-xl text-[28px] font-bold text-on-surface leading-none">92%</div>
              <p className="font-body-sm text-[12px] text-on-surface-variant">Avg Progress</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Quarterly Trend */}
        <div className="bg-[#0F172A] border border-white/5 rounded-xl p-6">
          <h3 className="font-title-md text-title-md text-on-surface mb-6 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">show_chart</span>
            Quarterly Performance Trend
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={quarterlyData.filter(d => d.goals > 0)}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis 
                dataKey="quarter" 
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
                dataKey="goals" 
                stroke="#c0c1ff" 
                strokeWidth={3}
                dot={{ fill: '#c0c1ff', r: 5 }}
                name="Total Goals"
              />
              <Line 
                type="monotone" 
                dataKey="completed" 
                stroke="#4cd7f6" 
                strokeWidth={3}
                dot={{ fill: '#4cd7f6', r: 5 }}
                name="Completed"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Department Performance */}
        <div className="bg-[#0F172A] border border-white/5 rounded-xl p-6">
          <h3 className="font-title-md text-title-md text-on-surface mb-6 flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary">bar_chart</span>
            Department Performance
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={departmentData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis 
                dataKey="name" 
                stroke="#94a3b8"
                style={{ fontSize: '11px' }}
                angle={-45}
                textAnchor="end"
                height={80}
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
              <Bar dataKey="goals" fill="#c0c1ff" name="Total Goals" radius={[4, 4, 0, 0]} />
              <Bar dataKey="completed" fill="#4cd7f6" name="Completed" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Department Details Table */}
      <div className="bg-[#0F172A] border border-white/5 rounded-xl p-6 mb-8">
        <h3 className="font-title-md text-title-md text-on-surface mb-6 flex items-center gap-2">
          <span className="material-symbols-outlined text-tertiary">corporate_fare</span>
          Department Breakdown
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-surface-container/50 border-b border-outline-variant/10">
              <tr>
                <th className="px-6 py-4 text-left font-body-sm text-[12px] font-semibold text-on-surface-variant uppercase tracking-wider">
                  Department
                </th>
                <th className="px-6 py-4 text-center font-body-sm text-[12px] font-semibold text-on-surface-variant uppercase tracking-wider">
                  Total Goals
                </th>
                <th className="px-6 py-4 text-center font-body-sm text-[12px] font-semibold text-on-surface-variant uppercase tracking-wider">
                  Completed
                </th>
                <th className="px-6 py-4 text-center font-body-sm text-[12px] font-semibold text-on-surface-variant uppercase tracking-wider">
                  Avg Progress
                </th>
                <th className="px-6 py-4 text-right font-body-sm text-[12px] font-semibold text-on-surface-variant uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10">
              {departmentData.map((dept, index) => (
                <tr key={index} className="hover:bg-surface-variant/20 transition-colors">
                  <td className="px-6 py-4">
                    <span className="font-body-sm text-body-sm text-on-surface font-medium">{dept.name}</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="font-body-sm text-body-sm text-on-surface">{dept.goals}</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="font-body-sm text-body-sm text-on-surface">{dept.completed}</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-24 h-2 bg-surface-variant rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-secondary to-primary rounded-full"
                          style={{ width: `${dept.avgProgress}%` }}
                        />
                      </div>
                      <span className="font-body-sm text-body-sm text-on-surface font-medium">{dept.avgProgress}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-label-caps uppercase tracking-wider border ${
                      dept.avgProgress >= 90 ? "bg-secondary/20 text-secondary border-secondary/30" :
                      dept.avgProgress >= 75 ? "bg-primary/20 text-primary border-primary/30" :
                      "bg-error/20 text-error border-error/30"
                    }`}>
                      {dept.avgProgress >= 90 ? "Excellent" : dept.avgProgress >= 75 ? "Good" : "Needs Attention"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Top Performers */}
      <div className="bg-[#0F172A] border border-white/5 rounded-xl p-6">
        <h3 className="font-title-md text-title-md text-on-surface mb-6 flex items-center gap-2">
          <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>emoji_events</span>
          Top Performers
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {topPerformers.map((performer, index) => (
            <div key={index} className="p-5 rounded-xl bg-surface-container/50 border border-outline-variant/10 hover:border-secondary/30 transition-all">
              <div className="flex items-start gap-4">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-secondary to-primary flex items-center justify-center text-[16px] font-bold text-surface-container-lowest">
                    {performer.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  {index < 3 && (
                    <div className={`absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                      index === 0 ? "bg-[#FFD700] text-[#000]" :
                      index === 1 ? "bg-[#C0C0C0] text-[#000]" :
                      "bg-[#CD7F32] text-[#000]"
                    }`}>
                      {index + 1}
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <h4 className="font-body-sm text-body-sm text-on-surface font-medium mb-1">{performer.name}</h4>
                  <p className="font-body-sm text-[12px] text-on-surface-variant mb-3">{performer.department}</p>
                  <div className="flex items-center justify-between text-[12px]">
                    <span className="text-on-surface-variant">{performer.goalsCompleted} goals</span>
                    <span className="font-medium text-secondary">{performer.avgScore}% avg</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
