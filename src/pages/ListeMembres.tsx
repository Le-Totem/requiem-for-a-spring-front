import { useEffect, useState } from "react";
import { Note } from "../components/Note";
import Partition from "../components/Partition";
import TitlePartition from "../components/TitlePartition";
import { getListeMembres, envoyerInvitation, supprimerMembre } from "../api/ListeMembresApi";


export default function ListeMembres() {
    const [membres, setMembres] = useState<{ id: string; nom: string; email: string }[]>([]);
    const [loading, setLoading] = useState(true);
    const groupId = 1; // Id de l'ensemble à passer pour l'invitation

    useEffect(() => {
        async function fetchMembres() {
            try {
                const data = await getListeMembres();
                setMembres(data);
            } catch (err) {
                console.error("Erreur chargement membres :", err);
            } finally {
                setLoading(false);
            }
        }
        fetchMembres();
    }, []);

    const handleInvitation = async () => {
        const email = prompt("Adresse email à inviter :");
        if (!email) return;
        try {
            await envoyerInvitation(email, groupId);
            alert(`Invitation envoyée à ${email}`);
        } catch (err) {
            console.error(err);
            alert("Erreur lors de l’envoi de l’invitation");
        }
    };

    const handleRefresh = async () => {
        try {
            const data = await getListeMembres();
            setMembres(data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async (id: string) => {
        const confirmDelete = window.confirm("Êtes-vous sûr de vouloir supprimer ce membre ?");
        if (!confirmDelete) return;

        try {
            await supprimerMembre(id);
            setMembres((prev) => prev.filter((m) => m.id !== id));
        } catch (err) {
            console.error(err);
            alert("Erreur lors de la suppression");
        }
    };

    if (loading) return <p>Chargement...</p>;

    return (
        <main className="listeMembres-container">
            <div className="title-wrapper">
                <TitlePartition text="Liste des Membres" />
            </div>

            <div className="crud">
                <div className="partitionCrud">
                    <Partition />

                    <button className="crud-button" onClick={handleInvitation}>
                        <Note x={0} y={0} xtext={15} label="Inviter" iconType="blanche" isOnStaff={false} />
                    </button>

                    <button className="crud-button" onClick={handleRefresh}>
                        <Note x={0} y={0} xtext={15} label="Mettre à jour" iconType="blanche" isOnStaff={false} />
                    </button>
                </div>
            </div>

            <div className="listeMembres-container">
                {membres.map((membre) => (
                    <div key={membre.id} className="partition-wrapper">
                        <span className="labelMembres gauche">
                            <Note x={0} y={0} xtext={0} label="" iconType="croche" isOnStaff={false} />
                            {membre.nom}
                        </span>
                        <button className="labelMembres droite" onClick={() => handleDelete(membre.id)}>
                            <Note x={0} y={0} xtext={0} label="" iconType="croche" isOnStaff={false} />
                            Supprimer
                        </button>
                        <Partition />
                    </div>
                ))}
            </div>
        </main>
    );
}
