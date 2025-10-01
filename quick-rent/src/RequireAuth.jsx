import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";

function RequireAuth({ allowedRoles }) {
  const { roles, isLoggedIn } = useContext(AuthContext);

  if (isLoggedIn === null) return <div>Loading...</div>;

  const hasAccess = allowedRoles.some((role) => roles.includes(role));

  return isLoggedIn ? (
    hasAccess ? (
      <Outlet />
    ) : (
      <Navigate to="/" />
    )
  ) : (
    <Navigate to="/login" />
  );
}

export default RequireAuth;
