import axios from "./axios";

export const getEmployeeAchievements = async () => {
  const response = await axios.get("/employee/achievements");
  return response.data;
};

export const getEmployeeDevelopment = async () => {
  const response = await axios.get("/employee/development");
  return response.data;
};

export const getEmployeeCalendar = async (year, month) => {
  const response = await axios.get("/employee/calendar", {
    params: { year, month },
  });
  return response.data;
};
