import axios from "axios";

const API_URL = "http://localhost:5000/api/career";

export const getCareerPaths = async (courseId, token) => {
  const res = await axios.get(`${API_URL}/${courseId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
