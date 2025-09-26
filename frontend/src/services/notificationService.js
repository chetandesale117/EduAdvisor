import axios from "axios";

const API_URL = "http://localhost:5000/api/notifications";

export const getNotifications = async (token) => {
  const res = await axios.get(API_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const markAsRead = async (id, token) => {
  const res = await axios.put(`${API_URL}/${id}/read`, {}, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
