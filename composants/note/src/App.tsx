import { useEffect, useRef, useState } from "react";
import "./App.css";

interface Space {
  top: number;
  bottom: number;
}

interface Staff {
  safeTop: number;
  safeBottom: number;
  getSpaces: () => Space[];
}

// ✅ Exemple simple de "staff"
const mockStaff: Staff = {
  safeTop: 10,
  safeBottom: 200,
  getSpaces: () => [
    { top: 20, bottom: 60 },
    { top: 60, bottom: 100 },
    { top: 100, bottom: 140 },
    { top: 140, bottom: 180 },
  ],
};

interface NoteProps {
  label: string;
  x: number;
  space: Space;
  align: "top" | "bottom";
  staff: Staff;
  onDelete: (label: string) => void;
}

const Note = ({ label, x, space, align, staff, onDelete }: NoteProps) => {
  const rx = 8;
  const ry = 6;

  const y =
    align === "bottom"
      ? Math.min(space.bottom - ry, staff.safeBottom - ry)
      : Math.max(space.top + ry, staff.safeTop + ry);

  return (
    <g
      className="note"
      transform={`translate(${x}, ${y})`}
      onPointerDown={() => onDelete(label)}
    >
      {/* Tête */}
      <ellipse className="head" cx={0} cy={0} rx={rx} ry={ry} />

      {/* Queue */}
      <line className="stem" x1={rx} y1={0} x2={rx} y2={-36} />

      {/* Texte */}
      <text x={rx + 6} y={0}>
        {label}
      </text>
    </g>
  );
};

function App() {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [svgWidth, setSvgWidth] = useState<number>(600);
  const [labels, setLabels] = useState<string[]>([
    "Créer",
    "Modifier",
    "Valider",
    "Supprimer",
  ]);

  useEffect(() => {
    const handleResize = () => {
      if (svgRef.current) {
        setSvgWidth(svgRef.current.clientWidth);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const spaces = mockStaff.getSpaces();
  const margin = 40;

  // largeur fixe par note
  const noteWidths = labels.map(() => 60);
  const totalWidthNotes = noteWidths.reduce((acc, w) => acc + w, 0);
  const remainingSpace = svgWidth - 2 * margin - totalWidthNotes;
  const gap = labels.length > 1 ? remainingSpace / (labels.length - 1) : 0;

  let currentX = margin;

  const handleDelete = (label: string) => {
    alert(`Votre élément "${label}" a été supprimé`);
    setLabels((prev) => prev.filter((l) => l !== label));
  };

  return (
    <div className="partition">
      <svg ref={svgRef} xmlns="http://www.w3.org/2000/svg" aria-label="Notes">
        <g id="notes">
          {labels.map((label, i) => {
            const spaceIndex = i % spaces.length;
            const align = i % 2 === 0 ? "bottom" : "top";
            const note = (
              <Note
                key={label}
                label={label}
                x={currentX}
                space={spaces[spaceIndex]}
                align={align}
                staff={mockStaff}
                onDelete={handleDelete}
              />
            );
            currentX += noteWidths[i] + gap;
            return note;
          })}
        </g>
      </svg>
    </div>
  );
}

export default App;
