import styles from "./Layout.module.scss";
import back_nav from "../assets/back_icon.svg";
import { useNavigate } from "react-router-dom";
export default function Card({ children }) {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <header>
        <nav>
          <img
            src={back_nav}
            alt="back nav icon"
            onClick={() => navigate("/profile")}
          />
        </nav>
      </header>
      <main>{children}</main>
    </div>
  );
}
