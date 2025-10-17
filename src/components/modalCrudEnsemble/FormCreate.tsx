import React, { useState } from "react";
import { groupService } from "../../api/GroupApi";
import type { GroupDto } from "../../api/GroupApi";

interface FormCreateProps {
  onClose: () => void;
  onCreated?: (group: GroupDto) => void;
}

function formatDate(date: Date): string {
  return date.toISOString().split("T")[0];
}

const FormCreate: React.FC<FormCreateProps> = ({ onClose, onCreated }) => {
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!name.trim()) {
      setError("Le nom de l’ensemble est requis.");
      return;
    }

    setIsSubmitting(true);

    try {
      const newGroup: GroupDto = {
        name,
        creation_date: formatDate(new Date()),
        is_everyone_admin: false,
      };

      const created = await groupService.create(newGroup);
      console.log("✅ Ensemble créé :", created);

      setSuccess(`✅ L'ensemble "${created.name}" a été créé avec succès !`);

      if (onCreated) onCreated(created);

      // Attendre 1,5s, puis fermer et rafraîchir
      setTimeout(() => {
        onClose();
        window.location.reload();
      }, 1500);
    } catch (err) {
      console.error(err);
      setError("Erreur lors de la création de l’ensemble.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Nom du nouvel ensemble :</label>
      <input
        type="text"
        placeholder="Nom..."
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}

      <div style={{ marginTop: "10px" }}>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Création..." : "Créer"}
        </button>
        <button type="button" onClick={onClose} style={{ marginLeft: "10px" }}>
          Annuler
        </button>
      </div>
    </form>
  );
};

export default FormCreate;
