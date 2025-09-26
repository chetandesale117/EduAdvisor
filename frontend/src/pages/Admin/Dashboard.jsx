import { Link } from "react-router-dom";
import Layout from "../../components/Layout";

const AdminDashboard = () => (
  <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
    <Layout>
    <h2 className="text-2xl font-bold text-indigo-600 mb-4">🛠️ Admin Dashboard</h2>
    <p className="text-gray-700">Manage colleges, quizzes, career paths, and notifications.</p>
  </Layout>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-4/5">
      <Link
        to="/admin/colleges"
        className="p-6 bg-white shadow rounded-2xl hover:shadow-lg transition text-center"
      >
        <h3 className="text-xl font-semibold text-gray-800">🏫 Manage Colleges</h3>
        <p className="text-gray-600 mt-2">Add or update government colleges and available courses.</p>
      </Link>

      <Link
        to="/admin/quiz"
        className="p-6 bg-white shadow rounded-2xl hover:shadow-lg transition text-center"
      >
        <h3 className="text-xl font-semibold text-gray-800">📝 Create Quiz</h3>
        <p className="text-gray-600 mt-2">Design aptitude quizzes to guide students into suitable streams.</p>
      </Link>

      <Link
        to="/admin/career"
        className="p-6 bg-white shadow rounded-2xl hover:shadow-lg transition text-center"
      >
        <h3 className="text-xl font-semibold text-gray-800">🎯 Add Career Paths</h3>
        <p className="text-gray-600 mt-2">Map degree courses to career opportunities, exams, or higher studies.</p>
      </Link>

      <Link
        to="/admin/notifications"
        className="p-6 bg-white shadow rounded-2xl hover:shadow-lg transition text-center"
      >
        <h3 className="text-xl font-semibold text-gray-800">🔔 Send Notifications</h3>
        <p className="text-gray-600 mt-2">Notify students about admissions, scholarships, and deadlines.</p>
      </Link>
    </div>
  </div>
);

export default AdminDashboard;
