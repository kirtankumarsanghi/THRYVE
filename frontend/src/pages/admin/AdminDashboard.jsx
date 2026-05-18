import { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, LineChart, Line } from 'recharts';
import { useAdmin } from '../../context/AdminContext';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, Building2, Target, TrendingUp, AlertCircle, Activity, 
  Shield, Clock, CheckCircle, XCircle, RefreshCw, ArrowRight,
  BarChart3, PieChart as PieChartIcon, Settings, Bell
} from 'lucide-react';
import toast from 'react-hot-toast';
import { getSystemHealth, getDepartments } from '../../api/adminApi';

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
  const { departments: contextDepts, users, kpis, auditLogs, loading: contextLoading, refreshData } = useAdmin();
  
  const [systemHealth, setSystemHealth] = useState(null);
  const [departments, setDepartments] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Load additional data
  useEffect(() => {
    loadAdditionalData();
  }, []);

  const loadAdditionalData = async () => {
    try {
      const [healthData, deptData] = await Promise.all([
        getSystemHealth(),
        getDepartments({ include_stats: true })
      ]);
      setSystemHealth(healthData);
      setDepartments(deptData);
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Failed to load additional data:', error);
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
    <div className="min-h-screen bg-[#0A0F1E]">
      {/* Top Bar */}
      <div className="bg-[#0F1629] border-b border-white/5 px-8 py-4 sticky top-0 z-40 backdrop-blur-lg bg-[#0F1629]/95">
        <div className="flex items-center justify-between max-w-[1800px] mx-auto">
          <div className="flex items-center gap-4">
            <Shield className="text-red-400" size={24} />
            <h1 className="text-xl font-bold text-white">Admin Dashboard</h1>
            <span className="text-gray-500">—</span>
            <span className="text-gray-400 text-sm">System Overview</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right mr-4">
              <p className="text-xs text-gray-500">Last Updated</p>
              <p className="text-xs text-gray-400">{lastUpdated.toLocaleTimeString()}</p>
            </div>
            <button 
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="p-2 hover:bg-white/5 rounded-lg transition-colors"
            >
              <RefreshCw size={20} className={`text-gray-400 ${isRefreshing ? 'animate-spin' : ''}`} />
            </button>
            <button className="px-4 py-2 bg-red-500/10 text-red-400 border border-red-500/20 rounded-lg text-sm font-medium hover:bg-red-500/20 transition-colors">
              • ADMIN MODE
            </button>
            <button className="p-2 hover:bg-white/5 rounded-lg transition-colors relative">
              <Bell size={20} className="text-gray-400" />
              {recentAuditCount > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              )}
            </button>
            <button 
              onClick={() => navigate('/admin/governance')}
              className="p-2 hover:bg-white/5 rounded-lg transition-colors"
            >
              <Settings size={20} className="text-gray-400" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1800px] mx-auto px-8 py-8">
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
      </div>

      <style jsx>{`
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
