import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Auth/Login";
import StudentDashboard from "./pages/Student/Dashboard";
import AdminDashboard from "./pages/Admin/Dashboard";
import CollegeDirectory from "./pages/Student/CollegeDirectory";
import Quiz from "./pages/Student/Quiz";
import CareerPaths from "./pages/Student/CareerPaths";
import Notifications from "./pages/Student/Notifications";
import ManageColleges from "./pages/Admin/ManageColleges";
import ManageQuiz from "./pages/Admin/ManageQuiz";
import ManageCareerPaths from "./pages/Admin/ManageCareerPaths";
import ManageNotifications from "./pages/Admin/ManageNotifications";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import { Toaster } from "react-hot-toast";
import Forbidden from "./pages/Error/Forbidden";
import NotFound from "./pages/Error/NotFound";
import Register from "./pages/Auth/Register";



function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Route */}
          <Route path="/" element={<Login />} />

          {/* Student Routes */}
          <Route
            path="/student"
            element={
              <ProtectedRoute role="student">
                <StudentDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/student/colleges"
            element={
              <ProtectedRoute role="student">
                <CollegeDirectory />
              </ProtectedRoute>
            }
          />
          <Route
            path="/student/quiz"
            element={
              <ProtectedRoute role="student">
                <Quiz />
              </ProtectedRoute>
            }
          />
          <Route
            path="/student/career"
            element={
              <ProtectedRoute role="student">
                <CareerPaths courseId="PUT_A_SAMPLE_COURSE_ID_HERE" />
              </ProtectedRoute>
            }
          />
          <Route
            path="/student/notifications"
            element={
              <ProtectedRoute role="student">
                <Notifications />
              </ProtectedRoute>
            }
          />

          {/* Admin Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute role="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/colleges"
            element={
              <ProtectedRoute role="admin">
                <ManageColleges />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/quiz"
            element={
              <ProtectedRoute role="admin">
                <ManageQuiz />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/career"
            element={
              <ProtectedRoute role="admin">
                <ManageCareerPaths />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/notifications"
            element={
              <ProtectedRoute role="admin">
                <ManageNotifications />
              </ProtectedRoute>
            }
          />
          <Route path="/403" element={<Forbidden />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
      <Toaster position="top-right" />
    </AuthProvider>
  );
}

export default App;
