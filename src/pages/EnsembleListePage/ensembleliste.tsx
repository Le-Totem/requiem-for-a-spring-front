import "../../styles/ensembleliste.css";
import { useEffect, useState } from "react";
import { groupService, type UserRoleDto } from "../../api/GroupApi.ts";
import PartitionTitle from "../../components/TitlePartition.tsx";
import stylesEns from "./EnsembleListe.module.css"
import { Note } from "../../components/pathButtons/Note.tsx";
import VerticalButton from "../../components/pathButtons/verticalButton/VerticalButton.tsx"
import ModalCrud from "../../components/modalCrudEnsemble/ModalCrudEnsemble.tsx";
import FormCreate from "../../components/modalCrudEnsemble/FormCreate.tsx";
import FormUpdate from "../../components/modalCrudEnsemble/FormUpdtate.tsx";
import ConfirmDelete from "../../components/modalCrudEnsemble/ConfirmDelete.tsx";


export default function Ensembleliste() {

  const [ensembles, setEnsembles] = useState<UserRoleDto[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [openModal, setOpenModal] = useState(false);
  const [typeModal, setTypeModal] = useState<"create" | "update" | "delete">("create");

  const handleOpenModal = (type: "create" | "update" | "delete") => {
    setTypeModal(type);
    setOpenModal(true);
  };

  const modalContent = {
    create: <FormCreate onClose={() => setOpenModal(false)} />,
    update: <FormUpdate />,
    delete: <ConfirmDelete />,
  };


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

      <div className={stylesEns.title}>
        <PartitionTitle text="Liste d'ensembles" textSize={25} showClef={true} />
      </div>

      {/* --- Participant --- */}
      <section>
        <h4 className="subtitle-ensemble">Ensembles participant</h4>
        <div className={stylesEns.partitionensemble}>
          {ensemblesParticipant.length === 0 ? (
            <p>Aucun ensemble en tant que participant.</p>
          ) : (
            ensemblesParticipant.map((ens, index) => (
              <div key={ens.id_group ?? index} className={stylesEns.groupItem}>
                <Note
                  x={0}
                  y={0}
                  label={ens.group.name}
                  iconType="blanche"
                  isOnStaff={false}
                  onClick={() => console.log("Groupe participant :", ens.group.name)}
                />
              </div>
            ))
          )}
        </div>
      </section>

      {/* --- Admin --- */}
      <section>
        <h4 className="subtitle-ensemble">Ensembles administrateur</h4>
        <div className={stylesEns.partitionensemble}>
          {ensemblesAdmin.length === 0 ? (
            <p>Aucun ensemble administré.</p>
          ) : (
            ensemblesAdmin.map((ens, index) => (
              <div key={ens.id_group ?? index} className={stylesEns.groupItem}>
                <Note
                  x={0}
                  y={0}
                  label={ens.group.name}
                  iconType="blanche"
                  isOnStaff={false}
                  onClick={() => console.log("Groupe admin :", ens.group.name)}
                />
              </div>
            ))
          )}
        </div>
      </section>

      <div className={stylesEns.crud}>
        <VerticalButton
          label="Create"
          iconType="doubleNoire"
          onClick={() => handleOpenModal("create")}
        />
        <VerticalButton
          label="Update"
          iconType="doubleNoire"
          onClick={() => handleOpenModal("update")}
        />
        <VerticalButton
          label="Delete"
          iconType="doubleNoire"
          onClick={() => handleOpenModal("delete")}
        />
      </div>

      <ModalCrud
        typeModal={typeModal}
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
      >
        {modalContent[typeModal]}
      </ModalCrud>
    </main >
  );
}

