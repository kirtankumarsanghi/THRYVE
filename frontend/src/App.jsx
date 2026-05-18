import React, { Suspense, lazy } from "react";
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
import ErrorBoundary from "./components/common/ErrorBoundary";

// Public Pages
const LandingPage = lazy(() => import("./pages/Home/LandingPage"));
const Login = lazy(() => import("./pages/Auth/Login"));

// App Pages (Shared/Employee)
const Dashboard = lazy(() => import("./pages/Dashboard/Dashboard"));
const Goals = lazy(() => import("./pages/Goals/Goals"));
const CreateGoal = lazy(() => import("./pages/Goals/CreateGoal"));
const GoalDetails = lazy(() => import("./pages/Goals/GoalDetails"));
const QuarterlyCheckins = lazy(() => import("./pages/Checkins/QuarterlyCheckins"));
const Analytics = lazy(() => import("./pages/Analytics/Analytics"));

// Employee Pages
const MyDevelopment = lazy(() => import("./pages/employee/MyDevelopment"));
const Achievements = lazy(() => import("./pages/employee/Achievements"));
const FeedbackHistory = lazy(() => import("./pages/employee/FeedbackHistory"));
const MyCalendar = lazy(() => import("./pages/employee/MyCalendar"));

// Manager Pages
const ManagerDashboard = lazy(() => import("./pages/Team/ManagerDashboard"));
const EmployeeReview = lazy(() => import("./pages/Team/EmployeeReview"));
const TeamView = lazy(() => import("./pages/Team/TeamView"));
const PendingApprovals = lazy(() => import("./pages/Team/PendingApprovals"));
const TeamCheckins = lazy(() => import("./pages/Team/TeamCheckins"));
const TeamGoals = lazy(() => import("./pages/manager/TeamGoals"));
const OneOnOnes = lazy(() => import("./pages/manager/OneOnOnes"));
const PerformanceInsights = lazy(() => import("./pages/manager/PerformanceInsights"));
const FeedbackRecognition = lazy(() => import("./pages/manager/FeedbackRecognition"));
const TeamCalendar = lazy(() => import("./pages/manager/TeamCalendar"));
const Reports = lazy(() => import("./pages/manager/Reports"));

// Shared Pages
const Notifications = lazy(() => import("./pages/Notifications/Notifications"));

// Admin Pages
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const GovernanceCenter = lazy(() => import("./pages/admin/GovernanceCenter"));
const AuditLogs = lazy(() => import("./pages/admin/AuditLogs"));
const UserManagement = lazy(() => import("./pages/admin/UserManagement"));
const CycleManagement = lazy(() => import("./pages/admin/CycleManagement"));
const OrganizationAnalytics = lazy(() => import("./pages/admin/OrganizationAnalytics"));
const DepartmentManagement = lazy(() => import("./pages/admin/DepartmentManagement"));

const RouteFallback = () => (
  <div className="min-h-screen flex items-center justify-center p-6">
    <div className="surface-card p-8 w-full max-w-md animate-pulse">
      <div className="h-4 w-24 bg-white/10 rounded mb-4" />
      <div className="h-8 w-3/4 bg-white/10 rounded mb-3" />
      <div className="h-3 w-full bg-white/10 rounded mb-2" />
      <div className="h-3 w-5/6 bg-white/10 rounded" />
    </div>
  </div>
);

export default function App() {
  return (
    <AuthProvider>
      <AdminProvider>
        <ManagerProvider>
          <GoalProvider>
            <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
              <CommandPalette />
              <ErrorBoundary>
                <Suspense fallback={<RouteFallback />}>
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
                    <Route path="development" element={<MyDevelopment />} />
                    <Route path="achievements" element={<Achievements />} />
                    <Route path="feedback" element={<FeedbackHistory />} />
                    <Route path="calendar" element={<MyCalendar />} />
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
                    <Route path="team-goals" element={<TeamGoals />} />
                    <Route path="one-on-ones" element={<OneOnOnes />} />
                    <Route path="checkins" element={<TeamCheckins />} />
                    <Route path="insights" element={<PerformanceInsights />} />
                    <Route path="feedback" element={<FeedbackRecognition />} />
                    <Route path="calendar" element={<TeamCalendar />} />
                    <Route path="reports" element={<Reports />} />
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
                    <Route path="departments" element={<DepartmentManagement />} />
                    <Route path="cycles" element={<CycleManagement />} />
                    <Route path="analytics" element={<OrganizationAnalytics />} />
                  </Route>
                </Route>

                {/* Catch-all */}
                <Route path="*" element={<Navigate to="/" replace />} />
                  </Routes>
                </Suspense>
              </ErrorBoundary>

              <Toaster
                position="top-right"
                toastOptions={{
                  duration: 4000,
                  style: { 
                    background: '#0B1437', 
                    color: '#fff', 
                    border: '1px solid rgba(139, 127, 255, 0.2)',
                    borderRadius: '12px',
                    padding: '16px',
                  },
                  success: {
                    iconTheme: {
                      primary: '#10B981',
                      secondary: '#fff',
                    },
                  },
                  error: {
                    iconTheme: {
                      primary: '#EF4444',
                      secondary: '#fff',
                    },
                  },
                }}
              />
            </BrowserRouter>
          </GoalProvider>
        </ManagerProvider>
      </AdminProvider>
    </AuthProvider>
  );
}
