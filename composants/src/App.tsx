import Partition from "./components/Partition";
import PartitionClefSol from "./components/PartitionClefSol";
import { Note } from "./components/Note";
import "./styles/App.css"; // layout global

function App() {
  return (
    <div className="app-container" style={{ padding: "10px" }}>

      <h2>Portée simple</h2>
      <Partition />

      <h2>Portée avec Notes</h2>
      <div style={{ position: "relative", width: "600px", height: "100px" }}>
        {/* Portée en arrière-plan */}
        <Partition />

        {/* Notes superposées */}
        <svg style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}>
          <Note x={50} y={20} label="Créer" iconType="blanche" onClick={() => console.log("Créer")} />
          <Note x={200} y={30} label="Mettre à jour" iconType="blanche" onClick={() => console.log("Mettre à jour")} />
          <Note x={400} y={25} label="Valider" iconType="blanche" onClick={() => console.log("Valider")} />
        </svg>
      </div>

      <h2>Portée avec clef de sol</h2>
      <PartitionClefSol />

    </div>
  );
}

export default App;
