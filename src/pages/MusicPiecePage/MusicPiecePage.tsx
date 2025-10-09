import type React from "react";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";

import { Note } from "../../components/Note";
import PartitionTitle from "../../components/TitlePartition";
import VerticalButton from "../../components/verticalButton/VerticalButton";
import { fetchCurrentUser } from "../../api/UserApi";
import { fetchAllMedias, fetchDeleteMusicPiece, fetchOneMusicPiece } from "../../api/MusicPieceApi";
import type { Media } from "../../types/Media";
import type { MusicPiece } from "../../types/MusicPiece";

import styles from "./MusicPiece.module.css";
import { getUser, isAdmin, isModerator, setUser } from "../../utils/LocalStorageManager";
// import type { UserGroup } from "../../utils/UserInfo";

const MusicPiecePage: React.FC = () => {
    const [musicPiece, setMusicPiece] = useState<MusicPiece>();
    const [medias, setMedias] = useState<Media[] | undefined>([]);

    // const [roles, setRoles] = useState<UserGroup[]>([]);

    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    const [_error, setError] = useState<string>("");

    let [searchParams] = useSearchParams();
    let idMusicPiece: number = Number(searchParams.get("id"));
    const navigate = useNavigate();

    const loadOneMusicPiece = async () => {
        try {
            if (!idMusicPiece) {
                setMusicPiece(undefined)
            }
            const musicPieceData = await fetchOneMusicPiece(idMusicPiece);
            setMusicPiece(musicPieceData);
        } catch (error) {
            setError("Erreur lors du chargement des fiches morceaux.");
            console.log(error);
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
            setError("Erreur lors du chargement des médias de la fiche morceau.");
            console.log(error);
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
            setError("Erreur lors du chargement des infos de l'utilisateur.");
            console.log(error);
        }
    }

    const deleteMusicPiece = async () => {
        try {
            if (!idMusicPiece) {
                setError("Suppresion impossible, la fiche morceau n'existe pas");
            }
            await fetchDeleteMusicPiece(idMusicPiece);
            navigate("/listeensembles");
        } catch (error) {
            setError("Erreur lors de la suppression de la fiche morceau.")
            console.log(error);
        }
    }

    useEffect(() => {
        loadUser();
    }, []);

    useEffect(() => {
        if (getUser() != null) {
            loadOneMusicPiece();
            loadMedias();
        }

    }, [isAuthenticated])



    return (
        <>
            <PartitionTitle text={musicPiece?.title} textSize={25} showClef={true} />

            {(isAdmin(1) || isModerator(1)) && (
                <div className={styles.musicpiece_crud}>
                    <>
                        <VerticalButton label="Créer" iconType="blanche" />
                        <VerticalButton label="Modifier" iconType="blanche" />
                    </>

                    {isAdmin(1) && (
                        <VerticalButton label="Supprimer" iconType="blanche" onClick={deleteMusicPiece} />
                    )}
                </div>
            )}

            <div className={styles.medias_container}>
                {medias?.map((media) =>
                    media.type === 'PDF' ? (
                        <div key={media.id} className={styles.medias_file}>
                            <Note x={0} y={0} label={media.title} iconType="croche" onClick={() => console.log("noteSansPartition1")} isOnStaff={false} />
                        </div>
                    ) : null
                )}
            </div>

            <PartitionTitle text="Documents" textSize={25} showClef={true} />

            <div className={styles.medias_container}>
                {medias?.map((media) =>
                    media.type != 'PDF' ? (
                        <div key={media.id} className={styles.medias_file}>
                            <Note x={0} y={0} label={media.title} iconType="croche" onClick={() => console.log("noteSansPartition1")} isOnStaff={false} />
                        </div>
                    ) : null
                )}
            </div>
        </>
    )
}

export default MusicPiecePage;