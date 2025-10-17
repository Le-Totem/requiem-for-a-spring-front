import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

import Partition from "../components/Partition";
import PartitionClefSolFingerPrint from "../components/PartitionClefSolFingerPrint";
import { loginUser } from "../api/ConnectionApi";
import ModaleForgotMdp from "../modale/ModaleForgotMdp";

import "../styles/Homepage.css";

export default function HomePage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

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

  const [showModal, setShowModal] = useState(false);

  return (
    <main className="homepage">
      <div>
        <h2 className="h2Bienvenue">
          Bienvenue sur l'application Requiem for a Spring
        </h2>
        <p className="by">By Le Totem</p>
      </div>

      <div className="partition">
        <div className="connection">
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

            <div className="partitionConteneur">
              <PartitionClefSolFingerPrint />
              <Partition />
            </div>

            <div className="actions">
              <button type="submit" className="btnConnexion">
                Se connecter
              </button>

              <button
                className="forgotMdp"
                type="button"
                onClick={() => setShowModal(true)}
              >
                Mot de passe oublié ?
              </button>
            </div>
          </form>
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

      {/*Modale Mot de passe oublié */}
      {showModal && <ModaleForgotMdp onClose={() => setShowModal(false)} />}
    </main>
  );
}
