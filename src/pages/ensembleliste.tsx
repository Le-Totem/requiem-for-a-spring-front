import Partition from "../components/Partition";
import PartitionClefSol from "../components/PartitionClefSol";
import "../styles/ensembleliste.css";


export default function Ensembleliste() {
    const nomEnsemble = "Nom de l'ensemble"

    return (
        <main className="ensemble-container">

            <div className="clef-container">
                <span className="clef-text">{nomEnsemble}</span>
                <PartitionClefSol />
            </div>

            <div >
                <div className="partition-wrapper"><Partition /></div>
                <div className="partition-wrapper"><Partition /></div>
                <div className="partition-wrapper"><Partition /></div>
                <div className="partition-wrapper"><Partition /></div>
                <div className="partition-wrapper"><Partition /></div>
            </div>

        </main >
    );
}
