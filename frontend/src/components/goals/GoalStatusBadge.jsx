import React from 'react';

const GoalStatusBadge = ({ status }) => {
  const getStatusStyles = () => {
    switch (status) {
      case 'On Track':
      case 'Completed':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'Not Started':
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
