import { useMemo, useState } from "react";
import BackButton from "../../components/common/BackButton";
import Breadcrumb from "../../components/common/Breadcrumb";
import { useAdmin } from "../../context/AdminContext";

export default function UserManagement() {
  const { users, loading, updateUserRole } = useAdmin();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("all");

  const filtered = useMemo(() => {
    return (users || []).filter((u) => {
      const s = `${u.full_name} ${u.email} ${u.department || ''}`.toLowerCase();
      const okSearch = s.includes(searchTerm.toLowerCase());
      const okRole = filterRole === "all" || u.role === filterRole;
      return okSearch && okRole;
    });
  }, [users, searchTerm, filterRole]);

  return (
    <main className="pt-8 px-margin-mobile md:px-margin-desktop pb-24 max-w-container-max mx-auto min-h-screen">
      <Breadcrumb />
      <BackButton to="/admin/dashboard" label="Back to Dashboard" />

      <header className="mb-8 mt-6">
        <h2 className="text-2xl font-bold text-on-surface">User Management</h2>
        <p className="text-on-surface-variant text-sm">Live users and role governance.</p>
      </header>

      <div className="bg-[#0F172A] border border-white/5 rounded-xl p-4 mb-4 grid grid-cols-1 md:grid-cols-3 gap-3">
        <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search users..." className="bg-surface-container border border-outline-variant/20 rounded-lg px-3 py-2 text-on-surface" />
        <select value={filterRole} onChange={(e) => setFilterRole(e.target.value)} className="bg-surface-container border border-outline-variant/20 rounded-lg px-3 py-2 text-on-surface">
          <option value="all">All roles</option>
          <option value="employee">employee</option>
          <option value="manager">manager</option>
          <option value="admin">admin</option>
        </select>
      </div>

      <div className="bg-[#0F172A] border border-white/5 rounded-xl overflow-hidden">
        {loading ? <p className="p-6 text-on-surface-variant">Loading users...</p> : (
          <table className="w-full">
            <thead className="bg-surface-container/50 border-b border-outline-variant/10">
              <tr>
                <th className="px-4 py-3 text-left text-xs text-on-surface-variant">Name</th>
                <th className="px-4 py-3 text-left text-xs text-on-surface-variant">Email</th>
                <th className="px-4 py-3 text-left text-xs text-on-surface-variant">Department</th>
                <th className="px-4 py-3 text-left text-xs text-on-surface-variant">Role</th>
                <th className="px-4 py-3 text-left text-xs text-on-surface-variant">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((u) => (
                <tr key={u.id} className="border-t border-outline-variant/10">
                  <td className="px-4 py-3 text-on-surface">{u.full_name}</td>
                  <td className="px-4 py-3 text-on-surface-variant text-sm">{u.email}</td>
                  <td className="px-4 py-3 text-on-surface-variant">{u.department || '-'}</td>
                  <td className="px-4 py-3">
                    <select
                      value={u.role}
                      onChange={(e) => updateUserRole(u.id, e.target.value)}
                      className="bg-surface-container border border-outline-variant/20 rounded-lg px-2 py-1 text-on-surface"
                    >
                      <option value="employee">employee</option>
                      <option value="manager">manager</option>
                      <option value="admin">admin</option>
                    </select>
                  </td>
                  <td className="px-4 py-3 text-on-surface-variant">{u.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </main>
  );
}
