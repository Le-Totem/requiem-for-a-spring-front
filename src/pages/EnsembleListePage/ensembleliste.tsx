import PartitionClefSol, {type NoteData} from "../../components/PartitionClefSol.tsx";
import "../../styles/ensembleliste.css";
import { useEffect, useState } from "react";
import { groupService, type UserRoleDto } from "../../api/GroupApi.ts";
import PartitionTitle from "../../components/TitlePartition.tsx";
import styles from "./EnsembleListe.module.css"
import { Note } from "../../components/Note.tsx";


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
                <div className={styles.buttoncrud}> 
                  <Note  x={0} y={0} label="create" iconType="double" onClick={() => console.log("noteSansPartition1")} isOnStaff={false} />
                  <Note  x={0} y={0} label="update" iconType="double" onClick={() => console.log("noteSansPartition1")} isOnStaff={false} />
                  <Note  x={0} y={0} label="delete" iconType="double" onClick={() => console.log("noteSansPartition1")} isOnStaff={false} />
                </div>
            


        </main >
    );
}

