import { Link } from "react-router-dom";
import "../../styles/footer.css";

export default function Footer() {
    return (
        <footer>
            <div>
                <nav>
                    <Link to="/">Accueil</Link> |{" "}
                    <Link to="/inscription">Inscription</Link> |{" "}
                    <Link to="/listeensembles">Liste d'ensembles</Link> |{" "}
                    <Link to="/composants">Composants React</Link>
                </nav>
            </div>
        </footer>
    )
}
