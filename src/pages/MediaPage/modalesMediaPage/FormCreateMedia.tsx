import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { MediaType } from "../../../enums/MediaType";
import type { Media } from "../../../types/Media";
import { getUser } from "../../../utils/LocalStorageManager";
import { fetchUploadFile } from "../../../api/MediaApi";

interface FormCreateMediaProps {
    onConfirm: (data: Omit<Media, "id" | "dateModified">) => void;
}

const FormCreateMedia: React.FC<FormCreateMediaProps> = ({ onConfirm }) => {
    const { id } = useParams<{ id: string }>();
    const idTrack = Number(id);
    const [file, setFile] = useState<File | null>(null);

    const [formData, setFormData] = useState<Omit<Media, "id" | "dateModified">>({
        title: "",
        type: MediaType.PDF,
        url: "",
        dateAdded: new Date(),
        idTrack: idTrack,
        idUser: 0,
        mediaInstruments: []
    })

    useEffect(() => {
        const user = getUser();
        if (user) {
            setFormData((prev) => ({ ...prev, idUser: Number(user.id) }));
        }
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: name === "type" ? value as MediaType : value }));
    }

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.title.trim()) {
            alert("Le titre du média sont obligatoire.");
            return;
        }

        let uploadFile = "";
        try {
            if (file) {
                const uploadData = new FormData();
                uploadData.append("file", file);
                uploadFile = await fetchUploadFile(uploadData);
            }
            onConfirm({ ...formData, url: uploadFile || formData.url });
        } catch (error) {
            console.error("Erreur lors de la création du média:", error);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <p>Ajouter un média :</p>
            <label htmlFor="title"></label>
            <input name="title" type="text" placeholder="Nouveau titre..." value={formData.title} onChange={handleChange} />

            <label htmlFor="type">Type :</label>
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
            <input type="file" value={formData.url} onChange={handleFileSelect} />
            <button type="submit">Ajouter</button>
        </form>
    );
};

export default FormCreateMedia;