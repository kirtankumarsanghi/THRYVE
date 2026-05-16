import React, { useState } from 'react';
import PageContainer from '../../components/common/PageContainer';
import SectionHeader from '../../components/common/SectionHeader';
import DashboardCard from '../../components/dashboard/DashboardCard';
import ExportModal from '../../components/reports/ExportModal';
import { useAdmin } from '../../context/AdminContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Download } from 'lucide-react';

export default function OrganizationAnalytics() {
  const { departments, kpis } = useAdmin();
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  // Prepare data for recharts
  const chartData = departments.map(d => ({
    name: d.name,
    completion: d.completionRate,
    activeGoals: d.activeGoals,
  }));

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-dark/90 border border-border p-3 rounded-lg shadow-xl backdrop-blur-sm">
          <p className="text-white font-medium mb-2">{label}</p>
          <p className="text-emerald-400 text-sm">Completion: {payload[0].value}%</p>
          <p className="text-primary text-sm mt-1">Active Goals: {payload[1].value}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <PageContainer>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <SectionHeader 
          title="Organization Analytics" 
          subtitle="Enterprise business intelligence and performance matrix."
        />
        <button 
          onClick={() => setIsExportModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-dark border border-primary text-primary hover:bg-primary hover:text-white rounded-lg transition-colors font-semibold text-sm"
        >
          <Download className="w-4 h-4" /> Export Report
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <DashboardCard title="Department Completion Matrix" className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2e303e" vertical={false} />
              <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `${val}%`} />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: '#2e303e', opacity: 0.4 }} />
              <Bar dataKey="completion" radius={[4, 4, 0, 0]}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.completion >= 85 ? '#34d399' : entry.completion >= 75 ? '#8b7fff' : '#fbbf24'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </DashboardCard>

        <DashboardCard title="Goal Distribution vs Completion" className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} layout="vertical" margin={{ top: 20, right: 30, left: 40, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2e303e" horizontal={false} />
              <XAxis type="number" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis dataKey="name" type="category" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: '#2e303e', opacity: 0.4 }} />
              <Bar dataKey="activeGoals" fill="#8b7fff" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </DashboardCard>
      </div>

      <ExportModal isOpen={isExportModalOpen} onClose={() => setIsExportModalOpen(false)} />
    </PageContainer>
  );
}
