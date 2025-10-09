import { useNavigate } from "react-router";
import "../../styles/footer.css";
import { Note } from "../Note";
import { deleteJwt } from "../../utils/LocalStorageManager";

export default function Footer() {

    const navigate = useNavigate();

    // gère la déconnexion et renvoie sur /login
    const handleLogOut = () => {

        deleteJwt();
        navigate("/login");
    }

    const handleExit = () => {
        navigate("/listeensembles");
    }

    return (
        <footer>
            <div className="footer-notes">
                <Note x={0} y={0} label="Se déconnecter" iconType="fa" onClick={handleLogOut} isOnStaff={false} />
            </div>
            <div className="footer-notes">
                <Note x={0} y={0} label="Exit" iconType="ut" onClick={handleExit} isOnStaff={false} />
            </div>
        </footer>
    )
}
