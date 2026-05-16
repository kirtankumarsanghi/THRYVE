import React from 'react';
import { useManager } from '../../context/ManagerContext';
import { CheckCircle, XCircle, AlertCircle, MessageSquare } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ApprovalCard({ approval }) {
  const { approveItem, returnForRework } = useManager();

  const handleApprove = () => {
    approveItem(approval.id);
    toast.success(`${approval.type === 'GOAL_CREATION' ? 'Goal' : 'Check-in'} Approved`);
  };

  const handleRework = () => {
    returnForRework(approval.id, 'Needs more clarity on target metrics.');
    toast.success('Returned for rework');
  };

  return (
    <div className="bg-card border border-border rounded-xl p-5 hover:border-primary/50 transition-colors group relative overflow-hidden">
      <div className="absolute top-0 left-0 w-1 h-full bg-yellow-500/50" />
      
      <div className="flex justify-between items-start mb-3">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 px-2 py-1 rounded-md">
            {approval.type === 'GOAL_CREATION' ? 'New Goal' : 'Check-in Update'}
          </span>
          <h4 className="text-white font-semibold mt-3 leading-tight">{approval.goalTitle}</h4>
        </div>
        <div className="flex gap-2">
          <button onClick={handleApprove} className="text-gray-400 hover:text-emerald-400 transition-colors bg-dark p-1.5 rounded border border-border hover:border-emerald-500/50" title="Approve">
            <CheckCircle className="w-4 h-4" />
          </button>
          <button onClick={handleRework} className="text-gray-400 hover:text-amber-400 transition-colors bg-dark p-1.5 rounded border border-border hover:border-amber-500/50" title="Return for Rework">
            <AlertCircle className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      <div className="text-sm text-gray-400 mb-4 flex items-center justify-between">
        <span className="text-gray-300 font-medium">{approval.employeeName}</span>
        <span>{new Date(approval.submittedAt).toLocaleDateString()}</span>
      </div>
      
      <div className="grid grid-cols-2 gap-3 text-xs border-t border-border/50 pt-4">
        <div>
          <span className="block text-gray-500 uppercase font-semibold mb-1">Thrust Area</span>
          <span className="text-white">{approval.thrustArea}</span>
        </div>
        <div>
          <span className="block text-gray-500 uppercase font-semibold mb-1">Weightage</span>
          <span className="text-white">{approval.weightage}%</span>
        </div>
      </div>
      
      {approval.updateData && (
        <div className="mt-4 p-3 bg-dark/50 border border-border/50 rounded-lg text-xs">
          <div className="flex justify-between mb-1">
            <span className="text-gray-400">Actual: <span className="text-white font-bold">{approval.updateData.actual}</span></span>
            <span className="text-gray-400">Target: <span className="text-white font-bold">{approval.updateData.target}</span></span>
          </div>
          {approval.comments?.[0] && (
            <div className="flex gap-2 items-start mt-2 pt-2 border-t border-border/30">
              <MessageSquare className="w-3 h-3 text-primary mt-0.5" />
              <p className="text-gray-400 italic line-clamp-2">"{approval.comments[0].text}"</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
