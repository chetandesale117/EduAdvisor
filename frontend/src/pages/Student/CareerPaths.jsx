import { useState, useEffect, useContext } from "react";
import { getCareerPaths } from "../../services/careerService";
import { AuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";

const CareerPaths = ({ courseId }) => {
  const [paths, setPaths] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCareerPaths(courseId, user.token);
        setPaths(data);
      } catch {
        toast.error("Failed to load career paths");
      }
    };
    fetchData();
  }, [courseId, user.token]);


  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <h2 className="text-2xl font-bold text-indigo-600 mb-6">🎯 Career Paths</h2>
      {paths.length === 0 ? (
        <p className="text-gray-600">No career paths available for this course yet.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {paths.map((p, i) => (
            <div
              key={i}
              className="bg-white p-6 shadow rounded-2xl hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold text-gray-800">{p.title}</h3>
              <span className="inline-block mt-2 px-3 py-1 text-sm bg-indigo-100 text-indigo-600 rounded-full">
                {p.type}
              </span>
              <p className="mt-3 text-gray-600">{p.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CareerPaths;
