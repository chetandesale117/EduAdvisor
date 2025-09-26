import { Link } from "react-router-dom";

const Forbidden = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center px-6">
      <h1 className="text-6xl font-bold text-red-600">403</h1>
      <h2 className="text-2xl font-semibold text-gray-800 mt-4">
        🚫 Access Denied
      </h2>
      <p className="text-gray-600 mt-2">
        You don’t have permission to view this page. Please check your role or
        return to the dashboard.
      </p>
      <Link
        to="/"
        className="mt-6 inline-block bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default Forbidden;
