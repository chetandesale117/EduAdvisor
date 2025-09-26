import { Link } from "react-router-dom";
import Layout from "../../components/Layout";

const StudentDashboard = () => (
  <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
    <Layout>
    <h2 className="text-2xl font-bold text-indigo-600 mb-4">🎓 Student Dashboard</h2>
    <p className="text-gray-700">Welcome! Choose an option from the sidebar.</p>
  </Layout>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-4/5">
      <Link
        to="/student/colleges"
        className="p-6 bg-white shadow rounded-2xl hover:shadow-lg transition text-center"
      >
        <h3 className="text-xl font-semibold text-gray-800">🏫 College Directory</h3>
        <p className="text-gray-600 mt-2">Explore nearby government colleges and available courses.</p>
      </Link>

      <Link
        to="/student/quiz"
        className="p-6 bg-white shadow rounded-2xl hover:shadow-lg transition text-center"
      >
        <h3 className="text-xl font-semibold text-gray-800">📝 Take Quiz</h3>
        <p className="text-gray-600 mt-2">Find the best course based on your aptitude and interest.</p>
      </Link>

      <Link
        to="/student/career"
        className="p-6 bg-white shadow rounded-2xl hover:shadow-lg transition text-center"
      >
        <h3 className="text-xl font-semibold text-gray-800">🎯 Career Paths</h3>
        <p className="text-gray-600 mt-2">See career options and exams after your chosen course.</p>
      </Link>

      <Link
        to="/student/notifications"
        className="p-6 bg-white shadow rounded-2xl hover:shadow-lg transition text-center"
      >
        <h3 className="text-xl font-semibold text-gray-800">🔔 Notifications</h3>
        <p className="text-gray-600 mt-2">Stay updated with admissions, scholarships, and deadlines.</p>
      </Link>
    </div>
  </div>
);

export default StudentDashboard;
