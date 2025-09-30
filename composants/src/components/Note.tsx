import { useState } from "react";
import "../styles/Note.css";


const icons = {
    blanche: "M7.6,18.66c0-1.29,.01-2.51,.02-3.74,0-1.23,0-2.46,0-3.69v-3.84c0-1.23,0-2.46,0-3.69,0-1.22-.03-2.44,.03-3.71h1.04c.04,.3,.11,.58,.11,.87-.03,6.59-.12,13.19-.09,19.78,.02,3.73-3.71,5.61-6.54,5.03-1.65-.34-2.53-1.85-2.05-3.46,.22-.73,.6-1.35,1.14-1.87,1.55-1.47,3.34-2.21,5.51-1.79,.23,.04,.47,.06,.81,.1Zm-4.44,5.78c.95-.01,2.07-.41,2.87-.99,.61-.44,1.11-.97,1.39-1.69,.28-.71,.05-1.43-.64-1.73-.39-.17-.86-.27-1.28-.23-1.49,.14-2.73,.79-3.64,2.01-.39,.53-.68,1.14-.35,1.79,.36,.7,1.07,.8,1.65,.84Z",
    clef: "M10,10 L20,10 L20,20 L10,20 Z"
};

interface NoteProps {
    label: string;
    x: number;
    y: number;
    iconType: keyof typeof icons;
    onClick?: () => void;
}

export const Note = ({ label, x, y, iconType, onClick }: NoteProps) => {
    const [isActive, setIsActive] = useState(false);

    const handleClick = () => { // Actions au clic
        setIsActive(prev => !prev);
        onClick?.();

    };

    const iconPath = icons[iconType] || icons['blanche'];

    return (
        <g transform={`translate(${x}, ${y})`}
            onPointerDown={handleClick}
            style={{ cursor: "pointer" }}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="35"
                height="32"
                viewBox="0 0 32 32"
                fill="currentColor"
            >
                <path
                    d={iconPath}
                    fill={isActive ? "gray" : "black"} // Changement de couleur selon l’état
                />
            </svg>
            <text x={20} y={25}>{label}</text>
        </g>
    );
};