import type React from "react";
import { useState } from "react";

interface FormUpdateMusicPieceProps {
    onConfirm: (data: Partial<{ title: string; author: string; description: string }>) => void;
    defaultValues?: { title?: string; author?: string; description?: string };
}

const FormUpdateMusicPiece: React.FC<FormUpdateMusicPieceProps> = ({ onConfirm, defaultValues }) => {
    const [formData, setFormData] = useState({
        title: defaultValues?.title || "",
        author: defaultValues?.author || "",
        description: defaultValues?.description || ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((i) => ({ ...i, [name]: value }));
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const cleanedData = Object.fromEntries(
            Object.entries(formData).filter(([_, value]) => value.trim() !== "")
        );
        onConfirm(cleanedData);
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>Modifier une fiche morceau :</label>
            <input name="title" type="text" placeholder="Nouveau titre..." value={formData.title} onChange={handleChange} />
            <input name="author" type="text" placeholder="Nouvel auteur..." value={formData.author} onChange={handleChange} />
            <input name="description" type="text" placeholder="Nouvelle description..." value={formData.description} onChange={handleChange} />
            <button type="submit">Mettre à jour</button>
        </form>
    );
};

export default FormUpdateMusicPiece;