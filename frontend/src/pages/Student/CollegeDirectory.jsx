import { useEffect, useState } from "react";
import { getColleges } from "../../services/collegeService";

const CollegeDirectory = () => {
  const [colleges, setColleges] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getColleges();
      setColleges(data);
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <h2 className="text-2xl font-bold text-indigo-600 mb-6">🏫 College Directory</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {colleges.map((c) => (
          <div
            key={c._id}
            className="bg-white p-6 shadow rounded-2xl hover:shadow-lg transition"
          >
            <h3 className="text-xl font-semibold text-gray-800">{c.name}</h3>
            <p className="text-gray-600">{c.location}</p>
            <p className="mt-2 text-sm text-gray-500">{c.eligibilityCriteria}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CollegeDirectory;
