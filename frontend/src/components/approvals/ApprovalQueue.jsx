import React from 'react';
import ApprovalCard from './ApprovalCard';
import { useManager } from '../../context/ManagerContext';
import { ClipboardCheck } from 'lucide-react';

export default function ApprovalQueue() {
  const { pendingApprovals } = useManager();

  if (pendingApprovals.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-10 bg-card border border-border rounded-2xl">
        <ClipboardCheck className="w-12 h-12 text-gray-600 mb-4" />
        <p className="text-white font-semibold">You're all caught up!</p>
        <p className="text-gray-400 text-sm mt-1">No pending approvals at the moment.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {pendingApprovals.map(approval => (
        <ApprovalCard key={approval.id} approval={approval} />
      ))}
    </div>
  );
}
