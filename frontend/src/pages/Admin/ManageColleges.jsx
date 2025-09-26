import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import toast from "react-hot-toast";

const ManageColleges = () => {
  const [colleges, setColleges] = useState([]);
  const [form, setForm] = useState({ name: "", location: "", eligibilityCriteria: "" });
  const { user } = useContext(AuthContext);

  const fetchColleges = async () => {
    const res = await axios.get("http://localhost:5000/api/colleges");
    setColleges(res.data);
  };

  useEffect(() => {
    fetchColleges();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.location) {
      return toast.error("Name and Location are required!");
    }
    try {
      await axios.post("http://localhost:5000/api/colleges", form, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      toast.success("College added successfully!");
      setForm({ name: "", location: "", eligibilityCriteria: "" });
      fetchColleges();
    } catch {
      toast.error("Failed to add college");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-indigo-600 mb-6">🏫 Manage Colleges</h2>

      <form onSubmit={handleSubmit} className="bg-white p-6 shadow rounded-xl mb-6">
        <input
          type="text"
          placeholder="College Name"
          className="border p-2 w-full mb-3 rounded"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Location"
          className="border p-2 w-full mb-3 rounded"
          value={form.location}
          onChange={(e) => setForm({ ...form, location: e.target.value })}
        />
        <input
          type="text"
          placeholder="Eligibility Criteria"
          className="border p-2 w-full mb-3 rounded"
          value={form.eligibilityCriteria}
          onChange={(e) => setForm({ ...form, eligibilityCriteria: e.target.value })}
        />
        <button className="bg-indigo-600 text-white px-4 py-2 rounded">Add College</button>
      </form>

      <div className="grid gap-4 md:grid-cols-2">
        {colleges.map((c) => (
          <div key={c._id} className="bg-white p-4 shadow rounded-xl">
            <h3 className="font-bold">{c.name}</h3>
            <p>{c.location}</p>
            <p className="text-sm text-gray-600">{c.eligibilityCriteria}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageColleges;
