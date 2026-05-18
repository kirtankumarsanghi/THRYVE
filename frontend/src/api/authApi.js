/**
 * Auth API - Authentication and user management
 */
import axios from './axios';

/**
 * Login user
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise} Login response with token and user data
 */
export const login = async (email, password) => {
  const response = await axios.post('/auth/login', { email, password });
  return response.data;
};

export const demoLogin = async (role) => {
  const response = await axios.post('/auth/demo-login', { role });
  return response.data;
};

/**
 * Register new user
 * @param {Object} userData - User registration data
 * @returns {Promise} Registration response
 */
export const register = async (userData) => {
  const response = await axios.post('/auth/register', userData);
  return response.data;
};

/**
 * Get current user profile
 * @returns {Promise} User profile data
 */
export const getCurrentUser = async () => {
  const response = await axios.get('/auth/me');
  return response.data;
};

/**
 * Check backend auth connectivity/health
 * @returns {Promise} Health payload
 */
export const healthAuth = async () => {
  const response = await axios.get('/health/auth');
  return response.data;
};

/**
 * Logout user (client-side)
 */
export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

/**
 * Check if user is authenticated
 * @returns {boolean} Authentication status
 */
export const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  return !!token;
};

/**
 * Get stored user data
 * @returns {Object|null} User data from localStorage
 */
export const getStoredUser = () => {
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
};

/**
 * Store auth data
 * @param {string} token - JWT token
 * @param {Object} user - User data
 */
export const storeAuthData = (token, user) => {
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(user));
};
