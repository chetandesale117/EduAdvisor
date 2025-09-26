import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children, role }) => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/" replace />; // redirect to login
  }

  if (role && user.role !== role) {
    return <Navigate to="/403" replace />; // redirect unauthorized users
  }

  return children;
};

export default ProtectedRoute;
