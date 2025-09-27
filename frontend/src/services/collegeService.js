import axios from "axios";

const API_URL = "http://localhost:5000/api/colleges";

export const getColleges = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const getCollegeById = async (id) => {
  const res = await axios.get(`${API_URL}/${id}`);
  return res.data;
};


// ✅ Enroll in a course (requires login token)
export const enrollInCourse = async (collegeId, course) => {
  const token = JSON.parse(localStorage.getItem("user"))?.token;

  const res = await axios.post(
    `${API_URL}/enroll`,
    { collegeId, course },
    { headers: { Authorization: `Bearer ${token}` } }
  );

  return res.data;
};