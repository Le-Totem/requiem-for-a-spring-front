// src/api/loginRequest.ts

const API_URL = "https://127.0.0.1/api/auth"; // 

/**
 * Envoie une requête de connexion à l'API Spring Boot
 * @param email - email de l'utilisateur
 * @param password - mot de passe
 * @returns { token, expiresIn }
 */
export async function loginUser(email: string, password: string) {
    const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
        throw new Error(`Erreur HTTP ${response.status}`);
    }

    return response.json(); // renvoie { token, expiresIn }
}
