import { Navigate } from "react-router-dom";
import { getToken } from "../api-query";
import type { User } from "../types";

interface ProtectedRouteProps {
  children: React.ReactNode;
  user: User | null;
}

export function ProtectedRoute({ children, user }: ProtectedRouteProps) {
  const token = getToken();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (user && user.emailVerified === false) {
    return (
      <Navigate
        to="/verify-email"
        replace
        state={{ email: user.email }}
      />
    );
  }

  return <>{children}</>;
}
