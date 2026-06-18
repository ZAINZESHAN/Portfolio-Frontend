import { Navigate } from "react-router-dom";
import { isAuthenticated } from "@/lib/auth";

export function PublicAdminRoute({ children }: { children: React.ReactNode }) {
  if (isAuthenticated()) {
    return <Navigate to="/admin/dashboard" replace />;
  }
  return <>{children}</>;
}
