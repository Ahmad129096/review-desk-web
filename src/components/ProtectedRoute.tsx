import { Navigate } from "react-router-dom";
import { getToken } from "../api-query";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const token = getToken();
  console.log({ token }, "in protected route")

  if (!token) {
    return <Navigate to="/auth" replace />;
  }

  return <>{children}</>;
}
