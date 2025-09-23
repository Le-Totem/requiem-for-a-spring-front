import React, { useRef, useEffect } from "react";

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

        // Calculer la position de chaque ligne
        for (let i = 0; i < this.lines; i++) {
            const y = paddingY + i * this.lineGap;
            const line = document.createElementNS(
                "http://www.w3.org/2000/svg",
                "line"
            );
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

const Partition: React.FC = () => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const svgRef = useRef<SVGSVGElement | null>(null);
    const staffRef = useRef<SVGGElement | null>(null);

    // Variables pour la gestion de la taille
    const paddingY = 12;
    const lineGap = 12;
    const numberOfLines = 5;

    useEffect(() => {
        const container = containerRef.current!;
        const svg = svgRef.current!;

        const staff = new Staff(staffRef.current!, numberOfLines, lineGap);

        const handleResize = () => {
            const width = container.clientWidth;

            // Calcul de la hauteur du container pour contenir toutes les lignes + padding
            const containerHeight = paddingY + (numberOfLines - 1) * lineGap + paddingY;
            container.style.height = `${containerHeight}px`;

            // Dessiner la portée
            staff.draw(width);

            // Mettre à jour viewBox pour que le SVG s’adapte
            svg.setAttribute("viewBox", `0 0 ${width} ${containerHeight}`);
            svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
        };

        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div
            ref={containerRef}
            style={{
                width: '100%',
                height: 'auto', // La hauteur sera fixée en JS
                minHeight: '80px',
                margin: 0,
                padding: 0,
                border: '1px solid #999'
            }}
        >
            <svg
                ref={svgRef}
                xmlns="http://www.w3.org/2000/svg"
                style={{ width: '100%', height: '100%', display: 'block' }}
            >
                <g ref={staffRef}></g>
            </svg>
        </div>
    );
};

export default Partition;