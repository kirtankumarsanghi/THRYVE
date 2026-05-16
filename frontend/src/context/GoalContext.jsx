import { createContext, useContext, useReducer, useEffect } from 'react';
import { initialGoals } from '../data/goals';

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
      progress: 0, // calculate appropriately later
    };
    dispatch({ type: 'ADD_GOAL', payload: newGoal });
  };

  const updateGoal = (updatedGoal) => {
    dispatch({ type: 'UPDATE_GOAL', payload: updatedGoal });
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
