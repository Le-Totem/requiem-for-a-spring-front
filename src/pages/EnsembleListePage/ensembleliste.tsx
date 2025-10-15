import "../../styles/ensembleliste.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { groupService, type UserRoleDto } from "../../api/GroupApi.ts";
import PartitionTitle from "../../components/TitlePartition.tsx";
import stylesEns from "./EnsembleListe.module.css"
import { Note } from "../../components/Note.tsx";
import VerticalButton from "../../components/verticalButton/VerticalButton.tsx"
import ModalCrud from "../../components/modalCrudEnsemble/ModalCrudEnsemble.tsx";
import FormCreate from "../../components/modalCrudEnsemble/FormCreate.tsx";
import FormUpdate from "../../components/modalCrudEnsemble/FormUpdtate.tsx";
import ConfirmDelete from "../../components/modalCrudEnsemble/ConfirmDelete.tsx";
import NotificationButton from "../../components/Notification/NotificationButton.tsx";


export default function Ensembleliste() {
  const navigate = useNavigate();

  const [ensembles, setEnsembles] = useState<UserRoleDto[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [openModal, setOpenModal] = useState(false);
  const [typeModal, setTypeModal] = useState<"create" | "update" | "delete">("create");
  
  const [selectedToDelete, setSelectedToDelete] = useState<{ id: number; name: string }[]>([]);
  const [selectedToUpdate, setSelectedToUpdate] = useState<{ id: number; name: string }[]>([]);

  const handleOpenModal = (type: "create" | "update" | "delete") => {
    setTypeModal(type);
    if (type === "delete" || type === "update") {
    const adminGroups = ensemblesAdmin.map((e) => ({
      id: e.group.id!,
      name: e.group.name,
    }));
    //c'est vscode qui ma dit 
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    type === "delete" ? setSelectedToDelete(adminGroups) : setSelectedToUpdate(adminGroups);
  }
  
    setOpenModal(true);
  };


  const modalContent = {
    create: <FormCreate onClose={() => setOpenModal(false)} />,
   
    update: <FormUpdate
    items={selectedToUpdate}
    onCancel={() => setOpenModal(false)}
    onUpdated={() => {
      groupService.getMyGroups().then(setEnsembles);
      setOpenModal(false);
    }}
  />,
   
  delete: (
  <ConfirmDelete
    items={selectedToDelete}
    onCancel={() => setOpenModal(false)}
    onDeleted={() => {
      setOpenModal(false);
      groupService.getMyGroups().then(setEnsembles);
    }}
  />
),

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

 // Séparation des ensembles selon  role
  const ensemblesAdmin = ensembles.filter((e) => e.role === "ADMIN" || e.role === "MODERATEUR");
  const ensemblesParticipant = ensembles.filter((e) => e.role !== "ADMIN");

  return (
    <main className="ensemble-container">

      <div className={stylesEns.title}>
        <PartitionTitle text="Liste d'ensembles" textSize={25} showClef={true} />
        <NotificationButton/>
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
            onClick={() => navigate(`/ensemble/${ens.group.id}`, { state: { groupName: ens.group.name } })} xtext={0}          />
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
      <p>Aucun ensemble ou vous etes administrateur.</p>
    ) : (
      ensemblesAdmin.map((ens, index) => (
        <div key={ens.id_group ?? index} className={stylesEns.groupItem}>
          <Note
            x={0}
            y={0}
            label={ens.group.name}
            iconType="blanche"
            isOnStaff={false}
            onClick={() => navigate(`/ensemble/${ens.group.id}`, { state: { groupName: ens.group.name } })} xtext={15}            />
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
        {ensemblesAdmin.length > 0 && (
    <>
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
    </>
  )}
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

