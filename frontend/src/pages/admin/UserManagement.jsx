import React, { useState } from 'react';
import PageContainer from '../../components/common/PageContainer';
import SectionHeader from '../../components/common/SectionHeader';
import DashboardCard from '../../components/dashboard/DashboardCard';
import { useAdmin } from '../../context/AdminContext';
import { UserPlus, MoreVertical, Search, ShieldOff, ShieldAlert } from 'lucide-react';

export default function UserManagement() {
  const { users, updateUserStatus } = useAdmin();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <PageContainer>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <SectionHeader 
          title="User Management" 
          subtitle="Manage roles, departments, and account access."
        />
        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-semibold text-sm">
          <UserPlus className="w-4 h-4" /> Add New User
        </button>
      </div>

      <DashboardCard>
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-dark border border-border rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-primary"
            />
          </div>
        </div>

        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border bg-dark/30">
                <th className="p-4 text-sm font-semibold text-gray-400">Employee</th>
                <th className="p-4 text-sm font-semibold text-gray-400">Role</th>
                <th className="p-4 text-sm font-semibold text-gray-400">Department</th>
                <th className="p-4 text-sm font-semibold text-gray-400">Status</th>
                <th className="p-4 text-sm font-semibold text-gray-400 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-b border-border/50 hover:bg-dark/50 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xs">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">{user.name}</p>
                        <p className="text-xs text-gray-500">{user.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-sm text-gray-300">{user.role}</td>
                  <td className="p-4 text-sm text-gray-300">
                    <span className="px-2 py-1 bg-dark border border-border rounded-md text-xs">{user.department}</span>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-md text-xs font-semibold border ${
                      user.status === 'active' ? 'bg-emerald-400/10 text-emerald-400 border-emerald-400/20' : 
                      'bg-red-400/10 text-red-400 border-red-400/20'
                    }`}>
                      {user.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => updateUserStatus(user.id, user.status === 'active' ? 'disabled' : 'active')}
                        className={`p-1.5 rounded-md border transition-colors ${
                          user.status === 'active' ? 'bg-dark border-border text-amber-400 hover:bg-amber-400/10' : 'bg-dark border-border text-emerald-400 hover:bg-emerald-400/10'
                        }`}
                        title={user.status === 'active' ? 'Disable User' : 'Enable User'}
                      >
                        {user.status === 'active' ? <ShieldOff className="w-4 h-4" /> : <ShieldAlert className="w-4 h-4" />}
                      </button>
                      <button className="p-1.5 text-gray-400 hover:text-white transition-colors">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredUsers.length === 0 && (
            <div className="text-center py-10 text-gray-500">
              No users found matching your search.
            </div>
          )}
        </div>
      </DashboardCard>
    </PageContainer>
  );
}
