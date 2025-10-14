import type React from "react";

interface ConfirmDeleteMediaProps {
    onConfirm: () => void;
}

const ConfirmDeleteMedia: React.FC<ConfirmDeleteMediaProps> = ({ onConfirm }) => {
    return (
        <div>
            <p>Voulez-vous vraiment supprimer ce média ?</p>
            <button onClick={onConfirm}>Confirmer</button>
        </div>
    );
};

export default ConfirmDeleteMedia;