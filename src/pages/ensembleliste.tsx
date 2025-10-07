import PartitionClefSol, {type NoteData} from "../components/PartitionClefSol";
import "../styles/ensembleliste.css";
import PartitionNote from "../components/PartitionNote.tsx";
import { useEffect, useState } from "react";
import { groupService, type UserRoleDto } from "../api/GroupApi.tsx";
import PartitionTitle from "../components/TitlePartition.tsx";


export default function Ensembleliste() {

  const [ensembles, setEnsembles] = useState<UserRoleDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Charger les ensembles
  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const data = await groupService.getMyGroups();
        setEnsembles(data);
      } catch (err: unknown) {
        if (err instanceof Error) setError(err.message);
        else setError("Erreur inconnue");
      } finally {
        setLoading(false);
      }
    };
    fetchGroups();
  }, []);

  if (loading) return <p className="ensemble-loading">Chargement des ensembles...</p>;
  if (error) return <p className="ensemble-error">{error}</p>;

 // Séparation des ensembles selon le rôle
  const ensemblesAdmin = ensembles.filter((e) => e.role === "ADMIN" || e.role === "MODERATEUR");
  const ensemblesParticipant = ensembles.filter((e) => e.role !== "ADMIN");

  // Notes pour les ensembles administrés
  const notesAdmin: NoteData[] = ensemblesAdmin.map((userRole, index) => ({
    x: 100 + index * 150,
    y: 20 + (index % 2) * 10,
    label: userRole.group.name,
    iconType: "blanche",
    onClick: () => console.log(`Admin - ${userRole.group.name}`),
  }));

  // Notes pour les ensembles où l’utilisateur participe
  const notesParticipant: NoteData[] = ensemblesParticipant.map((userRole, index) => ({
    x: 100 + index * 150,
    y: 20 + (index % 2) * 10,
    label: userRole.group.name,
    iconType: "blanche",
    onClick: () => console.log(`Participant - ${userRole.group.name}`),
  }));
  
    

    const notesOnPartition: NoteData[] = [
            { x: 50, y: 20, label: "Créer", iconType: "blanche", onClick: () => console.log("Créer") },
            { x: 200, y: 30, label: "Mettre à jour", iconType: "blanche", onClick: () => console.log("Mettre à jour") },
            { x: 400, y: 25, label: "Valider", iconType: "blanche", onClick: () => console.log("Valider") },
        ];

    return (
        <main className="ensemble-container">

          <PartitionTitle 
        text="Liste des ensembles" 
        textSize={25}
        showClef={true}
      />


            <div >
                <h4 className="subtitle-ensemble">Ensemble participant</h4>
                <div className="partition-wrapper"><PartitionClefSol notes={notesParticipant} />
                
                </div>

            </div>

            <div>

                <h4 className="subtitle-ensemble">Ensemble administrateur</h4>
                <div className="partition-wrapper"><PartitionClefSol notes={notesAdmin}/>
                
                </div>
                
              
            </div>
            <div>
                <div className="partition-wrapper-crud"><PartitionNote notes={notesOnPartition} />
                </div>
            </div>


        </main >
    );
}

