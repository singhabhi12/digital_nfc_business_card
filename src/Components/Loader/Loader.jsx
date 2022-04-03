import React from "react";
import { loaderGif } from "../../assets/getAssests";

import styles from "./Loader.module.scss";
export default function Loader() {
  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <img className={styles.loaderGif} src={loaderGif} alt="loader" />
      </div>
    </div>
  );
}
