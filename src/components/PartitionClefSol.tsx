import React, { useRef, useEffect, useState } from "react";
import { Note } from "./Note";

import "../styles/App.css";

// ---- Types des notes ----
export interface NoteData {
    x: number;
    y: number;
    label: string;
    iconType: "blanche" | "clef";
    onClick: () => void;
}

interface PartitionProps {
    notes?: NoteData[];
}

// ---- Classe Staff pour dessiner les lignes ----
class Staff {
    public svgGroup: SVGGElement;
    public lines: number;
    public lineGap: number;

    constructor(svgGroup: SVGGElement, lines = 5, lineGap = 12) {
        this.svgGroup = svgGroup;
        this.lines = lines;
        this.lineGap = lineGap;
    }

    draw(width: number) {
        this.svgGroup.innerHTML = "";
        const paddingX = width * 0.02; // 2% horizontal padding
        const paddingY = 12; // fixed padding vertical

        for (let i = 0; i < this.lines; i++) {
            const y = paddingY + i * this.lineGap;
            const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
            line.setAttribute("x1", paddingX.toString());
            line.setAttribute("x2", (width - paddingX).toString());
            line.setAttribute("y1", y.toString());
            line.setAttribute("y2", y.toString());
            line.setAttribute("stroke", "rgba(117, 84, 28, 0.7)");
            line.setAttribute("stroke-width", "2");
            this.svgGroup.appendChild(line);
        }
    }
}

// ---- Composant Clé de Sol ----
const ClefSolFingerPrint: React.FC<{
    x?: number;
    y?: number;
    size?: number;
    color?: string;
}> = ({ x = 10, y = 10, size = 60, color = "#75541C" }) => {
    return (
        <g transform={`translate(${x}, ${y}) scale(${size / 60})`}>
            <path
                d="M9.78,50.6c.22,.08,.35,.17,.47,.16,1.56-.12,2.81-.84,3.8-2.02,.58-.7,.93-1.53,.85-2.45-.13-1.57-.29-3.13-.46-4.7-.06-.58-.2-1.15-.32-1.78-.34,0-.63-.04-.91,0-2.65,.43-5.21,.01-7.71-.82-2.12-.71-3.61-2.19-4.51-4.22-1.5-3.38-1.27-6.71,.48-9.94,.74-1.35,1.72-2.53,2.86-3.56,1.1-.99,2.25-1.91,3.39-2.86,.23-.19,.46-.38,.71-.54,.88-.56,1.2-1.21,.94-2.34-.54-2.41-.67-4.88-.4-7.35,.26-2.39,.98-4.62,2.4-6.58,.31-.43,.69-.85,1.1-1.18,.76-.6,1.69-.55,2.44,.06,.63,.51,1.03,1.19,1.38,1.9,2.62,5.43,1.57,12.28-3.71,16.54-.38,.31-.78,.6-1.21,.93,.06,.34,.11,.67,.17,1,.23,1.31,.47,2.61,.71,3.92,.2,1.1,.57,1.35,1.44,1.3,.2-.01,.39,.01,.59,.03,3.57,.37,5.16,2.69,5.57,5.38,.13,.86,.09,1.78,0,2.65-.2,1.77-1.12,3.13-2.62,4.08-.54,.34-1.11,.63-1.73,.97,.04,.32,.06,.66,.12,.99,.3,1.65,.62,3.29,.91,4.94,.09,.48,.1,.98,.15,1.47,.19,1.89-.65,3.34-2.02,4.52-1.08,.93-2.39,1.4-3.8,1.46-1.65,.07-3.24-.25-4.67-1.13-1.12-.69-1.97-1.63-2.34-2.93-.57-1.95,.66-4.07,2.67-4.58,2-.51,4.12,.77,4.54,2.75,.23,1.11,.08,2.16-.62,3.09-.2,.26-.4,.52-.65,.83Zm2.14-21.42c-1.88,.28-2.91,1.25-3.36,2.88-.32,1.15-.11,2.23,.3,3.32,.16,.42,.52,.8,.48,1.37-.27-.04-.48-.03-.64-.1-1.03-.45-1.59-1.27-1.83-2.34-.58-2.63,.55-5.57,2.79-7.16,.24-.17,.49-.34,.75-.47,.57-.28,.77-.75,.64-1.34-.3-1.38-.63-2.75-.97-4.23-.32,.18-.55,.27-.74,.41-1.93,1.39-3.63,3.03-4.97,5-.55,.81-1,1.69-1.38,2.6-.87,2.13-.55,4.17,.74,6.03,.5,.72,1.12,1.38,1.81,1.92,2.22,1.72,4.76,2.27,7.51,1.75,.26-.05,.51-.21,.85-.35l-1.98-9.29Zm-1.35-13.44c.14-.02,.26,0,.32-.06,1.35-1.15,2.57-2.44,3.5-3.96,.94-1.54,1.49-3.2,1.42-5.03-.05-1.23-.71-2.13-1.76-2.47-1.09-.34-2.18-.04-2.92,.87-.81,.98-1.23,2.13-1.26,3.39-.03,1.13-.05,2.27,.05,3.39,.12,1.3,.15,2.63,.64,3.87Zm2.79,13.43c.55,2.94,1.17,5.79,1.81,8.67,1.9-.9,2.92-2.65,2.64-4.41-.38-2.38-1.87-3.86-4.45-4.26Z"
                fill={color}
            />
        </g>
    );
};

// ---- Composant Partition ----
const Partition: React.FC<PartitionProps> = ({ notes = [] }) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const svgRef = useRef<SVGSVGElement | null>(null);
    const staffRef = useRef<SVGGElement | null>(null);

    // Gestion portée
    const paddingY = 12;
    const lineGap = 12;
    const numberOfLines = 5;

    // Gestion clé de sol
    const [clefX, setClefX] = useState(0);
    const [clefY, setClefY] = useState(0);
    const [clefSize, setClefSize] = useState(60);

    useEffect(() => {
        const container = containerRef.current!;
        const svg = svgRef.current!;
        const staff = new Staff(staffRef.current!, numberOfLines, lineGap);

        const handleResize = () => {
            const width = container.clientWidth;
            const containerHeight = paddingY + (numberOfLines - 1) * lineGap + paddingY;
            container.style.height = `${containerHeight}px`;

            staff.draw(width);

            svg.setAttribute("viewBox", `0 0 ${width} ${containerHeight}`);
            svg.setAttribute("preserveAspectRatio", "none");

            const paddingX = width * 0.02;
            const newClefSize = lineGap * 7;
            const newClefY = paddingY - newClefSize * 0.15;
            const newClefX = paddingX - newClefSize * -0.15;

            setClefY(newClefY);
            setClefX(newClefX);
            setClefSize(newClefSize);
        };

        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div
            ref={containerRef}
            style={{
                width: "100%",
                minHeight: "80px",
                margin: 0,
                padding: 0,
            }}
        >
            <svg
                ref={svgRef}
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="xMinYMid meet"
                style={{ display: "block", padding: "5px 0px" }}
            >
                <rect width="100%" height="100%" fill="none" />

                {/* Portée */}
                <g ref={staffRef}></g>

                {/* Clé de sol */}
                <ClefSolFingerPrint x={clefX} y={clefY} size={clefSize} />

                {/* Notes */}
                {notes.map((note, idx) => (
                    <Note xtext={0} key={idx} {...note} isOnStaff={true} />
                ))}
            </svg>
        </div>
    );
};

export default Partition;
