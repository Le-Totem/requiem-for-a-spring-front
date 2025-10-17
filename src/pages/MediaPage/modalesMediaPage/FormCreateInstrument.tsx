import type React from "react";
import type { Instrument } from "../../../types/Instrument";
import { useEffect, useState } from "react";
import { fetchAllInstruments } from "../../../api/InstrumentApi";
import styles from "./FormCreateInstrument.module.css";

interface FormCreateInstrumentProps {
    onConfirm: (data: { id?: number; name: string }) => void;
    existingInstruments?: Instrument[];
}

const FormCreateInstrument: React.FC<FormCreateInstrumentProps> = ({ onConfirm, existingInstruments = [] }) => {
    const [formData, setFormData] = useState({ name: "" });
    const [allInstruments, setAllIntruments] = useState<Instrument[]>([]);
    const [filteredInstruments, setFilteredInstruments] = useState<Instrument[]>([]);

    const loadAllInstruments = async () => {
        try {
            const instruments = await fetchAllInstruments();
            setAllIntruments(instruments);
            setFilteredInstruments(instruments);
        } catch (error) {
            console.error("Erreur lors du chargement des instruments :", error);
        }
    };

    useEffect(() => {
        loadAllInstruments();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((i) => ({ ...i, [name]: value }));
        const filtered = allInstruments.filter((g) =>
            g.name.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredInstruments(filtered);
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.name.trim()) {
            alert("Le nom de l'instrument est obligatoire.");
            return;
        }
        const alreadyAdded = existingInstruments.some(
            (g) => g.name.toLowerCase() === formData.name.toLowerCase()
        );
        if (alreadyAdded) {
            alert("Cet instrument est déjà ajouté à ce média.");
            return;
        }

        onConfirm({ name: formData.name });
    }

    const handleSelectInstrument = (instrument: Instrument) => {
        const alreadyAdded = existingInstruments.some(
            (g) => g.name.toLowerCase() === instrument.name.toLowerCase()
        );
        if (alreadyAdded) {
            alert("Cet instrument est déjà ajouté à ce média.");
            return;
        }
        onConfirm({ id: instrument.id, name: instrument.name });
    };

    return (
        <>
            {filteredInstruments.length > 0 ? (
                <div className={styles.existing_instrument_container}>
                    <p>Instruments existants :</p>
                    <ul>
                        {filteredInstruments.map((genre) => (
                            <li key={genre.id} onClick={() => handleSelectInstrument(genre)}>
                                {genre.name}
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <p>Aucun instrument trouvé.</p>
            )}

            < form onSubmit={handleSubmit} >
                <label>Ajouter un instrument :</label>
                <input name="name" type="text" placeholder="Nouveau nom..." value={formData.name} onChange={handleChange} />
                <button type="submit">Ajouter</button>
            </form >
        </>
    );
};

export default FormCreateInstrument;
