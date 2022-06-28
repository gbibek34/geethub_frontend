import { useLocation, Navigate, Outlet, Redirect } from "react-router-dom";
import { fetchMyProfile, userSelector } from "../features/User/UserSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { fetchUsersDetails } from "../features/Admin/AdminSlice";
const useAuth = () => {
  const token = localStorage.getItem("token");
  return token ? true : false;
};

const PrivateRoute = () => {
  const [isUser, setIsUser] = useState(
    localStorage.getItem("role") === "geethub-user" ? true : null
  );
  const isAuth = useAuth();
  const location = useLocation();

  return isAuth ? (
    isUser ? (
      <Outlet />
    ) : (
      <Navigate to="/admin" />
    )
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

const ProtectedRoute = () => {
  const [admin, setAdmin] = useState(
    localStorage.getItem("role") === "geethub-admin" ? true : null
  );
  const isAuth = useAuth();

  return !isAuth ? (
    <Outlet />
  ) : admin ? (
    <Navigate to="/admin" />
  ) : (
    <Navigate to="/" />
  );
};

const ProtectedAdminRoute = () => {
  const location = useLocation();
  const isAuth = useAuth();
  const [admin, setAdmin] = useState(
    localStorage.getItem("role") === "geethub-admin" ? true : null
  );
  if (isAuth) {
    return admin ? <Outlet /> : <Navigate to="/" />;
  }
  return <Navigate to="/login" state={{ from: location }} replace />;
};

export { ProtectedAdminRoute };
export default PrivateRoute;
export { useAuth };
export { ProtectedRoute };
