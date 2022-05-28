import { useLocation, Navigate, Outlet } from "react-router-dom";

const useAuth = () => {
  const token = localStorage.getItem("token");
  return token ? true : false;
};

const PrivateRoute = () => {
  const isAuth = useAuth();
  const location = useLocation();

  return isAuth ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

const ProtectedRoute = () => {
  const isAuth = useAuth();
  const location = useLocation();
  return !isAuth ? <Outlet /> : <Navigate to="/" replace />;
};

export default PrivateRoute;
export { useAuth };
export { ProtectedRoute };
