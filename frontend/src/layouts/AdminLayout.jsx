import { useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  Home, Users, Calendar, Shield, Download,
  Settings, LogOut, Menu, X, ChevronRight, Building2
} from "lucide-react";

const NAV_ITEMS = [
  { label: "Dashboard",       path: "/admin/dashboard",   icon: Home },
  { label: "User Management", path: "/admin/users",       icon: Users },
  { label: "Departments",     path: "/admin/departments", icon: Building2 },
  { label: "Review Cycles",   path: "/admin/cycles",      icon: Calendar },
  { label: "Audit Logs",      path: "/admin/audit",       icon: Shield },
  { label: "Reports & Export",path: "/admin/analytics",   icon: Download },
  { label: "Governance",      path: "/admin/governance",  icon: Settings },
];

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const userName = user?.name || "Admin";
  const initials = userName.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);

  return (
    <div className="flex h-screen bg-[#060D1F] overflow-hidden font-sans">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed md:static inset-y-0 left-0 z-50 w-72
          bg-[#0B1437]/90 backdrop-blur-2xl border-r border-white/5
          flex flex-col transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-6 py-6 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center shadow-[0_0_15px_rgba(239,68,68,0.4)]">
              <Shield size={18} className="text-white" />
            </div>
            <span className="text-xl font-bold tracking-wide text-white">THRYVE</span>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="md:hidden text-gray-400 hover:text-white">
            <X size={20} />
          </button>
        </div>

        {/* User Identity Card */}
        <div className="mx-4 mt-5 p-4 rounded-2xl bg-red-500/10 border border-red-500/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-red-500/30 border-2 border-red-500/40 flex items-center justify-center text-sm font-bold text-red-300">
              {initials}
            </div>
            <div>
              <p className="text-sm font-semibold text-white">{userName}</p>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-widest bg-red-500/20 text-red-300 border border-red-500/30 mt-1">
                Administrator
              </span>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {NAV_ITEMS.map(({ label, path, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
              end={path.endsWith("dashboard")}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group ${
                  isActive
                    ? "bg-red-500/15 text-red-300 border border-red-500/25 shadow-[inset_0_0_10px_rgba(239,68,68,0.05)]"
                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon size={18} className={isActive ? "text-red-400" : "text-gray-500 group-hover:text-gray-300"} />
                  <span className="flex-1">{label}</span>
                  {isActive && <ChevronRight size={14} className="text-red-400 opacity-70" />}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Divider + System Info */}
        <div className="px-4 py-3 mx-4 mb-2 rounded-xl bg-white/3 border border-white/5 text-center">
          <p className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold">System Access</p>
          <p className="text-[11px] text-red-400/80 font-medium mt-0.5">Full Permissions</p>
        </div>

        {/* Logout */}
        <div className="px-4 pb-6">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 hover:text-red-300 border border-transparent hover:border-red-500/20 transition-all duration-200"
          >
            <LogOut size={18} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="h-16 bg-[#0B1437]/60 backdrop-blur-xl border-b border-white/5 flex items-center justify-between px-6 flex-shrink-0">
          <button
            className="md:hidden text-gray-400 hover:text-white p-2 rounded-lg hover:bg-white/5"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={20} />
          </button>

          <div className="hidden md:flex items-center gap-3">
            <Shield size={16} className="text-red-400" />
            <span className="text-gray-400 text-sm">
              Admin Console — <span className="text-white font-medium">{userName}</span>
            </span>
          </div>

          <div className="flex items-center gap-4 ml-auto">
            <span className="hidden sm:inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest bg-red-500/15 text-red-300 border border-red-500/25">
              Admin Mode
            </span>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-sm text-gray-400 hover:text-red-400 transition-colors px-3 py-2 rounded-lg hover:bg-red-500/10"
            >
              <LogOut size={16} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden bg-[#060D1F]">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

