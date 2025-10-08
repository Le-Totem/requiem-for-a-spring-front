
import PartitionClefSol from "../components/PartitionClefSol";
import Partition from "../components/Partition";
import { Note } from "../components/Note";
import PartitionNote, { type NoteData } from "../components/PartitionNote";

import "../styles/Homepage.css";

export default function Composants() {

    const notesOnPartition: NoteData[] = [
        { x: 50, y: 20, label: "Créer", iconType: "blanche", onClick: () => console.log("Créer") },
        { x: 200, y: 30, label: "Mettre à jour", iconType: "blanche", onClick: () => console.log("Mettre à jour") },
        { x: 400, y: 25, label: "Valider", iconType: "blanche", onClick: () => console.log("Valider") },
    ];

    return (
        <div style={{ padding: "10px" }}>
            <h2>Portée simple</h2>
            <Partition />

            <h2>Portée avec Notes</h2>
            <PartitionNote notes={notesOnPartition} />

            <h2>Notes libres</h2>
            <div style={{ width: "600px", height: "100px" }}>
                <Note x={0} y={0} label="noteSansPartition1" iconType="blanche" onClick={() => console.log("noteSansPartition1")} isOnStaff={false} />
                <Note x={0} y={0} label="noteSansPartition2" iconType="blanche" onClick={() => console.log("noteSansPartition2")} isOnStaff={false} />
            </div>

            <h2>Portée avec clef de sol</h2>
            <PartitionClefSol notes={notesOnPartition} />
        </div>
    );
}
