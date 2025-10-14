import type React from "react";
import { useEffect, useState } from "react";

import type { Media } from "../../../types/Media";

interface FormUpdateMediaProps {
    defaultValues?: Media,
    onConfirm?: (updatedData: Partial<Media>) => void;
}

const FormUpdateMedia: React.FC<FormUpdateMediaProps> = ({ defaultValues, onConfirm }) => {
    const [formData, setFormData] = useState<Partial<Media>>({
        title: "",
        type: undefined,
        url: "",
        dateModified: new Date()
    });

    useEffect(() => {
        if (defaultValues) {
            setFormData({
                title: defaultValues.title,
                type: defaultValues.type,
                url: defaultValues.url,
                dateModified: new Date()
            });
        }
    }, [defaultValues]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value, }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.title?.trim() || !formData.type) {
            alert("Le titre et le type du média sont obligatoires.");
            return;
        }
        const updatedData: Partial<Media> = { ...formData, dateModified: new Date() };
        onConfirm?.(updatedData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <p>Modifier le média :</p>
            <label htmlFor="title"></label>
            <input name="title" type="text" placeholder="Nouveau titre..." value={formData.title} onChange={handleChange} />

            <label htmlFor="type">URL :</label>
            <select name="type" value={formData.type} onChange={handleChange} >
                <option value="">Choisir un type :</option>
                <option value="PDF">PDF</option>
                <option value="IMAGE">IMAGE</option>
                <option value="VIDEO">VIDÉO</option>
                <option value="MUSECORE">MUSECORE</option>
                <option value="TUXGUITAR">TUXGUITAR</option>
            </select>

            <label htmlFor="url">URL :</label>
            <input name="url" type="text" placeholder="Nouvelle URL..." value={formData.url} onChange={handleChange} />

            <button type="submit">Modifier</button>
        </form>
    );
};

export default FormUpdateMedia;