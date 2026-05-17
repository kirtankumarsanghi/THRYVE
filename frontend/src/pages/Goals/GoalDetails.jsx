import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Target, Calendar, MessageSquare, Send } from 'lucide-react';
import PageContainer from '../../components/common/PageContainer';
import GoalStatusBadge from '../../components/goals/GoalStatusBadge';
import GoalProgress from '../../components/goals/GoalProgress';
import { useGoals, calculateGoalProgress } from '../../context/GoalContext';
import { getGoalCheckins, submitCheckin } from '../../api/goalsApi';

export default function GoalDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { goals, refreshGoals } = useGoals();
  const [comment, setComment] = useState('');
  const [achieved, setAchieved] = useState('0');
  const [checkins, setCheckins] = useState([]);
  const goal = goals.find((g) => String(g.id) === String(id));

  useEffect(() => {
    const load = async () => {
      const data = await getGoalCheckins(id);
      setCheckins(data || []);
    };
    load();
  }, [id]);

  if (!goal) return <PageContainer><p className="text-white">Goal not found</p></PageContainer>;

  const progress = calculateGoalProgress(goal);

  const onSubmitCheckin = async (e) => {
    e.preventDefault();
    await submitCheckin(goal.id, {
      quarter: goal.quarter,
      planned_value: Number(goal.target_value || 0),
      achieved_value: Number(achieved || 0),
      comment,
      status: goal.status,
    });
    setComment('');
    setAchieved(String(goal.achieved_value || 0));
    const data = await getGoalCheckins(id);
    setCheckins(data || []);
    await refreshGoals();
  };

  return (
    <PageContainer>
      <button onClick={() => navigate('/employee/goals')} className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 text-sm font-semibold">
        <ArrowLeft className="w-4 h-4" /> Back to Goals
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
            <div className="flex items-center justify-between mb-4">
              <GoalStatusBadge status={goal.status} />
              <span className="text-sm text-gray-400">{goal.quarter}</span>
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">{goal.title}</h1>
            <p className="text-gray-400 mb-6">{goal.description}</p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div><p className="text-xs text-gray-500">Area</p><p className="text-white">{goal.strategic_area || '-'}</p></div>
              <div><p className="text-xs text-gray-500">Weightage</p><p className="text-white">{goal.weightage}%</p></div>
              <div><p className="text-xs text-gray-500">Target</p><p className="text-white">{goal.target_value}</p></div>
              <div className="flex items-center gap-2"><Calendar className="w-4 h-4 text-primary" /><span className="text-white">{goal.target_date || '-'}</span></div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
            <div className="flex items-center gap-2 text-white font-semibold mb-4"><Target className="w-5 h-5 text-primary" /> Progress</div>
            <p className="text-white mb-2">{progress}%</p>
            <GoalProgress progress={progress} size="lg" />
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-card border border-border rounded-2xl p-6">
            <h3 className="text-white font-semibold mb-3">Submit Check-in</h3>
            <form onSubmit={onSubmitCheckin} className="space-y-3">
              <input type="number" step="0.01" value={achieved} onChange={(e) => setAchieved(e.target.value)} className="w-full bg-dark border border-border rounded-lg px-3 py-2 text-white" placeholder="Achieved value" />
              <textarea value={comment} onChange={(e) => setComment(e.target.value)} className="w-full bg-dark border border-border rounded-lg px-3 py-2 text-white" rows="3" placeholder="Employee comment" />
              <button type="submit" className="w-full py-2.5 rounded-lg border border-primary bg-primary/10 hover:bg-primary/20 text-primary font-semibold flex items-center justify-center gap-2">
                <Send className="w-4 h-4" /> Submit
              </button>
            </form>
          </div>

          <div className="bg-card border border-border rounded-2xl p-6">
            <div className="flex items-center gap-2 text-white font-semibold mb-4"><MessageSquare className="w-5 h-5 text-primary" /> Check-in History</div>
            <div className="space-y-3 max-h-[380px] overflow-y-auto">
              {checkins.length === 0 ? <p className="text-sm text-gray-400">No check-ins yet.</p> : checkins.map((c) => (
                <div key={c.id} className="bg-dark border border-border/50 rounded-xl p-3">
                  <p className="text-xs text-gray-500">{c.quarter} | {c.status}</p>
                  <p className="text-sm text-white">Employee: {c.comment || '-'}</p>
                  <p className="text-sm text-cyan-300">Manager: {c.manager_comment || '-'}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
