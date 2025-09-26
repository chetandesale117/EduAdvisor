import { Link, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";

const Layout = ({ children }) => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("darkMode") === "true"
  );

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Apply dark mode class to <html>
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <aside className="w-64 bg-indigo-700 dark:bg-indigo-800 text-white flex flex-col">
        <div className="p-6 text-2xl font-bold border-b border-indigo-600 dark:border-indigo-700">
          EduAdvisor
        </div>
        <nav className="flex-1 p-4 space-y-3">
          {user?.role === "student" && (
            <>
              <Link to="/student" className="block hover:bg-indigo-600 p-2 rounded">
                🏠 Dashboard
              </Link>
              <Link to="/student/colleges" className="block hover:bg-indigo-600 p-2 rounded">
                🏫 Colleges
              </Link>
              <Link to="/student/quiz" className="block hover:bg-indigo-600 p-2 rounded">
                📝 Quiz
              </Link>
              <Link to="/student/career" className="block hover:bg-indigo-600 p-2 rounded">
                🎯 Career Paths
              </Link>
              <Link to="/student/notifications" className="block hover:bg-indigo-600 p-2 rounded">
                🔔 Notifications
              </Link>
            </>
          )}

          {user?.role === "admin" && (
            <>
              <Link to="/admin" className="block hover:bg-indigo-600 p-2 rounded">
                🛠️ Dashboard
              </Link>
              <Link to="/admin/colleges" className="block hover:bg-indigo-600 p-2 rounded">
                🏫 Manage Colleges
              </Link>
              <Link to="/admin/quiz" className="block hover:bg-indigo-600 p-2 rounded">
                📝 Manage Quiz
              </Link>
              <Link to="/admin/career" className="block hover:bg-indigo-600 p-2 rounded">
                🎯 Career Paths
              </Link>
              <Link to="/admin/notifications" className="block hover:bg-indigo-600 p-2 rounded">
                🔔 Notifications
              </Link>
            </>
          )}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <header className="bg-white dark:bg-gray-800 shadow p-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">
            Dashboard
          </h1>
          <div className="flex items-center space-x-4">
            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600"
            >
              {darkMode ? "🌞 Light" : "🌙 Dark"}
            </button>

            <span className="text-gray-700 dark:text-gray-300">
              {user?.username} ({user?.role})
            </span>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
            >
              Logout
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-200 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
