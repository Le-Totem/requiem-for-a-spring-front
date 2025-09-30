import React, { useRef, useEffect } from "react";
import { Note } from "./Note";

export interface NoteData {
    x: number;
    y: number;
    label: string;
    iconType: "blanche" | "clef";
    onClick: () => void;
}

interface PartitionNoteProps {
    notes: NoteData[];
}

class Staff {
    svgGroup: SVGGElement;
    lines: number;
    lineGap: number;

    constructor(svgGroup: SVGGElement, lines = 5, lineGap = 12) {
        this.svgGroup = svgGroup;
        this.lines = lines;
        this.lineGap = lineGap;
    }

    draw(width: number) {
        this.svgGroup.innerHTML = "";
        const paddingX = width * 0.02;
        const paddingY = 12;

        for (let i = 0; i < this.lines; i++) {
            const y = paddingY + i * this.lineGap;
            const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
            line.setAttribute("x1", paddingX.toString());
            line.setAttribute("x2", (width - paddingX).toString());
            line.setAttribute("y1", y.toString());
            line.setAttribute("y2", y.toString());
            line.setAttribute("stroke", "black");
            line.setAttribute("stroke-width", "2");
            this.svgGroup.appendChild(line);
        }
    }
}

const PartitionNote: React.FC<PartitionNoteProps> = ({ notes }) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const svgRef = useRef<SVGSVGElement | null>(null);
    const staffRef = useRef<SVGGElement | null>(null);

    useEffect(() => {
        const container = containerRef.current!;
        const svg = svgRef.current!;
        const staff = new Staff(staffRef.current!, 5, 12);

        const handleResize = () => {
            const width = container.clientWidth;
            const containerHeight = 12 + (5 - 1) * 12 + 12;
            container.style.height = `${containerHeight}px`;
            staff.draw(width);
            svg.setAttribute("viewBox", `0 0 ${width} ${containerHeight}`);
            svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
        };

        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div ref={containerRef} style={{ width: "100%", minHeight: "80px", border: "1px solid #999" }}>
            <svg ref={svgRef} style={{ width: "100%", height: "100%", display: "block" }}>
                <g ref={staffRef}></g> {/* Portée */}
                {notes.map((note, idx) => (
                    <Note key={idx} {...note} />  /* Notes au-dessus */
            ))}
            </svg>
        </div>
    );
};

export default PartitionNote;
