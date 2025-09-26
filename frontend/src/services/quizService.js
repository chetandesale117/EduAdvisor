import axios from "axios";

const API_URL = "http://localhost:5000/api/quiz";

export const getQuizzes = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const submitQuiz = async (data, token) => {
  const res = await axios.post(`${API_URL}/submit`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
