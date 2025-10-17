import type React from "react";
import { useEffect, useState } from "react";
import type { Genre } from "../../../types/Genre";
import { fetchAllGenres } from "../../../api/MusicPieceApi";
import styles from "./FormCreateGenre.module.css";

interface FormCreateGenreProps {
    onConfirm: (data: { id?: number; name: string }) => void;
    existingGenres?: Genre[];
}

const FormCreateGenre: React.FC<FormCreateGenreProps> = ({ onConfirm, existingGenres = [] }) => {
    const [formData, setFormData] = useState({ name: "" });
    const [allGenres, setAllGenres] = useState<Genre[]>([]);
    const [filteredGenres, setFilteredGenres] = useState<Genre[]>([]);

    const loadAllGenres = async () => {
        try {
            const genres = await fetchAllGenres();
            setAllGenres(genres);
            setFilteredGenres(genres);
        } catch (error) {
            console.error("Erreur lors du chargement des genres :", error);
        }
    };


    useEffect(() => {
        loadAllGenres();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((i) => ({ ...i, [name]: value }));
        const filtered = allGenres.filter((g) =>
            g.name.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredGenres(filtered);
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.name.trim()) {
            alert("Le nom du genre est obligatoire.");
            return;
        }
        const alreadyAdded = existingGenres.some(
            (g) => g.name.toLowerCase() === formData.name.toLowerCase()
        );
        if (alreadyAdded) {
            alert("Ce genre est déjà ajouté à cette fiche morceau.");
            return;
        }

        onConfirm({ name: formData.name });
    }

    const handleSelectGenre = (genre: Genre) => {
        const alreadyAdded = existingGenres.some(
            (g) => g.name.toLowerCase() === genre.name.toLowerCase()
        );
        if (alreadyAdded) {
            alert("Ce genre est déjà ajouté à cette fiche morceau.");
            return;
        }
        onConfirm({ id: genre.id, name: genre.name });
    };

    return (
        <>
            {filteredGenres.length > 0 ? (
                <div className={styles.existing_genre_container}>
                    <p>Genres existants :</p>
                    <ul>
                        {filteredGenres.map((genre) => (
                            <li key={genre.id} onClick={() => handleSelectGenre(genre)}>
                                {genre.name}
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <p>Aucun genre trouvé.</p>
            )}

            < form onSubmit={handleSubmit} >
                <label>Ajouter un genre :</label>
                <input name="name" type="text" placeholder="Nouveau nom..." value={formData.name} onChange={handleChange} />
                <button type="submit">Ajouter</button>
            </form >
        </>
    );
};

export default FormCreateGenre;