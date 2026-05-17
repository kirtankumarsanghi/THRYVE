import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import * as adminApi from '../api/adminApi';
import * as analyticsApi from '../api/analyticsApi';
import toast from 'react-hot-toast';

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [departments, setDepartments] = useState([]);
  const [users, setUsers] = useState([]);
  const [kpis, setKpis] = useState({});
  const [auditLogs, setAuditLogs] = useState([]);
  const [cycles, setCycles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * Fetch org analytics (KPIs, users, departments)
   */
  const fetchOrgAnalytics = useCallback(async () => {
    try {
      const data = await adminApi.getOrgAnalytics();
      if (data) {
        setKpis(data.kpis || data);
        setUsers(data.users || []);
        setDepartments(data.departments || []);
        setCycles(data.cycles || []);
      }
    } catch (err) {
      console.error('Failed to fetch org analytics:', err);
      // Fallback: try individual endpoints
      try {
        const deptData = await analyticsApi.getDepartmentAnalytics();
        setDepartments(deptData || []);
      } catch (e) { /* ignore */ }
      try {
        const overview = await analyticsApi.getOverview();
        setKpis(overview || {});
      } catch (e) { /* ignore */ }
    }
  }, []);

  /**
   * Fetch audit logs
   */
  const fetchAuditLogs = useCallback(async () => {
    try {
      const data = await adminApi.getAuditLogs({ limit: 100 });
      setAuditLogs(data || []);
    } catch (err) {
      console.error('Failed to fetch audit logs:', err);
      setAuditLogs([]);
    }
  }, []);

  /**
   * Load all admin data on mount
   */
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);
      try {
        await Promise.all([
          fetchOrgAnalytics(),
          fetchAuditLogs(),
        ]);
      } catch (err) {
        setError('Failed to load admin data');
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [fetchOrgAnalytics, fetchAuditLogs]);

  /**
   * Unlock a goal via backend API
   */
  const unlockGoal = async (goalId, reason = '') => {
    try {
      await adminApi.unlockGoal(goalId, reason);
      toast.success(`Goal ${goalId} unlocked successfully.`);
      await fetchAuditLogs(); // Refresh audit logs
    } catch (err) {
      toast.error(err?.response?.data?.detail || 'Failed to unlock goal');
    }
  };

  /**
   * Update user role via backend API
   */
  const updateUserRole = async (userId, role) => {
    try {
      await adminApi.updateUserRole(userId, role);
      setUsers(prev =>
        prev.map(u => u.id === userId ? { ...u, role } : u)
      );
      toast.success(`User role updated to ${role}.`);
      await fetchAuditLogs();
    } catch (err) {
      toast.error(err?.response?.data?.detail || 'Failed to update user role');
    }
  };

  /**
   * Update user status (local + audit log refresh)
   */
  const updateUserStatus = async (userId, status) => {
    setUsers(prev =>
      prev.map(u => u.id === userId ? { ...u, status } : u)
    );
    toast.success(`User status updated to ${status}.`);
  };

  /**
   * Update review cycle status
   */
  const updateCycleStatus = async (cycleId, status) => {
    setCycles(prev =>
      prev.map(c => c.id === cycleId ? { ...c, status } : c)
    );
    toast.success('Review cycle updated.');
  };

  /**
   * Refresh all data
   */
  const refreshData = async () => {
    setLoading(true);
    await Promise.all([
      fetchOrgAnalytics(),
      fetchAuditLogs(),
    ]);
    setLoading(false);
  };

  return (
    <AdminContext.Provider value={{
      departments,
      users,
      kpis,
      auditLogs,
      cycles,
      loading,
      error,
      unlockGoal,
      updateUserRole,
      updateUserStatus,
      updateCycleStatus,
      refreshData,
    }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);
