import React from 'react';
import PageContainer from '../../components/common/PageContainer';
import SectionHeader from '../../components/common/SectionHeader';
import DashboardCard from '../../components/dashboard/DashboardCard';
import { useAdmin } from '../../context/AdminContext';
import { Calendar, CheckCircle, Clock, AlertCircle } from 'lucide-react';

export default function CycleManagement() {
  const { cycles, updateCycleStatus } = useAdmin();

  return (
    <PageContainer>
      <SectionHeader 
        title="Review Cycle Management" 
        subtitle="Configure organizational review periods and submission deadlines."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <DashboardCard className="!p-4 border-l-4 border-l-emerald-400 flex flex-col justify-center">
          <p className="text-gray-400 text-sm mb-1">Active Cycle</p>
          <h3 className="text-lg font-bold text-white truncate">Q2 2026 Review</h3>
        </DashboardCard>
        <DashboardCard className="!p-4 border-l-4 border-l-primary flex flex-col justify-center">
          <p className="text-gray-400 text-sm mb-1">Upcoming Cycle</p>
          <h3 className="text-lg font-bold text-white truncate">Q3 2026 Planning</h3>
        </DashboardCard>
        <DashboardCard className="!p-4 flex flex-col justify-center">
          <p className="text-gray-400 text-sm mb-1">Submission Rate</p>
          <h3 className="text-2xl font-bold text-emerald-400">84%</h3>
        </DashboardCard>
        <DashboardCard className="!p-4 flex flex-col justify-center">
          <p className="text-gray-400 text-sm mb-1">Days Remaining</p>
          <h3 className="text-2xl font-bold text-amber-400">14</h3>
        </DashboardCard>
      </div>

      <DashboardCard title="All Cycles" className="mb-6">
        <div className="space-y-4">
          {cycles.map((cycle) => (
            <div key={cycle.id} className={`p-5 rounded-xl border ${cycle.status === 'active' ? 'bg-primary/5 border-primary/30 shadow-[0_0_15px_rgba(139,127,255,0.1)]' : 'bg-dark/30 border-border/50'}`}>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-full ${
                    cycle.status === 'active' ? 'bg-emerald-400/20 text-emerald-400' :
                    cycle.status === 'upcoming' ? 'bg-primary/20 text-primary' : 'bg-gray-500/20 text-gray-400'
                  }`}>
                    {cycle.status === 'active' ? <Clock className="w-6 h-6" /> : 
                     cycle.status === 'upcoming' ? <Calendar className="w-6 h-6" /> : <CheckCircle className="w-6 h-6" />}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      {cycle.name}
                      <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider ${
                        cycle.status === 'active' ? 'bg-emerald-400 text-dark' :
                        cycle.status === 'upcoming' ? 'bg-primary text-white' : 'bg-gray-600 text-white'
                      }`}>
                        {cycle.status}
                      </span>
                    </h3>
                    <p className="text-sm text-gray-400 mt-1">Window: {cycle.startDate} to {cycle.endDate}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {cycle.status === 'upcoming' && (
                    <button 
                      onClick={() => updateCycleStatus(cycle.id, 'active')}
                      className="px-4 py-2 bg-emerald-400 text-dark font-semibold rounded-lg hover:bg-emerald-500 transition-colors text-sm"
                    >
                      Open Cycle
                    </button>
                  )}
                  {cycle.status === 'active' && (
                    <>
                      <button className="px-4 py-2 bg-dark border border-border text-white font-semibold rounded-lg hover:bg-dark/80 transition-colors text-sm">
                        Extend Deadline
                      </button>
                      <button 
                        onClick={() => updateCycleStatus(cycle.id, 'closed')}
                        className="px-4 py-2 bg-amber-400 text-dark font-semibold rounded-lg hover:bg-amber-500 transition-colors text-sm flex items-center gap-2"
                      >
                        <AlertCircle className="w-4 h-4" /> Close Cycle
                      </button>
                    </>
                  )}
                  {cycle.status === 'closed' && (
                    <button 
                      onClick={() => updateCycleStatus(cycle.id, 'active')}
                      className="px-4 py-2 bg-dark border border-border text-primary font-semibold rounded-lg hover:bg-primary/10 transition-colors text-sm"
                    >
                      Reopen
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </DashboardCard>
    </PageContainer>
  );
}
