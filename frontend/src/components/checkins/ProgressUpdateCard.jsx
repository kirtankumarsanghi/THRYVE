import React from 'react';
import { MessageCircle } from 'lucide-react';

const statusColors = {
  "Not Started": "text-gray-300",
  "On Track": "text-emerald-400 border-emerald-400/20 bg-emerald-400/10",
  "Delayed": "text-amber-400 border-amber-400/20 bg-amber-400/10",
  "Completed": "text-emerald-400 border-emerald-400/20 bg-emerald-400/10",
};

export default function ProgressUpdateCard({ update, goalTitle, thrustArea }) {
  const statusColorClass = statusColors[update.status] || "text-gray-400 border-gray-400/20 bg-gray-400/10";
  
  return (
    <div className="p-5 rounded-2xl border border-border/60 bg-dark/50 hover:bg-dark/80 transition-colors">
      <div className="flex items-center justify-between gap-4 mb-4">
        <div>
          <h4 className="text-base font-bold text-white">{goalTitle || update.goalId}</h4>
          <p className="text-xs text-gray-500 mt-1 uppercase tracking-wider font-semibold">{thrustArea}</p>
        </div>
        <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${statusColorClass}`}>
          {update.status}
        </span>
      </div>
      
      <div className="grid grid-cols-2 gap-4 text-sm mt-5 pb-5 border-b border-border/50">
        <div>
          <p className="text-xs text-gray-500 font-semibold mb-1 uppercase">Planned Progress</p>
          <p className="text-white font-bold text-lg">{update.planned}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 font-semibold mb-1 uppercase">Actual Achieved</p>
          <p className="text-white font-bold text-lg">{update.actual}</p>
        </div>
      </div>
      
      <div className="mt-4 flex items-start gap-3">
        <MessageCircle size={18} className={`mt-0.5 ${statusColors[update.status]?.split(' ')[0] || 'text-gray-400'}`} />
        <p className="text-sm text-gray-300 leading-relaxed italic">"{update.comment}"</p>
      </div>
    </div>
  );
}
