import { createContext, useContext, useReducer, useEffect, useState } from 'react';
import * as goalsApi from '../api/goalsApi';
import toast from 'react-hot-toast';

export const calculateGoalProgress = (goal) => {
  if (typeof goal.achievement_percentage === 'number') {
    return Math.max(0, Math.min(100, Math.round(goal.achievement_percentage)));
  }
  if (!goal.uom_type) return goal.progress || 0;

  const target = parseFloat(goal.target_value) || 0;
  const actual = parseFloat(goal.achieved_value) || 0;
  let score = 0;

  switch (goal.uom_type) {
    case 'Numeric':
    case 'Percentage':
      if (goal.uom_direction === 'Lower is Better') {
        score = actual !== 0 ? (target / actual) * 100 : 0;
      } else {
        score = target !== 0 ? (actual / target) * 100 : 0;
      }
      break;
    case 'Timeline':
      if (!goal.completion_date) {
        score = 0;
      } else {
        const start = goal.start_date ? new Date(goal.start_date).getTime() : new Date(goal.target_date).getTime() - 90*24*60*60*1000;
        const deadline = new Date(goal.target_date).getTime();
        const completion = new Date(goal.completion_date).getTime();
        if (completion <= deadline) {
          score = 100;
        } else {
          score = ((deadline - completion) / (deadline - start)) * 100;
        }
      }
      break;
    case 'Zero-based':
      score = actual === 0 ? 100 : 0;
      break;
    default:
      score = goal.progress || 0;
  }

  if (score < 0) score = 0;
  return Math.round(score * 100) / 100;
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
  const [goals, dispatch] = useReducer(goalReducer, []);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch goals from backend on mount
  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await goalsApi.getGoals();
      dispatch({ type: 'SET_GOALS', payload: data });
    } catch (err) {
      console.error('Failed to fetch goals:', err);
      setError('Failed to load goals');
      // Don't show toast on initial load failure (user might not be logged in)
    } finally {
      setLoading(false);
    }
  };

  const addGoal = async (goalData) => {
    try {
      const newGoal = await goalsApi.createGoal(goalData);
      dispatch({ type: 'ADD_GOAL', payload: newGoal });
      toast.success('Goal created successfully!');
      return newGoal;
    } catch (err) {
      console.error('Failed to create goal:', err);
      const errorMessage = err.response?.data?.detail || 'Failed to create goal';
      toast.error(errorMessage);
      throw err;
    }
  };

  const updateGoal = async (goalId, updatedData) => {
    try {
      const updatedGoal = await goalsApi.updateGoal(goalId, updatedData);
      dispatch({ type: 'UPDATE_GOAL', payload: updatedGoal });
      toast.success('Goal updated successfully!');
      return updatedGoal;
    } catch (err) {
      console.error('Failed to update goal:', err);
      const errorMessage = err.response?.data?.detail || 'Failed to update goal';
      toast.error(errorMessage);
      throw err;
    }
  };

  const deleteGoal = async (goalId) => {
    try {
      await goalsApi.deleteGoal(goalId);
      dispatch({ type: 'DELETE_GOAL', payload: goalId });
      toast.success('Goal deleted successfully!');
    } catch (err) {
      console.error('Failed to delete goal:', err);
      const errorMessage = err.response?.data?.detail || 'Failed to delete goal';
      toast.error(errorMessage);
      throw err;
    }
  };

  const submitCheckin = async (goalId, checkinData) => {
    try {
      const result = await goalsApi.submitCheckin(goalId, checkinData);
      // Refresh goals to get updated progress
      await fetchGoals();
      toast.success('Check-in submitted successfully!');
      return result;
    } catch (err) {
      console.error('Failed to submit check-in:', err);
      const errorMessage = err.response?.data?.detail || 'Failed to submit check-in';
      toast.error(errorMessage);
      throw err;
    }
  };

  const refreshGoals = () => {
    return fetchGoals();
  };

  return (
    <GoalContext.Provider value={{ 
      goals, 
      loading, 
      error,
      addGoal, 
      updateGoal, 
      deleteGoal,
      submitCheckin,
      refreshGoals,
    }}>
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
