import React, { useState } from "react";
import type { MusicPiece } from "../../types/MusicPiece";
import { fetchCreateMusicPiece } from "../../api/MusicPieceApi.ts";
import { useParams } from "react-router-dom";

interface FormCreateProps {
  onClose: () => void;
  onCreated?: (musicPiece: MusicPiece) => void;
}

const FormCreate: React.FC<FormCreateProps> = ({ onClose, onCreated }) => {
const { id } = useParams<{ id: string }>();
  const groupId = Number(id);

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!title.trim()) {
      setError("Le titre du morceau est requis.");
      return;
    }

    setIsSubmitting(true);

    try {
      const newMusicPiece: Omit<MusicPiece, "id"> = {
        title,
        author,
        description,
        group: {
          id: groupId, name: "",
          creation_date: "",
          is_everyone_admin: false
        }, 
        medias: [],
        musicPieceGenres: [],
      };

      const createdArray: MusicPiece[] = await fetchCreateMusicPiece(groupId, newMusicPiece);
      const created: MusicPiece = createdArray[0]; 
      console.log("Morceau créé :", created);

      setSuccess(`Le morceau "${title}" a été créé avec succès !`);

      if (onCreated) onCreated(created);


      // Attendre 1,5s puis fermer
      setTimeout(() => {
        onClose();
        window.location.reload();
      }, 1500);
    } catch (err) {
      console.error(err);
      setError("Erreur lors de la création du morceau.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Titre :</label>
      <input
        type="text"
        placeholder="Titre..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <label>Auteur :</label>
      <input
        type="text"
        placeholder="Auteur..."
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />

      <label>Description :</label>
      <textarea
        placeholder="Description..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
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
