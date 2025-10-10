const FormUpdateMedia = () => {
    return (
        <form>
            <label>Modifier un média :</label>
            <input type="text" placeholder="Nouveau titre..." />
            <input type="text" placeholder="Nouvel auteur..." />
            <input type="text" placeholder="Nouvelle description..." />
            <button type="submit">Ajouter</button>
        </form>
    );
};

export default FormUpdateMedia;

// TODO: faire la modale pour modifier un média