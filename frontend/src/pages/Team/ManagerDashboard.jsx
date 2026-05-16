import React from 'react';
import PageContainer from "../../components/common/PageContainer";
import SectionHeader from "../../components/common/SectionHeader";
import DashboardCard from "../../components/dashboard/DashboardCard";
import StatCard from "../../components/dashboard/StatCard";
import ApprovalQueue from "../../components/approvals/ApprovalQueue";
import TeamPerformanceChart from "../../components/team/TeamPerformanceChart";
import EmployeeRanking from "../../components/team/EmployeeRanking";
import { Users, Target, Activity, AlertCircle } from 'lucide-react';
import { useManager } from '../../context/ManagerContext';

export default function ManagerDashboard() {
  const { team, pendingApprovals } = useManager();

  const totalEmployees = team.length;
  const avgScore = (team.reduce((acc, emp) => acc + emp.performanceScore, 0) / totalEmployees).toFixed(1);
  const totalAtRisk = team.reduce((acc, emp) => acc + emp.atRiskGoals, 0);

  return (
    <PageContainer>
      <SectionHeader
        title="Manager Intelligence"
        subtitle="Monitor team goals, approve updates, and identify performance bottlenecks."
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Team Members"
          value={totalEmployees}
          change="+1 this quarter"
          trend="up"
          icon={Users}
        />
        <StatCard
          title="Avg Performance"
          value={`${avgScore} / 5.0`}
          change="+0.2 from last Q"
          trend="up"
          icon={Activity}
        />
        <StatCard
          title="Goals at Risk"
          value={totalAtRisk}
          change="-2 from last month"
          trend="up"
          icon={AlertCircle}
          variant="warning"
        />
        <StatCard
          title="Pending Approvals"
          value={pendingApprovals.length}
          change="Action required"
          trend="neutral"
          icon={Target}
          variant="primary"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Approvals Queue */}
        <div className="lg:col-span-2 space-y-6">
          <DashboardCard title="Action Required" subtitle="Pending goal creations and updates">
            <ApprovalQueue />
          </DashboardCard>

          <DashboardCard title="Team Performance Trend" subtitle="Quarterly velocity and completion tracking">
            <TeamPerformanceChart />
          </DashboardCard>
        </div>

        {/* Employee Ranking */}
        <div className="lg:col-span-1">
          <DashboardCard title="Direct Reports" subtitle="Performance overview and goal health" className="h-full">
            <EmployeeRanking />
          </DashboardCard>
        </div>
      </div>
    </PageContainer>
  );
}
