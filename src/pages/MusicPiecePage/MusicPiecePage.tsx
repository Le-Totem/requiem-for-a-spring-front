import type React from "react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";

import { Note } from "../../components/Note";
import PartitionTitle from "../../components/TitlePartition";
import { fetchAllMedias, fetchOneMusicPiece } from "../../api/MusicPieceApi";
import type { Media } from "../../types/Media";
import type { MusicPiece } from "../../types/MusicPiece";

import styles from "./MusicPiece.module.css";

const MusicPiecePage: React.FC = () => {
    const [musicPiece, setMusicPiece] = useState<MusicPiece>();
    const [medias, setMedias] = useState<Media[] | undefined>([]);
    const [_error, setError] = useState<string>("");

    let [searchParams] = useSearchParams();
    let id_music_piece: number = Number(searchParams.get("id"));

    const loadOneMusicPiece = async () => {
        try {
            if (!id_music_piece) {
                setMusicPiece(undefined)
            }
            const musicPieceData = await fetchOneMusicPiece(id_music_piece);
            setMusicPiece(musicPieceData);
        } catch (error) {
            setError("Erreur lors du chargement des fiches morceaux.");
        }
    }

    const loadMedias = async () => {
        try {
            if (!id_music_piece) {
                setMedias(undefined)
            }
            const mediaData = await fetchAllMedias(id_music_piece);
            setMedias(mediaData);
        } catch (error) {
            setError("Erreur lord du chargement des médias de la fiche morceau.");
        }
    }

    useEffect(() => {
        loadOneMusicPiece();
        loadMedias();
    }, []);

    return (
        <>

            <PartitionTitle text={musicPiece?.title} textSize={25} showClef={true} />

            <div className={styles.medias_container}>
                {medias?.map((media) => (
                    <div key={media.id} className={styles.medias_file}>
                        <Note x={0} y={0} label={media.title} iconType="blanche" onClick={() => console.log("noteSansPartition1")} isOnStaff={false} />
                    </div>
                ))}
            </div>

            <PartitionTitle text="Documents" textSize={25} showClef={true} />

            <div >

            </div>
        </>
    )
}

export default MusicPiecePage;