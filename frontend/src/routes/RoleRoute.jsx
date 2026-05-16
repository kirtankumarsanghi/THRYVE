import { Navigate, Outlet } from "react-router-dom";

export default function RoleRoute({ allowedRoles }) {
  const userRole = localStorage.getItem("role");
  
  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}
