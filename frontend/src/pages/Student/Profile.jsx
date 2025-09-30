import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/UserContext";
import { getMyEnrollments } from "../services/collegeService";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [enrollments, setEnrollments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getMyEnrollments();
        setEnrollments(data);
      } catch (err) {
        console.error("Error fetching enrollments:", err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold text-indigo-600 mb-4">👤 My Profile</h2>

      <div className="space-y-2 text-gray-800 dark:text-gray-200">
        <p><strong>Name:</strong> {user?.name}</p>
        <p><strong>Email:</strong> {user?.email}</p>
        <p><strong>Role:</strong> {user?.role}</p>
      </div>

      <h3 className="mt-6 text-lg font-semibold text-indigo-500">📖 My Enrollments</h3>
      {enrollments.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400 mt-2">No enrollments yet.</p>
      ) : (
        <ul className="mt-3 space-y-3">
          {enrollments.map((e, idx) => (
            <li
              key={idx}
              className="p-3 border-l-4 border-indigo-600 rounded-md bg-gray-50 dark:bg-gray-700"
            >
              <p className="font-semibold">{e.course}</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {e.college?.name} — {e.college?.location}
              </p>
              <span className="text-xs text-gray-400">
                Enrolled on {new Date(e.date).toDateString()}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Profile;
