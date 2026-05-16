import { createContext, useContext, useReducer, useEffect } from 'react';
import { teamMembers, pendingApprovalsData, departmentStats } from '../data/teamData';

const ManagerContext = createContext();

const managerReducer = (state, action) => {
  switch (action.type) {
    case 'APPROVE_ITEM':
      return {
        ...state,
        pendingApprovals: state.pendingApprovals.filter(item => item.id !== action.payload)
      };
    case 'REJECT_ITEM':
      return {
        ...state,
        pendingApprovals: state.pendingApprovals.filter(item => item.id !== action.payload)
      };
    case 'RETURN_FOR_REWORK':
      return {
        ...state,
        pendingApprovals: state.pendingApprovals.filter(item => item.id !== action.payload.id)
      };
    case 'ADD_COMMENT':
      return {
        ...state,
        pendingApprovals: state.pendingApprovals.map(item => {
          if (item.id === action.payload.approvalId) {
            return {
              ...item,
              comments: [...(item.comments || []), action.payload.comment]
            };
          }
          return item;
        })
      };
    default:
      return state;
  }
};

export const ManagerProvider = ({ children }) => {
  const loadInitialState = () => {
    const saved = localStorage.getItem('thryve_manager_state');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // Fallback
      }
    }
    return {
      team: teamMembers,
      pendingApprovals: pendingApprovalsData,
      departments: departmentStats,
    };
  };

  const [state, dispatch] = useReducer(managerReducer, null, loadInitialState);

  useEffect(() => {
    localStorage.setItem('thryve_manager_state', JSON.stringify(state));
  }, [state]);

  const approveItem = (id) => dispatch({ type: 'APPROVE_ITEM', payload: id });
  const rejectItem = (id) => dispatch({ type: 'REJECT_ITEM', payload: id });
  const returnForRework = (id, reason) => dispatch({ type: 'RETURN_FOR_REWORK', payload: { id, reason } });
  
  const addCommentToApproval = (approvalId, commentText, author = "Current Manager") => {
    dispatch({ 
      type: 'ADD_COMMENT', 
      payload: { 
        approvalId, 
        comment: {
          id: `COM-${Date.now()}`,
          author,
          text: commentText,
          timestamp: new Date().toISOString()
        }
      } 
    });
  };

  return (
    <ManagerContext.Provider value={{ 
      ...state, 
      approveItem, 
      rejectItem, 
      returnForRework, 
      addCommentToApproval 
    }}>
      {children}
    </ManagerContext.Provider>
  );
};

export const useManager = () => {
  const context = useContext(ManagerContext);
  if (!context) {
    throw new Error('useManager must be used within a ManagerProvider');
  }
  return context;
};
