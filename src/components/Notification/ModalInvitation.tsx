import React, { useEffect, useState } from "react";
import { fetchCurrentUser, fetchUserInvitations } from "../../api/UserApi";
import styles from "./NotificationButton.module.css";
import type { InvitationDto } from "../../api/GroupApi";

interface ModalInvitationsProps {
  onClose: () => void;
}

const ModalInvitations: React.FC<ModalInvitationsProps> = ({ onClose }) => {
  const [invitations, setInvitations] = useState<InvitationDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInvitations = async () => {
      try {
        const user = await fetchCurrentUser();
        const data = await fetchUserInvitations(user.email);
        setInvitations(data);
      } catch (err: any) {
        setError(err.message || "Erreur lors de la récupération des invitations");
      } finally {
        setLoading(false);
      }
    };

    fetchInvitations();
  }, []);

  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>✕</button>
        <h2>Mes Invitations</h2>
        {loading ? (
          <p>Chargement...</p>
        ) : error ? (
          <p >{error}</p>
        ) : invitations.length === 0 ? (
          <p>Aucune invitation trouvée.</p>
        ) : (
          <ul>
            {invitations.map(inv => (
              <li key={inv.id}>
            Groupe ID: {inv.groupId} | Date: {new Date(inv.created_at).toLocaleDateString()}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ModalInvitations;
