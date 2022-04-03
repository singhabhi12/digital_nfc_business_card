import React, { useContext, useEffect } from "react";
import styles from "./BusinessCard.module.scss";
import { AuthContext } from "../../Helper/Context";
import Card from "../../Layouts/Layout";

import { editIcon } from "../../assets/getAssests";
import ProfileCard from "../../Components/ProfileCard/ProfileCard";
import { useNavigate, useParams } from "react-router-dom";

//TOASTIFY @imports
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Toast from "../../Components/Toast/Toast";

export default function BusinessCard() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user, card, fetchCard, showAlert, setShowAlert } =
    useContext(AuthContext);
  useEffect(() => {
    console.log("card", card);
    fetchCard(id);
  }, [user]);
  const { SaveProfile } = useContext(AuthContext);

  const SaveCard = () => {
    if (!user) {
      toast.info("Create account to save card!", {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      navigate("/");
    } else {
      SaveProfile(id);
    }
  };
  return (
    <Card>
      <div className={styles.container}>
        <ProfileCard card={card} />

        <button
          className={styles.editCardBtn}
          onClick={() => setShowAlert(true)}
        >
          <img src={editIcon} alt="savecard_icon" />
          <span>Save Card</span>
        </button>
      </div>
      {showAlert && (
        <Toast data={{ info: "Wanna save this contact?", action: SaveCard }} />
      )}
      <ToastContainer
        position="top-center"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Card>
  );
}
