import { NavLink } from "react-router-dom";
import { LayoutDashboard, Target, Users, BarChart2, ShieldCheck, UserCircle, Calendar, ShieldAlert, CheckSquare } from "lucide-react";

export default function Sidebar() {
  const navItems = [
    { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { label: "Goals", path: "/goals", icon: Target },
    { label: "Check-ins", path: "/checkins", icon: CheckSquare },
    { label: "Team (Manager)", path: "/manager", icon: Users },
    { label: "Analytics", path: "/analytics", icon: BarChart2 },
    { label: "Admin Hub", path: "/admin", icon: ShieldCheck },
    { label: "Governance", path: "/admin/governance", icon: ShieldAlert },
    { label: "Users", path: "/admin/users", icon: Users },
    { label: "Audit Logs", path: "/admin/audit", icon: ShieldCheck },
    { label: "Cycles", path: "/admin/cycles", icon: Calendar },
    { label: "Org Analytics", path: "/admin/analytics", icon: BarChart2 },
  ];

  return (
    <aside className="w-64 h-screen overflow-y-auto custom-scrollbar bg-card border-r border-border flex flex-col hidden md:flex">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-primary tracking-wide">THRYVE</h2>
      </div>
      <nav className="flex-1 px-4 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? "bg-primary/10 text-primary font-semibold"
                  : "text-gray-400 hover:text-white hover:bg-border/50 font-medium"
              }`
            }
          >
            <item.icon size={20} />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
      <div className="p-4 border-t border-border">
        <button className="flex items-center gap-3 w-full px-4 py-3 text-gray-400 hover:text-white hover:bg-border/50 rounded-lg transition-colors">
          <UserCircle size={20} />
          <span className="font-medium">Profile</span>
        </button>
      </div>
    </aside>
  );
}
