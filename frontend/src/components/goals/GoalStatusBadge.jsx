import React from 'react';

const GoalStatusBadge = ({ status }) => {
  const getStatusStyles = () => {
    switch (status) {
      case 'On Track':
      case 'Completed':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'At Risk':
        return 'bg-red-500/10 text-red-400 border-red-500/20';
      case 'Submitted':
      case 'Approved':
        return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20';
      case 'Returned':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      case 'Draft':
      default:
        return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
    }
  };

  return (
    <span className={`px-2.5 py-1 text-xs font-semibold rounded uppercase tracking-wider border ${getStatusStyles()}`}>
      {status}
    </span>
  );
};

export default GoalStatusBadge;
