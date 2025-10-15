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
            {typeModal === "create" && "Créer"}
            {typeModal === "update" && "Modifier"}
            {typeModal === "delete" && "Supprimer"}
            {typeModal === "listemembre" && "Liste des membres du groups"}
            {typeModal === "invitmembre" && "Inviter un membre dans se groupe"}
          </h3>
          <button onClick={onClose} className={crud.closeBtn}>✕</button>
        </header>

        <div className={crud.content}>{children}</div>
      </div>
    </div>
  );
};

export default ModalCrud;
