import { Note } from "../components/Note";
import Partition from "../components/Partition";
import TitlePartition from "../components/TitlePartition";

import "../styles/inscription.css";

import { registerUser } from "../api/inscriptionRequest";
import { useState } from "react";


export default function Inscription() {

    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        confirmPassword: ""
    });


    return (
        <main className="inscription-container">

            <div className="title-wrapper">
                <TitlePartition
                    text ="Formulaire d'inscription"
                />
            </div>

            <div >
                <div className="partition-wrapper">
                    <span className="label">Nom : </span>
                    <Partition />
                    <input
                        className="partition-input"
                        value={formData.lastname}
                        onChange={e => setFormData(prev => ({ ...prev, lastname: e.target.value }))}
                        placeholder="Nom"
                    />
                </div>


                <div className="partition-wrapper">
                    <span className="label">Prénom : </span>
                    <Partition />
                    <input
                        className="partition-input"
                        value={formData.firstname}
                        onChange={e => setFormData(prev => ({ ...prev, firstname: e.target.value }))}
                        placeholder="Prénom"
                    />
                </div>
                <div className="partition-wrapper">
                    <span className="label">Adresse Mail : </span>
                    <Partition />
                    <input
                        className="partition-input"
                        value={formData.email}
                        onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        placeholder="Adresse Mail"
                    />
                </div>
                <div className="partition-wrapper">
                    <span className="label">Mot de Passe : </span>
                    <Partition />
                    <input
                        className="partition-input"
                        value={formData.password}
                        onChange={e => setFormData(prev => ({ ...prev, password: e.target.value }))}
                        placeholder="Mot de passe"
                    />
                </div>
                <div className="partition-wrapper">
                    <span className="label">Confirmer Mot de Passe : </span>
                    <Partition />
                    <input
                        className="partition-input"
                        value={formData.confirmPassword}
                        onChange={e => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                        placeholder="Confirmer mot de passe"
                    />
                </div>
            </div>

            <div className="button">
                <Note
                    x={0}
                    y={0}
                    label={"Valider"}
                    xtext={40}
                    iconType={"doubleNoire"}
                    isOnStaff={false}
                    onClick={async () => {
                        try {
                            const newUser = await registerUser({   // ← utilise l'import correct
                                email: "test@mail.com",
                                password: "azerty",
                                firstname: "Jean",
                                lastname: "Dupont",
                            });
                            console.log("Utilisateur créé :", newUser);
                        } catch (err) {
                            console.error("Erreur inscription :", err);
                        }
                    }}
                />

                <Note
                    x={0}
                    y={0}
                    label={"Cancel"}
                    xtext={40}
                    iconType={"doubleNoire"}
                    isOnStaff={false}
                    onClick={() => console.log("Cancel")} />
            </div>

        </main >
    );
}