import React, { useEffect, useState } from "react";
import { fetchCurrentUser, fetchUserInvitations } from "../../api/UserApi";
import { groupService } from "../../api/GroupApi"; 
import styles from "./NotificationButton.module.css";
import type { InvitationDto } from "../../api/GroupApi";
import { Status } from "../../enums/Status";


interface ModalInvitationsProps {
  onClose: () => void;
}

const ModalInvitations: React.FC<ModalInvitationsProps> = ({ onClose }) => {
  const [invitations, setInvitations] = useState<InvitationDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInvitationsData = async () => {
      try {
      const user = await fetchCurrentUser(); 
      const data = await fetchUserInvitations(user.email); 
      const pending = data.filter(inv => inv.status !== Status.ACCEPTED && inv.status !== Status.REJECTED);
      setInvitations(pending);
      } catch (err: any) {
        setError(err.message || "Erreur lors de la récupération des invitations");
      } finally {
        setLoading(false);
      }
    };

    fetchInvitationsData();
  }, []);

  
  const handleStatusChange = async (invitationId: number, status: Status.ACCEPTED | Status.REJECTED) => {
    try {
      await groupService.updateInvitationStatus(invitationId, status); 
      setInvitations(prev => prev.filter(inv => inv.id !== invitationId)); // enlève celle traitée
    } catch (err: any) {
      setError(err.message || "Erreur lors de la mise à jour de l'invitation");
    }
  };

  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>✕</button>
        <h2>Mes Invitations</h2>

        {loading ? (
          <p>Chargement...</p>
        ) : error ? (
          <p>{error}</p>
        ) : invitations.length === 0 ? (
          <p>Aucune invitation trouvée.</p>
        ) : (
          <ul>
            {invitations.map(inv => (
              <li key={inv.id}>
                <p>
                  Email : {inv.email} <br />
                  Date : {new Date(inv.created_at).toLocaleDateString()}
                </p>
                <div className={styles.actions}>
                  <button onClick={() => handleStatusChange(inv.id, Status.ACCEPTED)}>
                    Accepter
                  </button>
                  <button onClick={() => handleStatusChange(inv.id, Status.REJECTED)}>
                    Refuser
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ModalInvitations;
