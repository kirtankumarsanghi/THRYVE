import { createContext, useContext, useReducer, useEffect } from 'react';
import { departments, allUsers, orgKPIs, auditLogs, reviewCycles } from '../data/orgData';
import toast from 'react-hot-toast';

const AdminContext = createContext();

const adminReducer = (state, action) => {
  switch (action.type) {
    case 'LOAD_STATE':
      return { ...state, ...action.payload };
    case 'UNLOCK_GOAL':
      return {
        ...state,
        auditLogs: [
          {
            id: `AUD-${Date.now()}`,
            timestamp: new Date().toISOString(),
            actor: 'Current Admin',
            action: 'UNLOCKED_GOAL',
            target: action.payload.goalId,
            details: action.payload.reason || 'Admin override'
          },
          ...state.auditLogs
        ]
      };
    case 'UPDATE_USER_STATUS':
      return {
        ...state,
        users: state.users.map(u => 
          u.id === action.payload.userId ? { ...u, status: action.payload.status } : u
        ),
        auditLogs: [
          {
            id: `AUD-${Date.now()}`,
            timestamp: new Date().toISOString(),
            actor: 'Current Admin',
            action: 'UPDATED_USER_STATUS',
            target: action.payload.userId,
            details: `Status changed to ${action.payload.status}`
          },
          ...state.auditLogs
        ]
      };
    case 'UPDATE_CYCLE_STATUS':
      return {
        ...state,
        cycles: state.cycles.map(c => 
          c.id === action.payload.cycleId ? { ...c, status: action.payload.status } : c
        ),
        auditLogs: [
          {
            id: `AUD-${Date.now()}`,
            timestamp: new Date().toISOString(),
            actor: 'Current Admin',
            action: 'UPDATED_CYCLE',
            target: action.payload.cycleId,
            details: `Cycle status changed to ${action.payload.status}`
          },
          ...state.auditLogs
        ]
      };
    default:
      return state;
  }
};

export const AdminProvider = ({ children }) => {
  const [state, dispatch] = useReducer(adminReducer, {
    departments,
    users: allUsers,
    kpis: orgKPIs,
    auditLogs,
    cycles: reviewCycles
  });

  // Example persistence hook placeholder for FastAPI
  useEffect(() => {
    const saved = localStorage.getItem('thryve_admin_state');
    if (saved) {
      // dispatch({ type: 'LOAD_STATE', payload: JSON.parse(saved) });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('thryve_admin_state', JSON.stringify(state));
  }, [state]);

  const unlockGoal = (goalId, reason) => {
    dispatch({ type: 'UNLOCK_GOAL', payload: { goalId, reason } });
    toast.success(`Goal ${goalId} unlocked successfully.`);
  };

  const updateUserStatus = (userId, status) => {
    dispatch({ type: 'UPDATE_USER_STATUS', payload: { userId, status } });
    toast.success(`User status updated to ${status}.`);
  };

  const updateCycleStatus = (cycleId, status) => {
    dispatch({ type: 'UPDATE_CYCLE_STATUS', payload: { cycleId, status } });
    toast.success(`Review cycle updated.`);
  };

  return (
    <AdminContext.Provider value={{
      ...state,
      unlockGoal,
      updateUserStatus,
      updateCycleStatus
    }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);
