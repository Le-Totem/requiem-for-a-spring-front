import React, { useState } from "react";
import { groupService } from "../../api/GroupApi";

interface ConfirmDeleteProps {
  items: { id: number; name: string }[];
  onCancel: () => void;
  onDeleted?: () => void;
}

const ConfirmDelete: React.FC<ConfirmDeleteProps> = ({
  items,
  onCancel,
  onDeleted,
}) => {
  const [toDelete, setToDelete] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Sélection / désélection d'un ensemble
  const toggleSelection = (id: number) => {
    setToDelete((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleDelete = async () => {
    if (toDelete.length === 0) return;

    //confirmation avant suppression
    const confirm = window.confirm(
      `Voulez-vous vraiment supprimer ${
        toDelete.length > 1
          ? "ces ensembles sélectionnés"
          : "cet ensemble"
      } ? Cette action est irréversible.`
    );

    if (!confirm) return;

    setLoading(true);
    setError(null);

    try {
      for (const id of toDelete) {
        await groupService.delete(id);
      }
      if (onDeleted) onDeleted();
    } catch (err) {
      if (err instanceof Error) setError(err.message);
      else setError("Erreur lors de la suppression");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <p>Sélectionnez les ensembles à supprimer :</p>

      {items.length === 0 ? (
        <p>Aucun ensemble disponible.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {items.map((item) => {
            const isSelected = toDelete.includes(item.id);
            return (
              <li
                key={item.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  margin: "8px 0",
                  opacity: isSelected ? 0.4 : 1,
                  transition: "opacity 0.3s ease",
                }}
              >
                <span>{item.name}</span>
                <button
                  onClick={() => toggleSelection(item.id)}
                  style={{
                    background: "transparent",
                    border: "none",
                    color: isSelected ? "gray" : "red",
                    fontSize: "18px",
                    cursor: "pointer",
                  }}
                  title={
                    isSelected
                      ? "Remettre dans la liste"
                      : "Marquer pour suppression"
                  }
                >
                  ✖
                </button>
              </li>
            );
          })}
        </ul>
      )}

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div style={{ marginTop: "15px" }}>
        <button
          onClick={handleDelete}
          disabled={loading || toDelete.length === 0}
          style={{
            background: toDelete.length === 0 ? "gray" : "red",
            color: "white",
            border: "none",
            padding: "8px 12px",
            marginRight: "10px",
            cursor: toDelete.length === 0 ? "not-allowed" : "pointer",
            borderRadius: "5px",
          }}
        >
          {loading ? "Suppression..." : "Confirmer"}
        </button>
        <button
          onClick={onCancel}
          style={{
            background: "gray",
            color: "white",
            border: "none",
            padding: "8px 12px",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Annuler
        </button>
      </div>
    </div>
  );
};

export default ConfirmDelete;
