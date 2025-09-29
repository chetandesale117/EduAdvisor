import axios from "axios";

const COLLEGE_API = "http://localhost:5000/api/colleges";
const ENROLL_API = "http://localhost:5000/api/enrollments";

// ✅ Fetch all colleges
export const getColleges = async () => {
  const res = await axios.get(COLLEGE_API);
  return res.data;
};

// ✅ Fetch single college by ID
export const getCollegeById = async (id) => {
  const res = await axios.get(`${COLLEGE_API}/${id}`);
  return res.data;
};

// ✅ Enroll in a course
export const enrollInCourse = async (collegeId, course) => {
  const token = JSON.parse(localStorage.getItem("user"))?.token;
  const res = await axios.post(
    ENROLL_API,
    { collegeId, course },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
};

// ✅ Get my enrollments
export const getMyEnrollments = async () => {
  const token = JSON.parse(localStorage.getItem("user"))?.token;
  const res = await axios.get(ENROLL_API, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
