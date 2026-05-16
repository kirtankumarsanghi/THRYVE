import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedRole = localStorage.getItem("role");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedRole) {
      setToken(storedToken);
      setRole(storedRole);
      setUser(storedUser ? JSON.parse(storedUser) : { name: "Demo User", email: "user@thryve.com", role: storedRole });
    }
    setLoading(false);
  }, []);

  const login = (role, userData = null) => {
    const mockToken = "fake-jwt-token-123";
    const resolvedUser = userData || { name: "Demo User", email: "user@thryve.com", role };
    localStorage.setItem("token", mockToken);
    localStorage.setItem("role", role);
    localStorage.setItem("user", JSON.stringify(resolvedUser));
    setToken(mockToken);
    setRole(role);
    setUser(resolvedUser);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user");
    setToken(null);
    setRole(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, role, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
