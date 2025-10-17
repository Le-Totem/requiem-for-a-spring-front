import { Link } from "react-router-dom";
import "../../styles/header.css";

export default function Header() {
    return (
        <header>
            <div>
                <h1>Requiem for a spring</h1>
                <p>by Le Totem</p>
            </div>
            <div>
                <nav>
                    <Link to="/">Accueil</Link> |{" "}
                    <Link to="/inscription">Inscription</Link> |{" "}
                    <Link to="/listeensembles">Liste d'ensembles</Link> |{" "}
                    <Link to="/listemembres">Liste de membres</Link> |{" "}
                    <Link to="/composants">Composants React</Link>
                </nav>
            </div>
        </header>
    )
}
