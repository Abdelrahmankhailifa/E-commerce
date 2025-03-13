import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./User/context/AuthContext";

type Role = "admin" | "user";

interface ProtectedRouteProps {
  role: Role;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ role }) => {
  const { auth } = useAuth();

  console.log("Current auth state:", auth); // Debug log

  if (!auth.token || !auth.role) {
    console.log("No token or role found, redirecting to login");
    return <Navigate to="/login" replace />;
  }

  if (auth.role !== role) {
    console.log(
      `Role mismatch - User role: ${auth.role}, Required role: ${role}`
    );
    return <Navigate to="/home" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
