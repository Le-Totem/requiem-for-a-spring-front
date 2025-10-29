import React, { useState } from "react";
import { groupService } from "../../api/GroupApi";

interface FormUpdateProps {
  items: { id: number; name: string }[];
  onCancel: () => void;
  onUpdated?: () => void;
}

const FormUpdate: React.FC<FormUpdateProps> = ({ items, onCancel, onUpdated }) => {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [newName, setNewName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const startEditing = (id: number, currentName: string) => {
    setEditingId(id);
    setNewName(currentName);
  };

  const handleUpdate = async () => {
    if (!editingId || !newName.trim()) return;

    setLoading(true);
    setError(null);

    try {
      await groupService.update(editingId, newName);
      if (onUpdated) onUpdated();
      setEditingId(null);
      setNewName("");
    } catch (err) {
      if (err instanceof Error) setError(err.message);
      else setError("Erreur lors de la mise à jour");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <p>Sélectionnez un ensemble à modifier :</p>

      {items.length === 0 ? (
        <p>Aucun ensemble disponible.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {items.map((item) => (
            <li
              key={item.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                margin: "8px 0",
                opacity: editingId === item.id ? 0.6 : 1,
                transition: "opacity 0.3s ease",
              }}
            >
              <span>{item.name}</span>
              <button
                onClick={() => startEditing(item.id, item.name)}
                style={{
                  background: "transparent",
                  border: "none",
                  color: editingId === item.id ? "gray" : "blue",
                  fontSize: "18px",
                  cursor: "pointer",
                }}
                title="Modifier le nom"
              >
                ✎
              </button>
            </li>
          ))}
        </ul>
      )}

      {editingId && (
        <div style={{ marginTop: "10px" }}>
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          <button
            onClick={handleUpdate}
            disabled={loading}
            style={{
              background: "blue",
              color: "white",
              border: "none",
              padding: "8px 12px",
              marginLeft: "10px",
              cursor: "pointer",
              borderRadius: "5px",
            }}
          >
            {loading ? "Mise à jour..." : "Confirmer"}
          </button>
          <button
            onClick={() => setEditingId(null)}
            style={{
              background: "gray",
              color: "white",
              border: "none",
              padding: "8px 12px",
              marginLeft: "10px",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Annuler
          </button>
        </div>
      )}

      <div style={{ marginTop: "15px" }}>
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
          Fermer
        </button>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default FormUpdate;
