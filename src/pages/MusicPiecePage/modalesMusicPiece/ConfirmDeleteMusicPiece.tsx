import type React from "react";

interface ConfirmDeleteMusicPieceProps {
    onConfirm: () => void;
}

const ConfirmDeleteMusicPiece: React.FC<ConfirmDeleteMusicPieceProps> = ({ onConfirm }) => {
    return (
        <div>
            <p>Voulez-vous vraiment supprimer cette fiche morceau ?</p>
            <button onClick={onConfirm}>Confirmer</button>
        </div>
    );
};

export default ConfirmDeleteMusicPiece;