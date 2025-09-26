import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

import toast from "react-hot-toast";

const ManageCareerPaths = () => {
  const [courseId, setCourseId] = useState("");
  const [form, setForm] = useState({ title: "", type: "Job", description: "" });
  const { user } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!courseId) return toast.error("Course ID required!");
    if (!form.title) return toast.error("Career title required!");

    try {
      await axios.post(`http://localhost:5000/api/career/${courseId}`, form, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      toast.success("Career path added!");
      setForm({ title: "", type: "Job", description: "" });
    } catch {
      toast.error("Failed to add career path");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-indigo-600 mb-6">🎯 Add Career Path</h2>

      <form onSubmit={handleSubmit} className="bg-white p-6 shadow rounded-xl space-y-4">
        <input
          type="text"
          placeholder="Course ID"
          className="border p-2 w-full rounded"
          value={courseId}
          onChange={(e) => setCourseId(e.target.value)}
        />
        <input
          type="text"
          placeholder="Career Title"
          className="border p-2 w-full rounded"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <select
          className="border p-2 w-full rounded"
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
        >
          <option>Job</option>
          <option>Exam</option>
          <option>Higher Studies</option>
        </select>
        <textarea
          placeholder="Description"
          className="border p-2 w-full rounded"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <button className="bg-indigo-600 text-white px-4 py-2 rounded">Add Career Path</button>
      </form>
    </div>
  );
};

export default ManageCareerPaths;
