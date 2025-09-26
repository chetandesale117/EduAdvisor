import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!form.email || !form.password) {
    return toast.error("All fields are required!");
  }

  try {
    const data = await login(form.email, form.password); // returns user object
    toast.success("✅ Login successful!");

    // ✅ Redirect based on role
    if (data.role === "admin") {
      navigate("/admin", { replace: true });
    } else {
      navigate("/student", { replace: true });
    }
  } catch (error) {
    toast.error(error.response?.data?.message || "❌ Invalid credentials!");
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-6">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-center text-indigo-600 dark:text-indigo-400">
          Welcome to EduAdvisor
        </h2>
        <p className="mt-2 text-center text-gray-600 dark:text-gray-300">
          Please sign in to continue
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-gray-700 dark:text-gray-200 mb-1">Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-200 mb-1">Password</label>
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Sign In
          </button>
        </form>

       <p className="mt-6 text-sm text-gray-600 dark:text-gray-400 text-center">
  Don’t have an account?{" "}
  <span
    onClick={() => navigate("/register")}
    className="text-indigo-600 dark:text-indigo-400 font-semibold cursor-pointer hover:underline"
  >
    Register here
  </span>
</p>

      </div>
    </div>
  );
};

export default Login;
