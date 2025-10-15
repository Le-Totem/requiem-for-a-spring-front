// import { getJwt } from "../utils/LocalStorageManager";
import type { Genre } from "../types/Genre";
import type { Media } from "../types/Media";
import type { MusicPiece } from "../types/MusicPiece";

const MUSICPIECE_API_URL = "http://localhost:8000/api/tracks";
const GENRE_API_URL = "http://localhost:8000/api/genres";
const token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJwYXVsQG1haWwuY29tIiwiaWF0IjoxNzYwMzM5MzkxLCJleHAiOjE3NjA0MDkzOTF9.-wELrSTNgtMgDkJLmAWeT4xTM0BmMBjEtiQcivJEQkg";

// fetch pour récupérer toutes les fiches morceaux
export async function fetchAllMusicPieces(): Promise<MusicPiece[]> {
    try {
        // const token = getJwt();

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
export async function fetchOneMusicPiece(id: number): Promise<MusicPiece | null> {
    try {
        // const token = getJwt();
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
        // const token = getJwt();
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

// fetch pour récupérer tous les genres d'une fiche morceau
export async function fetchAllGenresByMusicPieceId(id: number): Promise<Genre[]> {
    try {
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
        throw new Error(`Une erreur est survenue sur fetchAllGenresByMusicPieceId: ${error}`);
    }
}

// fetch pour récupérer tous les genres de la BDD
export async function fetchAllGenres(): Promise<Genre[]> {
    try {
        const musicPieceData = await fetch(`${GENRE_API_URL}`, {
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
export async function fetchCreateMusicPiece(idGroup: number, musicPiece: Omit<MusicPiece, "id" | "group">): Promise<MusicPiece[]> {
    try {
        const musicPieceData = await fetch(`${MUSICPIECE_API_URL}/${idGroup}/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify(musicPiece)
        });

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`Erreur HTTP ${response.status}: ${errorBody}`);
    }

    return await response.json();
  } catch (error) {
    throw new Error(`Une erreur est survenue sur fetchCreateMusicPiece: ${error}`);
  }
}


// fetch pour créer un genre
export async function fetchCreateGenre(data: Partial<{ name: string }>): Promise<Genre> {
    try {
        const musicPieceData = await fetch(`${MUSICPIECE_API_URL}/add-genre`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify(data)
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
export async function fetchUpdateMusicPiece(id: number, musicPiece: Partial<MusicPiece>): Promise<MusicPiece> {
    try {
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

        // return musicPieceData.json();
        return;
    } catch (error) {
        throw new Error(`Une erreur est survenue sur fetchDeleteMusicPiece: ${error}`);
    }
}