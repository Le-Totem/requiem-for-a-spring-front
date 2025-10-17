import type { Media } from "../types/Media";

const MEDIA_API_URL = "http://localhost:8000/api/media";

// fetch pour récupérer tous les médias de la BDD
export async function fetchAllMedias(): Promise<Media[]> {
    try {
        const token = localStorage.getItem("token");

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
        const token = localStorage.getItem("token");
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
export async function fetchCreateMedia(id: number, media: Omit<Media, "id" | "dateModified">): Promise<Media> {
    try {
        const token = localStorage.getItem("token");
        const mediaData = await fetch(`${MEDIA_API_URL}/${id}`, {
            method: "POST",
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
        throw new Error(`Une erreur est survenue sur fetchCreateMedia: ${error}`);
    }
}

// fetch pour ajouter un média à un instrument
export async function fetchAddIntrumentToMedia(idMedia: number, idInstrument: number): Promise<void> {
    try {
        const token = localStorage.getItem("token");
        const instrumentData = await fetch(`${MEDIA_API_URL}/${idMedia}/instruments/${idInstrument}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            }
        });

        if (!instrumentData.ok) {
            const errorBody = await instrumentData.text();
            throw new Error(`Erreur HTTP ${instrumentData.status}: ${errorBody}`);
        };

        const text = await instrumentData.text();
        if (text) {
            return JSON.parse(text);
        }

        return;
    } catch (error) {
        throw new Error(`Une erreur est survenue sur fetchAddIntrumentToMedia: ${error}`);
    }
}

// fetch pour modifier un media
export async function fetchUpdateMedia(id: number, media: Partial<Media>): Promise<Media> {
    try {
        const token = localStorage.getItem("token");
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

// fetch pour supprimer un media
export async function fetchDeleteMedia(id: number): Promise<void> {
    try {
        const token = localStorage.getItem("token");
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

// fetch pour récupérer/affiche un fichier
export async function fetchFindFichier(id: number): Promise<Blob> {
    try {
        const token = localStorage.getItem("token");
        // const token = getJwt();
        const mediaData = await fetch(`${MEDIA_API_URL}/${id}/file`, {
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

        return mediaData.blob();
    } catch (error) {
        throw new Error(`Une erreur est survenue sur fetchFindFichier: ${error}`);
    }
}

// fetch pour enregistrer un fichier
export async function fetchUploadFile(formData: FormData): Promise<string> {
    try {
        // const token = getJwt();
        const token = localStorage.getItem("token");

        const mediaData = await fetch(`${MEDIA_API_URL}/add-file`, {
            method: "POST",
            headers: {
                // "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
            body: formData
        });

        if (!mediaData.ok) {
            const errorBody = await mediaData.text();
            throw new Error(`Erreur HTTP ${mediaData.status}: ${errorBody}`);
        };

        return mediaData.text();
    } catch (error) {
        throw new Error(`Une erreur est survenue sur fetchUploadFile: ${error}`);
    }
}