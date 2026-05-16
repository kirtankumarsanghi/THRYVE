import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function ProtectedRoute({ allowedRoles }) {
  const { user, role, token, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-[#081028] text-white">Loading...</div>;
  }

  if (!token) {
    // Not logged in, redirect to login page
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    // User is logged in but doesn't have the correct role.
    // Redirect them to their appropriate dashboard
    const dashboardPath = `/${role}/dashboard`;
    return <Navigate to={dashboardPath} replace />;
  }

  // Render the child routes
  return <Outlet />;
}
