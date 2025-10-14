import React from "react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

import type { Media } from "../../types/Media";
import { Note } from "../../components/Note";
import PartitionTitle from "../../components/TitlePartition";
import ModalCrud from "../../components/modalCrudEnsemble/ModalCrudEnsemble";
import { getUser, setUser } from "../../utils/LocalStorageManager";

import { fetchCurrentUser } from "../../api/UserApi";
import { fetchAllMedias } from "../../api/MusicPieceApi";
import { fetchDeleteMedia, fetchUpdateMedia } from "../../api/MediaApi";

import FormUpdateMedia from "./modalesMediaPage/FormUpdateMedia";
import ConfirmDeleteMedia from "./modalesMediaPage/ConfirmDeleteMedia";
import styles from "./MediaPage.module.css";

const MediaPage: React.FC = () => {
    const [medias, setMedias] = useState<Media[] | undefined>([]);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    // modales
    const [openModal, setOpenModal] = useState(false);
    const [typeModal, setTypeModal] = useState<"addMedia" | "updateMedia" | "deleteMedia">("addMedia");
    const [selectedMedia, setSelectedMedia] = useState<Media | null>(null);

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
        } catch (error) {
            console.error("Erreur lors du chargement des médias de la fiche morceau :", error);
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

    useEffect(() => {
        loadUser();
    }, []);

    useEffect(() => {
        if (getUser() != null) {
            loadMedias();
        }

    }, [isAuthenticated]);

    const handleOpenModal = (type: "addMedia" | "updateMedia" | "deleteMedia", media?: Media) => {
        setTypeModal(type);
        setSelectedMedia(media || null);
        setOpenModal(true);
    };

    const modalContent = {
        addMedia: null,
        updateMedia: <FormUpdateMedia defaultValues={selectedMedia || undefined}
            onConfirm={(updatedData) => updateMedia(updatedData)} />,
        deleteMedia: <ConfirmDeleteMedia onConfirm={deleteMedia} />
    };

    return (
        <>
            <button onClick={() => navigate(`/tracks?id=${idMusicPiece}`)} className={styles.back_button}>↩ retour</button>

            <PartitionTitle text="Médias" textSize={25} showClef={true} />

            <div className={styles.container}>
                {medias?.map((media) =>
                    <React.Fragment key={media.id}>
                        <div className={styles.medias}>
                            <Note x={0} y={0} label={media.title} iconType="croche" onClick={() => null} isOnStaff={false} />
                        </div>
                        <div>
                            <button onClick={() => handleOpenModal("updateMedia", media)}>Modifier</button>
                        </div>
                        <div>
                            <button onClick={() => handleOpenModal("deleteMedia", media)}>Supprimer</button>
                        </div>
                    </React.Fragment>
                )}
            </div>

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
