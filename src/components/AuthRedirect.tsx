import { Navigate } from "react-router";
import { useAuth } from "@/hooks/useAuth";

export function AuthRedirect({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return null;

  if (isAuthenticated) {
    return <Navigate to="/courses" replace />;
  }

  return <>{children}</>;
}
