const fs = require('fs');
const path = require('path');

const write = (filePath, content) => {
  const fullPath = path.join(__dirname, filePath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content.trim() + '\n');
  console.log('Created:', filePath);
};

// ==========================================
// 1. Sidebar
// ==========================================
write('frontend/src/components/navigation/Sidebar.jsx', `
import { NavLink } from "react-router-dom";
import { LayoutDashboard, Target, Users, BarChart2, ShieldCheck, CheckCircle, UserCircle, LogOut, X } from "lucide-react";

export default function Sidebar({ isOpen, setIsOpen }) {
  const navItems = [
    { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { label: "Goals", path: "/goals", icon: Target },
    { label: "Check-ins", path: "/checkins", icon: CheckCircle },
    { label: "Analytics", path: "/analytics", icon: BarChart2 },
    { label: "Team", path: "/team", icon: Users },
    { label: "Admin", path: "/admin", icon: ShieldCheck },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.href = "/login";
  };

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside className={\`fixed md:static inset-y-0 left-0 z-50 w-64 bg-card/80 backdrop-blur-xl border-r border-border flex flex-col transition-transform duration-300 ease-in-out \${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}\`}>
        <div className="p-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent tracking-wide">THRYVE</h2>
            <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-widest font-semibold">Align. Achieve. Thryve.</p>
          </div>
          <button className="md:hidden text-gray-400 hover:text-white" onClick={() => setIsOpen(false)}>
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                \`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group \${
                  isActive
                    ? "bg-primary/20 text-primary font-semibold shadow-[inset_4px_0_0_0_#8B7FFF]"
                    : "text-gray-400 hover:text-white hover:bg-border/50 font-medium"
                }\`
              }
            >
              <item.icon size={20} className="transition-transform duration-200 group-hover:scale-110" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-border/50">
          <NavLink to="/profile" onClick={() => setIsOpen(false)} className="flex items-center gap-3 px-4 py-3 bg-dark/50 rounded-xl mb-2 hover:bg-dark transition-colors cursor-pointer group">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-cyan-500 flex items-center justify-center font-bold text-white shadow-lg">
              JD
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-medium text-white truncate group-hover:text-primary transition-colors">John Doe</p>
              <p className="text-xs text-gray-400 truncate">Manager</p>
            </div>
          </NavLink>
          <button onClick={handleLogout} className="flex items-center justify-center gap-2 w-full px-4 py-2.5 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-lg transition-colors font-medium">
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}
`);

// ==========================================
// 2. Topbar
// ==========================================
write('frontend/src/components/navigation/Topbar.jsx', `
import { Bell, Search, Menu } from "lucide-react";
import { useLocation } from "react-router-dom";

export default function Topbar({ setIsOpen }) {
  const location = useLocation();
  const pageTitle = location.pathname.split("/")[1] || "Dashboard";

  return (
    <header className="h-20 bg-dark/80 backdrop-blur-md border-b border-border flex items-center justify-between px-6 lg:px-10 sticky top-0 z-30">
      <div className="flex items-center gap-4 w-full md:w-auto">
        <button className="md:hidden text-gray-400 hover:text-white transition-colors" onClick={() => setIsOpen(true)}>
          <Menu size={24} />
        </button>
        <h1 className="text-xl font-bold text-white capitalize hidden sm:block">
          {pageTitle.replace("-", " ")}
        </h1>
        <div className="hidden md:flex items-center gap-2 bg-card/50 border border-border rounded-xl px-4 py-2.5 w-80 focus-within:border-primary/50 focus-within:bg-card transition-all ml-6">
          <Search size={18} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search goals, team, or metrics..."
            className="bg-transparent border-none outline-none text-sm text-white w-full placeholder:text-gray-500"
          />
        </div>
      </div>

      <div className="flex items-center gap-4 sm:gap-6">
        <button className="relative p-2 text-gray-400 hover:text-white hover:bg-card rounded-full transition-all">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-cyan-400 rounded-full border-2 border-dark animate-pulse"></span>
        </button>
      </div>
    </header>
  );
}
`);

// ==========================================
// 3. DashboardLayout
// ==========================================
write('frontend/src/layouts/DashboardLayout.jsx', `
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/navigation/Sidebar";
import Topbar from "../components/navigation/Topbar";

export default function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-dark overflow-hidden font-sans text-white">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <div className="flex-1 flex flex-col h-screen overflow-hidden relative">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none" />
        
        <Topbar setIsOpen={setIsSidebarOpen} />
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 sm:p-6 lg:p-10 z-10">
          <div className="max-w-7xl mx-auto w-full animate-in fade-in duration-500">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
`);

// ==========================================
// 4. ProtectedRoute
// ==========================================
write('frontend/src/routes/ProtectedRoute.jsx', `
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  const token = localStorage.getItem("token");
  
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
`);

// ==========================================
// 5. RoleRoute
// ==========================================
write('frontend/src/routes/RoleRoute.jsx', `
import { Navigate, Outlet } from "react-router-dom";

export default function RoleRoute({ allowedRoles }) {
  const userRole = localStorage.getItem("role");
  
  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}
`);

// ==========================================
// 9. Reusable Components
// ==========================================
write('frontend/src/components/common/PageContainer.jsx', `
export default function PageContainer({ children }) {
  return <div className="space-y-6 lg:space-y-8 pb-10">{children}</div>;
}
`);

write('frontend/src/components/common/SectionHeader.jsx', `
export default function SectionHeader({ title, subtitle, action }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
      <div>
        <h2 className="text-2xl font-bold text-white">{title}</h2>
        {subtitle && <p className="text-gray-400 mt-1">{subtitle}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}
`);

write('frontend/src/components/common/DashboardCard.jsx', `
export default function DashboardCard({ children, className = "" }) {
  return (
    <div className={\`bg-card/40 backdrop-blur-md border border-border/60 rounded-2xl p-6 shadow-xl \${className}\`}>
      {children}
    </div>
  );
}
`);

write('frontend/src/components/common/StatCard.jsx', `
import DashboardCard from "./DashboardCard";

export default function StatCard({ title, value, icon: Icon, trend, trendUp }) {
  return (
    <DashboardCard className="hover:border-primary/30 transition-colors group">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-gray-400 text-sm font-medium mb-1">{title}</p>
          <h3 className="text-3xl font-bold text-white tracking-tight">{value}</h3>
          
          {trend && (
            <div className={\`flex items-center gap-1 mt-2 text-sm font-medium \${trendUp ? "text-emerald-400" : "text-red-400"}\`}>
              <span>{trendUp ? "↑" : "↓"}</span>
              <span>{trend}</span>
            </div>
          )}
        </div>
        <div className="p-3 bg-dark/50 rounded-xl text-primary group-hover:scale-110 transition-transform">
          {Icon && <Icon size={24} />}
        </div>
      </div>
    </DashboardCard>
  );
}
`);

// ==========================================
// 6. Page Shells
// ==========================================
const pages = ["Goals", "Analytics", "Team", "Admin", "Checkins", "Profile"];
pages.forEach(name => {
  write(\`frontend/src/pages/\${name}.jsx\`, \`
import PageContainer from "../components/common/PageContainer";
import SectionHeader from "../components/common/SectionHeader";
import DashboardCard from "../components/common/DashboardCard";

export default function \${name}() {
  return (
    <PageContainer>
      <SectionHeader 
        title="\${name}" 
        subtitle="Manage your \${name.toLowerCase()} and view insights."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <DashboardCard className="h-64 flex items-center justify-center text-gray-500 border-dashed border-2">
          [ \${name} Widget 1 ]
        </DashboardCard>
        <DashboardCard className="h-64 flex items-center justify-center text-gray-500 border-dashed border-2">
          [ \${name} Widget 2 ]
        </DashboardCard>
      </div>
    </PageContainer>
  );
}
  \`);
});

// Landing Page
write('frontend/src/pages/Landing.jsx', `
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="min-h-screen bg-dark flex flex-col items-center justify-center text-center p-6 relative overflow-hidden font-sans">
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-primary/20 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-cyan-500/10 blur-[150px] rounded-full pointer-events-none" />
      
      <div className="z-10 max-w-3xl">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
          Enterprise Performance <br/>
          <span className="bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent">Reimagined.</span>
        </h1>
        <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
          Align teams, track goals, and drive execution with Thryve's intelligent performance management platform.
        </p>
        <Link to="/login" className="px-8 py-4 bg-primary hover:bg-primary/90 text-white rounded-xl font-semibold text-lg transition-all shadow-[0_0_30px_rgba(139,127,255,0.4)] hover:shadow-[0_0_40px_rgba(139,127,255,0.6)]">
          Enter Portal
        </Link>
      </div>
    </div>
  );
}
`);

// Dashboard Page (Rich implementation)
write('frontend/src/pages/Dashboard.jsx', `
import PageContainer from "../components/common/PageContainer";
import SectionHeader from "../components/common/SectionHeader";
import StatCard from "../components/common/StatCard";
import DashboardCard from "../components/common/DashboardCard";
import { Target, TrendingUp, Users, Award } from "lucide-react";

export default function Dashboard() {
  return (
    <PageContainer>
      <SectionHeader 
        title="Welcome back, John" 
        subtitle="Here is your performance overview for Q3."
        action={<button className="px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg font-medium transition-colors shadow-[0_0_15px_rgba(139,127,255,0.3)]">Create Goal</button>}
      />
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Active Goals" value="12" icon={Target} trend="2 this week" trendUp={true} />
        <StatCard title="Completion Rate" value="84%" icon={TrendingUp} trend="5% vs last quarter" trendUp={true} />
        <StatCard title="Team Alignment" value="92%" icon={Users} trend="Stable" trendUp={true} />
        <StatCard title="Achievements" value="8" icon={Award} trend="1 new" trendUp={true} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <DashboardCard className="lg:col-span-2 min-h-[300px] flex flex-col">
          <h3 className="font-semibold text-lg mb-4 text-white">Performance Insights</h3>
          <div className="flex-1 flex items-center justify-center border-2 border-dashed border-border/50 rounded-xl bg-dark/20 text-gray-500">
            [ Recharts Line Chart Component ]
          </div>
        </DashboardCard>
        
        <DashboardCard className="min-h-[300px] flex flex-col">
          <h3 className="font-semibold text-lg mb-4 text-white">Recent Activity</h3>
          <div className="flex-1 space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-2.5 h-2.5 mt-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(139,127,255,0.8)]" />
                <div>
                  <p className="text-sm font-medium text-white">Updated Q3 OKRs</p>
                  <p className="text-xs text-gray-400 mt-0.5">2 hours ago</p>
                </div>
              </div>
            ))}
          </div>
        </DashboardCard>
      </div>
    </PageContainer>
  );
}
`);

// ==========================================
// 7. Login
// ==========================================
write('frontend/src/pages/Auth/Login.jsx', `
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNavigate } from "react-router-dom";
import { Lock, Mail } from "lucide-react";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["employee", "manager", "admin"]),
});

export default function Login() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { role: "employee" }
  });

  const onSubmit = (data) => {
    localStorage.setItem("token", "fake-jwt-token-123");
    localStorage.setItem("role", data.role);
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-dark flex items-center justify-center p-4 relative overflow-hidden font-sans">
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-primary/20 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-cyan-500/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="w-full max-w-md bg-card/60 backdrop-blur-2xl border border-border rounded-2xl shadow-2xl p-8 relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent tracking-wide mb-2">THRYVE</h1>
          <p className="text-gray-400 text-sm">Enterprise Performance Portal</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">Email</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail size={18} className="text-gray-500" />
              </div>
              <input
                {...register("email")}
                type="email"
                className="w-full bg-dark/50 border border-border rounded-lg pl-10 pr-4 py-2.5 text-white placeholder:text-gray-500 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all outline-none"
                placeholder="you@company.com"
              />
            </div>
            {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock size={18} className="text-gray-500" />
              </div>
              <input
                {...register("password")}
                type="password"
                className="w-full bg-dark/50 border border-border rounded-lg pl-10 pr-4 py-2.5 text-white placeholder:text-gray-500 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all outline-none"
                placeholder="••••••••"
              />
            </div>
            {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">Role (Demo)</label>
            <select
              {...register("role")}
              className="w-full bg-dark/50 border border-border rounded-lg px-4 py-2.5 text-white focus:border-primary/50 outline-none appearance-none"
            >
              <option value="employee">Employee</option>
              <option value="manager">Manager</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="rounded border-gray-600 bg-dark text-primary focus:ring-primary" />
              <span className="text-gray-400">Remember me</span>
            </label>
            <a href="#" className="text-primary hover:text-primary/80 transition-colors">Forgot password?</a>
          </div>

          <button
            type="submit"
            className="w-full mt-2 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white font-semibold py-3 rounded-lg shadow-[0_0_20px_rgba(139,127,255,0.3)] transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            Sign In to Thryve
          </button>
        </form>
      </div>
    </div>
  );
}
`);

// ==========================================
// 8. AppRoutes
// ==========================================
write('frontend/src/routes/AppRoutes.jsx', `
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import RoleRoute from "./RoleRoute";
import DashboardLayout from "../layouts/DashboardLayout";

import Login from "../pages/Auth/Login";
import Landing from "../pages/Landing";
import Dashboard from "../pages/Dashboard";
import Goals from "../pages/Goals";
import Analytics from "../pages/Analytics";
import Team from "../pages/Team";
import Admin from "../pages/Admin";
import Checkins from "../pages/Checkins";
import Profile from "../pages/Profile";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />

        {/* Protected Dashboard Routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/goals" element={<Goals />} />
            <Route path="/checkins" element={<Checkins />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/team" element={<Team />} />
            <Route path="/profile" element={<Profile />} />
            
            {/* Admin Only Route Example */}
            <Route element={<RoleRoute allowedRoles={['admin']} />}>
              <Route path="/admin" element={<Admin />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
`);
