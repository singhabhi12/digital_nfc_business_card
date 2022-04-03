import React from "react";
import styles from "./ProfileCard.module.scss";

import {
  locIcon,
  mail2Icon,
  phoneIcon,
  webIcon,
  whatsAppIcon,
  fbIcon,
  placeholder,
} from "../../assets/getAssests";

export default function ProfileCard({ card }) {
  return (
    <div className={styles.profile}>
      <div className={styles.profile_intro}>
        <img
          src={card?.profilePic ? card?.profilePic : placeholder}
          alt="profile_image"
          className={styles.profile_img}
        />
        <div className={styles.profile_initials}>
          <h4>{card?.fullname}</h4>
          <p>{card?.profession}</p>
        </div>
      </div>
      <div className={styles.profile_details}>
        <div className={styles.detail}>
          <span>Email</span>
          <a href={`mailto:${card?.email}`} className={styles.content}>
            <img src={mail2Icon} alt="email_icon" />
            <span>{card?.email}</span>
          </a>
        </div>
        <div className={styles.detail}>
          <span>Phone Number</span>
          <div className={styles.content}>
            <img src={phoneIcon} alt="phone_icon" />
            <span>{card?.contact}</span>
          </div>
        </div>
        <div className={styles.detail}>
          <span>Address</span>
          <div className={styles.content}>
            <img src={locIcon} alt="loc_icon" />
            <span>{card?.location}</span>
          </div>
        </div>
        <div className={styles.detail}>
          <span>Website</span>
          <div
            className={styles.content}
            onClick={() => window.open(`${card?.socials?.web}`, "_blank")}
          >
            <img src={webIcon} alt="web_icon" />
            <a>{card?.socials?.web}</a>
          </div>
        </div>
        <div className={styles.socials}>
          <span>Social</span>
          <div>
            <a
              href={`https://api.whatsapp.com/send?phone=${card?.socials?.whatsapp}`}
              target="_blank"
              className={styles.social}
            >
              <img
                src={whatsAppIcon}
                alt="whatsapp_icon"
                className={styles.social}
              />
            </a>
            <a
              href={`${card?.socials?.fb}`}
              target="_blank"
              className={styles.social}
            >
              <img src={fbIcon} alt="fb_icon" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
