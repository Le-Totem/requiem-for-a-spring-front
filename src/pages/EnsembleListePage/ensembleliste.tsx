import "../../styles/ensembleliste.css";
import { useEffect, useState } from "react";
import { groupService, type UserRoleDto } from "../../api/GroupApi.ts";
import PartitionTitle from "../../components/TitlePartition.tsx";
import styles from "./EnsembleListe.module.css"
import { Note } from "../../components/Note.tsx";
import VerticalButton  from "../../components/verticalButton/VerticalButton.tsx"


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

    return (
        <main className="ensemble-container">

         <div className={styles.title}>
        <PartitionTitle text="Liste des ensembles" textSize={25} showClef={true} />
      </div>

      {/* --- Participant --- */}
      <section>
        <h4 className="subtitle-ensemble">Ensembles participant</h4>
        <div className={styles.partitionensemble}>
          {ensemblesParticipant.length === 0 ? (
            <p>Aucun ensemble en tant que participant.</p>
          ) : (
            ensemblesParticipant.map((ens, index) => (
              <div key={ens.id_group ?? index} className={styles.groupItem}>
                <Note
                  x={0}
                  y={0}
                  label=""
                  iconType="blanche"
                  isOnStaff={false}
                  onClick={() => console.log("Groupe participant :", ens.group.name)}
                />
                <span className={styles.groupName}>{ens.group.name}</span>
              </div>
            ))
          )}
        </div>
      </section>

      {/* ---Admin --- */}
      <section>
        <h4 className="subtitle-ensemble">Ensembles administrateur</h4>
        <div className={styles.partitionensemble}>
          {ensemblesAdmin.length === 0 ? (
            <p>Aucun ensemble administré.</p>
          ) : (
            ensemblesAdmin.map((ens, index) => (
              <div key={ens.id_group ?? index} className={styles.groupItem}>
                <Note
                  x={0}
                  y={0}
                  label=""
                  iconType="blanche"
                  isOnStaff={false}
                  onClick={() => console.log("Groupe admin :", ens.group.name)}
                />
                <span className={styles.groupName}>{ens.group.name}</span>
              </div>
            ))
          )}
        </div>
      </section>

          <VerticalButton label="test"
        iconType="doubleNoire"
        />
      
        </main >
    );
}

