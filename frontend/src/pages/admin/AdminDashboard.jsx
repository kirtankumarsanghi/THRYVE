import { useState, useEffect, useCallback } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { useAdmin } from '../../context/AdminContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Users, Building2, Target, TrendingUp, AlertCircle, Activity, 
  Shield, Clock, CheckCircle, XCircle, RefreshCw, ArrowRight,
  BarChart3, PieChart as PieChartIcon, Settings, Bell, UserCog
} from 'lucide-react';
import toast from 'react-hot-toast';
import {
  getSystemHealth,
  getDepartments,
  getQuarterlyWindows,
  updateQuarterlyWindows,
  runEscalationScan,
  getEscalations,
  updateEscalationStatus,
} from '../../api/adminApi';
import { getPendingApprovals, approveGoal, rejectGoal } from '../../api/approvalsApi';

const STATUS_COLORS = {
  draft: '#6B7280',
  pending: '#3B82F6',
  approved: '#8B5CF6',
  in_progress: '#F59E0B',
  completed: '#10B981',
  rejected: '#EF4444',
};

const fade = (d = 0) => ({ 
  initial: { opacity: 0, y: 20 }, 
  animate: { opacity: 1, y: 0 }, 
  transition: { delay: d, duration: 0.4 } 
});

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { users, kpis, auditLogs, loading: contextLoading, refreshData, updateUserRole } = useAdmin();
  
  const [systemHealth, setSystemHealth] = useState(null);
  const [departments, setDepartments] = useState([]);
  const [quarterlyWindows, setQuarterlyWindows] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isSavingWindows, setIsSavingWindows] = useState(false);
  const [roleUserId, setRoleUserId] = useState('');
  const [roleValue, setRoleValue] = useState('employee');
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [pendingItems, setPendingItems] = useState([]);
  const [escalations, setEscalations] = useState([]);
  const [bulkRole, setBulkRole] = useState('employee');
  const [selectedUserIds, setSelectedUserIds] = useState([]);

  const loadAdditionalData = useCallback(async () => {
    try {
      const [healthRes, deptRes, windowsRes, approvalsRes, escalationsRes] = await Promise.allSettled([
        getSystemHealth(),
        getDepartments({ include_stats: true }),
        getQuarterlyWindows(),
        getPendingApprovals(),
        getEscalations('open', 20),
      ]);

      if (healthRes.status === 'fulfilled') setSystemHealth(healthRes.value);
      if (deptRes.status === 'fulfilled') setDepartments(deptRes.value || []);
      if (windowsRes.status === 'fulfilled') setQuarterlyWindows(windowsRes.value?.windows || []);
      if (approvalsRes.status === 'fulfilled') setPendingItems(approvalsRes.value || []);
      if (escalationsRes.status === 'fulfilled') setEscalations(escalationsRes.value || []);

      setLastUpdated(new Date());

      const failed = [healthRes, deptRes, windowsRes, approvalsRes, escalationsRes].filter((r) => r.status === 'rejected');
      if (failed.length > 0) {
        console.warn(`Admin dashboard loaded with ${failed.length} partial failures`);
      }
    } catch (error) {
      console.error('Failed to load additional data:', error);
      toast.error(error?.response?.data?.detail || 'Failed to load admin dashboard data');
    }
  }, []);

  // Load additional data
  useEffect(() => {
    loadAdditionalData();
  }, [loadAdditionalData]);

  useEffect(() => {
    const timer = setInterval(() => {
      loadAdditionalData();
    }, 30000);
    return () => clearInterval(timer);
  }, [loadAdditionalData]);

  const handleRoleUpdate = async () => {
    if (!roleUserId) {
      toast.error('Select a user first');
      return;
    }
    try {
      await updateUserRole(Number(roleUserId), roleValue);
      await refreshData();
      await loadAdditionalData();
    } catch (error) {
      toast.error(error?.response?.data?.detail || 'Failed to update role');
    }
  };

  const handleWindowChange = (windowName, key, value) => {
    setQuarterlyWindows((prev) =>
      prev.map((window) =>
        window.window_name === windowName ? { ...window, [key]: Number(value) } : window
      )
    );
  };

  const handleSaveWindows = async () => {
    setIsSavingWindows(true);
    try {
      await updateQuarterlyWindows(quarterlyWindows);
      toast.success('Quarterly windows updated');
      await loadAdditionalData();
    } catch (error) {
      toast.error(error?.response?.data?.detail || 'Failed to update windows');
    } finally {
      setIsSavingWindows(false);
    }
  };

  const toggleUserSelection = (userId) => {
    setSelectedUserIds((prev) => (prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]));
  };

  const applyBulkRole = async () => {
    if (!selectedUserIds.length) {
      toast.error('Select at least one user');
      return;
    }
    const confirmed = window.confirm(`Apply "${bulkRole}" role to ${selectedUserIds.length} users? This action will be logged in audit trail.`);
    if (!confirmed) return;
    try {
      await Promise.all(selectedUserIds.map((id) => updateUserRole(id, bulkRole)));
      setSelectedUserIds([]);
      await refreshData();
      await loadAdditionalData();
      toast.success('Bulk role update applied and logged');
    } catch (error) {
      toast.error(error?.response?.data?.detail || 'Bulk role update failed');
    }
  };

  const handleApprovalAction = async (goalId, action) => {
    const confirmed = window.confirm(`Confirm ${action} for goal #${goalId}? This will create an audit entry.`);
    if (!confirmed) return;
    try {
      if (action === 'approve') {
        await approveGoal(goalId, 'Approved from Admin Action Center');
        toast.success(`Goal #${goalId} approved`);
      } else {
        await rejectGoal(goalId, 'Rejected from Admin Action Center');
        toast.success(`Goal #${goalId} rejected`);
      }
      await loadAdditionalData();
      await refreshData();
    } catch (error) {
      toast.error(error?.response?.data?.detail || `Failed to ${action} goal`);
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await Promise.all([
        refreshData(),
        loadAdditionalData()
      ]);
      toast.success('Dashboard refreshed!');
    } catch (error) {
      toast.error('Failed to refresh dashboard');
    } finally {
      setTimeout(() => setIsRefreshing(false), 1000);
    }
  };

  const handleRunEscalations = async () => {
    try {
      const result = await runEscalationScan();
      toast.success(`Escalation scan complete: ${result.created} new, ${result.touched} touched`);
      await loadAdditionalData();
    } catch (error) {
      toast.error(error?.response?.data?.detail || 'Failed to run escalation scan');
    }
  };

  const handleResolveEscalation = async (escalationId) => {
    try {
      await updateEscalationStatus(escalationId, 'resolved');
      setEscalations((prev) => prev.filter((e) => e.id !== escalationId));
      toast.success(`Escalation #${escalationId} resolved`);
    } catch (error) {
      toast.error(error?.response?.data?.detail || 'Failed to resolve escalation');
    }
  };

  // Derive stats from real data
  const totalEmployees = systemHealth?.total_users || users?.length || 0;
  const activeEmployees = systemHealth?.active_users || users?.filter(u => u.status === 'active').length || 0;
  const totalGoals = systemHealth?.total_goals || kpis?.total_goals || 0;
  const pendingApprovals = systemHealth?.pending_approvals || kpis?.pending_approvals || 0;
  const lockedGoals = systemHealth?.locked_goals || 0;
  const completionRate = kpis?.completion_rate || kpis?.check_in_completion || 0;
  const recentAuditCount = systemHealth?.recent_audit_count || 0;

  // Build goal status data for chart
  const goalStatusData = kpis?.status_distribution
    ? Object.entries(kpis.status_distribution).map(([name, value]) => ({
        name: name.charAt(0).toUpperCase() + name.slice(1).replace('_', ' '),
        value,
        color: STATUS_COLORS[name] || '#6B7280',
      })).filter(d => d.value > 0)
    : [];

  // Department performance data for bar chart
  const deptPerformanceData = departments.slice(0, 8).map(dept => ({
    name: dept.code || dept.name?.substring(0, 10),
    completion: Math.round(dept.completion_rate || dept.avg_performance || 0),
    goals: dept.total_goals || 0,
    employees: dept.employee_count || 0,
  }));

  // Top performers
  const topDepartments = [...departments]
    .sort((a, b) => (b.completion_rate || 0) - (a.completion_rate || 0))
    .slice(0, 5);

  const getActionColor = (action) => {
    if (action?.includes('approved') || action?.includes('approve')) return 'text-emerald-400';
    if (action?.includes('rejected') || action?.includes('reject')) return 'text-red-400';
    if (action?.includes('created') || action?.includes('create')) return 'text-blue-400';
    if (action?.includes('updated') || action?.includes('update')) return 'text-amber-400';
    if (action?.includes('deleted') || action?.includes('delete')) return 'text-red-400';
    if (action?.includes('unlocked')) return 'text-purple-400';
    return 'text-gray-400';
  };

  const getActionIcon = (action) => {
    if (action?.includes('approved')) return <CheckCircle size={16} />;
    if (action?.includes('rejected')) return <XCircle size={16} />;
    if (action?.includes('created')) return <Target size={16} />;
    if (action?.includes('updated')) return <Activity size={16} />;
    if (action?.includes('deleted')) return <XCircle size={16} />;
    if (action?.includes('unlocked')) return <Shield size={16} />;
    return <Activity size={16} />;
  };

  if (contextLoading && !systemHealth) {
    return (
      <div className="min-h-screen bg-[#0A0F1E] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-3 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-400 text-lg">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1800px] mx-auto px-8 py-8">
      {/* Dashboard Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center border border-red-500/20">
            <Shield className="text-red-400" size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white tracking-wide">System Overview</h1>
            <p className="text-sm text-gray-400">Admin Action Center & Real-time Analytics</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="text-right mr-2 hidden sm:block">
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Last Updated</p>
            <p className="text-xs text-gray-300 font-medium">{lastUpdated.toLocaleTimeString()}</p>
          </div>
          <button 
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="p-2.5 bg-[#0F1629] border border-white/5 hover:border-white/20 rounded-xl transition-all"
            title="Refresh Dashboard"
          >
            <RefreshCw size={18} className={`text-gray-400 ${isRefreshing ? 'animate-spin text-white' : ''}`} />
          </button>
          <button className="px-4 py-2.5 bg-red-500/10 text-red-400 border border-red-500/20 rounded-xl text-xs font-bold tracking-widest uppercase hover:bg-red-500/20 transition-all shadow-[0_0_15px_rgba(239,68,68,0.1)]">
            Admin Mode
          </button>
        </div>
      </div>
        {/* Live Data Notice */}
        <motion.div {...fade(0)} className="mb-6">
          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 flex items-center gap-3">
            <div className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </div>
            <div>
              <p className="text-emerald-400 font-bold text-sm">LIVE DATA</p>
              <p className="text-emerald-300/70 text-xs">Real-time updates from backend APIs • Auto-refresh every 30s</p>
            </div>
          </div>
        </motion.div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div {...fade(0.05)} 
            className="bg-[#0F1629] border border-white/5 rounded-2xl p-6 hover:border-indigo-500/20 transition-all cursor-pointer"
            onClick={() => navigate('/admin/users')}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20">
                <Users className="text-cyan-400" size={24} />
              </div>
              <ArrowRight className="text-gray-600" size={20} />
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-400">Total Users</p>
              <p className="text-4xl font-bold text-white">{totalEmployees}</p>
              <p className="text-xs text-cyan-400">{activeEmployees} active</p>
            </div>
          </motion.div>

          <motion.div {...fade(0.1)} 
            className="bg-[#0F1629] border border-white/5 rounded-2xl p-6 hover:border-indigo-500/20 transition-all cursor-pointer"
            onClick={() => navigate('/admin/departments')}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20">
                <Building2 className="text-indigo-400" size={24} />
              </div>
              <ArrowRight className="text-gray-600" size={20} />
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-400">Departments</p>
              <p className="text-4xl font-bold text-white">{departments.length}</p>
              <p className="text-xs text-indigo-400">Across organization</p>
            </div>
          </motion.div>

          <motion.div {...fade(0.15)} 
            className="bg-[#0F1629] border border-white/5 rounded-2xl p-6 hover:border-amber-500/20 transition-all cursor-pointer"
            onClick={() => navigate('/admin/governance')}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center border border-amber-500/20">
                <AlertCircle className="text-amber-400" size={24} />
              </div>
              {pendingApprovals > 0 && (
                <span className="px-2 py-1 bg-amber-500/20 text-amber-400 text-xs font-bold rounded-full">
                  {pendingApprovals}
                </span>
              )}
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-400">Pending Approvals</p>
              <p className="text-4xl font-bold text-white">{pendingApprovals}</p>
              <p className="text-xs text-amber-400">Requires attention</p>
            </div>
          </motion.div>

          <motion.div {...fade(0.2)} 
            className="bg-[#0F1629] border border-white/5 rounded-2xl p-6 hover:border-emerald-500/20 transition-all"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                <TrendingUp className="text-emerald-400" size={24} />
              </div>
              <span className="text-emerald-400 text-sm font-bold">↑ {Math.round(completionRate)}%</span>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-400">Completion Rate</p>
              <p className="text-4xl font-bold text-white">{Math.round(completionRate)}%</p>
              <p className="text-xs text-emerald-400">Organization average</p>
            </div>
          </motion.div>
        </div>

        {/* System Health Status */}
        {systemHealth && (
          <motion.div {...fade(0.25)} className="bg-[#0F1629] border border-white/5 rounded-2xl p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Activity className="text-indigo-400" size={24} />
                <h2 className="text-xl font-bold text-white">System Health</h2>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                systemHealth.status === 'healthy' 
                  ? 'bg-emerald-500/20 text-emerald-400' 
                  : 'bg-amber-500/20 text-amber-400'
              }`}>
                {systemHealth.status === 'healthy' ? '✓ Healthy' : '⚠ Attention Needed'}
              </span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-[#1A2235] border border-white/10 rounded-xl p-4">
                <p className="text-xs text-gray-400 mb-1">Total Goals</p>
                <p className="text-2xl font-bold text-white">{systemHealth.total_goals}</p>
              </div>
              <div className="bg-[#1A2235] border border-white/10 rounded-xl p-4">
                <p className="text-xs text-gray-400 mb-1">Locked Goals</p>
                <p className="text-2xl font-bold text-purple-400">{systemHealth.locked_goals}</p>
              </div>
              <div className="bg-[#1A2235] border border-white/10 rounded-xl p-4">
                <p className="text-xs text-gray-400 mb-1">Active Users</p>
                <p className="text-2xl font-bold text-cyan-400">{systemHealth.active_users}</p>
              </div>
              <div className="bg-[#1A2235] border border-white/10 rounded-xl p-4">
                <p className="text-xs text-gray-400 mb-1">Recent Activity</p>
                <p className="text-2xl font-bold text-indigo-400">{systemHealth.recent_audit_count}</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Department Performance Chart */}
          <motion.div {...fade(0.3)} className="lg:col-span-2 bg-[#0F1629] border border-white/5 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <BarChart3 className="text-indigo-400" size={24} />
                <h2 className="text-xl font-bold text-white">Department Performance</h2>
              </div>
              <button 
                onClick={() => navigate('/admin/departments')}
                className="text-sm text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
              >
                View All <ArrowRight size={16} />
              </button>
            </div>
            {deptPerformanceData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={deptPerformanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis 
                    dataKey="name" 
                    stroke="#9CA3AF" 
                    style={{ fontSize: '12px' }}
                  />
                  <YAxis stroke="#9CA3AF" style={{ fontSize: '12px' }} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1A2235', 
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '8px',
                      color: '#fff'
                    }}
                  />
                  <Bar dataKey="completion" fill="#6366F1" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[300px] flex items-center justify-center text-gray-500">
                No department data available
              </div>
            )}
          </motion.div>

          {/* Top Performing Departments */}
          <motion.div {...fade(0.35)} className="bg-[#0F1629] border border-white/5 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <Target className="text-emerald-400" size={24} />
              <h2 className="text-xl font-bold text-white">Top Performers</h2>
            </div>
            <div className="space-y-3">
              {topDepartments.map((dept, index) => (
                <div key={dept.id} className="flex items-center gap-3 p-3 rounded-lg bg-[#1A2235] border border-white/10">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm ${
                    index === 0 ? 'bg-amber-500/20 text-amber-400' :
                    index === 1 ? 'bg-gray-400/20 text-gray-400' :
                    index === 2 ? 'bg-orange-500/20 text-orange-400' :
                    'bg-indigo-500/20 text-indigo-400'
                  }`}>
                    #{index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">{dept.name}</p>
                    <p className="text-xs text-gray-400">{dept.employee_count || 0} employees</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-emerald-400">
                      {Math.round(dept.completion_rate || dept.avg_performance || 0)}%
                    </p>
                  </div>
                </div>
              ))}
              {topDepartments.length === 0 && (
                <div className="text-center py-8 text-gray-500 text-sm">
                  No department data yet
                </div>
              )}
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <motion.div {...fade(0.38)} className="bg-[#0F1629] border border-white/5 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">Authority Controls</h2>
            <p className="text-sm text-gray-400 mb-5">
              Admin updates here immediately affect access and permissions for manager and employee experiences.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
              <select
                value={roleUserId}
                onChange={(e) => setRoleUserId(e.target.value)}
                className="bg-[#1A2235] border border-white/10 rounded-lg px-3 py-2 text-sm text-white"
              >
                <option value="">Select user</option>
                {(users || []).map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.full_name || user.name || user.email}
                  </option>
                ))}
              </select>
              <select
                value={roleValue}
                onChange={(e) => setRoleValue(e.target.value)}
                className="bg-[#1A2235] border border-white/10 rounded-lg px-3 py-2 text-sm text-white"
              >
                <option value="employee">Employee</option>
                <option value="manager">Manager</option>
                <option value="admin">Admin</option>
              </select>
              <button
                onClick={handleRoleUpdate}
                className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg text-sm font-semibold"
              >
                Apply Role
              </button>
            </div>
          </motion.div>

          <motion.div {...fade(0.39)} className="bg-[#0F1629] border border-white/5 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">Quarterly Windows</h2>
            <div className="space-y-3">
              {quarterlyWindows.map((window) => (
                <div key={window.window_name} className="bg-[#1A2235] border border-white/10 rounded-xl p-3">
                  <p className="text-sm font-semibold text-white mb-2">{window.window_name}</p>
                  <div className="grid grid-cols-2 gap-2 mb-2">
                    <input type="number" min="1" max="12" value={window.start_month} onChange={(e) => handleWindowChange(window.window_name, 'start_month', e.target.value)} className="bg-[#0F1629] border border-white/10 rounded px-2 py-1 text-xs text-white" />
                    <input type="number" min="1" max="31" value={window.start_day} onChange={(e) => handleWindowChange(window.window_name, 'start_day', e.target.value)} className="bg-[#0F1629] border border-white/10 rounded px-2 py-1 text-xs text-white" />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <input type="number" min="1" max="12" value={window.end_month} onChange={(e) => handleWindowChange(window.window_name, 'end_month', e.target.value)} className="bg-[#0F1629] border border-white/10 rounded px-2 py-1 text-xs text-white" />
                    <input type="number" min="1" max="31" value={window.end_day} onChange={(e) => handleWindowChange(window.window_name, 'end_day', e.target.value)} className="bg-[#0F1629] border border-white/10 rounded px-2 py-1 text-xs text-white" />
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={handleSaveWindows}
              disabled={isSavingWindows}
              className="mt-4 px-4 py-2 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/30 rounded-lg text-sm font-semibold"
            >
              {isSavingWindows ? 'Saving...' : 'Save Windows'}
            </button>
          </motion.div>
        </div>

        <motion.div {...fade(0.41)} className="bg-[#0F1629] border border-white/5 rounded-2xl p-6 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <UserCog className="text-cyan-400" size={22} />
            <h2 className="text-xl font-bold text-white">Admin Action Center</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-[#1A2235] border border-white/10 rounded-xl p-4">
              <p className="text-sm font-semibold text-white mb-3">Bulk Role Updates</p>
              <div className="max-h-40 overflow-y-auto space-y-2 mb-3">
                {(users || []).slice(0, 12).map((user) => (
                  <label key={user.id} className="flex items-center gap-2 text-xs text-gray-300">
                    <input type="checkbox" checked={selectedUserIds.includes(user.id)} onChange={() => toggleUserSelection(user.id)} />
                    <span>{user.full_name || user.email}</span>
                  </label>
                ))}
              </div>
              <div className="flex gap-2">
                <select value={bulkRole} onChange={(e) => setBulkRole(e.target.value)} className="flex-1 bg-[#0F1629] border border-white/10 rounded px-2 py-2 text-xs text-white">
                  <option value="employee">Employee</option>
                  <option value="manager">Manager</option>
                  <option value="admin">Admin</option>
                </select>
                <button onClick={applyBulkRole} className="px-3 py-2 bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 rounded text-xs font-semibold">
                  Apply
                </button>
              </div>
            </div>

            <div className="bg-[#1A2235] border border-white/10 rounded-xl p-4">
              <p className="text-sm font-semibold text-white mb-3">Approvals Queue</p>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {pendingItems.length ? pendingItems.slice(0, 5).map((item) => (
                  <div key={item.id} className="border border-white/10 rounded-lg p-2">
                    <p className="text-xs text-white font-medium truncate">{item.title}</p>
                    <p className="text-[11px] text-gray-400 mb-2">{item.employee_name}</p>
                    <div className="flex gap-2">
                      <button onClick={() => handleApprovalAction(item.id, 'approve')} className="px-2 py-1 text-[11px] bg-emerald-500/20 text-emerald-300 rounded border border-emerald-500/30">Approve</button>
                      <button onClick={() => handleApprovalAction(item.id, 'reject')} className="px-2 py-1 text-[11px] bg-red-500/20 text-red-300 rounded border border-red-500/30">Reject</button>
                    </div>
                  </div>
                )) : <p className="text-xs text-gray-500">No pending approvals.</p>}
              </div>
            </div>

            <div className="bg-[#1A2235] border border-white/10 rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-semibold text-white">Escalation Log</p>
                <button
                  onClick={handleRunEscalations}
                  className="px-2 py-1 text-[11px] bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded"
                >
                  Run Scan
                </button>
              </div>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {escalations.length ? escalations.slice(0, 5).map((esc) => (
                  <div key={esc.id} className="border border-white/10 rounded-lg p-2">
                    <p className="text-xs text-white">{esc.rule_type.replace(/_/g, ' ')}</p>
                    <p className="text-[11px] text-amber-300">L{esc.level} {'->'} {esc.recipient_role}</p>
                    <p className="text-[10px] text-gray-500 mb-1">{esc.message}</p>
                    <button
                      onClick={() => handleResolveEscalation(esc.id)}
                      className="px-2 py-1 text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded"
                    >
                      Resolve
                    </button>
                  </div>
                )) : <p className="text-xs text-gray-500">No open escalations.</p>}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Goal Status Distribution */}
          <motion.div {...fade(0.4)} className="bg-[#0F1629] border border-white/5 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <PieChartIcon className="text-purple-400" size={24} />
              <h2 className="text-xl font-bold text-white">Goal Status Distribution</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {goalStatusData.length > 0 ? (
                <>
                  <div className="flex items-center justify-center">
                    <ResponsiveContainer width="100%" height={250}>
                      <PieChart>
                        <Pie
                          data={goalStatusData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={90}
                          paddingAngle={3}
                          dataKey="value"
                        >
                          {goalStatusData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: '#1A2235', 
                            border: '1px solid rgba(255,255,255,0.1)',
                            borderRadius: '8px',
                            color: '#fff'
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex flex-col justify-center space-y-3">
                    {goalStatusData.map((item, index) => {
                      const total = goalStatusData.reduce((sum, d) => sum + d.value, 0);
                      return (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div 
                              className="w-3 h-3 rounded-full" 
                              style={{ backgroundColor: item.color }}
                            />
                            <span className="text-sm text-gray-300">{item.name}</span>
                          </div>
                          <div className="text-right">
                            <span className="text-sm font-bold text-white">{item.value}</span>
                            <span className="text-xs text-gray-500 ml-1">
                              ({Math.round((item.value / total) * 100)}%)
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </>
              ) : (
                <div className="col-span-2 flex items-center justify-center h-[250px] text-gray-500">
                  No goal data available
                </div>
              )}
            </div>
          </motion.div>

          {/* Recent Audit Activity */}
          <motion.div {...fade(0.45)} className="bg-[#0F1629] border border-white/5 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Shield className="text-red-400" size={24} />
                <h2 className="text-xl font-bold text-white">Recent Activity</h2>
              </div>
              <button 
                onClick={() => navigate('/admin/audit')}
                className="text-sm text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
              >
                View All <ArrowRight size={16} />
              </button>
            </div>
            <div className="space-y-2 max-h-[400px] overflow-y-auto custom-scrollbar">
              {auditLogs.length > 0 ? auditLogs.slice(0, 8).map((log) => (
                <div key={log.id} className="flex items-start gap-3 p-3 rounded-lg bg-[#1A2235] border border-white/10 hover:border-white/20 transition-colors">
                  <div className={`mt-0.5 ${getActionColor(log.action)}`}>
                    {getActionIcon(log.action)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-300 leading-relaxed">
                      <span className="font-semibold text-white">{log.user_email || `User #${log.user_id}`}</span>
                      {' '}
                      <span className={`${getActionColor(log.action)} font-medium`}>
                        {log.action?.replace(/_/g, ' ')}
                      </span>
                      {' '}
                      <span className="text-gray-400">{log.target}</span>
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <Clock size={12} className="text-gray-500" />
                      <p className="text-xs text-gray-500">
                        {log.timestamp ? new Date(log.timestamp).toLocaleString() : ''}
                      </p>
                    </div>
                  </div>
                </div>
              )) : (
                <div className="text-center py-12 text-gray-500">
                  <Shield size={48} className="mx-auto mb-3 opacity-20" />
                  <p className="text-sm">No audit logs yet</p>
                  <p className="text-xs mt-1">Actions will appear here automatically</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div {...fade(0.5)} className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
          <button
            onClick={() => navigate('/admin/users')}
            className="bg-[#0F1629] border border-white/5 hover:border-indigo-500/30 rounded-xl p-4 text-left transition-all group"
          >
            <Users className="text-indigo-400 mb-2 group-hover:scale-110 transition-transform" size={24} />
            <p className="text-white font-semibold">Manage Users</p>
            <p className="text-xs text-gray-400 mt-1">View and edit user roles</p>
          </button>

          <button
            onClick={() => navigate('/admin/departments')}
            className="bg-[#0F1629] border border-white/5 hover:border-indigo-500/30 rounded-xl p-4 text-left transition-all group"
          >
            <Building2 className="text-indigo-400 mb-2 group-hover:scale-110 transition-transform" size={24} />
            <p className="text-white font-semibold">Departments</p>
            <p className="text-xs text-gray-400 mt-1">Manage organizational structure</p>
          </button>

          <button
            onClick={() => navigate('/admin/governance')}
            className="bg-[#0F1629] border border-white/5 hover:border-amber-500/30 rounded-xl p-4 text-left transition-all group"
          >
            <Shield className="text-amber-400 mb-2 group-hover:scale-110 transition-transform" size={24} />
            <p className="text-white font-semibold">Governance</p>
            <p className="text-xs text-gray-400 mt-1">Unlock goals and approvals</p>
          </button>

          <button
            onClick={() => navigate('/admin/audit')}
            className="bg-[#0F1629] border border-white/5 hover:border-red-500/30 rounded-xl p-4 text-left transition-all group"
          >
            <Activity className="text-red-400 mb-2 group-hover:scale-110 transition-transform" size={24} />
            <p className="text-white font-semibold">Audit Logs</p>
            <p className="text-xs text-gray-400 mt-1">View system activity</p>
          </button>
        </motion.div>

        <style>{`
          .custom-scrollbar::-webkit-scrollbar {
            width: 4px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: rgba(255, 255, 255, 0.02);
            border-radius: 4px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: rgba(255, 255, 255, 0.1);
            border-radius: 4px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: rgba(255, 255, 255, 0.2);
          }
        `}</style>
      </div>
  );
}


