import React, { useState } from "react";
import { resetPassword } from "../api/ResetPasswordApi";

interface ModaleForgotMdpProps {
    onClose: () => void;
}

export default function ModalForgotMdp({ onClose }: ModaleForgotMdpProps) {
    const [loginReset, setLoginReset] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [resetError, setResetError] = useState("");
    const [resetSuccess, setResetSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    const handlePasswordReset = async (e: React.FormEvent) => {
        e.preventDefault();
        setResetError("");
        setResetSuccess("");

        if (newPassword !== confirmPassword) {
            setResetError("Les mots de passe ne correspondent pas");
            return;
        }

        try {
            setLoading(true);
            console.log("📨 Envoi requête reset password :", { loginReset, newPassword });

            await resetPassword(loginReset, newPassword);
            setResetSuccess("Votre mot de passe a bien été réinitialisé !");

            setTimeout(() => {
                onClose();
            }, 2000);
        } catch (err: any) {
            console.error("Erreur reset :", err);
            setResetError(err.message || "Erreur lors de la réinitialisation du mot de passe");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3>Réinitialiser votre mot de passe</h3>

                {!resetSuccess && (
                    <p>Veuillez entrer votre identifiant (ou email) et votre nouveau mot de passe.</p>
                )}

                {!resetSuccess ? (
                    <form onSubmit={handlePasswordReset}>
                        <input
                            type="text"
                            className="modal-input"
                            placeholder="Identifiant ou email"
                            value={loginReset}
                            onChange={(e) => setLoginReset(e.target.value)}
                            required
                        />

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

                        {resetError && <p style={{ color: "red" }}>{resetError}</p>}

                        <div className="modal-actions">
                            <button type="submit" className="modal-btn" disabled={loading}>
                                {loading ? "En cours..." : "Valider"}
                            </button>
                            <button
                                type="button"
                                className="modal-close"
                                onClick={onClose}
                            >
                                Annuler
                            </button>
                        </div>
                    </form>
                ) : (
                    <div className="reset-success-message">
                        <p style={{ color: "green", fontWeight: "bold" }}>{resetSuccess}</p>
                    </div>
                )}
            </div>
        </div>
    );
}
