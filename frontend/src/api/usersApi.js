import axios from './axios';

export const getEmployees = async () => {
  const response = await axios.get('/users/employees');
  return response.data;
};
