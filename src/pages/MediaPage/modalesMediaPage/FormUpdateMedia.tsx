import type React from "react";
import { useEffect, useState } from "react";

import type { Media } from "../../../types/Media";
import { fetchUploadFile } from "../../../api/MediaApi";

interface FormUpdateMediaProps {
    defaultValues?: Media,
    onConfirm?: (updatedData: Partial<Media>) => void;
}

const FormUpdateMedia: React.FC<FormUpdateMediaProps> = ({ defaultValues, onConfirm }) => {
    const [file, setFile] = useState<File | null>(null);
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

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.title?.trim() || !formData.type) {
            alert("Le titre et le type du média sont obligatoires.");
            return;
        }

        let fileUrl = formData.url;

        try {
            if (file) {
                const uploadData = new FormData();
                uploadData.append("file", file);
                fileUrl = await fetchUploadFile(uploadData);
            }

            const updatedData: Partial<Media> = { ...formData, url: fileUrl, dateModified: new Date() };
            onConfirm?.(updatedData);
        } catch (error) {
            console.error("Erreur lors de la mise à jour du média:", error);
        }

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
            {/* <input name="url" type="text" placeholder="Nouvelle URL..." value={formData.url} onChange={handleChange} /> */}
            <input type="file" onChange={handleFileSelect} />

            <button type="submit">Modifier</button>
        </form>
    );
};

export default FormUpdateMedia;