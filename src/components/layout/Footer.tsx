import { Link, useNavigate } from "react-router";
import "../../styles/footer.css";
import { Note } from "../pathButtons/Note";
import { deleteJwt } from "../../utils/LocalStorageManager";

export default function Footer() {

    const navigate = useNavigate();

    // gère la déconnexion et renvoie sur /login
    const handleLogOut = () => {

        deleteJwt();
        navigate("/");
    }

    const handleExit = () => {
        navigate("/listeensembles");
    }

    return (
        <footer>
            <nav>
                <Link to="/">Accueil</Link> |{" "}
                <Link to="/inscription">Inscription</Link> |{" "}
                <Link to="/listeensembles">Liste d'ensembles</Link> |{" "}
                <Link to="/composants">Composants React</Link>
            </nav>
            <div className="footer-notes">
                <button className="footer-button" onClick={handleLogOut}>
                    <Note x={0} y={0} label="Se déconnecter" iconType="fa" isOnStaff={false} xtext={0} />
                </button>
                <button className="footer-button" onClick={handleExit} >
                    <Note x={0} y={0} label="Exit" iconType="ut" isOnStaff={false} xtext={20} />
                </button>
            </div>
        </footer>
    )
}
