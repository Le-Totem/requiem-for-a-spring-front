import type { Genre } from "../types/Genre";
import type { Media } from "../types/Media";
import type { MusicPiece } from "../types/MusicPiece";

const MUSICPIECE_API_URL = "http://localhost:8000/api/tracks";

// fetch pour récupérer toutes les fiches morceaux
export async function fetchAllMusicPieces(): Promise<MusicPiece[]> {
    try {
        const token = localStorage.getItem("jwt");
        const musicPieceData = await fetch(`${MUSICPIECE_API_URL}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            }
        });

        if (!musicPieceData.ok) {
            const errorBody = await musicPieceData.text();
            throw new Error(`Erreur HTTP ${musicPieceData.status}: ${errorBody}`);
        };

        return musicPieceData.json();
    } catch (error) {
        throw new Error(`Une erreur est survenue sur fetchAllMusicPieces: ${error}`);
    }
}

// fetch pour récupérer une fiche morceau en fonction de son id
export async function fetchOneMusicPiece(id: number): Promise<MusicPiece> {
    try {
        // const token = localStorage.getItem("jwt");
        const token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJwYXVsQG1haWwuY29tIiwiaWF0IjoxNzU5OTI1ODYxLCJleHAiOjE3NTk5Mjk0NjF9.4ewy1M2FsgUTEiBJozuYC0ebEPDSy_dMSbSLL5EXg1I";
        const musicPieceData = await fetch(`${MUSICPIECE_API_URL}/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            }
        });

        if (!musicPieceData.ok) {
            const errorBody = await musicPieceData.text();
            throw new Error(`Erreur HTTP ${musicPieceData.status}: ${errorBody}`);
        };

        return musicPieceData.json();
    } catch (error) {
        throw new Error(`Une erreur est survenue sur fetchOneMusicPiece: ${error}`);
    }
}

// fetch pour récupérer les fiches morceaux en fonction de l'id de l'ensemble
export async function fetchAllByIdGroup(id: number): Promise<MusicPiece[]> {
    try {
        const token = localStorage.getItem("jwt");
        const musicPieceData = await fetch(`${MUSICPIECE_API_URL}/group/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            }
        });

        if (!musicPieceData.ok) {
            const errorBody = await musicPieceData.text();
            throw new Error(`Erreur HTTP ${musicPieceData.status}: ${errorBody}`);
        };

        return musicPieceData.json();
    } catch (error) {
        throw new Error(`Une erreur est survenue sur fetchAllByIdGroup: ${error}`);
    }
}

// fetch pour récupérer tous les genres
export async function fetchAllGenres(id: number): Promise<MusicPiece[]> {
    try {
        const token = localStorage.getItem("jwt");
        const musicPieceData = await fetch(`${MUSICPIECE_API_URL}/${id}/all-genres`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            }
        });

        if (!musicPieceData.ok) {
            const errorBody = await musicPieceData.text();
            throw new Error(`Erreur HTTP ${musicPieceData.status}: ${errorBody}`);
        };

        return musicPieceData.json();
    } catch (error) {
        throw new Error(`Une erreur est survenue sur fetchAllGenres: ${error}`);
    }
}

// fetch pour récupérer les médias d'une fiche morceau
export async function fetchAllMedias(id: number): Promise<Media[]> {
    try {
        // const token = localStorage.getItem("jwt");
        const token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJwYXVsQG1haWwuY29tIiwiaWF0IjoxNzU5OTI1ODYxLCJleHAiOjE3NTk5Mjk0NjF9.4ewy1M2FsgUTEiBJozuYC0ebEPDSy_dMSbSLL5EXg1I";
        const musicPieceData = await fetch(`${MUSICPIECE_API_URL}/${id}/medias`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
        });

        if (!musicPieceData.ok) {
            const errorBody = await musicPieceData.text();
            throw new Error(`Erreur HTTP ${musicPieceData.status}: ${errorBody}`);
        };

        return musicPieceData.json();
    } catch (error) {
        throw new Error(`Une erreur est survenue sur fetchAllMedias: ${error}`);
    }
}

// fetch pour créer une fiche morceau
export async function fetchCreateMusicPiece(musicPiece: Omit<MusicPiece, "id">): Promise<MusicPiece[]> {
    try {
        const token = localStorage.getItem("jwt");
        const musicPieceData = await fetch(`${MUSICPIECE_API_URL}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify(musicPiece)
        });

        if (!musicPieceData.ok) {
            const errorBody = await musicPieceData.text();
            throw new Error(`Erreur HTTP ${musicPieceData.status}: ${errorBody}`);
        };

        return musicPieceData.json();
    } catch (error) {
        throw new Error(`Une erreur est survenue sur fetchCreateMusicPiece: ${error}`);
    }
}

// fetch pour créer un genre
export async function fetchCreateGenre(genre: Omit<Genre, "id">): Promise<Genre> {
    try {
        const token = localStorage.getItem("jwt");
        const musicPieceData = await fetch(`${MUSICPIECE_API_URL}/add-genre`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify(genre)
        });

        if (!musicPieceData.ok) {
            const errorBody = await musicPieceData.text();
            throw new Error(`Erreur HTTP ${musicPieceData.status}: ${errorBody}`);
        };

        return musicPieceData.json();
    } catch (error) {
        throw new Error(`Une erreur est survenue sur fetchCreateGenre: ${error}`);
    }
}

// fetch pour ajouter un ou plusieurs genres à une fiche morceau
export async function fetchAddGenreToMusicPiece(id: number, genres: Genre[]): Promise<Genre[]> {
    try {
        const token = localStorage.getItem("jwt");
        const musicPieceData = await fetch(`${MUSICPIECE_API_URL}/${id}/add-genre`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify(genres)
        });

        if (!musicPieceData.ok) {
            const errorBody = await musicPieceData.text();
            throw new Error(`Erreur HTTP ${musicPieceData.status}: ${errorBody}`);
        };

        return musicPieceData.json();
    } catch (error) {
        throw new Error(`Une erreur est survenue sur fetchAddGenreToMusicPiece: ${error}`);
    }
}

// fetch pour modifier une fiche morceau
export async function fetchUpdateMusicPiece(id: number, musicPiece: Omit<MusicPiece, "id">): Promise<MusicPiece> {
    try {
        const token = localStorage.getItem("jwt");
        const musicPieceData = await fetch(`${MUSICPIECE_API_URL}/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify(musicPiece)
        });

        if (!musicPieceData.ok) {
            const errorBody = await musicPieceData.text();
            throw new Error(`Erreur HTTP ${musicPieceData.status}: ${errorBody}`);
        };

        return musicPieceData.json();
    } catch (error) {
        throw new Error(`Une erreur est survenue sur fetchUpdateMusicPiece: ${error}`);
    }
}

// fetch pour supprimer une fiche morceau
export async function fetchDeleteMusicPiece(id: number): Promise<void> {
    try {
        const token = localStorage.getItem("jwt");
        const musicPieceData = await fetch(`${MUSICPIECE_API_URL}/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
        });

        if (!musicPieceData.ok) {
            const errorBody = await musicPieceData.text();
            throw new Error(`Erreur HTTP ${musicPieceData.status}: ${errorBody}`);
        };

        return musicPieceData.json();
    } catch (error) {
        throw new Error(`Une erreur est survenue sur fetchDeleteMusicPiece: ${error}`);
    }
}