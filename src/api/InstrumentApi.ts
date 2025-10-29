import type { Instrument } from "../types/Instrument";

const INSTRUMENT_API_URL = "https://51.210.4.227/api/instruments";

// fetch pour récupérer tous les instruments de la BDD
export async function fetchAllInstruments(): Promise<Instrument[]> {
    try {
        const token = localStorage.getItem("token");

        const instrumentData = await fetch(`${INSTRUMENT_API_URL}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            }
        });

        if (!instrumentData.ok) {
            const errorBody = await instrumentData.text();
            throw new Error(`Erreur HTTP ${instrumentData.status}: ${errorBody}`);
        };

        return instrumentData.json();
    } catch (error) {
        throw new Error(`Une erreur est survenue sur fetchAllIntruments: ${error}`);
    }
}

// fetch récupérer la liste des instruments d'un média
export async function fetchAllIntrumentsByIdMedia(id: number): Promise<Instrument[]> {
    try {
        const token = localStorage.getItem("token");
        const instrumentData = await fetch(`${INSTRUMENT_API_URL}/${id}/instruments`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            }
        });

        if (!instrumentData.ok) {
            const errorBody = await instrumentData.text();
            throw new Error(`Erreur HTTP ${instrumentData.status}: ${errorBody}`);
        };

        return instrumentData.json();
    } catch (error) {
        throw new Error(`Une erreur est survenue sur fetchAllIntrumentsByIdMedia: ${error}`);
    }
}

// fetch pour créer un instrument
export async function fetchCreateInstrument(instrument: Omit<Instrument, "id">): Promise<Instrument> {
    try {
        const token = localStorage.getItem("token");
        const instrumentData = await fetch(`${INSTRUMENT_API_URL}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify(instrument)
        });

        if (!instrumentData.ok) {
            const errorBody = await instrumentData.text();
            throw new Error(`Erreur HTTP ${instrumentData.status}: ${errorBody}`);
        };

        return instrumentData.json();
    } catch (error) {
        throw new Error(`Une erreur est survenue sur fetchCreateMedia: ${error}`);
    }
}

