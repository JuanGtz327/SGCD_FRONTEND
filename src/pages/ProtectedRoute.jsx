import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useAuth();

  //TODO hacer un loading
  if (loading) return <h1>Cargando....</h1>;
  if (!isAuthenticated && !loading) return <Navigate to="/login" replace />;

  return <Outlet />;
};

export default ProtectedRoute;
