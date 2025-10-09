import "../../styles/footer.css";
import { Note } from "../Note";

export default function Footer() {

    // gère la déconnexion et renvoie sur /login
    const handleLogOut = () => {
        localStorage.removeItem("jwt");
        window.location.href = "/login";
    }

    return (
        <footer>
            <div className="footer-notes">
                <Note x={0} y={0} label="Se déconnecter" iconType="fa" onClick={handleLogOut} isOnStaff={false} />
            </div>
            <div className="footer-notes">
                <Note x={0} y={0} label="Exit" iconType="ut" onClick={() => console.log("noteSansPartition1")} isOnStaff={false} />
            </div>
        </footer>
    )
}
