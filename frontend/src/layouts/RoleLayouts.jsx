import React from "react";
import { Outlet } from "react-router-dom";
import Topbar from "../components/navigation/Topbar";
import { LayoutDashboard, Target, ClipboardCheck, BarChart3, Users, Shield } from "lucide-react";
import { NavLink } from "react-router-dom";

const Sidebar = ({ links, userName, userRole }) => (
  <aside className="w-72 bg-[#101935] border-r border-[#1E2A4A] p-5 hidden md:flex flex-col">
    <div>
      <h1 className="text-3xl font-bold text-[#8B7FFF]">Thryve</h1>
      <p className="text-sm text-gray-400 mt-1">Align. Achieve. Thryve.</p>
    </div>
    <nav className="mt-10 flex flex-col gap-2">
      {links.map((link) => {
        const Icon = link.icon;
        return (
          <NavLink
            key={link.name}
            to={link.path}
            end={link.path.endsWith('dashboard')} // Use end matching for dashboard
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                isActive ? "bg-[#8B7FFF] text-white" : "text-gray-400 hover:bg-[#1A2444] hover:text-white"
              }`
            }
          >
            <Icon size={20} />
            <span>{link.name}</span>
          </NavLink>
        );
      })}
    </nav>
    <div className="mt-auto bg-[#0F172A] p-4 rounded-2xl border border-[#1E2A4A]">
      <p className="font-semibold text-white">{userName}</p>
      <p className="text-sm text-gray-400 capitalize">{userRole}</p>
    </div>
  </aside>
);

export function EmployeeLayout() {
  const links = [
    { name: "Dashboard", path: "/employee/dashboard", icon: LayoutDashboard },
    { name: "My Goals", path: "/employee/goals", icon: Target },
    { name: "Check-ins", path: "/employee/checkins", icon: ClipboardCheck },
    { name: "Analytics", path: "/employee/analytics", icon: BarChart3 },
  ];
  return (
    <div className="flex min-h-screen bg-[#081028] text-white">
      <Sidebar links={links} userName="Employee User" userRole="employee" />
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <Topbar />
        <main className="flex-1 overflow-y-auto p-6 relative">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export function ManagerLayout() {
  const links = [
    { name: "Team Dashboard", path: "/manager/dashboard", icon: LayoutDashboard },
    { name: "Team Analytics", path: "/manager/analytics", icon: BarChart3 },
    { name: "My Goals", path: "/manager/goals", icon: Target },
  ];
  return (
    <div className="flex min-h-screen bg-[#081028] text-white">
      <Sidebar links={links} userName="Manager User" userRole="manager" />
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <Topbar />
        <main className="flex-1 overflow-y-auto p-6 relative">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export function AdminLayout() {
  const links = [
    { name: "Admin Hub", path: "/admin/dashboard", icon: Shield },
    { name: "Governance", path: "/admin/governance", icon: ClipboardCheck },
    { name: "Audit Logs", path: "/admin/audit", icon: BarChart3 },
    { name: "Users", path: "/admin/users", icon: Users },
    { name: "Review Cycles", path: "/admin/cycles", icon: Target },
    { name: "Org Analytics", path: "/admin/analytics", icon: BarChart3 },
  ];
  return (
    <div className="flex min-h-screen bg-[#081028] text-white">
      <Sidebar links={links} userName="Admin User" userRole="admin" />
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <Topbar />
        <main className="flex-1 overflow-y-auto p-6 relative">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
