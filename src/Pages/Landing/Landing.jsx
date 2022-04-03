import styles from "./Landing.module.scss";
import cards from "../../assets/cards.svg";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../Helper/Context";

export default function Landing() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (localStorage.getItem("user") === user?.uid || user?.uid) {
      navigate("/profile");
    }
  }, [user]);
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <img src={cards} alt="cards" />
      </div>
      <div className={styles.content}>
        <h1>
          Create your Digital <br /> Business Card
        </h1>
        <p>
          now deliver your contact information, social networks, video,
          websites, and so much more, straight to any smartphone.{" "}
        </p>

        <div className={styles.btns}>
          <button className={styles.btn} onClick={() => navigate("/sign-up")}>
            Sign Up
          </button>
          <button className={styles.btn} onClick={() => navigate("/login")}>
            Login
          </button>
        </div>

        <div className={styles.footer_txt}>
          <p>By creating an account, I accept App’s</p>
          <p>Terms of Service.</p>
        </div>
      </div>
    </div>
  );
}
