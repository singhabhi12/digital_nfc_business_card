import { useContext } from "react";
import { AuthContext } from "../../Helper/Context";
import styles from "./Toast.module.scss";

export default function Toast({ data }) {
  const { setShowAlert } = useContext(AuthContext);
  const executeAction = () => {
    data.action();
    setShowAlert(false);
  };
  return (
    <div className={styles.toast}>
      <div className={styles.content}>
        <p className={styles.info}>{data.info}</p>
        <div className={styles.actions}>
          <button onClick={executeAction}>Yes</button>
          <button onClick={() => setShowAlert(false)}>No</button>
        </div>
      </div>
    </div>
  );
}
