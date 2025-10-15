// src/api/ResetPasswordApi.tsx
const API_URL = "http://localhost:8000/api/users";

/**
 * Réinitialise le mot de passe d'un utilisateur
 */
export async function resetPassword(email: string, newPassword: string) {
    console.log("➡️ Envoi de la requête reset password :", email, newPassword);

    const token = localStorage.getItem("token");

    const response = await fetch(`${API_URL}/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": 'Bearer ' + token },
        body: JSON.stringify({ email, newPassword }),
    });

    console.log("⬅️ Réponse brute :", response);

    if (!response.ok) {
        const errorData = await response.json();
        console.error("❌ Erreur API :", errorData);
        throw new Error(errorData.message || "Erreur lors de la réinitialisation du mot de passe");
    }

    const data = await response.json();
    console.log("✅ Réponse JSON :", data);
    return data; // { message: "Mot de passe réinitialisé avec succès" }
}
