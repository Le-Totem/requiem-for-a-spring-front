import React from "react";
import crud from "./modalCrudEnsemble.module.css";

interface ModalCrudProps {
  typeModal: string;
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

const ModalCrud: React.FC<ModalCrudProps> = ({ typeModal, isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className={crud.overlay}>
      <div className={crud.modalCrud}>
        <header className={crud.header}>
          <h3>
            {typeModal === "create" && "Créer un ensemble"}
            {typeModal === "update" && "Modifier un ensemble"}
            {typeModal === "delete" && "Supprimer un ensemble"}

            {typeModal === "createMedia" && "Ajouter un média"}
            {typeModal === "updateMedia" && "Modifier un média"}
            {typeModal === "updateMusicPiece" && "Modifier une fiche morceau"}
            {typeModal === "deleteMusicPiece" && "Supprimer une fiche morceau"}

            {typeModal === "addGenre" && "Ajouter un genre"}
            {typeModal === "deleteGenre" && "Supprimer un genre"}
          </h3>
          <button onClick={onClose} className={crud.closeBtn}>✕</button>
        </header>

        <div className={crud.content}>{children}</div>
      </div>
    </div>
  );
};

export default ModalCrud;
