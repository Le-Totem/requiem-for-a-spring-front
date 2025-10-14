import { Link, useNavigate } from "react-router";
import "../../styles/footer.css";
import { Note } from "../Note";
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
                <div className="footer-note">
                    <Note x={0} y={0} label="Se déconnecter" iconType="fa" onClick={handleLogOut} isOnStaff={false} xtext={0} />
                </div>
                <div className="footer-note">
                    <Note x={0} y={0} label="Exit" iconType="ut" onClick={handleExit} isOnStaff={false} xtext={20} />
                </div>
            </div>
        </footer>
    )
}
