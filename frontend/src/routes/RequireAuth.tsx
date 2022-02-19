import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function RequireAuth() {
  const location = useLocation();

  if (!window.token) {
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
