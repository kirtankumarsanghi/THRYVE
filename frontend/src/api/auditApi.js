/**
 * Audit API - Audit log access and history tracking
 * Provides transparency and compliance tracking
 */
import axios from './axios';

/**
 * Get current user's audit logs
 * @param {Object} params - Filter parameters (skip, limit, action)
 * @returns {Promise} Array of user's audit log entries
 */
export const getMyAuditLogs = async (params = {}) => {
  const response = await axios.get('/audit/logs', { params });
  return response.data;
};

/**
 * Get team audit logs (manager/admin only)
 * @param {Object} params - Filter parameters (skip, limit, user_id, action)
 * @returns {Promise} Array of team audit log entries
 */
export const getTeamAuditLogs = async (params = {}) => {
  const response = await axios.get('/audit/team-logs', { params });
  return response.data;
};

/**
 * Get complete audit history for a specific goal
 * @param {number} goalId - Goal ID
 * @returns {Promise} Array of audit entries for the goal
 */
export const getGoalAuditHistory = async (goalId) => {
  const response = await axios.get(`/audit/goal/${goalId}/history`);
  return response.data;
};
