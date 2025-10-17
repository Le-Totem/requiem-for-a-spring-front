import styles from "./ImgButton.module.css";
import croche from "../../assets/croche2.0.svg";
import fa from "../../assets/cleFa.svg";
import ut from "../../assets/cleDo.svg";
import blanche from "../../assets/blanche.svg";

interface ImgButtonProps {
    onClick?: () => void;
    iconType: string;
    text: string;
}

const icons: Record<string, string> = {
    "croche": croche,
    "fa": fa,
    "ut": ut,
    "blanche": blanche
}

const ImgButton: React.FC<ImgButtonProps> = ({ onClick, iconType, text }) => {
    const iconImg = icons[iconType];
    return (
        <div className={styles.imgbutton_container} onClick={onClick}>
            <img src={iconImg} className={styles.icon_img} />
            <p className={styles.icon_label}>{text}</p>
        </div>
    );
}

export default ImgButton;