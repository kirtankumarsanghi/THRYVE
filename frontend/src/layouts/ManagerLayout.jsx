import { useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";

export default function ManagerLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const pendingApprovalsCount = 5; // This would come from your state/API

  const navItems = [
    { label: "Dashboard", path: "/manager/dashboard", icon: "home" },
    { label: "My Team", path: "/manager/team", icon: "groups" },
    { label: "Pending Approvals", path: "/manager/approvals", icon: "check_circle", badge: pendingApprovalsCount },
    { label: "Team Check-ins", path: "/manager/checkins", icon: "assignment" },
    { label: "Team Analytics", path: "/manager/analytics", icon: "bar_chart" },
    { label: "Notifications", path: "/manager/notifications", icon: "notifications" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar Overlay for Mobile */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed md:static inset-y-0 left-0 z-50 w-[280px] bg-surface-container/80 backdrop-blur-xl border-r border-outline-variant/10 shadow-2xl shadow-primary/5 flex flex-col p-gutter transition-transform duration-300 ease-in-out ${isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}>
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="font-display-xl text-display-xl font-bold text-primary tracking-tighter leading-none">
              Thryve
            </div>
            <button 
              className="md:hidden text-on-surface-variant hover:text-primary transition-colors"
              onClick={() => setIsSidebarOpen(false)}
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-xl bg-surface-variant/30 border border-outline-variant/10">
            <div className="w-10 h-10 rounded-full bg-tertiary/20 text-tertiary flex items-center justify-center font-title-md font-bold border-2 border-tertiary/30">
              SC
            </div>
            <div className="flex-1">
              <div className="font-title-md text-body-sm font-semibold text-on-surface">Sarah Chen</div>
              <div className="flex items-center gap-2 mt-1">
                <span className="px-2 py-0.5 rounded text-[10px] font-label-caps uppercase tracking-wider bg-tertiary/20 text-tertiary border border-tertiary/30">
                  Manager
                </span>
              </div>
            </div>
          </div>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setIsSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 relative ${
                  isActive
                    ? "text-tertiary font-bold bg-tertiary/10 shadow-[inset_3px_0_0_0] shadow-tertiary"
                    : "text-on-surface-variant hover:bg-surface-variant/50 hover:text-primary"
                }`
              }
            >
              <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
              <span className="font-title-md text-body-base flex-1">{item.label}</span>
              {item.badge && item.badge > 0 && (
                <span className="min-w-[20px] h-5 px-1.5 flex items-center justify-center bg-error text-on-primary rounded-full text-[10px] font-bold shadow-[0_0_10px_rgba(255,180,171,0.5)]">
                  {item.badge}
                </span>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto pt-6 border-t border-outline-variant/10">
          <button 
            onClick={handleLogout}
            className="w-full py-3 px-4 bg-error/10 text-error hover:bg-error/20 rounded-lg font-title-md text-body-sm font-semibold transition-colors flex justify-center items-center gap-2 border border-error/20"
          >
            <span className="material-symbols-outlined text-[18px]">logout</span>
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Top Bar */}
        <nav className="h-16 bg-surface/60 backdrop-blur-md border-b border-outline-variant/10 flex justify-between items-center px-margin-mobile md:px-margin-desktop z-30">
          <div className="flex items-center gap-4">
            <button 
              className="md:hidden text-on-surface-variant hover:text-primary transition-colors" 
              onClick={() => setIsSidebarOpen(true)}
            >
              <span className="material-symbols-outlined">menu</span>
            </button>
            <h1 className="font-headline-lg text-[20px] md:text-headline-lg font-black text-primary">Thryve</h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-tertiary/10 border border-tertiary/20 rounded-lg">
              <span className="material-symbols-outlined text-tertiary text-[16px]">person</span>
              <span className="font-body-sm text-body-sm text-on-surface">Sarah Chen</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-label-caps uppercase tracking-wider bg-tertiary/20 text-tertiary border border-tertiary/30">
                Manager
              </span>
            </div>
            <button 
              onClick={handleLogout}
              className="text-on-surface-variant hover:text-error transition-colors p-2 rounded-full hover:bg-error/10"
            >
              <span className="material-symbols-outlined">logout</span>
            </button>
          </div>
        </nav>

        {/* Page Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
