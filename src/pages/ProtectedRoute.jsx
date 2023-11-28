import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import Loader from "../common/Loader.jsx";

const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading)
    return (
      <div className="w-[100%] h-[100%] bg-blue-200">
        {" "}
        <Loader size="w-16 h-16" />{" "}
      </div>
    );
  if (!isAuthenticated && !loading) return <Navigate to="/login" replace />;

  return <Outlet />;
};

export default ProtectedRoute;
