import { useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  Home, Target, Calendar, BarChart2, Bell, LogOut, Menu, X, ChevronRight
} from "lucide-react";

const NAV_ITEMS = [
  { label: "Dashboard",          path: "/employee/dashboard", icon: Home },
  { label: "My Goals",           path: "/employee/goals",     icon: Target },
  { label: "Quarterly Check-ins",path: "/employee/checkins",  icon: Calendar },
  { label: "My Progress",        path: "/employee/analytics", icon: BarChart2 },
  { label: "Notifications",      path: "/employee/notifications", icon: Bell },
];

export default function EmployeeLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const userName = user?.name || "Employee";
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
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.4)]">
              <Target size={18} className="text-white" />
            </div>
            <span className="text-xl font-bold tracking-wide text-white">THRYVE</span>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="md:hidden text-gray-400 hover:text-white">
            <X size={20} />
          </button>
        </div>

        {/* User Identity Card */}
        <div className="mx-4 mt-5 p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-500/30 border-2 border-blue-500/40 flex items-center justify-center text-sm font-bold text-blue-300">
              {initials}
            </div>
            <div>
              <p className="text-sm font-semibold text-white">{userName}</p>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-widest bg-blue-500/20 text-blue-300 border border-blue-500/30 mt-1">
                Employee
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
                    ? "bg-blue-500/15 text-blue-300 border border-blue-500/25 shadow-[inset_0_0_10px_rgba(59,130,246,0.05)]"
                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon size={18} className={isActive ? "text-blue-400" : "text-gray-500 group-hover:text-gray-300"} />
                  <span className="flex-1">{label}</span>
                  {isActive && <ChevronRight size={14} className="text-blue-400 opacity-70" />}
                </>
              )}
            </NavLink>
          ))}
        </nav>

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

          <div className="hidden md:block text-gray-400 text-sm">
            Welcome back, <span className="text-white font-medium">{userName}</span>
          </div>

          <div className="flex items-center gap-4 ml-auto">
            <span className="hidden sm:inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest bg-blue-500/15 text-blue-300 border border-blue-500/25">
              🔵 Employee Mode
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
