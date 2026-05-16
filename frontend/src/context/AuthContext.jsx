import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const storedToken = localStorage.getItem("token");
    const storedRole = localStorage.getItem("role");
    
    if (storedToken && storedRole) {
      setToken(storedToken);
      setRole(storedRole);
      // Mock user object
      setUser({ name: "Demo User", email: "user@thryve.com", role: storedRole });
    }
    setLoading(false);
  }, []);

  const login = (role) => {
    const mockToken = "fake-jwt-token-123";
    localStorage.setItem("token", mockToken);
    localStorage.setItem("role", role);
    setToken(mockToken);
    setRole(role);
    setUser({ name: "Demo User", email: "user@thryve.com", role });
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
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
