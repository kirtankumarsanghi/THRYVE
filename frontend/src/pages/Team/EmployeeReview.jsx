import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useManager } from '../../context/ManagerContext';
import { useGoals } from '../../context/GoalContext';
import PageContainer from '../../components/common/PageContainer';
import DashboardCard from '../../components/dashboard/DashboardCard';
import CommentThread from '../../components/comments/CommentThread';
import GoalCard from '../../components/goals/GoalCard';
import { ArrowLeft, User, Target, Activity, Lock } from 'lucide-react';
import toast from 'react-hot-toast';

export default function EmployeeReview() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { team } = useManager();
  const { goals, updateGoal } = useGoals();
  const [activeTab, setActiveTab] = useState('active');

  const employee = team.find(emp => emp.id === id);
  
  if (!employee) {
    return (
      <PageContainer>
        <div className="flex flex-col items-center justify-center p-10 bg-card border border-border rounded-xl">
          <p className="text-white text-lg">Employee not found.</p>
          <button onClick={() => navigate('/manager')} className="mt-4 text-primary">Return to Dashboard</button>
        </div>
      </PageContainer>
    );
  }

  // Find goals assigned to this employee (mock logic: matching by manager or we assume some goals belong to them)
  // For realism, let's just use the global goals and filter by a matching name or just show all for demo
  const employeeGoals = goals.filter(g => g.manager === employee.name || g.manager === 'Alex Chen'); // Fallback logic for mock

  const handleLockGoal = (goalId) => {
    const goal = employeeGoals.find(g => g.id === goalId);
    if (goal) {
      updateGoal({ ...goal, locked: !goal.locked });
      toast.success(`Goal ${goal.locked ? 'unlocked' : 'locked'} successfully`);
    }
  };

  return (
    <PageContainer>
      <button 
        onClick={() => navigate('/manager')}
        className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors text-sm font-semibold"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Dashboard
      </button>

      {/* Profile Header */}
      <div className="bg-card border border-border rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 mb-8">
        <img src={employee.avatar} alt={employee.name} className="w-24 h-24 rounded-full border-2 border-primary shadow-[0_0_15px_rgba(139,127,255,0.4)]" />
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-3xl font-bold text-white mb-1">{employee.name}</h1>
          <p className="text-gray-400 mb-4">{employee.role} • {employee.department}</p>
          
          <div className="flex flex-wrap justify-center md:justify-start gap-4">
            <div className="flex items-center gap-2 bg-dark px-4 py-2 rounded-lg border border-border">
              <Target className="w-4 h-4 text-primary" />
              <span className="text-white font-semibold text-sm">{employee.activeGoals} Active</span>
            </div>
            <div className="flex items-center gap-2 bg-dark px-4 py-2 rounded-lg border border-border">
              <Activity className="w-4 h-4 text-emerald-400" />
              <span className="text-white font-semibold text-sm">{employee.performanceScore} Score</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Goals Area */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center gap-4 border-b border-border mb-6">
            <button 
              onClick={() => setActiveTab('active')}
              className={`pb-3 text-sm font-semibold transition-colors ${activeTab === 'active' ? 'text-primary border-b-2 border-primary' : 'text-gray-400 hover:text-white'}`}
            >
              Active Goals
            </button>
            <button 
              onClick={() => setActiveTab('history')}
              className={`pb-3 text-sm font-semibold transition-colors ${activeTab === 'history' ? 'text-primary border-b-2 border-primary' : 'text-gray-400 hover:text-white'}`}
            >
              Quarterly Reviews
            </button>
          </div>

          {activeTab === 'active' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {employeeGoals.map(goal => (
                <div key={goal.id} className="relative">
                  <GoalCard goal={goal} />
                  <button 
                    onClick={() => handleLockGoal(goal.id)}
                    className="absolute top-4 right-4 p-1.5 bg-dark border border-border rounded-md text-gray-400 hover:text-white transition-colors"
                    title="Lock/Unlock Goal"
                  >
                    <Lock className={`w-4 h-4 ${goal.locked ? 'text-amber-400' : ''}`} />
                  </button>
                </div>
              ))}
              {employeeGoals.length === 0 && (
                <div className="col-span-full p-10 text-center text-gray-500 bg-card border border-border rounded-xl">
                  No goals found for this employee.
                </div>
              )}
            </div>
          ) : (
            <DashboardCard title="Review History">
              <p className="text-gray-400 text-sm">No past reviews available yet.</p>
            </DashboardCard>
          )}
        </div>

        {/* Manager Feedback */}
        <div className="lg:col-span-1">
          <DashboardCard title="Manager Feedback" className="h-[600px] flex flex-col">
            <CommentThread 
              comments={[
                { id: 1, author: 'Current Manager', text: 'Great progress on Q1 objectives.', timestamp: new Date().toISOString() }
              ]} 
              onAddComment={(text) => toast.success('Feedback saved')}
            />
          </DashboardCard>
        </div>

      </div>
    </PageContainer>
  );
}
