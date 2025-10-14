import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import Partition from "../components/Partition";
import PartitionClefSolFingerPrint from "../components/PartitionClefSolFingerPrint";
import { loginUser } from "../api/ConnectionApi";
import "../styles/Homepage.css";

export default function HomePage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    /**
     * Fonction qui se déclenche à l'envoi du formulaire.
     * Permet de s'authentifier et stocke le JWT dans le localStorage (clef "token")
     * @param e Evènement à traiter
     */
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");

        try {
            const data = await loginUser(email, password);

            // 🔹 Sauvegarde du token JWT
            localStorage.setItem("token", data.token);

            // 🔹 Redirection après connexion réussie
            navigate("/dashboard");
        } catch (err: unknown) {
            console.error(err);
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Erreur lors de la connexion");
            }

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
                    <span className="labelHomepage">Connection </span>

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

                        <button type="submit" className="btnConnexion">Se connecter</button>
                    </form>

                    <div className="partitionConteneur">
                        <PartitionClefSolFingerPrint />
                        <Partition />
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
        </main>
    );
}
