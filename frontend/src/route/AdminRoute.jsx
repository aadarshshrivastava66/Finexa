import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AdminRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" />;

  // allow admin OR superadmin
  if (user.role !== "admin" && user.role !== "superadmin") {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default AdminRoute;
