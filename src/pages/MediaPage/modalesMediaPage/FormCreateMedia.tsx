const FormCreateMedia = () => {
    return (
        <form>
            <label>Ajouter un média :</label>
            <input type="text" placeholder="Nouveau titre..." />
            <input type="text" placeholder="Nouvel auteur..." />
            <input type="text" placeholder="Nouvelle description..." />
            <button type="submit">Ajouter</button>
        </form>
    );
};

export default FormCreateMedia;

// TODO: faire la modale pour créer un média