import { createContext, useContext, useReducer, useEffect } from 'react';
import { initialGoals } from '../data/goals';

export const calculateGoalProgress = (goal) => {
  if (!goal.uomType) return goal.progress || 0;

  const target = parseFloat(goal.targetValue) || 0;
  const actual = parseFloat(goal.actual) || 0;
  let score = 0;

  switch (goal.uomType) {
    case 'Min':
      score = target !== 0 ? (actual / target) * 100 : (actual > 0 ? 100 : 0);
      break;
    case 'Max':
      score = actual !== 0 ? (target / actual) * 100 : (actual === 0 ? 100 : 0);
      break;
    case 'Timeline':
      if (!goal.completionDate) {
        score = 0;
      } else {
        const start = goal.startDate ? new Date(goal.startDate).getTime() : new Date(goal.targetDate).getTime() - 90*24*60*60*1000;
        const deadline = new Date(goal.targetDate).getTime();
        const completion = new Date(goal.completionDate).getTime();
        if (completion <= deadline) {
          score = 100;
        } else {
          score = ((deadline - completion) / (deadline - start)) * 100;
        }
      }
      break;
    case 'Zero':
      score = actual === 0 ? 100 : 0;
      break;
    default:
      score = goal.progress || 0;
  }

  if (score > 100) score = 100;
  if (score < 0) score = 0;

  return Math.round(score);
};

const GoalContext = createContext();

const goalReducer = (state, action) => {
  switch (action.type) {
    case 'SET_GOALS':
      return action.payload;
    case 'ADD_GOAL':
      return [action.payload, ...state];
    case 'UPDATE_GOAL':
      return state.map(goal => 
        goal.id === action.payload.id ? action.payload : goal
      );
    case 'DELETE_GOAL':
      return state.filter(goal => goal.id !== action.payload);
    default:
      return state;
  }
};

export const GoalProvider = ({ children }) => {
  // Try to load from localStorage first, otherwise use initial mock data
  const loadInitialState = () => {
    const saved = localStorage.getItem('thryve_goals');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return initialGoals;
      }
    }
    return initialGoals;
  };

  const [goals, dispatch] = useReducer(goalReducer, [], loadInitialState);

  // Persist to localStorage whenever goals change
  useEffect(() => {
    localStorage.setItem('thryve_goals', JSON.stringify(goals));
  }, [goals]);

  const addGoal = (goalData) => {
    const newGoal = {
      ...goalData,
      id: `GOAL-${Math.floor(Math.random() * 1000)}`,
      actual: goalData.actual || 0,
      progress: 0, 
    };
    newGoal.progress = calculateGoalProgress(newGoal);
    dispatch({ type: 'ADD_GOAL', payload: newGoal });
  };

  const updateGoal = (updatedGoal) => {
    const finalGoal = { ...updatedGoal };
    finalGoal.progress = calculateGoalProgress(finalGoal);
    dispatch({ type: 'UPDATE_GOAL', payload: finalGoal });
  };

  const deleteGoal = (id) => {
    dispatch({ type: 'DELETE_GOAL', payload: id });
  };

  return (
    <GoalContext.Provider value={{ goals, addGoal, updateGoal, deleteGoal }}>
      {children}
    </GoalContext.Provider>
  );
};

export const useGoals = () => {
  const context = useContext(GoalContext);
  if (!context) {
    throw new Error('useGoals must be used within a GoalProvider');
  }
  return context;
};
