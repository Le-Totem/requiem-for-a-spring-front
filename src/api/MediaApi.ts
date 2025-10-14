import type { Media } from "../types/Media";

const MEDIA_API_URL = "http://localhost:8000/api/media";
const token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJwYXVsQG1haWwuY29tIiwiaWF0IjoxNzYwMzM5MzkxLCJleHAiOjE3NjA0MDkzOTF9.-wELrSTNgtMgDkJLmAWeT4xTM0BmMBjEtiQcivJEQkg";

// fetch pour récupérer tous les médias de la BDD
export async function fetchAllMedias(): Promise<Media[]> {
    try {
        // const token = getJwt();

        const mediaData = await fetch(`${MEDIA_API_URL}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            }
        });

        if (!mediaData.ok) {
            const errorBody = await mediaData.text();
            throw new Error(`Erreur HTTP ${mediaData.status}: ${errorBody}`);
        };

        return mediaData.json();
    } catch (error) {
        throw new Error(`Une erreur est survenue sur fetchAllMedias: ${error}`);
    }
}

// fetch pour récupérer un média en fonction de son id
export async function fetchOneMedia(id: number): Promise<Media> {
    try {
        // const token = getJwt();
        const mediaData = await fetch(`${MEDIA_API_URL}/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            }
        });

        if (!mediaData.ok) {
            const errorBody = await mediaData.text();
            throw new Error(`Erreur HTTP ${mediaData.status}: ${errorBody}`);
        };

        return mediaData.json();
    } catch (error) {
        throw new Error(`Une erreur est survenue sur fetchOneMedia: ${error}`);
    }
}

// fetch pour créer un média
// export async function fetchCreateMedia(id: number, media: Media, user: User): Promise<Media> {

// }

// fetch pour modifier un media
export async function fetchUpdateMedia(id: number, media: Partial<Media>): Promise<Media> {
    try {
        const mediaData = await fetch(`${MEDIA_API_URL}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify(media)
        });

        if (!mediaData.ok) {
            const errorBody = await mediaData.text();
            throw new Error(`Erreur HTTP ${mediaData.status}: ${errorBody}`);
        };

        return mediaData.json();
    } catch (error) {
        throw new Error(`Une erreur est survenue sur fetchUpdateMedia: ${error}`);
    }
}

export async function fetchDeleteMedia(id: number): Promise<void> {
    try {
        const mediaData = await fetch(`${MEDIA_API_URL}/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
        });

        if (!mediaData.ok) {
            const errorBody = await mediaData.text();
            throw new Error(`Erreur HTTP ${mediaData.status}: ${errorBody}`);
        };

        // return musicPieceData.json();
        return;
    } catch (error) {
        throw new Error(`Une erreur est survenue sur fetchDeleteMedia: ${error}`);
    }
}