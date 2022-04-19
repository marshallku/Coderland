import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "../store";

export default function RequireAuth() {
  const location = useLocation();
  const { token } = useAuthStore();

  if (!token) {
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
