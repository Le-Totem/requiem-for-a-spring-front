// src/api/ResetPasswordApi.tsx
const API_URL = "https://51.210.4.227/api/users/reset-password"; // Modification du port

// Étape 1 — Envoi de l'email de réinitialisation
export async function sendResetEmail(email: string) {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erreur lors de l'envoi du mail");
    }

    return await response.json();
}

// Étape 2 — Réinitialisation du mot de passe avec le token
export async function resetPassword(token: string, newPassword: string) {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erreur lors de la réinitialisation");
    }

    return await response.json();
}
