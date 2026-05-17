/**
 * Goals API - Goal management endpoints
 */
import axios from './axios';

/**
 * Get all goals for current user
 * @returns {Promise} Array of goals
 */
export const getGoals = async () => {
  const response = await axios.get('/goals');
  return response.data;
};

/**
 * Get a specific goal by ID
 * @param {number} goalId - Goal ID
 * @returns {Promise} Goal data
 */
export const getGoalById = async (goalId) => {
  const response = await axios.get(`/goals/${goalId}`);
  return response.data;
};

/**
 * Create a new goal
 * @param {Object} goalData - Goal data
 * @returns {Promise} Created goal
 */
export const createGoal = async (goalData) => {
  const response = await axios.post('/goals', goalData);
  return response.data;
};

/**
 * Update an existing goal
 * @param {number} goalId - Goal ID
 * @param {Object} goalData - Updated goal data
 * @returns {Promise} Updated goal
 */
export const updateGoal = async (goalId, goalData) => {
  const response = await axios.put(`/goals/${goalId}`, goalData);
  return response.data;
};

/**
 * Delete a goal
 * @param {number} goalId - Goal ID
 * @returns {Promise} Deletion response
 */
export const deleteGoal = async (goalId) => {
  const response = await axios.delete(`/goals/${goalId}`);
  return response.data;
};

/**
 * Submit a check-in for a goal
 * @param {number} goalId - Goal ID
 * @param {Object} checkinData - Check-in data
 * @returns {Promise} Check-in response
 */
export const submitCheckin = async (goalId, checkinData) => {
  const response = await axios.post(`/checkins/${goalId}`, checkinData);
  return response.data;
};

/**
 * Get check-ins for a goal
 * @param {number} goalId - Goal ID
 * @returns {Promise} Array of check-ins
 */
export const getGoalCheckins = async (goalId) => {
  const response = await axios.get(`/checkins/goal/${goalId}`);
  return response.data;
};

export const createSharedGoal = async (goalData) => {
  const response = await axios.post('/goals/shared', goalData);
  return response.data;
};
