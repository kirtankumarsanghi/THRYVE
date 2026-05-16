import React, { useState } from 'react';
import PageContainer from '../../components/common/PageContainer';
import SectionHeader from '../../components/common/SectionHeader';
import DashboardCard from '../../components/dashboard/DashboardCard';
import { useAdmin } from '../../context/AdminContext';
import { useGoals } from '../../context/GoalContext';
import { Lock, Unlock, AlertTriangle, RefreshCw } from 'lucide-react';
import toast from 'react-hot-toast';

export default function GovernanceCenter() {
  const { unlockGoal, cycles, updateCycleStatus } = useAdmin();
  const { goals, updateGoal } = useGoals();
  const [unlockReason, setUnlockReason] = useState('');
  const [selectedGoal, setSelectedGoal] = useState('');

  const handleUnlock = () => {
    if (!selectedGoal || !unlockReason) {
      toast.error('Goal ID and reason are required to unlock a goal.');
      return;
    }
    const targetGoal = goals.find(g => g.id === selectedGoal);
    if (!targetGoal) {
      toast.error('Goal not found in active goals list.');
      return;
    }
    
    unlockGoal(selectedGoal, unlockReason);
    updateGoal({ ...targetGoal, locked: false });
    setSelectedGoal('');
    setUnlockReason('');
  };

  return (
    <PageContainer>
      <SectionHeader 
        title="Governance Center" 
        subtitle="Manage goal locks, escalation alerts, and review cycles."
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Goal Unlock System */}
        <DashboardCard title="Goal Unlock Controls" subtitle="Override manager locks">
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Goal ID</label>
              <select 
                value={selectedGoal}
                onChange={(e) => setSelectedGoal(e.target.value)}
                className="w-full bg-dark border border-border rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary"
              >
                <option value="">Select a locked goal...</option>
                {goals.filter(g => g.locked).map(g => (
                  <option key={g.id} value={g.id}>{g.title} ({g.id})</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Unlock Reason (Required for Audit)</label>
              <textarea 
                value={unlockReason}
                onChange={(e) => setUnlockReason(e.target.value)}
                placeholder="Reason for overriding the lock..."
                className="w-full bg-dark border border-border rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary min-h-[80px]"
              />
            </div>
            <button 
              onClick={handleUnlock}
              disabled={!selectedGoal || !unlockReason}
              className="w-full flex items-center justify-center gap-2 bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 hover:border-primary/40 disabled:opacity-50 transition-all rounded-lg py-2 font-semibold"
            >
              <Unlock className="w-4 h-4" /> Force Unlock Goal
            </button>
          </div>
        </DashboardCard>

        {/* Review Cycle Monitoring */}
        <DashboardCard title="Active Review Cycles" subtitle="Manage cycle statuses">
          <div className="space-y-4">
            {cycles.map(cycle => (
              <div key={cycle.id} className="flex flex-col sm:flex-row items-center justify-between p-4 bg-dark/50 border border-border rounded-xl">
                <div>
                  <h4 className="text-white font-medium">{cycle.name}</h4>
                  <p className="text-xs text-gray-400">{cycle.startDate} to {cycle.endDate}</p>
                </div>
                <div className="flex items-center gap-3 mt-3 sm:mt-0">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-md ${
                    cycle.status === 'active' ? 'bg-emerald-400/10 text-emerald-400 border border-emerald-400/20' :
                    cycle.status === 'upcoming' ? 'bg-blue-400/10 text-blue-400 border border-blue-400/20' :
                    'bg-gray-500/10 text-gray-400 border border-gray-500/20'
                  }`}>
                    {cycle.status.toUpperCase()}
                  </span>
                  {cycle.status === 'active' && (
                    <button 
                      onClick={() => updateCycleStatus(cycle.id, 'closed')}
                      className="p-1.5 bg-dark border border-border rounded-md text-amber-400 hover:bg-amber-400/10 transition-colors"
                      title="Close Cycle"
                    >
                      <Lock className="w-4 h-4" />
                    </button>
                  )}
                  {cycle.status === 'closed' && (
                    <button 
                      onClick={() => updateCycleStatus(cycle.id, 'active')}
                      className="p-1.5 bg-dark border border-border rounded-md text-emerald-400 hover:bg-emerald-400/10 transition-colors"
                      title="Reopen Cycle"
                    >
                      <RefreshCw className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </DashboardCard>
      </div>

      {/* Escalation Tracking */}
      <DashboardCard title="Escalation Alerts" subtitle="Action required on these items">
        <div className="p-8 text-center text-gray-500 border border-border rounded-xl bg-dark/30 flex flex-col items-center">
          <AlertTriangle className="w-8 h-8 text-amber-400/50 mb-3" />
          <p>No active escalations.</p>
        </div>
      </DashboardCard>
    </PageContainer>
  );
}
