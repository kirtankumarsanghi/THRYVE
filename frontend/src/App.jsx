import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// Contexts
import { AuthProvider } from "./context/AuthContext";
import { GoalProvider } from "./context/GoalContext";
import { ManagerProvider } from "./context/ManagerContext";
import { AdminProvider } from "./context/AdminContext";

// Auth & Layouts
import ProtectedRoute from "./components/auth/ProtectedRoute";
import EmployeeLayout from "./layouts/EmployeeLayout";
import ManagerLayout from "./layouts/ManagerLayout";
import AdminLayout from "./layouts/AdminLayout";
import CommandPalette from "./components/command/CommandPalette";

// Public Pages
import LandingPage from "./pages/Home/LandingPage";
import Login from "./pages/Auth/Login";

// App Pages (Shared/Employee)
import Dashboard from "./pages/Dashboard/Dashboard";
import Goals from "./pages/Goals/Goals";
import CreateGoal from "./pages/Goals/CreateGoal";
import GoalDetails from "./pages/Goals/GoalDetails";
import QuarterlyCheckins from "./pages/Checkins/QuarterlyCheckins";
import Analytics from "./pages/Analytics/Analytics";

// Manager Pages
import ManagerDashboard from "./pages/Team/ManagerDashboard";
import EmployeeReview from "./pages/Team/EmployeeReview";
import TeamView from "./pages/Team/TeamView";
import PendingApprovals from "./pages/Team/PendingApprovals";
import TeamCheckins from "./pages/Team/TeamCheckins";

// Shared Pages
import Notifications from "./pages/Notifications/Notifications";

// Admin Pages
import AdminDashboard from "./pages/Admin/AdminDashboard";
import GovernanceCenter from "./pages/Admin/GovernanceCenter";
import AuditLogs from "./pages/Admin/AuditLogs";
import UserManagement from "./pages/Admin/UserManagement";
import CycleManagement from "./pages/Admin/CycleManagement";
import OrganizationAnalytics from "./pages/Admin/OrganizationAnalytics";

export default function App() {
  return (
    <AuthProvider>
      <AdminProvider>
        <ManagerProvider>
          <GoalProvider>
            <BrowserRouter>
              <CommandPalette />
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<Login />} />

                {/* Employee Routes */}
                <Route element={<ProtectedRoute allowedRoles={["employee", "manager", "admin"]} />}>
                  <Route path="/employee" element={<EmployeeLayout />}>
                    <Route index element={<Navigate to="dashboard" replace />} />
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="goals" element={<Goals />} />
                    <Route path="goals/create" element={<CreateGoal />} />
                    <Route path="goals/edit/:id" element={<CreateGoal />} />
                    <Route path="goals/:id" element={<GoalDetails />} />
                    <Route path="checkins" element={<QuarterlyCheckins />} />
                    <Route path="analytics" element={<Analytics />} />
                    <Route path="notifications" element={<Notifications />} />
                  </Route>
                </Route>

                {/* Manager Routes */}
                <Route element={<ProtectedRoute allowedRoles={["manager", "admin"]} />}>
                  <Route path="/manager" element={<ManagerLayout />}>
                    <Route index element={<Navigate to="dashboard" replace />} />
                    <Route path="dashboard" element={<ManagerDashboard />} />
                    <Route path="team" element={<TeamView />} />
                    <Route path="approvals" element={<PendingApprovals />} />
                    <Route path="checkins" element={<TeamCheckins />} />
                    <Route path="analytics" element={<Analytics />} />
                    <Route path="goals" element={<Goals />} />
                    <Route path="review/:id" element={<EmployeeReview />} />
                    <Route path="notifications" element={<Notifications />} />
                  </Route>
                </Route>

                {/* Admin Routes */}
                <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
                  <Route path="/admin" element={<AdminLayout />}>
                    <Route index element={<Navigate to="dashboard" replace />} />
                    <Route path="dashboard" element={<AdminDashboard />} />
                    <Route path="governance" element={<GovernanceCenter />} />
                    <Route path="audit" element={<AuditLogs />} />
                    <Route path="users" element={<UserManagement />} />
                    <Route path="cycles" element={<CycleManagement />} />
                    <Route path="analytics" element={<OrganizationAnalytics />} />
                  </Route>
                </Route>

                {/* Catch-all */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>

              <Toaster
                position="top-right"
                toastOptions={{
                  style: { background: '#1a1b26', color: '#fff', border: '1px solid #2e303e' },
                }}
              />
            </BrowserRouter>
          </GoalProvider>
        </ManagerProvider>
      </AdminProvider>
    </AuthProvider>
  );
}