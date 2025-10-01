import Partition from "../components/Partition";
import PartitionClefSol from "../components/PartitionClefSol";
import "../styles/ensembleliste.css";


export default function Ensembleliste() {
    return (
        <main className="ensemble-container">

            <div className="clef-container">
                <PartitionClefSol />
            </div>

            <div className="partition-list">
                <div className="partition-wrapper"><Partition /></div>
                <div className="partition-wrapper"><Partition /></div>
                <div className="partition-wrapper"><Partition /></div>
                <div className="partition-wrapper"><Partition /></div>
                <div className="partition-wrapper"><Partition /></div>
            </div>

        </main >
    );
}
