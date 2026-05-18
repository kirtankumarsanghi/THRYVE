import { useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ThryveLogo from "../components/branding/ThryveLogo";
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

  const userName = user?.full_name || user?.name || "Admin";
  const initials = userName.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);

  return (
    <div className="flex h-screen bg-[#030712] overflow-hidden font-sans text-gray-300">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 md:hidden transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed md:static inset-y-0 left-0 z-50 w-72
          bg-[#0B1221]/95 backdrop-blur-2xl border-r border-white/5
          flex flex-col transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
          shadow-[4px_0_24px_rgba(0,0,0,0.5)] md:shadow-none
        `}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-6 py-6 border-b border-white/5">
          <ThryveLogo size="sm" />
          <button onClick={() => setSidebarOpen(false)} className="md:hidden text-gray-400 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* User Identity Card */}
        <div className="mx-4 mt-6 p-4 rounded-2xl bg-gradient-to-br from-red-500/10 to-orange-500/10 border border-red-500/20 shadow-lg shadow-red-900/20">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-red-500/20 border border-red-500/40 flex items-center justify-center text-sm font-bold text-red-300 shadow-inner">
              {initials}
            </div>
            <div>
              <p className="text-sm font-bold text-white tracking-wide">{userName}</p>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest bg-red-500/20 text-red-300 border border-red-500/30 mt-1">
                Administrator
              </span>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto custom-scrollbar">
          <p className="px-4 text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-3">System Menu</p>
          {NAV_ITEMS.map(({ label, path, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
              end={path.endsWith("dashboard")}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 group relative overflow-hidden ${
                  isActive
                    ? "bg-red-500/15 text-red-300 border border-red-500/30 shadow-[0_0_15px_rgba(239,68,68,0.1)]"
                    : "text-gray-400 hover:bg-white/5 hover:text-white border border-transparent"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-400 rounded-r-md shadow-[0_0_10px_rgba(239,68,68,1)]" />}
                  <Icon size={18} className={`relative z-10 transition-colors ${isActive ? "text-red-400" : "text-gray-500 group-hover:text-gray-300"}`} />
                  <span className="flex-1 relative z-10">{label}</span>
                  {isActive && <ChevronRight size={14} className="text-red-400 opacity-70 relative z-10" />}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Divider + System Info */}
        <div className="px-4 py-3 mx-4 mb-2 rounded-xl bg-white/5 border border-white/10 text-center shadow-inner">
          <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">System Access</p>
          <div className="flex items-center justify-center gap-1.5 mt-1">
            <Shield size={12} className="text-red-400" />
            <p className="text-[11px] text-red-400 font-bold tracking-wide">Full Permissions</p>
          </div>
        </div>

        {/* Logout */}
        <div className="p-4 border-t border-white/5">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 hover:text-red-300 border border-transparent hover:border-red-500/20 transition-all duration-300"
          >
            <LogOut size={18} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden relative">
        {/* Topbar */}
        <header className="h-16 bg-[#030712]/80 backdrop-blur-xl border-b border-white/5 flex items-center justify-between px-6 flex-shrink-0 z-30 sticky top-0">
          <button
            className="md:hidden text-gray-400 hover:text-white p-2 rounded-lg hover:bg-white/5 transition-colors"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={20} />
          </button>

          <div className="hidden md:flex items-center gap-3">
            <div className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </div>
            <span className="text-gray-400 text-sm">
              Admin Console - <span className="text-white font-semibold">{userName}</span>
            </span>
          </div>

          <div className="flex items-center gap-4 ml-auto">
            <span className="hidden sm:inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest bg-red-500/10 text-red-400 border border-red-500/20 shadow-inner">
              Admin Portal
            </span>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-sm text-gray-400 hover:text-red-400 transition-colors px-3 py-2 rounded-lg hover:bg-red-500/10 border border-transparent hover:border-red-500/20"
            >
              <LogOut size={16} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden bg-[#030712] relative">
          <Outlet />
        </main>
      </div>
    </div>
  );
}


