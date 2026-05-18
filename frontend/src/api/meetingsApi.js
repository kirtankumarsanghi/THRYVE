import axios from "./axios";

export const listMeetings = async () => {
  const response = await axios.get("/meetings");
  return response.data;
};

export const createMeeting = async (payload) => {
  const response = await axios.post("/meetings", payload);
  return response.data;
};

export const updateMeeting = async (meetingId, payload) => {
  const response = await axios.put(`/meetings/${meetingId}`, payload);
  return response.data;
};

export const deleteMeeting = async (meetingId) => {
  const response = await axios.delete(`/meetings/${meetingId}`);
  return response.data;
};
