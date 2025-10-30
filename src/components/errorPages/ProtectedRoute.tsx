// src/components/ProtectedRoute.tsx
import { useNavigate } from "react-router-dom";
import styles from "./protectedRoute.module.css";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  if (!token) {
    return (
      <div className={styles.container}>
        <div className={styles.card}>
          <h2 className={styles.title}>Accès restreint</h2>
          <p className={styles.message}>
            Vous devez être connecté pour accéder à cette page.
          </p>
          <button
            className={styles.button}
            onClick={() => navigate("/")}
          >
            Se connecter
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
