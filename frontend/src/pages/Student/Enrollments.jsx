import { useEffect, useState } from "react";
import { getMyEnrollments } from "../services/collegeService";

const Enrollments = () => {
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
      <h2 className="text-xl font-bold text-indigo-600 mb-4">📖 My Enrollments</h2>
      {enrollments.length === 0 ? (
        <p className="text-gray-500">You have not enrolled in any course yet.</p>
      ) : (
        <ul className="space-y-3">
          {enrollments.map((e, idx) => (
            <li
              key={idx}
              className="p-4 border-l-4 border-indigo-600 bg-gray-50 dark:bg-gray-700 rounded-md"
            >
              <h3 className="font-semibold text-gray-800 dark:text-gray-200">{e.course}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
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

export default Enrollments;
