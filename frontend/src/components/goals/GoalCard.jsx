import React from 'react';
import { Target, Calendar, MoreHorizontal, ArrowRight, Trash, Edit } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import GoalStatusBadge from './GoalStatusBadge';
import GoalProgress from './GoalProgress';
import { useGoals } from '../../context/GoalContext';
import { calculateGoalProgress } from '../../context/GoalContext';

const GoalCard = ({ goal }) => {
  const navigate = useNavigate();
  const { deleteGoal } = useGoals();
  const progress = calculateGoalProgress(goal);

  const handleDelete = (e) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this goal?")) {
      deleteGoal(goal.id);
    }
  };

  return (
    <div 
      onClick={() => navigate(`/employee/goals/${goal.id}`)}
      className="group surface-card rounded-2xl p-5 border border-white/10 hover:border-blue-300/35 transition-all duration-300 cursor-pointer flex flex-col justify-between hover:shadow-[0_14px_34px_rgba(11,24,52,0.45)] relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/0 to-transparent group-hover:via-primary/50 transition-all duration-500" />
      
      <div>
        <div className="flex items-start justify-between mb-4">
          <GoalStatusBadge status={goal.status} />
          
          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); navigate(`/employee/goals/edit/${goal.id}`); }}
              className="p-1.5 text-gray-400 hover:text-white bg-dark rounded-md border border-border"
            >
              <Edit className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className="p-1.5 text-red-400 hover:text-red-300 bg-red-950/30 rounded-md border border-red-900/50"
            >
              <Trash className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2 leading-tight">
          {goal.title}
        </h3>
        <p className="text-sm text-gray-400 mb-6 line-clamp-2">
          {goal.description}
        </p>
      </div>

      <div>
        <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
          <div className="flex items-center gap-1.5">
            <Target className="w-3.5 h-3.5" />
            <span>Target: {goal.target_value ?? "N/A"} ({goal.uom_type || ""})</span>
          </div>
          <span className="font-semibold text-white">{progress}%</span>
        </div>
        
        <GoalProgress progress={progress} />
        
        <div className="flex items-center justify-between mt-5 pt-4 border-t border-border/50 text-xs font-semibold">
          <div className="flex items-center gap-1.5 text-gray-500">
            <Calendar className="w-3.5 h-3.5" />
            {goal.target_date || "No Date"}
          </div>
          <div className="text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
            Details <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoalCard;
