import { BrowserRouter, Routes, Route } from "react-router-dom";
import CommandPalette from "../components/command/CommandPalette";

import DashboardLayout from "../layouts/DashboardLayout";

import Dashboard from "../pages/Dashboard/Dashboard";
import Goals from "../pages/Goals/Goals";
import CreateGoal from "../pages/Goals/CreateGoal";
import GoalDetails from "../pages/Goals/GoalDetails";
import QuarterlyCheckins from "../pages/Checkins/QuarterlyCheckins";
import Analytics from "../pages/Analytics/Analytics";
import ManagerDashboard from "../pages/Team/ManagerDashboard";
import EmployeeReview from "../pages/Team/EmployeeReview";

// Admin Pages
import AdminDashboard from "../pages/Admin/AdminDashboard";
import GovernanceCenter from "../pages/Admin/GovernanceCenter";
import AuditLogs from "../pages/Admin/AuditLogs";
import UserManagement from "../pages/Admin/UserManagement";
import CycleManagement from "../pages/Admin/CycleManagement";
import OrganizationAnalytics from "../pages/Admin/OrganizationAnalytics";

import Login from "../pages/Auth/Login";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <CommandPalette />
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route element={<DashboardLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/goals" element={<Goals />} />
          <Route path="/goals/create" element={<CreateGoal />} />
          <Route path="/goals/edit/:id" element={<CreateGoal />} />
          <Route path="/goals/:id" element={<GoalDetails />} />
          <Route path="/checkins" element={<QuarterlyCheckins />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/manager" element={<ManagerDashboard />} />
          <Route path="/manager/review/:id" element={<EmployeeReview />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/governance" element={<GovernanceCenter />} />
          <Route path="/admin/audit" element={<AuditLogs />} />
          <Route path="/admin/users" element={<UserManagement />} />
          <Route path="/admin/cycles" element={<CycleManagement />} />
          <Route path="/admin/analytics" element={<OrganizationAnalytics />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
