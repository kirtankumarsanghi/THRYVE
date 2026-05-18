import { useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useManager } from "../context/ManagerContext";
import {
  Home, Users, CheckCircle2, ClipboardList, BarChart3,
  Bell, LogOut, Menu, X, ChevronRight, Target, Calendar,
  MessageSquare, Award, FileText, TrendingUp, Video
} from "lucide-react";

export default function ManagerLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { pendingApprovals } = useManager();

  const pendingCount = pendingApprovals?.length || 0;

  const NAV_ITEMS = [
    { label: "Dashboard",            path: "/manager/dashboard",   icon: Home },
    { label: "My Team",              path: "/manager/team",        icon: Users },
    {
      label: "Pending Approvals",    path: "/manager/approvals",   icon: CheckCircle2,
      badge: pendingCount,
    },
    { label: "Team Goals",           path: "/manager/team-goals",  icon: Target },
    { label: "1-on-1 Meetings",      path: "/manager/one-on-ones", icon: Video },
    { label: "Team Check-ins",       path: "/manager/checkins",    icon: ClipboardList },
    { label: "Performance Insights", path: "/manager/insights",    icon: TrendingUp },
    { label: "Feedback & Recognition", path: "/manager/feedback",  icon: Award },
    { label: "Team Calendar",        path: "/manager/calendar",    icon: Calendar },
    { label: "Reports & Export",     path: "/manager/reports",     icon: FileText },
    { label: "Team Analytics",       path: "/manager/analytics",   icon: BarChart3 },
    { label: "Notifications",        path: "/manager/notifications", icon: Bell },
  ];

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const userName = user?.full_name || user?.name || "Manager";
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
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-[0_0_15px_rgba(168,85,247,0.4)]">
              <Users size={18} className="text-white" />
            </div>
            <span className="text-xl font-bold tracking-wide text-white">THRYVE</span>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="md:hidden text-gray-400 hover:text-white">
            <X size={20} />
          </button>
        </div>

        {/* User Identity Card */}
        <div className="mx-4 mt-5 p-4 rounded-2xl bg-purple-500/10 border border-purple-500/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-purple-500/30 border-2 border-purple-500/40 flex items-center justify-center text-sm font-bold text-purple-300">
              {initials}
            </div>
            <div>
              <p className="text-sm font-semibold text-white">{userName}</p>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-widest bg-purple-500/20 text-purple-300 border border-purple-500/30 mt-1">
                Manager
              </span>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {NAV_ITEMS.map(({ label, path, icon: Icon, badge }) => (
            <NavLink
              key={path}
              to={path}
              end={path.endsWith("dashboard")}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group ${
                  isActive
                    ? "bg-purple-500/15 text-purple-300 border border-purple-500/25 shadow-[inset_0_0_10px_rgba(168,85,247,0.05)]"
                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon size={18} className={isActive ? "text-purple-400" : "text-gray-500 group-hover:text-gray-300"} />
                  <span className="flex-1">{label}</span>
                  {badge > 0 && (
                    <span className="min-w-[20px] h-5 px-1.5 rounded-full bg-purple-500 text-white text-[10px] font-bold flex items-center justify-center">
                      {badge}
                    </span>
                  )}
                  {isActive && !badge && <ChevronRight size={14} className="text-purple-400 opacity-70" />}
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
            {pendingCount > 0 && (
              <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-orange-500/15 text-orange-300 border border-orange-500/25">
                <CheckCircle2 size={13} />
                {pendingCount} Pending
              </span>
            )}
            <span className="hidden sm:inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest bg-purple-500/15 text-purple-300 border border-purple-500/25">
              Manager Mode
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
