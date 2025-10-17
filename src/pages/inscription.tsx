import { Note } from "../components/pathButtons/Note";
import Partition from "../components/Partition";
import TitlePartition from "../components/TitlePartition";

import "../styles/inscription.css";

import { registerUser } from "../api/InscriptionApi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function Inscription() {

    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    // Fonction pour réinitialiser les champs
    const resetForm = () => {
        setFormData({
            firstname: "",
            lastname: "",
            email: "",
            password: "",
            confirmPassword: ""
        });
    };

    // Fonction pour renvoyer sur Liste ensemble une fois l'inscription validée
    const navigate = useNavigate();

    return ( 
        <main className="inscription-container">

            <div className="title-wrapper">
                <TitlePartition
                    text="Formulaire d'inscription"
                />
            </div>

            <div>
                <div className="partition-wrapper">
                    <span className="labelInscription">Nom : </span>
                    <Partition />
                    <input
                        className="partition-input"
                        value={formData.lastname}
                        onChange={e => setFormData(prev => ({ ...prev, lastname: e.target.value }))}
                        placeholder="Nom"
                    />
                </div>


                <div className="partition-wrapper">
                    <span className="labelInscription">Prénom : </span>
                    <Partition />
                    <input
                        className="partition-input"
                        value={formData.firstname}
                        onChange={e => setFormData(prev => ({ ...prev, firstname: e.target.value }))}
                        placeholder="Prénom"
                    />
                </div>
                <div className="partition-wrapper">
                    <span className="labelInscription">Adresse Mail : </span>
                    <Partition />
                    <input
                        className="partition-input"
                        value={formData.email}
                        onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        placeholder="Adresse Mail"
                    />
                </div>
                <div className="partition-wrapper">
                    <span className="labelInscription">Mot de Passe : </span>
                    <Partition />
                    <input
                        className="partition-input"
                        value={formData.password}
                        onChange={e => setFormData(prev => ({ ...prev, password: e.target.value }))}
                        placeholder="Mot de passe"
                        type="password"
                    />
                </div>
                <div className="partition-wrapper">
                    <span className="labelInscription">Confirmer Mot de Passe : </span>
                    <Partition />
                    <input
                        className="partition-input"
                        value={formData.confirmPassword}
                        onChange={e => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                        placeholder="Confirmer mot de passe"
                        type="password"
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
                            const newUser = await registerUser(
                                formData
                            );
                            console.log("Utilisateur créé :", newUser);
                            if (newUser.token) {
                                localStorage.setItem("jwt", newUser.token);
                                console.log("Token JWT enregistré :", newUser.token);
                            }
                            resetForm();
                            navigate("/listeensembles");
                            
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
                    onClick={resetForm} />
            </div>

        </main >
    );
}