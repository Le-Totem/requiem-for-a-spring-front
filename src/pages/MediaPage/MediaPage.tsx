import React from "react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

import type { Media } from "../../types/Media";
// import { Note } from "../../components/pathButtons/Note";
import PartitionTitle from "../../components/TitlePartition";
import ModalCrud from "../../components/modalCrudEnsemble/ModalCrudEnsemble";
// import VerticalButton from "../../components/pathButtons/verticalButton/VerticalButton";
import { getUser, setUser } from "../../utils/LocalStorageManager";

import { fetchCurrentUser } from "../../api/UserApi";
import { fetchAllMedias } from "../../api/MusicPieceApi";
import { fetchAddIntrumentToMedia, fetchCreateMedia, fetchDeleteMedia, fetchFindFichier, fetchUpdateMedia } from "../../api/MediaApi";

import FormUpdateMedia from "./modalesMediaPage/FormUpdateMedia";
import FormCreateMedia from "./modalesMediaPage/FormCreateMedia";
import ConfirmDeleteMedia from "./modalesMediaPage/ConfirmDeleteMedia";
import styles from "./MediaPage.module.css";
import type { Instrument } from "../../types/Instrument";
import { fetchAllIntrumentsByIdMedia, fetchCreateInstrument } from "../../api/InstrumentApi";
import FormCreateInstrument from "./modalesMediaPage/FormCreateInstrument";
import { Note } from "../../components/pathButtons/Note";
import ImgButton from "../../components/imgButtons/ImgButton";

const MediaPage: React.FC = () => {
    const [medias, setMedias] = useState<Media[] | undefined>([]);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [selectedMedia, setSelectedMedia] = useState<Media | null>(null);
    const [instruments, setInstruments] = useState<Record<number, Instrument[]>>([]);

    // modales
    const [openModal, setOpenModal] = useState(false);
    const [typeModal, setTypeModal] = useState<"addMedia" | "updateMedia" | "deleteMedia" | "addInstrument">("addMedia");

    const { id } = useParams<{ id: string }>();
    const idMusicPiece = Number(id);
    const navigate = useNavigate();

    const loadUser = async () => {
        try {
            const user = await fetchCurrentUser();

            setUser(user);
            setIsAuthenticated(true);

            // setRoles(user.groupsRole);
            // On sauvegarde les info utilisateur


        } catch (error) {
            console.error("Erreur lors du chargement de l'utilisateur :", error);
        }
    }

    const loadMedias = async () => {
        try {
            if (!idMusicPiece) {
                setMedias(undefined)
            }
            const mediaData = await fetchAllMedias(idMusicPiece);
            setMedias(mediaData);
            mediaData.map(async (media) => {
                const instruments = await fetchAllIntrumentsByIdMedia(media.id);
                setInstruments((prev) => ({ ...prev, [media.id]: instruments }));
            });
        } catch (error) {
            console.error("Erreur lors du chargement des médias de la fiche morceau :", error);
        }
    }

    const loadInstruments = async (mediaId: number) => {
        try {
            const instrumentData = await fetchAllIntrumentsByIdMedia(mediaId);
            setInstruments(prev => ({ ...prev, [mediaId]: instrumentData }));
        } catch (error) {
            console.error("Erreur lors du chargement des instruments du média :", error);
        }
    }

    const addMedia = async (data: Omit<Media, "id" | "dateModified">) => {
        if (!idMusicPiece) {
            console.error("Ajout du média impossible, la fiche morceau n'existe pas.");
        }

        try {
            const createdMedia = await fetchCreateMedia(idMusicPiece, data);
            setMedias((prev) => [...(prev || []), createdMedia]);
            setOpenModal(false);
            await loadMedias();
        } catch (error) {
            console.error("Erreur lors de la création du média :", error);
        }
    }

    const updateMedia = async (data: Partial<Media>) => {
        try {
            if (!selectedMedia || !selectedMedia.id) {
                console.error("Modification impossible, le média n'existe pas");
                return;
            }
            const updatedMedia = await fetchUpdateMedia(selectedMedia.id, data);
            setMedias((prev) => prev?.map((m) => (m.id === updatedMedia.id ? updatedMedia : m)));
            setOpenModal(false);
        } catch (error) {
            console.error("Erreur lors de la mise à jour du média :", error);
        }
    };

    const deleteMedia = async () => {
        try {
            if (!selectedMedia || !selectedMedia.id) {
                console.error("Suppresion impossible, le média n'existe pas");
                return;
            }
            await fetchDeleteMedia(selectedMedia.id);
            setOpenModal(false);
            await loadMedias();
        } catch (error) {
            console.error("Erreur lors de la suppresion du média :", error);
        }
    }

    const addInstrument = async (data: { id?: number, name: string }) => {
        try {
            if (!selectedMedia || !selectedMedia.id) {
                console.error("Ajout de l'instrument impossible, le média n'existe pas");
                return;
            }

            const idMedia = selectedMedia.id;

            // si l'instrument existe déjà en BDD
            if (data.id) {
                await fetchAddIntrumentToMedia(idMedia, data.id);
                await loadInstruments(idMedia);
                setOpenModal(false);
                return;
            }

            // si l'instrument n'existe pas en BDD
            const createdInstrument = await fetchCreateInstrument({ name: data.name, mediaInstruments: [] });
            await fetchAddIntrumentToMedia(idMedia, createdInstrument.id);
            await loadInstruments(idMedia);
            setOpenModal(false);
        } catch (error) {
            console.error("Erreur lors de l'ajout de l'instument :", error);
        }
    }

    useEffect(() => {
        loadUser();
    }, []);

    useEffect(() => {
        if (getUser() != null) {
            loadMedias();
            // loadInstruments(idMedia);
        }

    }, [isAuthenticated]);

    const handleOpenModal = (type: "addMedia" | "updateMedia" | "deleteMedia" | "addInstrument", media?: Media) => {
        setTypeModal(type);
        setSelectedMedia(media || null);
        setOpenModal(true);
    };

    const handleOpenFile = async (id: number) => {
        try {
            const blob = await fetchFindFichier(id);
            const fileURL = URL.createObjectURL(blob);
            window.open(fileURL, "_blank");
        } catch (error) {
            console.error("Erreur lors de l'ouverture du fichier :", error);
        }
    };

    const modalContent = {
        addMedia: <FormCreateMedia onConfirm={addMedia} />,
        updateMedia: <FormUpdateMedia defaultValues={selectedMedia || undefined}
            onConfirm={(updatedData) => updateMedia(updatedData)} />,
        deleteMedia: <ConfirmDeleteMedia onConfirm={deleteMedia} />,
        addInstrument: <FormCreateInstrument onConfirm={addInstrument}
            existingInstruments={selectedMedia ? (instruments[selectedMedia.id] ?? []) : []} />
    };

    return (
        <>
            <button onClick={() => navigate(`/tracks?id=${idMusicPiece}`)} className={styles.back_button}>↩ retour</button>

            <PartitionTitle text="Médias" textSize={25} showClef={true} />

            <div className={styles.media_crud}>
                <>
                    {/* <VerticalButton label="Ajouter un média" iconType="blanche" onClick={() => handleOpenModal("addMedia")} /> */}
                    <ImgButton iconType="blanche" text="Ajouter un média" onClick={() => handleOpenModal("addMedia")} />
                </>
            </div>


            {medias?.map((media) =>
                <div key={media.id} className={styles.container}>
                    <div className={styles.medias}>
                        <Note xtext={0} x={0} y={0} label={media.title} iconType="croche" onClick={() => handleOpenFile(media.id)} isOnStaff={false} />
                        {/* <ImgButton iconType="croche" text={media.title} onClick={() => handleOpenFile(media.id)} /> */}
                    </div>
                    <div>
                        <button onClick={() => handleOpenModal("updateMedia", media)}>Modifier</button>
                    </div>
                    <div>
                        <button onClick={() => handleOpenModal("deleteMedia", media)}>Supprimer</button>
                    </div>
                    <div className={styles.instrument_container}>
                        <p>Instrument(s) : {(instruments[media.id] ?? []).map((instrument) => instrument.name).join(", ")} </p>
                        <button onClick={async () => {
                            setSelectedMedia(media);
                            await loadInstruments(media.id);
                            setTypeModal("addInstrument");
                            setOpenModal(true);
                        }}>+</button>
                    </div>
                </div>
            )}

            {/* modales */}
            <ModalCrud
                typeModal={typeModal}
                isOpen={openModal}
                onClose={() => setOpenModal(false)}>
                {modalContent[typeModal]}
            </ModalCrud>
        </>
    );
}

export default MediaPage;
