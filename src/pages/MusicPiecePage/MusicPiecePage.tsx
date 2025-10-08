import type React from "react";
import { useSearchParams } from "react-router";
import PartitionClefSol from "../../components/PartitionClefSol";
import PartitionTitle from "../../components/TitlePartition";
import { useEffect, useState } from "react";
import type { MusicPiece } from "../../types/MusicPiece";
import { fetchAllMedias, fetchOneMusicPiece } from "../../api/MusicPieceApi";
import "./MusicPiece.module.css";
import type { Media } from "../../types/Media";
import { Note } from "../../components/Note";

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
            {/* <div className="clef-container">
                <span className="clef-text">
                    {musicPiece?.title}
                </span>
                <PartitionClefSol />
            </div> */}

            <PartitionTitle text={musicPiece?.title} textSize={25} showClef={true} />

            {medias?.map((media) => (
                <div key={media.id}>
                    <Note x={0} y={0} label={media.title} iconType="blanche" onClick={() => console.log("noteSansPartition1")} isOnStaff={false} />
                </div>
            ))}

            <PartitionTitle text="Documents" textSize={25} showClef={true} />

            <div >

            </div>
        </>
    )
}

export default MusicPiecePage;