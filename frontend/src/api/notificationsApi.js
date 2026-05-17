import axios from "./axios";

export const getNotifications = async (limit = 50) => {
  const response = await axios.get("/notifications", { params: { limit } });
  return response.data;
};
