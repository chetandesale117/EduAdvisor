import { useEffect, useState } from "react";
import { getColleges, enrollInCourse } from "../services/collegeService";
import toast from "react-hot-toast";

const CollegeDirectory = () => {
  const [colleges, setColleges] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getColleges();
        setColleges(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const handleEnroll = async (collegeId, course) => {
    try {
      await enrollInCourse(collegeId, course);
      toast.success(`✅ Enrolled in ${course}`);
    } catch (err) {
      toast.error(err.response?.data?.message || "❌ Failed to enroll");
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
      {colleges.map((college) => (
        <div key={college._id} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-bold text-indigo-600">{college.name}</h2>
          <p className="text-gray-600 dark:text-gray-400">{college.location}</p>

          <h3 className="mt-3 font-semibold">Courses:</h3>
          <ul className="space-y-2">
            {college.courses.map((course, idx) => (
              <li
                key={idx}
                className="flex items-center justify-between bg-gray-100 dark:bg-gray-700 p-2 rounded-md"
              >
                <span>{course}</span>
                <button
                  onClick={() => handleEnroll(college._id, course)}
                  className="bg-indigo-600 text-white px-3 py-1 rounded-md hover:bg-indigo-700 text-sm"
                >
                  Enroll
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default CollegeDirectory;
