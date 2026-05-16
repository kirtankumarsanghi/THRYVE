import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Target, Calendar, User, AlignLeft, MessageSquare, Send } from 'lucide-react';
import toast from 'react-hot-toast';
import PageContainer from '../../components/common/PageContainer';
import GoalStatusBadge from '../../components/goals/GoalStatusBadge';
import GoalProgress from '../../components/goals/GoalProgress';
import { useGoals } from '../../context/GoalContext';

export default function GoalDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { goals, updateGoal } = useGoals();
  const [newComment, setNewComment] = useState('');

  const goal = goals.find(g => g.id === id);

  if (!goal) {
    return (
      <PageContainer>
        <div className="flex flex-col items-center justify-center py-20 px-4">
          <Target className="w-12 h-12 text-gray-600 mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">Goal Not Found</h3>
          <p className="text-gray-400 mb-6">The strategic goal you are looking for does not exist.</p>
          <button onClick={() => navigate('/goals')} className="bg-primary px-6 py-2.5 rounded-lg text-white font-semibold">
            Return to Goals
          </button>
        </div>
      </PageContainer>
    );
  }

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const commentObj = {
      id: Date.now(),
      author: 'Current User', // This would come from Auth Context later
      text: newComment,
      date: new Date().toISOString().split('T')[0]
    };

    updateGoal({
      ...goal,
      comments: [...(goal.comments || []), commentObj]
    });
    
    setNewComment('');
    toast.success('Comment added successfully');
  };

  return (
    <PageContainer>
      <button 
        onClick={() => navigate('/goals')}
        className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors text-sm font-semibold"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Goals
      </button>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Details Panel */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
            <div className="flex items-center justify-between mb-6">
              <GoalStatusBadge status={goal.status} />
              <span className="text-sm font-semibold text-gray-400">{goal.quarter}</span>
            </div>
            
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight">
              {goal.title}
            </h1>
            
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              {goal.description}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-border">
              <div>
                <p className="text-xs text-gray-500 font-semibold mb-1 uppercase tracking-wider">Thrust Area</p>
                <p className="text-white font-semibold">{goal.thrustArea}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 font-semibold mb-1 uppercase tracking-wider">Weightage</p>
                <p className="text-white font-semibold">{goal.weightage}%</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 font-semibold mb-1 uppercase tracking-wider">Manager</p>
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-primary" />
                  <span className="text-white font-semibold">{goal.manager}</span>
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-500 font-semibold mb-1 uppercase tracking-wider">Due Date</p>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-primary" />
                  <span className="text-white font-semibold">{goal.dueDate}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Progress Tracker Card */}
          <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
            <div className="flex items-center gap-2 text-white font-semibold mb-6 text-lg">
              <Target className="w-5 h-5 text-primary" /> Progress Tracking
            </div>
            
            <div className="flex items-end justify-between mb-3">
              <div>
                <p className="text-3xl font-bold text-white">{goal.actual} <span className="text-lg text-gray-400 font-medium">{goal.uom}</span></p>
                <p className="text-sm text-gray-500 mt-1">Current Progress</p>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold text-white">{goal.target} <span className="text-sm text-gray-400 font-medium">{goal.uom}</span></p>
                <p className="text-sm text-gray-500 mt-1">Target</p>
              </div>
            </div>
            
            <div className="mb-2 flex justify-between text-xs font-semibold">
              <span className="text-primary">{goal.progress}% Completed</span>
            </div>
            <GoalProgress progress={goal.progress} size="lg" />
          </div>
        </div>

        {/* Sidebar Panel */}
        <div className="space-y-6">
          
          {/* Action Panel */}
          <div className="bg-card border border-border rounded-2xl p-6">
            <h3 className="text-white font-semibold mb-4">Quick Actions</h3>
            <button 
              onClick={() => navigate(`/goals/edit/${goal.id}`)}
              className="w-full py-2.5 rounded-lg border border-border bg-dark hover:bg-dark/70 text-white font-semibold mb-3 transition-colors"
            >
              Edit Goal
            </button>
            <button className="w-full py-2.5 rounded-lg border border-primary bg-primary/10 hover:bg-primary/20 text-primary font-semibold transition-colors">
              Update Progress
            </button>
          </div>

          {/* Comments / Activity */}
          <div className="bg-card border border-border rounded-2xl p-6 flex flex-col h-[500px]">
            <div className="flex items-center gap-2 text-white font-semibold mb-6">
              <MessageSquare className="w-5 h-5 text-primary" /> Activity & Comments
            </div>
            
            <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2 custom-scrollbar">
              {goal.comments && goal.comments.length > 0 ? (
                goal.comments.map(comment => (
                  <div key={comment.id} className="bg-dark border border-border/50 rounded-xl p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-semibold text-white">{comment.author}</span>
                      <span className="text-xs text-gray-500">{comment.date}</span>
                    </div>
                    <p className="text-sm text-gray-300 leading-relaxed">{comment.text}</p>
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-500 text-sm py-10">
                  No activity recorded yet.
                </div>
              )}
            </div>
            
            <form onSubmit={handleAddComment} className="relative mt-auto">
              <input 
                type="text" 
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add an update..."
                className="w-full bg-dark border border-border rounded-lg pl-4 pr-12 py-3 text-sm text-white focus:outline-none focus:border-primary"
              />
              <button 
                type="submit"
                disabled={!newComment.trim()}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-primary rounded-md text-white disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

        </div>
      </div>
    </PageContainer>
  );
}
