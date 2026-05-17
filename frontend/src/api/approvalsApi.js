/**
 * Approvals API - Manager approval workflow
 */
import axios from './axios';

/**
 * Get pending approvals (manager/admin only)
 * @returns {Promise} Array of goals pending approval
 */
export const getPendingApprovals = async () => {
  const response = await axios.get('/approvals/pending');
  return response.data;
};

/**
 * Approve a goal
 * @param {number} goalId - Goal ID
 * @param {string} comment - Approval comment
 * @returns {Promise} Approval response
 */
export const approveGoal = async (goalId, comment = '') => {
  const response = await axios.put(`/approvals/${goalId}/approve`, { comment });
  return response.data;
};

/**
 * Reject a goal
 * @param {number} goalId - Goal ID
 * @param {string} comment - Rejection comment
 * @returns {Promise} Rejection response
 */
export const rejectGoal = async (goalId, comment = '') => {
  const response = await axios.put(`/approvals/${goalId}/reject`, { comment });
  return response.data;
};
