import { useMemo, useState } from "react";
import { ArrowLeft, Bell, Settings, Search, Filter, UserCog, Shield, Users as UsersIcon, RefreshCw } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAdmin } from "../../context/AdminContext";
import toast from "react-hot-toast";

const fade = (d = 0) => ({ initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, transition: { delay: d } });

const ROLE_COLORS = {
  admin: { bg: "bg-red-500/10", text: "text-red-400", border: "border-red-500/20" },
  manager: { bg: "bg-purple-500/10", text: "text-purple-400", border: "border-purple-500/20" },
  employee: { bg: "bg-blue-500/10", text: "text-blue-400", border: "border-blue-500/20" },
};

const STATUS_COLORS = {
  active: { bg: "bg-emerald-500/10", text: "text-emerald-400", border: "border-emerald-500/20" },
  inactive: { bg: "bg-gray-500/10", text: "text-gray-400", border: "border-gray-500/20" },
};

export default function UserManagement() {
  const { users, loading, updateUserRole, refreshData } = useAdmin();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const filtered = useMemo(() => {
    return (users || []).filter((u) => {
      const s = `${u.full_name} ${u.email} ${u.department || ''}`.toLowerCase();
      const okSearch = s.includes(searchTerm.toLowerCase());
      const okRole = filterRole === "all" || u.role === filterRole;
      return okSearch && okRole;
    });
  }, [users, searchTerm, filterRole]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refreshData();
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      await updateUserRole(userId, newRole);
      toast.success(`User role updated to ${newRole}`);
    } catch (error) {
      toast.error("Failed to update user role");
    }
  };

  const roleStats = useMemo(() => {
    const stats = { admin: 0, manager: 0, employee: 0 };
    (users || []).forEach(u => {
      if (stats.hasOwnProperty(u.role)) stats[u.role]++;
    });
    return stats;
  }, [users]);

  return (
    <div className="max-w-[1800px] mx-auto px-8 py-8 space-y-6 text-white">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-sm text-slate-400 mb-2">
            <span>Admin</span>
            <span className="text-gray-600">&gt;</span>
            <span className="text-indigo-400">User Management</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight">User Management</h2>
          <p className="text-slate-400 mt-2 text-sm max-w-xl">
            Manage users, roles, and access control across the organization.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg text-sm font-semibold transition-colors border border-white/10"
          >
            <RefreshCw size={16} className={isRefreshing ? 'animate-spin' : ''} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-8">
          <motion.div {...fade(0.05)} className="bg-[#0F1629] border border-white/5 rounded-2xl p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20">
                <UsersIcon className="text-indigo-400" size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-400 mb-1">Total Users</p>
                <p className="text-3xl font-bold text-white">{users?.length || 0}</p>
              </div>
            </div>
          </motion.div>

          <motion.div {...fade(0.1)} className="bg-[#0F1629] border border-white/5 rounded-2xl p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center border border-red-500/20">
                <Shield className="text-red-400" size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-400 mb-1">Admins</p>
                <p className="text-3xl font-bold text-red-400">{roleStats.admin}</p>
              </div>
            </div>
          </motion.div>

          <motion.div {...fade(0.15)} className="bg-[#0F1629] border border-white/5 rounded-2xl p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20">
                <UserCog className="text-purple-400" size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-400 mb-1">Managers</p>
                <p className="text-3xl font-bold text-purple-400">{roleStats.manager}</p>
              </div>
            </div>
          </motion.div>

          <motion.div {...fade(0.2)} className="bg-[#0F1629] border border-white/5 rounded-2xl p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                <UsersIcon className="text-blue-400" size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-400 mb-1">Employees</p>
                <p className="text-3xl font-bold text-blue-400">{roleStats.employee}</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Filters */}
        <motion.div {...fade(0.25)} className="bg-[#0F1629] border border-white/5 rounded-2xl p-5 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name, email, or department..."
                className="w-full bg-[#1A2235] border border-white/10 rounded-lg pl-12 pr-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <select
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                className="w-full bg-[#1A2235] border border-white/10 rounded-lg pl-12 pr-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors appearance-none cursor-pointer"
              >
                <option value="all">All Roles</option>
                <option value="admin">Admin</option>
                <option value="manager">Manager</option>
                <option value="employee">Employee</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Users Table */}
        <motion.div {...fade(0.3)} className="bg-[#0F1629] border border-white/5 rounded-2xl overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#1A2235] border-b border-white/10">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">User</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Department</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Role</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filtered.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="px-6 py-12 text-center text-gray-400">
                        No users found matching your criteria
                      </td>
                    </tr>
                  ) : (
                    filtered.map((u, idx) => (
                      <motion.tr
                        key={u.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: idx * 0.02 }}
                        className="hover:bg-white/[0.02] transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                              {u.full_name?.split(" ").map(n => n[0]).join("") || "?"}
                            </div>
                            <span className="text-white font-medium">{u.full_name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-400 text-sm">{u.email}</td>
                        <td className="px-6 py-4 text-gray-300">{u.department || '-'}</td>
                        <td className="px-6 py-4">
                          <select
                            value={u.role}
                            onChange={(e) => handleRoleChange(u.id, e.target.value)}
                            className={`${ROLE_COLORS[u.role]?.bg} ${ROLE_COLORS[u.role]?.text} border ${ROLE_COLORS[u.role]?.border} rounded-lg px-3 py-2 text-sm font-bold uppercase tracking-wider focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer`}
                          >
                            <option value="employee">Employee</option>
                            <option value="manager">Manager</option>
                            <option value="admin">Admin</option>
                          </select>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-lg ${STATUS_COLORS[u.status]?.bg} ${STATUS_COLORS[u.status]?.text} border ${STATUS_COLORS[u.status]?.border}`}>
                            {u.status}
                          </span>
                        </td>
                      </motion.tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>

        {/* Info Card */}
        <motion.div {...fade(0.35)} className="mt-6 bg-blue-500/10 border border-blue-500/20 rounded-xl p-6">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-blue-400 text-lg">i</span>
            </div>
            <div>
              <h3 className="text-white font-bold mb-2">Role Management Guidelines</h3>
              <ul className="text-sm text-gray-400 space-y-1">
                <li>* <strong className="text-red-400">Admin:</strong> Full system access, can manage all users and settings</li>
                <li>* <strong className="text-purple-400">Manager:</strong> Can view and approve team goals, manage direct reports</li>
                <li>* <strong className="text-blue-400">Employee:</strong> Can create and manage their own goals</li>
                <li>* Role changes take effect immediately and are logged in the audit trail</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
  );
}


