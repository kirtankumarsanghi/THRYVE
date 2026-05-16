import React from 'react';

export default function AchievementHistory({ goals }) {
  // Sort goals by completion or due date conceptually
  const historyGoals = goals.slice(0, 5);
  
  return (
    <div className="space-y-6 relative before:absolute before:inset-0 before:ml-[11px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
      {historyGoals.map((goal, index) => (
        <div key={goal.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
          {/* Timeline Node */}
          <div className="flex items-center justify-center w-6 h-6 rounded-full border-4 border-card bg-primary absolute left-0 md:left-1/2 -translate-x-1/2 shadow-[0_0_10px_rgba(139,127,255,0.6)]"></div>
          
          <div className="w-[calc(100%-2.5rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-border/60 bg-dark/50 hover:border-primary/50 transition-colors ml-10 md:ml-0">
            <div className="flex items-center justify-between mb-1">
              <h4 className="text-sm font-bold text-white">{goal.title}</h4>
            </div>
            <p className="text-xs text-gray-400 mb-2">{goal.description}</p>
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">Last Update:</span>
              <span className="text-xs text-primary font-semibold">{goal.dueDate}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
