import React, { useEffect, useState, type FormEvent } from "react";
import { useParams } from "react-router-dom";
import { groupService } from "../../api/GroupApi";
import type { InvitationDto } from "../../api/GroupApi";
import type { Status } from "../../enums/Status";

interface ModalInvitProps {
  onClose: () => void;
}

const InvitMember: React.FC<ModalInvitProps> = ({ onClose }) => {
  const { id } = useParams();
  const groupId = Number(id);

  const [invitations, setInvitations] = useState<InvitationDto[]>([]);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Charger les invitations existantes
  useEffect(() => {
    if (!groupId) return;
    const fetchInvitations = async () => {
      try {
        const data = await groupService.getInvitations(groupId);
        setInvitations(data);
      } catch (err) {
        setError("Erreur lors du chargement des invitations");
      } finally {
        setLoading(false);
      }
    };
    fetchInvitations();
  }, [groupId]);

  // Envoyer une invitation
  const handleInvite = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!email.trim()) {
      setError("Veuillez entrer une adresse e-mail.");
      return;
    }

    try {
      const newInvitation: InvitationDto = {
        email,
        status: "PENDING" as Status, 
        created_at: new Date(),
        groupId,
      };

      await groupService.inviteUser(groupId, newInvitation);
      setSuccess(`Invitation envoyée à ${email}`);
      setEmail("");
      const updatedInvitations = await groupService.getInvitations(groupId);
      setInvitations(updatedInvitations);
    } catch (err) {
      setError("Impossible d'envoyer l'invitation");
    }
  };

  return (
    <div >

      <form onSubmit={handleInvite}>
        <input
          type="email"
          placeholder="Adresse e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          type="submit"
        >
          Envoyer l’invitation
        </button>
      </form>

      {loading ? (
        <p>Chargement des invitations...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          {success && <p>{success}</p>}
          {invitations.length === 0 ? (
            <p>Aucune invitation pour le moment.</p>
          ) : (
            <ul>
              {invitations.map((inv) => (
                <li key={inv.id} >
                  <strong>{inv.email}</strong> — {inv.status}
                </li>
              ))}
            </ul>
          )}
        </>
      )}

      <button
        onClick={onClose}
      >
        Fermer
      </button>
    </div>
  );
};

export default InvitMember;
