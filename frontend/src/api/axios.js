/**
 * Axios Configuration - Central API client
 * Handles authentication, interceptors, and base configuration
 */
import axios from 'axios';

// Smart API URL detection
const getApiUrl = () => {
  // 1. Check environment variable (set in Vercel/build time)
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }

  const hostname = window.location.hostname;
  const isLocalHost =
    hostname === "localhost" ||
    hostname === "127.0.0.1" ||
    hostname === "::1";

  // 2. In local development, talk to local API.
  if (isLocalHost) {
    return "http://127.0.0.1:8000";
  }

  // 3. In any hosted environment, default to production backend.
  return "https://thryve-5pie.onrender.com";
};

export const API_BASE_URL = getApiUrl();

console.log('[API] Base URL:', API_BASE_URL);

// Create axios instance with default config
const API = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // 30 seconds
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - Add JWT token to all requests
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Handle errors globally
API.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle 401 Unauthorized - Token expired or invalid
    if (error.response?.status === 401) {
      // Clear auth data
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      
      // Avoid hard navigation to /login (can 404 on static hosts without SPA rewrite).
      // Send users to root; client routing will take them to login as needed.
      if (window.location.pathname !== '/') {
        window.location.assign('/');
      }
    }
    
    // Handle 403 Forbidden - Insufficient permissions
    if (error.response?.status === 403) {
      console.error('Access denied:', error.response.data);
    }
    
    // Handle 404 Not Found
    if (error.response?.status === 404) {
      console.error('Resource not found:', error.response.data);
    }
    
    // Handle 500 Server Error
    if (error.response?.status >= 500) {
      console.error('Server error:', error.response.data);
    }
    
    return Promise.reject(error);
  }
);

export default API;
