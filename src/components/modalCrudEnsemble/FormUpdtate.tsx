import React from "react";

const FormUpdate = () => {
  return (
    <form>
      <label>Modifier un ensemble :</label>
      <input type="text" placeholder="Nouveau nom..." />
      <button type="submit">Mettre à jour</button>
    </form>
  );
};

export default FormUpdate;
