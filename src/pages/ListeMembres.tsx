import { Note } from "../components/pathButtons/Note";
import Partition from "../components/Partition";
import TitlePartition from "../components/TitlePartition";

export default function ListeMembres() {
    return (
        <main className="listeMembres-container">
            <div className="title-wrapper">
                <TitlePartition text="Liste des Membres" />
            </div>

            <div className="crud">
                <div className="partitionCrud">
                    <Partition />

                    <button className="crud-button">
                        <Note
                            x={0}
                            y={0}
                            xtext={15}
                            label="Inviter"
                            iconType="blanche"
                            isOnStaff={false}
                        />
                    </button>

                    <button className="crud-button">
                        <Note
                            x={0}
                            y={0}
                            xtext={15}
                            label="Mettre à jour"
                            iconType="blanche"
                            isOnStaff={false}
                        />
                    </button>
                </div>
            </div>

            <div className="listeMembres-container">
                <div className="partition-wrapper">
                    <span className="labelMembres gauche">
                        <Note
                            x={0}
                            y={0}
                            xtext={0}
                            label=""
                            iconType="croche"
                            isOnStaff={false}
                        />
                        Nom du membre
                    </span>
                    <button className="labelMembres droite">
                        <Note
                            x={0}
                            y={0}
                            xtext={0}
                            label=""
                            iconType="croche"
                            isOnStaff={false}
                        />
                        Supprimer
                    </button>
                    <Partition />
                </div>
            </div>
        </main>
    );
}
