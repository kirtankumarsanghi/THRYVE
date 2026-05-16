import React from 'react';
import { useManager } from '../../context/ManagerContext';
import { ArrowUpRight, Target, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function EmployeeRanking() {
  const { team } = useManager();
  const navigate = useNavigate();

  const sortedTeam = [...team].sort((a, b) => b.performanceScore - a.performanceScore);

  return (
    <div className="space-y-4">
      {sortedTeam.map((emp, idx) => (
        <div key={emp.id} className="flex items-center justify-between p-4 bg-dark/50 border border-border rounded-xl hover:border-primary/40 transition-colors">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-primary/20 border border-primary/30 flex-shrink-0">
              <img src={emp.avatar} alt={emp.name} className="w-full h-full object-cover" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm">{emp.name}</h4>
              <p className="text-xs text-gray-500">{emp.role}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="hidden sm:block text-right">
              <p className="text-xs text-gray-500 uppercase font-semibold">Active Goals</p>
              <div className="flex items-center justify-end gap-1 text-white text-sm font-semibold mt-0.5">
                <Target className="w-3.5 h-3.5 text-primary" />
                {emp.activeGoals}
              </div>
            </div>
            {emp.atRiskGoals > 0 && (
              <div className="hidden sm:block text-right">
                <p className="text-xs text-amber-500/80 uppercase font-semibold">At Risk</p>
                <div className="flex items-center justify-end gap-1 text-amber-400 text-sm font-semibold mt-0.5">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  {emp.atRiskGoals}
                </div>
              </div>
            )}
            <div className="text-right w-16">
              <p className="text-xs text-gray-500 uppercase font-semibold">Score</p>
              <div className="flex items-center justify-end gap-1 text-white text-sm font-bold mt-0.5">
                {emp.performanceScore.toFixed(1)}
              </div>
            </div>
            <button 
              onClick={() => navigate(`/manager/review/${emp.id}`)}
              className="p-2 bg-primary/10 text-primary rounded-lg hover:bg-primary hover:text-white transition-colors"
            >
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
