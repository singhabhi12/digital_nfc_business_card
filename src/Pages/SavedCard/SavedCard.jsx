import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { editIcon } from "../../assets/getAssests";
import { AuthContext } from "../../Helper/Context";
import Card from "../../Layouts/Layout";
import styles from "./SavedCard.module.scss";

const RenderProfileList = ({ profile }) => {
  const navigate = useNavigate();
  console.log("profile id:", profile.uid);
  return (
    <div className={styles.card}>
      <img src={profile?.profilePic} alt="" className={styles.profile_img} />
      <div className={styles.info}>
        <h4>{profile?.fullname}</h4>
        <span>{profile?.profession}</span>
      </div>
      <img
        src={editIcon}
        alt="edit icon"
        onClick={() => navigate(`/card/${profile?.uid}`)}
      />
    </div>
  );
};

export default function SavedCard() {
  const { profiles } = useContext(AuthContext);
  const [totalProfiles, setTotalProfiles] = useState(0);
  useEffect(() => {
    //to make renderlist component conditional. it will be rendered only when all files are fetched
    profiles && setTotalProfiles(profiles.length);
  }, [profiles]);

  return (
    <Card>
      <div className={styles.container}>
        <h1>Saved Business Cards</h1>
        <div className={styles.profileList}>
          {totalProfiles === profiles.length &&
            profiles.map((profile, id) => {
              return <RenderProfileList key={id} profile={profile} />;
            })}
        </div>
      </div>
    </Card>
  );
}
