import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Layouts
import EmployeeLayout from "../layouts/EmployeeLayout";
import ManagerLayout from "../layouts/ManagerLayout";
import AdminLayout from "../layouts/AdminLayout";

// Public Pages
import Landing from "../pages/Landing";

// Auth Pages
import Login from "../pages/Auth/Login";

// Employee Pages
import EmployeeDashboard from "../pages/employee/Dashboard";
import EmployeeGoals from "../pages/employee/Goals";
import EmployeeCreateGoal from "../pages/employee/CreateGoal";
import EmployeeGoalDetails from "../pages/employee/GoalDetails";
import EmployeeQuarterlyReview from "../pages/employee/QuarterlyReview";
import EmployeeProgress from "../pages/employee/EmployeeProgress";
import EmployeeNotifications from "../pages/employee/EmployeeNotifications";
import EmployeeDevelopment from "../pages/employee/MyDevelopment";
import EmployeeAchievements from "../pages/employee/Achievements";
import EmployeeFeedbackHistory from "../pages/employee/FeedbackHistory";
import EmployeeCalendar from "../pages/employee/MyCalendar";
import EmployeeAnalytics from "../pages/Analytics/Analytics";

// Manager Pages
import ManagerDashboard from "../pages/manager/ManagerDashboard";
import ManagerApprovals from "../pages/manager/ManagerApprovals";
import ManagerTeam from "../pages/Team/ManagerDashboard";
import ManagerAnalytics from "../pages/manager/TeamAnalytics";
import ManagerReports from "../pages/manager/Reports";
import ManagerTeamGoals from "../pages/manager/TeamGoals";
import ManagerOneOnOnes from "../pages/manager/OneOnOnes";
import ManagerInsights from "../pages/manager/PerformanceInsights";
import ManagerFeedback from "../pages/manager/FeedbackRecognition";
import ManagerCalendar from "../pages/manager/TeamCalendar";
import EmployeeReview from "../pages/Team/EmployeeReview";

// Admin Pages
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminUsers from "../pages/admin/UserManagement";
import AdminCycles from "../pages/admin/CycleManagement";
import AdminAudit from "../pages/admin/AuditLogs";
import AdminReports from "../pages/admin/OrganizationAnalytics";
import AdminGovernance from "../pages/admin/GovernanceCenter";

export default function AppRoutes() {
  // Get user role from localStorage (you can also use context/redux)
  const userRole = localStorage.getItem("role") || null;
  const isAuthenticated = localStorage.getItem("token") || false;

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        
        {/* Default redirect based on role */}
        <Route path="/dashboard" element={
          !isAuthenticated ? <Navigate to="/login" replace /> :
          userRole === "admin" ? <Navigate to="/admin/dashboard" replace /> :
          userRole === "manager" ? <Navigate to="/manager/dashboard" replace /> :
          <Navigate to="/employee/dashboard" replace />
        } />

        {/* Employee Routes */}
        <Route element={<EmployeeLayout />}>
          <Route path="/employee/dashboard" element={<EmployeeDashboard />} />
          <Route path="/employee/goals" element={<EmployeeGoals />} />
          <Route path="/employee/goals/create" element={<EmployeeCreateGoal />} />
          <Route path="/employee/goals/edit/:id" element={<EmployeeCreateGoal />} />
          <Route path="/employee/goals/:id" element={<EmployeeGoalDetails />} />
          <Route path="/employee/checkins" element={<EmployeeQuarterlyReview />} />
          <Route path="/employee/progress" element={<EmployeeProgress />} />
          <Route path="/employee/analytics" element={<EmployeeAnalytics />} />
          <Route path="/employee/development" element={<EmployeeDevelopment />} />
          <Route path="/employee/achievements" element={<EmployeeAchievements />} />
          <Route path="/employee/feedback" element={<EmployeeFeedbackHistory />} />
          <Route path="/employee/calendar" element={<EmployeeCalendar />} />
          <Route path="/employee/notifications" element={<EmployeeNotifications />} />
        </Route>

        {/* Manager Routes */}
        <Route element={<ManagerLayout />}>
          <Route path="/manager/dashboard" element={<ManagerDashboard />} />
          <Route path="/manager/team" element={<ManagerTeam />} />
          <Route path="/manager/approvals" element={<ManagerApprovals />} />
          <Route path="/manager/team-goals" element={<ManagerTeamGoals />} />
          <Route path="/manager/one-on-ones" element={<ManagerOneOnOnes />} />
          <Route path="/manager/insights" element={<ManagerInsights />} />
          <Route path="/manager/feedback" element={<ManagerFeedback />} />
          <Route path="/manager/calendar" element={<ManagerCalendar />} />
          <Route path="/manager/checkins" element={<EmployeeQuarterlyReview />} />
          <Route path="/manager/analytics" element={<ManagerAnalytics />} />
          <Route path="/manager/reports" element={<ManagerReports />} />
          <Route path="/manager/notifications" element={<EmployeeNotifications />} />
          <Route path="/manager/review/:id" element={<EmployeeReview />} />
        </Route>

        {/* Admin Routes */}
        <Route element={<AdminLayout />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/cycles" element={<AdminCycles />} />
          <Route path="/admin/audit" element={<AdminAudit />} />
          <Route path="/admin/reports" element={<AdminReports />} />
          <Route path="/admin/governance" element={<AdminGovernance />} />
        </Route>

        {/* Fallback redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
