import React, { useEffect, useState } from "react";
import { sendResetEmail, resetPassword } from "../api/ResetPasswordApi";
import "../styles/Homepage.css";

interface ModaleForgotMdpProps {
    onClose: () => void;
}

export default function ModaleForgotMdp({ onClose }: ModaleForgotMdpProps) {
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [token, setToken] = useState<string | null>(null);

    // Vérifie le token dans l'URL
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const tokenFromUrl = params.get("token");
        if (tokenFromUrl) {
            setToken(tokenFromUrl);
        }
    }, []);

    // Envoi du mail de réinitialisation
    const handleSendEmail = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setMessage("");
        setLoading(true);

        try {
            const result = await sendResetEmail(email);
            setMessage(result.message || "Un email de réinitialisation a été envoyé !");
        } catch (err: any) {
            setError(err.message || "Erreur lors de l'envoi de l'email");
        } finally {
            setLoading(false);
        }
    };

    // Réinitialisation du mot de passe via le token
    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setMessage("");

        if (newPassword !== confirmPassword) {
            setError("Les mots de passe ne correspondent pas");
            return;
        }

        try {
            const result = await resetPassword(token!, newPassword);
            setMessage(result.message || "Mot de passe réinitialisé !");
            setTimeout(onClose, 2000);
        } catch (err: any) {
            // Gestion spécifique des tokens expirés ou invalides
            if (err.message.includes("expiré") || err.message.includes("invalide")) {
                setError("Le lien de réinitialisation est invalide ou a expiré. Veuillez demander un nouveau lien.");
            } else {
                setError(err.message || "Erreur lors de la réinitialisation du mot de passe");
            }
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3>Réinitialisation du mot de passe</h3>

                {/* Étape 1 : Demande du lien */}
                {!token && (
                    <form onSubmit={handleSendEmail}>
                        <p>Entrez votre email pour recevoir un lien de réinitialisation :</p>

                        <input
                            type="email"
                            className="modal-input"
                            placeholder="Votre email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />

                        {error && <p className="modal-error">{error}</p>}
                        {message && <p className="modal-success">{message}</p>}

                        <div className="modal-actions">
                            <button type="submit" className="modal-btn" disabled={loading}>
                                {loading ? "Envoi..." : "Envoyer"}
                            </button>
                            <button type="button" className="modal-close" onClick={onClose}>
                                Annuler
                            </button>
                        </div>
                    </form>
                )}

                {/* Étape 2 : Changement du mot de passe */}
                {token && (
                    <form onSubmit={handleResetPassword}>
                        <p>Définissez votre nouveau mot de passe :</p>

                        <input
                            type="password"
                            className="modal-input"
                            placeholder="Nouveau mot de passe"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />

                        <input
                            type="password"
                            className="modal-input"
                            placeholder="Confirmer le mot de passe"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />

                        {error && <p className="modal-error">{error}</p>}
                        {message && <p className="modal-success">{message}</p>}

                        <div className="modal-actions">
                            <button type="submit" className="modal-btn" disabled={loading}>
                                {loading ? "En cours..." : "Valider"}
                            </button>
                            <button type="button" className="modal-close" onClick={onClose}>
                                Annuler
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}
