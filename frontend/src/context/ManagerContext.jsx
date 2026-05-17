import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import * as approvalsApi from '../api/approvalsApi';
import * as analyticsApi from '../api/analyticsApi';
import toast from 'react-hot-toast';

const ManagerContext = createContext();

export const ManagerProvider = ({ children }) => {
  const [pendingApprovals, setPendingApprovals] = useState([]);
  const [team, setTeam] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * Fetch pending approvals from backend
   */
  const fetchPendingApprovals = useCallback(async () => {
    try {
      const data = await approvalsApi.getPendingApprovals();
      setPendingApprovals(data || []);
    } catch (err) {
      console.error('Failed to fetch pending approvals:', err);
      setPendingApprovals([]);
    }
  }, []);

  /**
   * Fetch team analytics from backend
   */
  const fetchTeamData = useCallback(async () => {
    try {
      const data = await analyticsApi.getTeamAnalytics();
      setTeam(data || []);
    } catch (err) {
      console.error('Failed to fetch team analytics:', err);
      setTeam([]);
    }
  }, []);

  /**
   * Fetch department analytics from backend
   */
  const fetchDepartments = useCallback(async () => {
    try {
      const data = await analyticsApi.getDepartmentAnalytics();
      setDepartments(data || []);
    } catch (err) {
      console.error('Failed to fetch department analytics:', err);
      setDepartments([]);
    }
  }, []);

  /**
   * Load all manager data on mount
   */
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);
      try {
        await Promise.all([
          fetchPendingApprovals(),
          fetchTeamData(),
          fetchDepartments(),
        ]);
      } catch (err) {
        setError('Failed to load manager data');
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [fetchPendingApprovals, fetchTeamData, fetchDepartments]);

  /**
   * Approve a goal via backend API
   */
  const approveItem = async (goalId, comment = '') => {
    try {
      await approvalsApi.approveGoal(goalId, comment);
      setPendingApprovals(prev => prev.filter(item => item.id !== goalId));
      toast.success('Goal approved successfully');
    } catch (err) {
      toast.error(err?.response?.data?.detail || 'Failed to approve goal');
    }
  };

  /**
   * Reject a goal via backend API
   */
  const rejectItem = async (goalId, comment = '') => {
    try {
      await approvalsApi.rejectGoal(goalId, comment);
      setPendingApprovals(prev => prev.filter(item => item.id !== goalId));
      toast.success('Goal rejected');
    } catch (err) {
      toast.error(err?.response?.data?.detail || 'Failed to reject goal');
    }
  };

  /**
   * Refresh all data
   */
  const refreshData = async () => {
    setLoading(true);
    await Promise.all([
      fetchPendingApprovals(),
      fetchTeamData(),
      fetchDepartments(),
    ]);
    setLoading(false);
  };

  return (
    <ManagerContext.Provider value={{
      team,
      pendingApprovals,
      departments,
      loading,
      error,
      approveItem,
      rejectItem,
      refreshData,
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
