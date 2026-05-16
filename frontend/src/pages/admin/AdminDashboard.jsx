import React from 'react';
import { useAdmin } from '../../context/AdminContext';
import PageContainer from '../../components/common/PageContainer';
import SectionHeader from '../../components/common/SectionHeader';
import DashboardCard from '../../components/dashboard/DashboardCard';
import AIInsightsPanel from '../../components/ai/AIInsightsPanel';
import { Users, Target, Activity, AlertTriangle, ShieldCheck } from 'lucide-react';

export default function AdminDashboard() {
  const { kpis, departments, auditLogs } = useAdmin();

  return (
    <PageContainer>
      <SectionHeader 
        title="Admin Dashboard" 
        subtitle="Organization overview and system governance."
      />

      {/* KPI Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <DashboardCard className="!p-4 flex items-center gap-4">
          <div className="p-3 bg-primary/20 rounded-xl">
            <Users className="w-6 h-6 text-primary" />
          </div>
          <div>
            <p className="text-gray-400 text-sm">Total Employees</p>
            <h3 className="text-2xl font-bold text-white">{kpis.totalEmployees}</h3>
          </div>
        </DashboardCard>
        
        <DashboardCard className="!p-4 flex items-center gap-4">
          <div className="p-3 bg-emerald-400/20 rounded-xl">
            <Target className="w-6 h-6 text-emerald-400" />
          </div>
          <div>
            <p className="text-gray-400 text-sm">Active Goals</p>
            <h3 className="text-2xl font-bold text-white">{kpis.activeGoals}</h3>
          </div>
        </DashboardCard>
        
        <DashboardCard className="!p-4 flex items-center gap-4">
          <div className="p-3 bg-amber-400/20 rounded-xl">
            <AlertTriangle className="w-6 h-6 text-amber-400" />
          </div>
          <div>
            <p className="text-gray-400 text-sm">Pending Actions</p>
            <h3 className="text-2xl font-bold text-white">{kpis.pendingApprovals}</h3>
          </div>
        </DashboardCard>
        
        <DashboardCard className="!p-4 flex items-center gap-4">
          <div className="p-3 bg-blue-400/20 rounded-xl">
            <ShieldCheck className="w-6 h-6 text-blue-400" />
          </div>
          <div>
            <p className="text-gray-400 text-sm">System Health</p>
            <h3 className="text-2xl font-bold text-white">{kpis.systemHealth}%</h3>
          </div>
        </DashboardCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Department Performance */}
        <DashboardCard title="Department Overview" className="lg:col-span-2">
          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="pb-3 text-sm font-semibold text-gray-400">Department</th>
                  <th className="pb-3 text-sm font-semibold text-gray-400">Head</th>
                  <th className="pb-3 text-sm font-semibold text-gray-400">Employees</th>
                  <th className="pb-3 text-sm font-semibold text-gray-400">Active Goals</th>
                  <th className="pb-3 text-sm font-semibold text-gray-400">Completion</th>
                </tr>
              </thead>
              <tbody>
                {departments.map((dep) => (
                  <tr key={dep.id} className="border-b border-border/50 hover:bg-dark/50 transition-colors">
                    <td className="py-4 text-sm text-white font-medium">{dep.name}</td>
                    <td className="py-4 text-sm text-gray-300">{dep.head}</td>
                    <td className="py-4 text-sm text-gray-300">{dep.employeeCount}</td>
                    <td className="py-4 text-sm text-gray-300">{dep.activeGoals}</td>
                    <td className="py-4 text-sm text-emerald-400">{dep.completionRate}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </DashboardCard>

        {/* Recent Audit Logs */}
        <DashboardCard title="Recent Governance Activity" className="lg:col-span-1">
          <div className="space-y-4">
            {auditLogs.slice(0, 4).map((log) => (
              <div key={log.id} className="flex flex-col gap-1 p-3 bg-dark/50 border border-border/50 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-semibold text-primary">{log.action}</span>
                  <span className="text-[10px] text-gray-500">{new Date(log.timestamp).toLocaleDateString()}</span>
                </div>
                <p className="text-sm text-white">{log.target}</p>
                <p className="text-xs text-gray-400">{log.details}</p>
              </div>
            ))}
          </div>
        </DashboardCard>
      </div>
      
      {/* AI Insights Section */}
      <div className="mt-6">
        <AIInsightsPanel />
      </div>
    </PageContainer>
  );
}
