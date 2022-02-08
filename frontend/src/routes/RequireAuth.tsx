import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/auth";

export default function RequireAuth() {
  const auth = useAuth();
  const location = useLocation();

  if (!auth || !auth.user) {
    return (
      <Navigate
        to="/login"
        state={{
          from: location,
        }}
      />
    );
  }

  return <Outlet />;
}
