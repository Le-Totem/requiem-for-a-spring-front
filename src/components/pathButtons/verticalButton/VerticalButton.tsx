import React from "react";
import { Note } from "../Note";
import styles from "./vertical.module.css"

interface VerticalProps {
  label: string;
  onClick?: () => void;
  iconType: "blanche" | "clef" | "doubleNoire" | "fa" | "ut" |"soupir";
}

const VerticalButton: React.FC<VerticalProps> = ({
  label,
  onClick = () => console.log(`${label} clicked`),
  iconType,
}) => {
  return (
    <div className={styles.verticalbutton}>
      <Note
        xtext={0}
        x={0}
        y={0}
        verticalButton={true}
        label={label}
        iconType={iconType}
        onClick={onClick}
        isOnStaff={false} xtext={15}      />
    </div>
  );
};

export default VerticalButton;
