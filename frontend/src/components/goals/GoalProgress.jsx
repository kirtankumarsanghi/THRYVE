import React from 'react';

const GoalProgress = ({ progress, size = 'md' }) => {
  const heightClass = size === 'sm' ? 'h-1.5' : size === 'lg' ? 'h-3' : 'h-2';
  
  const getColor = () => {
    if (progress >= 100) return 'bg-emerald-400';
    if (progress < 30) return 'bg-red-400';
    return 'bg-gradient-to-r from-primary to-cyan-400';
  };

  return (
    <div className={`w-full bg-dark rounded-full overflow-hidden ${heightClass}`}>
      <div 
        className={`h-full rounded-full transition-all duration-500 ${getColor()}`} 
        style={{ width: `${Math.max(0, Math.min(100, progress))}%` }}
      />
    </div>
  );
};

export default GoalProgress;
