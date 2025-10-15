import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import Partition from "../components/Partition";
import PartitionClefSolFingerPrint from "../components/PartitionClefSolFingerPrint";
import { loginUser } from "../api/ConnectionApi";
import "../styles/Homepage.css";

// 🔹 Fonction API simulée (à remplacer par ton vrai endpoint)
async function resetPassword(login: string, newPassword: string) {
    // Ici tu appelleras ton backend, par exemple :
    // return fetch("/api/reset-password", { ... })
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (!login || !newPassword) reject(new Error("Champs invalides"));
            else resolve({ message: "Mot de passe réinitialisé avec succès" });
        }, 1000);
    });
}

export default function HomePage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [showModal, setShowModal] = useState(false);

    // Champs pour la réinitialisation
    const [loginReset, setLoginReset] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [resetError, setResetError] = useState("");
    const [resetSuccess, setResetSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");

        try {
            const data = await loginUser(email, password);
            localStorage.setItem("token", data.token);
            navigate("/listeensembles");
        } catch (err: unknown) {
            console.error(err);
            if (err instanceof Error) setError(err.message);
            else setError("Erreur lors de la connexion");
        }
    };

    const handlePasswordReset = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setResetError("");
        setResetSuccess("");

        if (newPassword !== confirmPassword) {
            setResetError("Les mots de passe ne correspondent pas");
            return;
        }

        try {
            setLoading(true);
            await resetPassword(loginReset, newPassword);
            setResetSuccess("✅ Votre mot de passe a bien été réinitialisé !");
            // Réinitialise les champs après succès
            setLoginReset("");
            setNewPassword("");
            setConfirmPassword("");
            // Ferme la modale après 2 secondes
            setTimeout(() => {
                setShowModal(false);
                setResetSuccess("");
            }, 2000);
        } catch (err: any) {
            setResetError(err.message || "Erreur lors de la réinitialisation");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="homepage">
            <div>
                <h2 className="h2Bienvenue">Bienvenue sur l'application Requiem for a Spring</h2>
                <p className="by">By Le Totem</p>
            </div>

            <div className="partition">
                <div>
                    <span className="labelHomepage">Connexion</span>

                    <form onSubmit={handleSubmit} className="partitionForm">
                        <span className="login">Email :</span>
                        <input
                            className="loginInput"
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <span className="mdp">Mot de passe :</span>
                        <input
                            className="mdpInput"
                            type="password"
                            placeholder="Mot de passe"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        {error && <p style={{ color: "red" }}>{error}</p>}

                        <button type="submit" className="btnConnexion">
                            Se connecter
                        </button>
                    </form>

                    <div className="partitionConteneur">
                        <PartitionClefSolFingerPrint />
                        <Partition />
                    </div>

                    <div className="actions">
                        <button
                            className="forgotMdp"
                            type="button"
                            onClick={() => setShowModal(true)}
                        >
                            Mot de passe oublié ?
                        </button>
                    </div>
                </div>

                <div>
                    <div>
                        <span className="labelHomepage">Pas encore inscrit ?</span>
                        <Link className="inscriptionHomepage" to="/inscription">
                            Inscrivez-vous
                        </Link>
                        <PartitionClefSolFingerPrint />
                    </div>
                </div>
            </div>

            {/* MODALE Réinitialisation directe */}
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>Réinitialiser votre mot de passe</h3>
                        {!resetSuccess && (
                            <p>Veuillez entrer votre identifiant et votre nouveau mot de passe.</p>
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
                                        onClick={() => setShowModal(false)}
                                    >
                                        Annuler
                                    </button>
                                </div>
                            </form>
                        ) : (
                            // Message de succès visible après soumission
                            <div className="reset-success-message">
                                <p style={{ color: "green", fontWeight: "bold" }}>
                                    {resetSuccess}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </main>
    );
}
