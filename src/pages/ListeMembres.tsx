import { Note } from "../components/pathButtons/Note";
import Partition from "../components/Partition";
import TitlePartition from "../components/TitlePartition";
import "../styles/listemembres.css";

export default function listemembres() {
    return (
        <main className="inscription-container">
            <div className="title-wrapper">
                <TitlePartition text="Liste des Membres" />
            </div>

            <div className="crud">
                <div className="partition-wrapper">
                    <div className="notes-on-staff">
                        <button className="bouton-note" onClick={() => console.log("Invitation envoyée")}>
                            <Note
                                x={0}
                                y={0}
                                xtext={15}
                                label="Inviter"
                                iconType="blanche"
                                isOnStaff={false}
                                size={5}
                            />
                        </button>

                        <button className="bouton-note" onClick={() => console.log("Mise à jour ok")}>
                            <Note
                                x={0}
                                y={0}
                                xtext={15}
                                label="Mettre à jour"
                                iconType="blanche"
                                isOnStaff={false}
                                size={5}
                            />
                        </button>

                        <button className="bouton-note" onClick={() => console.log("Suppression ok")}>
                            <Note
                                x={0}
                                y={0}
                                xtext={20}
                                label="Supprimer"
                                iconType="doubleSharp"
                                isOnStaff={false}
                                size={5}
                            />
                        </button>
                    </div>
                </div>
            </div>


            <div className="partitions-container">
                {[1, 2, 3, 4, 5].map((i) => (
                    <div className="partition-wrapper" key={i}>
                        <span className="labelMembres gauche">
                            <Note
                                x={0}
                                y={0}
                                xtext={0}
                                label=""
                                iconType="croche"
                                isOnStaff={false}
                                size={10}
                            />
                            Personne {i}
                        </span>

                        <span className="labelMembres droite">
                            <Note
                                x={0}
                                y={0}
                                xtext={0}
                                label=""
                                iconType="croche"
                                isOnStaff={false}
                                size={10}
                            />
                            Personne {i + 5}
                        </span>

                        <Partition />
                    </div>
                ))}
            </div>
        </main>
    );
}
