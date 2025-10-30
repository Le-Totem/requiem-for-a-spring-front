// src/components/PublicRoute.tsx
import { Navigate } from "react-router-dom";

interface PublicRouteProps {
  children: React.ReactNode;
}

/**
 * Empêche les utilisateurs déjà connectés d’accéder à certaines pages
 * (ex: login, home, register...)
 */
export default function PublicRoute({ children }: PublicRouteProps) {
  const token = localStorage.getItem("token");

  if (token) {
    return <Navigate to="/listeensembles" replace />;
  }

  return <>{children}</>;
}
