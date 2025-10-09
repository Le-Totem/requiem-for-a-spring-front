import React, { useState } from "react";
import { groupService } from "../../api/GroupApi";
import type { GroupDto } from "../../api/GroupApi";

interface FormCreateProps {
  onClose: () => void;        
  onCreated?: (group: GroupDto) => void; 
}

function formatDate(date: Date): string{
    return date.toISOString().split("T")[0];
}

const FormCreate: React.FC<FormCreateProps> = ({ onClose, onCreated }) => {
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

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

      if (onCreated) onCreated(created);
      onClose(); // ferme la modale après succès
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
