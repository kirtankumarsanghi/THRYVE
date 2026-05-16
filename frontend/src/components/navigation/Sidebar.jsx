import {
  LayoutDashboard,
  Target,
  BarChart3,
  ClipboardCheck,
  Shield,
  Users,
} from "lucide-react";

import { NavLink } from "react-router-dom";

const links = [
  {
    name: "Dashboard",
    path: "/",
    icon: LayoutDashboard,
  },
  {
    name: "Goals",
    path: "/goals",
    icon: Target,
  },
  {
    name: "Check-ins",
    path: "/checkins",
    icon: ClipboardCheck,
  },
  {
    name: "Analytics",
    path: "/analytics",
    icon: BarChart3,
  },
  {
    name: "Manager",
    path: "/manager",
    icon: Users,
  },
  {
    name: "Admin",
    path: "/admin",
    icon: Shield,
  },
];

export default function Sidebar() {
  return (
    <aside className="w-72 bg-[#101935] border-r border-[#1E2A4A] p-5 hidden md:flex flex-col">
      <div>
        <h1 className="text-3xl font-bold text-[#8B7FFF]">
          Thryve
        </h1>

        <p className="text-sm text-gray-400 mt-1">
          Align. Achieve. Thryve.
        </p>
      </div>

      <nav className="mt-10 flex flex-col gap-2">
        {links.map((link) => {
          const Icon = link.icon;

          return (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive
                    ? "bg-[#8B7FFF] text-white"
                    : "text-gray-400 hover:bg-[#1A2444] hover:text-white"
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
        <p className="font-semibold">John Doe</p>
        <p className="text-sm text-gray-400">Senior Engineer</p>
      </div>
    </aside>
  );
}
