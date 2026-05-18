/**
 * Admin API - Governance and administrative controls
 * Admin-only features for system management
 */
import axios from './axios';

/**
 * Unlock an approved/locked goal
 * @param {number} goalId - Goal ID to unlock
 * @param {string} reason - Reason for unlocking
 * @returns {Promise} Unlock result
 */
export const unlockGoal = async (goalId, reason = '') => {
  const response = await axios.put(`/admin/goals/${goalId}/unlock`, { reason });
  return response.data;
};

/**
 * Get audit logs with filtering
 * @param {Object} params - Filter parameters (skip, limit, user_id, action, target_id)
 * @returns {Promise} Array of audit log entries
 */
export const getAuditLogs = async (params = {}) => {
  const response = await axios.get('/admin/audit-logs', { params });
  return response.data;
};

/**
 * Get recent system activity
 * @param {number} limit - Number of recent activities (default 50)
 * @returns {Promise} Array of recent audit entries
 */
export const getRecentActivity = async (limit = 50) => {
  const response = await axios.get('/admin/recent-activity', { params: { limit } });
  return response.data;
};

/**
 * Get comprehensive organization analytics
 * @returns {Promise} Combined analytics data for admin dashboard
 */
export const getOrgAnalytics = async () => {
  const response = await axios.get('/admin/org-analytics');
  return response.data;
};

export const getUsers = async () => {
  const response = await axios.get('/admin/users');
  return response.data;
};

/**
 * Update user role
 * @param {number} userId - User ID
 * @param {string} role - New role (employee, manager, admin)
 * @returns {Promise} Update result
 */
export const updateUserRole = async (userId, role) => {
  const response = await axios.put(`/admin/users/${userId}/role`, { role });
  return response.data;
};

/**
 * Get system health metrics
 * @returns {Promise} System health data
 */
export const getSystemHealth = async () => {
  const response = await axios.get('/admin/system-health');
  return response.data;
};

/**
 * Export goals to CSV
 * @param {Object} params - Filter parameters (quarter, department)
 * @returns {Promise} CSV file blob
 */
export const exportGoalsCSV = async (params = {}) => {
  const response = await axios.get('/admin/export/goals', {
    params,
    responseType: 'blob',
  });
  return response.data;
};

/**
 * Export analytics to CSV
 * @param {string} reportType - Type of report (overview, team, departments, trends)
 * @returns {Promise} CSV file blob
 */
export const exportAnalyticsCSV = async (reportType) => {
  const response = await axios.get('/admin/export/analytics', {
    params: { report_type: reportType },
    responseType: 'blob',
  });
  return response.data;
};

/**
 * Export audit logs to CSV
 * @param {number} limit - Maximum records to export (default 1000)
 * @returns {Promise} CSV file blob
 */
export const exportAuditLogsCSV = async (limit = 1000) => {
  const response = await axios.get('/admin/export/audit-logs', {
    params: { limit },
    responseType: 'blob',
  });
  return response.data;
};

/**
 * Export users to CSV
 * @returns {Promise} CSV file blob
 */
export const exportUsersCSV = async () => {
  const response = await axios.get('/admin/export/users', {
    responseType: 'blob',
  });
  return response.data;
};

export const getQuarterlyWindows = async () => {
  const response = await axios.get('/admin/quarterly-windows');
  return response.data;
};

export const updateQuarterlyWindows = async (windows) => {
  const response = await axios.put('/admin/quarterly-windows', { windows });
  return response.data;
};

export const exportAchievementCSV = async (department = null) => {
  const response = await axios.get('/reports/achievement/export/csv', {
    params: department ? { department } : {},
    responseType: 'blob',
  });
  return response.data;
};

export const exportAchievementXLSX = async (department = null) => {
  const response = await axios.get('/reports/achievement/export/xlsx', {
    params: department ? { department } : {},
    responseType: 'blob',
  });
  return response.data;
};

/**
 * Helper function to download CSV blob
 * @param {Blob} blob - CSV blob data
 * @param {string} filename - Desired filename
 */
export const downloadCSV = (blob, filename) => {
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};

// ═══════════════════════════════════════════════════════════════
// DEPARTMENT MANAGEMENT
// ═══════════════════════════════════════════════════════════════

/**
 * Get all departments with optional statistics
 * @param {Object} params - Query parameters (include_stats, status)
 * @returns {Promise} Array of departments
 */
export const getDepartments = async (params = {}) => {
  const response = await axios.get('/admin/departments', { params });
  return response.data;
};

/**
 * Get a specific department by ID
 * @param {number} departmentId - Department ID
 * @returns {Promise} Department data
 */
export const getDepartment = async (departmentId) => {
  const response = await axios.get(`/admin/departments/${departmentId}`);
  return response.data;
};

/**
 * Create a new department
 * @param {Object} departmentData - Department data
 * @returns {Promise} Created department
 */
export const createDepartment = async (departmentData) => {
  const response = await axios.post('/admin/departments', departmentData);
  return response.data;
};

/**
 * Update an existing department
 * @param {number} departmentId - Department ID
 * @param {Object} departmentData - Updated department data
 * @returns {Promise} Updated department
 */
export const updateDepartment = async (departmentId, departmentData) => {
  const response = await axios.put(`/admin/departments/${departmentId}`, departmentData);
  return response.data;
};

/**
 * Delete a department
 * @param {number} departmentId - Department ID
 * @param {boolean} force - Force delete even if employees are assigned
 * @returns {Promise} Delete result
 */
export const deleteDepartment = async (departmentId, force = false) => {
  const response = await axios.delete(`/admin/departments/${departmentId}`, {
    params: { force }
  });
  return response.data;
};

export const runEscalationScan = async () => {
  const response = await axios.post("/admin/escalations/run");
  return response.data;
};

export const getEscalations = async (status = "open", limit = 100) => {
  const response = await axios.get("/admin/escalations", { params: { status, limit } });
  return response.data;
};

export const updateEscalationStatus = async (escalationId, status = "resolved") => {
  const response = await axios.put(`/admin/escalations/${escalationId}`, { status });
  return response.data;
};
