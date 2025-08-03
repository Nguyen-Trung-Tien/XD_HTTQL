import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const RequireAuth = () => {
  const accessToken = useSelector((state) => state.user.access_token);

  if (!accessToken) {
    return <Navigate to="/sign-in" replace />;
  }

  return <Outlet />;
};

export default RequireAuth;
