import React, { useContext, useEffect } from "react";
import styles from "./CardProfile.module.scss";
import { AuthContext } from "../../Helper/Context";
import Card from "../../Layouts/Layout";

import ProfileCard from "../../Components/ProfileCard/ProfileCard";
import { useParams } from "react-router-dom";
import Toast from "../../Components/Toast/Toast";

export default function CardProfile() {
  const { card, fetchCard, DeleteSavedProfile, showAlert, setShowAlert } =
    useContext(AuthContext);
  const { id } = useParams();
  useEffect(() => {
    fetchCard(id);
    console.log("id:", id);
  }, [id]);

  return (
    <Card>
      <div className={styles.container}>
        <ProfileCard card={card} />

        <button
          className={styles.editCardBtn}
          onClick={() => setShowAlert(true)}
        >
          <span>Delete Card</span>
        </button>
      </div>
      {showAlert && (
        <Toast
          data={{
            info: "Are you sure you want to delete this contact ?",
            action: () => DeleteSavedProfile(id),
          }}
        />
      )}
    </Card>
  );
}
