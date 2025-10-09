import React from "react";
import { Note } from "./Note";
import "../styles/CrudButton.css"

interface CrudButtonsProps {
  onCreate?: () => void;
  onUpdate?: () => void;
  onDelete?: () => void;
}

const CrudButtons: React.FC<CrudButtonsProps> = ({
  onCreate = () => console.log("Create clicked"),
  onUpdate = () => console.log("Update clicked"),
  onDelete = () => console.log("Delete clicked"),
}) => {
  return (
    <div className="buttoncrud">
      <Note
        x={0}
        y={0}
        label="create"
        iconType="doubleNoire"
        onClick={onCreate}
        isOnStaff={false}
      />
      <Note
        x={0}
        y={0}
        label="update"
        iconType="doubleNoire"
        onClick={onUpdate}
        isOnStaff={false}
      />
      <Note
        x={0}
        y={0}
        label="delete"
        iconType="doubleNoire"
        onClick={onDelete}
        isOnStaff={false}
      />
    </div>
  );
};

export default CrudButtons;
