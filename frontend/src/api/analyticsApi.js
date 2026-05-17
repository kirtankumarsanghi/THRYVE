/**
 * Analytics API - Real-time analytics and metrics
 * Powers all dashboard charts and insights
 */
import axios from './axios';

/**
 * Get organization-wide overview metrics
 * @returns {Promise} Overview data with totals, averages, and rates
 */
export const getOverview = async () => {
  const response = await axios.get('/analytics/overview');
  return response.data;
};

/**
 * Get team performance analytics
 * @param {number} managerId - Optional manager ID filter
 * @returns {Promise} Array of employee performance data
 */
export const getTeamAnalytics = async (managerId = null) => {
  const params = managerId ? { manager_id: managerId } : {};
  const response = await axios.get('/analytics/team', { params });
  return response.data;
};

/**
 * Get department analytics
 * @returns {Promise} Array of department performance data
 */
export const getDepartmentAnalytics = async () => {
  const response = await axios.get('/analytics/departments');
  return response.data;
};

/**
 * Get quarterly trends (Q1-Q4)
 * @returns {Promise} Quarterly breakdown data for charts
 */
export const getQuarterlyTrends = async () => {
  const response = await axios.get('/analytics/trends');
  return response.data;
};

/**
 * Get strategic area breakdown
 * @returns {Promise} Array of strategic areas with goal counts
 */
export const getStrategicAreaBreakdown = async () => {
  const response = await axios.get('/analytics/strategic-areas');
  return response.data;
};

/**
 * Get approval pipeline metrics
 * @returns {Promise} Approval workflow health data
 */
export const getApprovalPipelineMetrics = async () => {
  const response = await axios.get('/analytics/approval-pipeline');
  return response.data;
};

/**
 * Get employee rankings (leaderboard)
 * @param {number} limit - Number of top employees (default 10)
 * @returns {Promise} Ranked list of employees
 */
export const getEmployeeRanking = async (limit = 10) => {
  const response = await axios.get('/analytics/rankings', { params: { limit } });
  return response.data;
};

/**
 * Get goal status distribution
 * @returns {Promise} Count of goals by status
 */
export const getGoalStatusDistribution = async () => {
  const response = await axios.get('/analytics/status-distribution');
  return response.data;
};
