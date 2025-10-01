import { Link } from "react-router-dom";
import "../../styles/header.css";

export default function Header() {
    return (
        <header>
            <div>
                <h1>Requiem for a spring</h1>
                <p>Apps pensée et conçue par Le Totem</p>
            </div>
            <div>
                <nav>
                    <Link to="/homepage">Accueil</Link> |{" "}
                    <Link to="/listeensembles">Liste d'ensembles</Link> |{" "}
                    <Link to="/composants">Composants React</Link>
                </nav>
            </div>
        </header>
    )
}
