import { useState } from "react";
import BackButton from "../../components/common/BackButton";
import Breadcrumb from "../../components/common/Breadcrumb";

export default function UserManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  const users = [
    { id: 1, name: "John Doe", email: "john.doe@company.com", role: "Employee", department: "Engineering", status: "active", joinDate: "2022-01-15" },
    { id: 2, name: "Jane Smith", email: "jane.smith@company.com", role: "Manager", department: "Product", status: "active", joinDate: "2021-06-20" },
    { id: 3, name: "Mike Johnson", email: "mike.j@company.com", role: "Employee", department: "Marketing", status: "active", joinDate: "2023-03-10" },
    { id: 4, name: "Sarah Williams", email: "sarah.w@company.com", role: "Manager", department: "Sales", status: "active", joinDate: "2020-11-05" },
    { id: 5, name: "Tom Brown", email: "tom.brown@company.com", role: "Employee", department: "Engineering", status: "disabled", joinDate: "2022-08-22" },
    { id: 6, name: "Lisa Anderson", email: "lisa.a@company.com", role: "Admin", department: "HR", status: "active", joinDate: "2019-04-15" },
    { id: 7, name: "David Lee", email: "david.lee@company.com", role: "Employee", department: "Finance", status: "active", joinDate: "2023-01-08" },
    { id: 8, name: "Emma Wilson", email: "emma.w@company.com", role: "Manager", department: "Engineering", status: "active", joinDate: "2021-09-12" },
  ];

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === "all" || user.role === filterRole;
    const matchesStatus = filterStatus === "all" || user.status === filterStatus;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const getRoleBadgeColor = (role) => {
    switch (role) {
      case "Admin": return "bg-error/20 text-error border-error/30";
      case "Manager": return "bg-tertiary/20 text-tertiary border-tertiary/30";
      case "Employee": return "bg-secondary/20 text-secondary border-secondary/30";
      default: return "bg-on-surface-variant/20 text-on-surface-variant border-on-surface-variant/30";
    }
  };

  const getStatusBadgeColor = (status) => {
    return status === "active" 
      ? "bg-secondary/20 text-secondary border-secondary/30"
      : "bg-error/20 text-error border-error/30";
  };

  return (
    <main className="pt-8 px-margin-mobile md:px-margin-desktop pb-24 max-w-container-max mx-auto min-h-screen">
      <Breadcrumb />
      <BackButton to="/admin/dashboard" label="Back to Dashboard" />

      <header className="mb-10 mt-6">
        <div className="flex items-center gap-2 text-on-surface-variant mb-2">
          <span className="material-symbols-outlined text-error text-[20px]">manage_accounts</span>
          <span className="font-label-caps text-label-caps tracking-widest uppercase text-error">
            User Administration
          </span>
        </div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface">
              User Management
            </h2>
            <p className="font-body-base text-body-base text-on-surface-variant mt-2">
              Manage user accounts, roles, and permissions
            </p>
          </div>
          <button className="px-6 py-3 bg-primary hover:bg-primary-fixed text-on-primary rounded-lg font-title-md text-body-sm font-semibold transition-all shadow-[0_0_15px_rgba(192,193,255,0.2)] hover:shadow-[0_0_25px_rgba(192,193,255,0.4)] flex items-center justify-center gap-2 w-full md:w-auto">
            <span className="material-symbols-outlined text-[20px]">person_add</span>
            Add New User
          </button>
        </div>
      </header>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-[#0F172A] border border-white/5 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-error/20 border border-error/30 flex items-center justify-center">
              <span className="material-symbols-outlined text-error text-[20px]">groups</span>
            </div>
            <div>
              <div className="font-display-xl text-[28px] font-bold text-on-surface leading-none">{users.length}</div>
              <p className="font-body-sm text-[12px] text-on-surface-variant">Total Users</p>
            </div>
          </div>
        </div>

        <div className="bg-[#0F172A] border border-white/5 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-secondary/20 border border-secondary/30 flex items-center justify-center">
              <span className="material-symbols-outlined text-secondary text-[20px]">check_circle</span>
            </div>
            <div>
              <div className="font-display-xl text-[28px] font-bold text-on-surface leading-none">
                {users.filter(u => u.status === "active").length}
              </div>
              <p className="font-body-sm text-[12px] text-on-surface-variant">Active Users</p>
            </div>
          </div>
        </div>

        <div className="bg-[#0F172A] border border-white/5 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-tertiary/20 border border-tertiary/30 flex items-center justify-center">
              <span className="material-symbols-outlined text-tertiary text-[20px]">supervisor_account</span>
            </div>
            <div>
              <div className="font-display-xl text-[28px] font-bold text-on-surface leading-none">
                {users.filter(u => u.role === "Manager").length}
              </div>
              <p className="font-body-sm text-[12px] text-on-surface-variant">Managers</p>
            </div>
          </div>
        </div>

        <div className="bg-[#0F172A] border border-white/5 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center">
              <span className="material-symbols-outlined text-primary text-[20px]">admin_panel_settings</span>
            </div>
            <div>
              <div className="font-display-xl text-[28px] font-bold text-on-surface leading-none">
                {users.filter(u => u.role === "Admin").length}
              </div>
              <p className="font-body-sm text-[12px] text-on-surface-variant">Admins</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-[#0F172A] border border-white/5 rounded-xl p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">
              search
            </span>
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-surface-container border border-outline-variant/20 rounded-lg pl-10 pr-4 py-3 text-body-base text-on-surface placeholder-on-surface-variant/50 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 outline-none transition-all"
            />
          </div>

          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="w-full bg-surface-container border border-outline-variant/20 rounded-lg px-4 py-3 text-body-base text-on-surface focus:border-primary/50 focus:ring-2 focus:ring-primary/20 outline-none transition-all appearance-none cursor-pointer"
          >
            <option value="all">All Roles</option>
            <option value="Admin">Admin</option>
            <option value="Manager">Manager</option>
            <option value="Employee">Employee</option>
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="w-full bg-surface-container border border-outline-variant/20 rounded-lg px-4 py-3 text-body-base text-on-surface focus:border-primary/50 focus:ring-2 focus:ring-primary/20 outline-none transition-all appearance-none cursor-pointer"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="disabled">Disabled</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-[#0F172A] border border-white/5 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-surface-container/50 border-b border-outline-variant/10">
              <tr>
                <th className="px-6 py-4 text-left font-body-sm text-[12px] font-semibold text-on-surface-variant uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-4 text-left font-body-sm text-[12px] font-semibold text-on-surface-variant uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-4 text-left font-body-sm text-[12px] font-semibold text-on-surface-variant uppercase tracking-wider">
                  Department
                </th>
                <th className="px-6 py-4 text-left font-body-sm text-[12px] font-semibold text-on-surface-variant uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left font-body-sm text-[12px] font-semibold text-on-surface-variant uppercase tracking-wider">
                  Join Date
                </th>
                <th className="px-6 py-4 text-right font-body-sm text-[12px] font-semibold text-on-surface-variant uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-surface-variant/20 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-secondary to-primary flex items-center justify-center text-[14px] font-bold text-surface-container-lowest">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="font-body-sm text-body-sm text-on-surface font-medium">{user.name}</p>
                        <p className="font-body-sm text-[12px] text-on-surface-variant">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-label-caps uppercase tracking-wider border ${getRoleBadgeColor(user.role)}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-body-sm text-body-sm text-on-surface">{user.department}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-label-caps uppercase tracking-wider border ${getStatusBadgeColor(user.status)}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-body-sm text-body-sm text-on-surface-variant">{user.joinDate}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        className="p-2 rounded-lg bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-all"
                        title="Edit User"
                      >
                        <span className="material-symbols-outlined text-[18px]">edit</span>
                      </button>
                      <button 
                        className={`p-2 rounded-lg transition-all ${
                          user.status === "active"
                            ? "bg-error/10 text-error border border-error/20 hover:bg-error/20"
                            : "bg-secondary/10 text-secondary border border-secondary/20 hover:bg-secondary/20"
                        }`}
                        title={user.status === "active" ? "Disable User" : "Enable User"}
                      >
                        <span className="material-symbols-outlined text-[18px]">
                          {user.status === "active" ? "block" : "check_circle"}
                        </span>
                      </button>
                      <button 
                        className="p-2 rounded-lg bg-surface-variant/30 text-on-surface-variant border border-outline-variant/20 hover:bg-surface-variant/50 transition-all"
                        title="More Options"
                      >
                        <span className="material-symbols-outlined text-[18px]">more_vert</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredUsers.length === 0 && (
          <div className="p-12 text-center">
            <span className="material-symbols-outlined text-[64px] text-on-surface-variant opacity-20 block mb-4">person_off</span>
            <h3 className="font-title-md text-title-md text-on-surface mb-2">No users found</h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
