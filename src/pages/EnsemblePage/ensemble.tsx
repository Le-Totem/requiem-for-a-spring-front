import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchAllByIdGroup } from "../../api/MusicPieceApi.ts";
import type { MusicPiece } from "../../types/MusicPiece";
import PartitionTitle from "../../components/TitlePartition.tsx";
import styles from "./Ensemble.module.css";

import { fetchCurrentUser } from "../../api/UserApi.ts";
import { getUser, isAdmin, isModerator, setUser } from "../../utils/LocalStorageManager";

import ModalCrud from "../../components/modalCrudEnsemble/ModalCrudEnsemble.tsx";
import FormCreate from "../../components/modalCrudMusicPiece/FormCreate.tsx";
import ListUser from "../../components/modalCrudMusicPiece/ListMember.tsx";
import InvitMember from "../../components/modalCrudMusicPiece/InvitMember.tsx";


// import VerticalButton from "../../components/verticalButton/VerticalButton.tsx";
import { Note } from "../../components/pathButtons/Note.tsx";
import VerticalButton from "../../components/verticalButton/VerticalButton.tsx";

export default function EnsemblePage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const groupId = id ? Number(id) : -1;

  const location = useLocation();
  const groupName = (location.state as { groupName?: string })?.groupName;

  const [musicPieces, setMusicPieces] = useState<MusicPiece[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const [openModal, setOpenModal] = useState(false);
  const [typeModal, setTypeModal] = useState<"createMedia" | "listemembre" | "invitmembre" | "">("");
  const [selectedPiece, setSelectedPiece] = useState<MusicPiece | null>(null);


  const handleOpenModal = (type: "createMedia" | "listemembre" | "invitmembre", piece?: MusicPiece) => {
    setTypeModal(type);
    setSelectedPiece(piece || null);
    setOpenModal(true);
  };

  const modalContent = {
    createMedia: (
      <FormCreate
        onClose={() => setOpenModal(false)}
        onCreated={(createdPiece) => {
          setMusicPieces((prev) => [...prev, createdPiece]);
        }}
      />
    ),
    listemembre: (
      <ListUser onClose={() => setOpenModal(false)} />
    ),
    invitmembre: (
      <InvitMember onClose={() => setOpenModal(false)} />
    )


  };



  // Charger l’utilisateur actuel
  const loadUser = async () => {
    try {
      const user = await fetchCurrentUser();
      setUser(user);
      setIsAuthenticated(true);
    } catch (error) {
      setError("Erreur lors du chargement des infos de l'utilisateur.");
      console.log(error);
    }
  };

  // Charger les morceaux de l'ensemble
  const loadPieces = async () => {
    if (!id) return;
    try {
      const data = await fetchAllByIdGroup(Number(id));
      setMusicPieces(data);
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError("Erreur inconnue");
    } finally {
      setLoading(false);
    }
  };

  // Load user au montage
  useEffect(() => {
    loadUser();
  }, []);

  // Load pieces uniquement après avoir chargé l'utilisateur
  useEffect(() => {
    if (isAuthenticated) {
      loadPieces();
    }
  }, [isAuthenticated]);

  if (loading) return <p>Chargement des morceaux...</p>;
  if (error) return <p>Erreur : {error}</p>;

  return (
    <main className={styles.container}>
      <PartitionTitle text={groupName} textSize={25} showClef={true} />

      <div className={styles.ens_crud}>

        {(isAdmin(groupId) || isModerator(groupId)) && (
          <>
            <VerticalButton label="Créer" iconType="blanche" onClick={() => handleOpenModal("createMedia")} />
            <VerticalButton label="inviter un membre" iconType="blanche" onClick={() => handleOpenModal("invitmembre")} />
          </>
        )}
        <VerticalButton label="liste des membres" iconType="blanche" onClick={() => handleOpenModal("listemembre")} />
      </div>


      {musicPieces.length === 0 ? (
        <p>Aucun morceau trouvé pour cet ensemble.</p>
      ) : (
        <div className={styles.partitionensemble}>
          {musicPieces.map((piece) => (
            <Note
              key={piece.id}
              x={0}
              y={0}
              label={piece.title}
              iconType="doubleNoire"
              isOnStaff={false}
             onClick={() => navigate(`/tracks?id=${piece.id}`)} xtext={15} />
          ))}
        </div>
      )}

      <ModalCrud
        typeModal={typeModal}
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
      >
        {typeModal && modalContent[typeModal]}
      </ModalCrud>



    </main>
  );
}
