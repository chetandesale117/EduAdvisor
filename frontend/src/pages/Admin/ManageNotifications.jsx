import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

import toast from "react-hot-toast";

const ManageNotifications = () => {
  const [form, setForm] = useState({ userId: "", message: "", type: "admission" });
  const { user } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.userId || !form.message) {
      return toast.error("User ID and Message are required!");
    }

    try {
      await axios.post("http://localhost:5000/api/notifications", form, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      toast.success("Notification sent!");
      setForm({ userId: "", message: "", type: "admission" });
    } catch {
      toast.error("Failed to send notification");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-indigo-600 mb-6">🔔 Send Notification</h2>

      <form onSubmit={handleSubmit} className="bg-white p-6 shadow rounded-xl space-y-4">
        <input
          type="text"
          placeholder="User ID"
          className="border p-2 w-full rounded"
          value={form.userId}
          onChange={(e) => setForm({ ...form, userId: e.target.value })}
        />
        <textarea
          placeholder="Message"
          className="border p-2 w-full rounded"
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
        />
        <select
          className="border p-2 w-full rounded"
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
        >
          <option value="admission">Admission</option>
          <option value="scholarship">Scholarship</option>
          <option value="exam">Exam</option>
        </select>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded">Send</button>
      </form>
    </div>
  );
};

export default ManageNotifications;
