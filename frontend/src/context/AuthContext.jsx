import React, { createContext, useContext, useState, useEffect } from "react";
import * as authApi from "../api/authApi";
import toast from "react-hot-toast";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize auth state from localStorage
  useEffect(() => {
    const initAuth = () => {
      const storedToken = localStorage.getItem("token");
      const storedUser = localStorage.getItem("user");

      if (storedToken && storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          setToken(storedToken);
          setUser(parsedUser);
          localStorage.setItem('role', parsedUser.role);
          setRole(parsedUser.role);
        } catch (error) {
          console.error("Failed to parse stored user:", error);
          // Clear invalid data
          localStorage.removeItem("token");
          localStorage.removeItem("user");
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  /**
   * Login with email and password
   * @param {string} email - User email
   * @param {string} password - User password
   * @returns {Promise<boolean>} Success status
   */
  const login = async (email, password) => {
    try {
      setLoading(true);
      const response = await authApi.login(email, password);
      
      // Store auth data
      const { access_token, user: userData } = response;
      authApi.storeAuthData(access_token, userData);
      localStorage.setItem('role', userData.role);
      
      // Update state
      setToken(access_token);
      setUser(userData);
      setRole(userData.role);
      
      toast.success(`Welcome back, ${userData.full_name || userData.email}!`);
      return { ok: true, user: userData };
    } catch (error) {
      console.error("Login failed:", error);
      const isTimeout = error.code === "ECONNABORTED";
      const isNetwork = !error.response;
      const errorMessage = isTimeout
        ? "Login request timed out. Please check backend server connectivity."
        : isNetwork
        ? "Unable to reach backend. Ensure API server is running on the configured URL."
        : error.response?.data?.detail || "Login failed. Please check your credentials.";
      toast.error(errorMessage);
      return { ok: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const demoLogin = async (role) => {
    try {
      setLoading(true);
      const response = await authApi.demoLogin(role);

      const { access_token, user: userData } = response;
      authApi.storeAuthData(access_token, userData);
      localStorage.setItem('role', userData.role);

      setToken(access_token);
      setUser(userData);
      setRole(userData.role);

      toast.success(`Demo login successful: ${userData.role}`);
      return { ok: true, user: userData };
    } catch (error) {
      console.error("Demo login failed:", error);
      const isTimeout = error.code === "ECONNABORTED";
      const isNetwork = !error.response;
      const errorMessage = isTimeout
        ? "Demo login timed out. Please retry in a few seconds."
        : isNetwork
        ? "Unable to reach backend for demo login."
        : error.response?.data?.detail || "Demo login failed.";
      toast.error(errorMessage);
      return { ok: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  /**
   * Register new user
   * @param {Object} userData - User registration data
   * @returns {Promise<boolean>} Success status
   */
  const register = async (userData) => {
    try {
      setLoading(true);
      const response = await authApi.register(userData);
      
      // Auto-login after registration
      if (response.access_token) {
        authApi.storeAuthData(response.access_token, response.user);
        localStorage.setItem('role', response.user.role);
        setToken(response.access_token);
        setUser(response.user);
        setRole(response.user.role);
        toast.success("Registration successful!");
        return true;
      }
      
      toast.success("Registration successful! Please login.");
      return true;
    } catch (error) {
      console.error("Registration failed:", error);
      const errorMessage = error.response?.data?.detail || "Registration failed. Please try again.";
      toast.error(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Logout user
   */
  const logout = () => {
    localStorage.removeItem('role');
    authApi.logout();
    setToken(null);
    setRole(null);
    setUser(null);
    toast.success("Logged out successfully");
  };

  /**
   * Check if user is authenticated
   * @returns {boolean} Authentication status
   */
  const isAuthenticated = () => {
    return !!token && !!user;
  };

  /**
   * Check if user has specific role
   * @param {string} requiredRole - Required role
   * @returns {boolean} Role match status
   */
  const hasRole = (requiredRole) => {
    return role === requiredRole;
  };

  /**
   * Check if user has any of the specified roles
   * @param {Array<string>} roles - Array of roles
   * @returns {boolean} Role match status
   */
  const hasAnyRole = (roles) => {
    return roles.includes(role);
  };

  const value = {
    user,
    role,
    token,
    loading,
    login,
    demoLogin,
    register,
    logout,
    isAuthenticated,
    hasRole,
    hasAnyRole,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
