// src/components/PublicRoute.tsx
import { Navigate } from "react-router-dom";
import { getUser } from "../../utils/LocalStorageManager";

interface PublicRouteProps {
  children: React.ReactNode;
}

/**
 * Empêche les utilisateurs déjà connectés d’accéder à certaines pages
 * (ex: login, home, register...)
 */
export default function PublicRoute({ children }: PublicRouteProps) {
  const user = getUser();

  if (user) {
    return <Navigate to="/listensemble" replace />;
  }

  return <>{children}</>;
}
