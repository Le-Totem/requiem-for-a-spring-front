import type React from "react";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";

// import { Note } from "../../components/pathButtons/Note";
import PartitionTitle from "../../components/TitlePartition";
import VerticalButton from "../../components/verticalButton/VerticalButton";

import { fetchCurrentUser } from "../../api/UserApi";
import { fetchAddGenreToMusicPiece, fetchAllGenresByMusicPieceId, fetchAllMedias, fetchCreateGenre, fetchDeleteMusicPiece, fetchOneMusicPiece, fetchUpdateMusicPiece } from "../../api/MusicPieceApi";
import { getUser, isAdmin, isModerator, setUser } from "../../utils/LocalStorageManager";

import ModalCrud from "../../components/modalCrudEnsemble/ModalCrudEnsemble";
import FormCreateGenre from "./modalesMusicPiece/FormCreateGenre";
import FormUpdateMusicPiece from "./modalesMusicPiece/FormUpdateMusicPiece";
import ConfirmDeleteMusicPiece from "./modalesMusicPiece/ConfirmDeleteMusicPiece";

import type { Media } from "../../types/Media";
import type { Genre } from "../../types/Genre";
import type { MusicPiece } from "../../types/MusicPiece";

import styles from "./MusicPiece.module.css";
import { Note } from "../../components/pathButtons/Note";

// import type { UserGroup } from "../../utils/UserInfo";

const MusicPiecePage: React.FC = () => {
    const [musicPiece, setMusicPiece] = useState<MusicPiece>();
    const [medias, setMedias] = useState<Media[] | undefined>([]);
    const [genres, setGenres] = useState<Genre[] | undefined>([]);

    // const [roles, setRoles] = useState<UserGroup[]>([]);

    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    // modales
    const [openModal, setOpenModal] = useState(false);
    const [typeModal, setTypeModal] = useState<"updateMusicPiece" | "deleteMusicPiece" | "addGenre">("updateMusicPiece");

    const [searchParams] = useSearchParams();
    const idMusicPiece: number = Number(searchParams.get("id"));
    const navigate = useNavigate();

    const loadOneMusicPiece = async () => {
        try {
            const musicPieceData = await fetchOneMusicPiece(idMusicPiece);
            // TODO: rediriger si la fiche morceau n'existe pas
            if (!musicPieceData || !musicPieceData.id || !idMusicPiece) {
                navigate("/listeensembles");
                return;
            }
            setMusicPiece(musicPieceData);
        } catch (error) {
            console.error("Erreur lors du chargement des fiches morceaux:", error);
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

    const loadGenres = async () => {
        try {
            if (!idMusicPiece) {
                setGenres(undefined)
            }
            const musicPieceData = await fetchAllGenresByMusicPieceId(idMusicPiece);
            setGenres(musicPieceData);
        } catch (error) {
            console.error("Erreur lors du chargement des genres de la fiche morceau :", error);
        }
    }

    const updateMusicPiece = async (data: Partial<Pick<MusicPiece, "title" | "author" | "description">>) => {
        try {
            if (!idMusicPiece) {
                console.error("Modification impossible, la fiche morceau n'existe pas");
            }

            const updated = await fetchUpdateMusicPiece(idMusicPiece, data);
            setMusicPiece(updated);
            setOpenModal(false);
        } catch (error) {
            console.error("Erreur lors de la mise à jour de la fiche morceau :", error);
        }
    }

    const deleteMusicPiece = async () => {
        try {
            if (!idMusicPiece) {
                console.error("Suppresion impossible, la fiche morceau n'existe pas");
            }
            await fetchDeleteMusicPiece(idMusicPiece);
            setOpenModal(false);
            navigate("/listeensembles");
        } catch (error) {
            console.error("Erreur lors de la suppresion de la fiche morceau :", error);
        }
    }

    const addGenre = async (data: { id?: number; name: string }) => {
        try {
            if (!idMusicPiece) {
                console.error("Ajout du genre impossible, la fiche morceau n'existe pas");
            }

            // si le genre existe déjà en BDD
            if (data.id) {
                const updated = await fetchAddGenreToMusicPiece(idMusicPiece, [{ id: data.id } as Genre]);
                setGenres((prev) => {
                    const newGenre = updated.filter(u => !prev?.some(p => p.id === u.id));
                    return [...(prev || []), ...newGenre];
                });
                setOpenModal(false);
                return;
            }

            // si le genre n'existe pas en BDD
            const createdGenre = await fetchCreateGenre({ name: data.name });
            const linkGenreToMusicPiece = await fetchAddGenreToMusicPiece(idMusicPiece, [createdGenre]);
            setGenres((prev) => {
                const newGenre = linkGenreToMusicPiece.filter(u => !prev?.some(p => p.id === u.id));
                return [...(prev || []), ...newGenre];
            });
            setOpenModal(false);
            await loadGenres;
        } catch (error) {
            console.error("Erreur lors de l'ajout du genre :", error);
        }
    }

    const handleOpenModal = (type: "updateMusicPiece" | "deleteMusicPiece" | "addGenre") => {
        setTypeModal(type);
        setOpenModal(true);
    };

    const modalContent = {
        updateMusicPiece: <FormUpdateMusicPiece defaultValues={{
            title: musicPiece?.title,
            author: musicPiece?.author,
            description: musicPiece?.description,
        }} onConfirm={updateMusicPiece} />,
        deleteMusicPiece: <ConfirmDeleteMusicPiece onConfirm={deleteMusicPiece} />,
        addGenre: <FormCreateGenre onConfirm={addGenre} existingGenres={genres || []} />
    };

    useEffect(() => {
        loadUser();
    }, []);

    useEffect(() => {
        if (getUser() != null) {
            loadOneMusicPiece();
            loadGenres();
            loadMedias();
        }

    }, [isAuthenticated])

    return (
        <>
            <PartitionTitle text={musicPiece?.title} textSize={25} showClef={true} />

            <div className={styles.genre_container}>
                <p>Genre(s) : {genres?.map((genre) => genre.name).join(", ")}</p>
                <button onClick={() => handleOpenModal("addGenre")}>+</button>
            </div>

            {(isAdmin(3) || isModerator(3)) && (
                <div className={styles.musicpiece_crud}>
                    <>
                        <VerticalButton label="Gérer les médias" iconType="blanche" onClick={() => navigate(`/tracks/${idMusicPiece}/medias`)} />
                        <VerticalButton label="Modifier" iconType="blanche" onClick={() => handleOpenModal("updateMusicPiece")} />
                    </>

                    {isAdmin(1) && (
                        <VerticalButton label="Supprimer" iconType="blanche" onClick={() => handleOpenModal("deleteMusicPiece")} />
                    )}
                </div>
            )}

            <div className={styles.medias_container}>
                {medias?.map((media) =>
                    media.type === 'PDF' ? (
                        <div key={media.id} className={styles.medias_file}>
                            {/* <ImgButton iconType="croche" text={media.title} onClick={() => null} /> */}
                            <Note x={0} y={0} label={media.title} xtext={20} iconType="croche" onClick={() => console.log("noteSansPartition1")} isOnStaff={false} />
                        </div>
                    ) : null
                )}
            </div>

            <PartitionTitle text="Documents" textSize={25} showClef={true} />

            <div className={styles.medias_container}>
                {medias?.map((media) =>
                    media.type != 'PDF' ? (
                        <div key={media.id} className={styles.medias_file}>
                            {/* <ImgButton iconType="croche" text={media.title} onClick={() => null} /> */}
                            <Note x={0} y={0} label={media.title} xtext={20} iconType="croche" onClick={() => console.log("noteSansPartition1")} isOnStaff={false} />
                        </div>
                    ) : null
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
    )
}

export default MusicPiecePage;