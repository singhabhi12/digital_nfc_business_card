import Card from "../../Layouts/Layout";
import {
  locIcon,
  mail2Icon,
  phoneIcon,
  webIcon,
  imgIcon,
  whatsAppIcon,
  fbIcon,
} from "../../assets/getAssests";

import styles from "./CreateCard.module.scss";
import { useEffect, useState, useContext, useLayoutEffect } from "react";
import { AuthContext } from "../../Helper/Context";
import { useNavigate } from "react-router-dom";
import Loader from "../../Components/Loader/Loader";
//TOASTIFY @imports
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CreateCard() {
  //form states
  const [fullName, setFullName] = useState("");
  const [profession, setProfession] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [location, setLocation] = useState("");
  const [socials, setSocials] = useState({
    web: "",
    fb: "",
    whatsapp: "",
  });
  const [profilePic, setProfilePic] = useState("");

  const navigate = useNavigate();
  const { user, Create_or_Update_Card, card, fetchCard, loading } =
    useContext(AuthContext);

  useLayoutEffect(() => {
    if (!user) navigate("/");
    fetchCard(user?.uid);
  }, [user]);

  useEffect(() => {
    if (card?.uid) {
      console.log("no card fetched!");
      card?.fullname && setFullName(card?.fullname);
      card?.profession && setProfession(card?.profession);
      card?.email && setEmail(card?.email);
      card?.contact && setContact(card?.contact);
      card?.location && setLocation(card?.location);
      card?.socials &&
        setSocials({
          web: card?.socials?.web,
          fb: card?.socials?.fb,
          whatsapp: card?.socials?.whatsapp,
        });
    } else {
      console.log("no card fetched!");
    }
    if (profilePic) {
      toast.success(`${profilePic.name} is selected!`, {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  }, [card, profilePic]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    {
      await Create_or_Update_Card(user, {
        fullName,
        profession,
        email,
        contact,
        location,
        whatsapp: socials?.whatsapp || contact,
        fb: socials?.fb,
        web: socials?.web,
        file: profilePic,
      });
    }
  };
  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <div className={styles.formContent}>
          <h1>{card?.uid ? "Update Card" : "Create Card"}</h1>
          <label>
            Full Name
            <div className={styles.input_cntr}>
              <input
                type="text"
                value={fullName}
                placeholder={user?.displayName}
                onChange={(event) => setFullName(event.target.value)}
                required
              />
            </div>
          </label>
          <label>
            Profession
            <div className={styles.input_cntr}>
              <input
                type="text"
                placeholder="web developer, data scientist ..."
                value={profession}
                onChange={(event) => setProfession(event.target.value)}
                required
              />
            </div>
          </label>
          <label>
            Email
            <div className={styles.input_cntr}>
              <img src={mail2Icon} alt="email_icon" />
              <span>|</span>
              <input
                type="email"
                value={email}
                placeholder={user?.email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>
          </label>
          <label>
            Phone Number
            <div className={styles.input_cntr}>
              <img src={phoneIcon} alt="contact_icon" />
              <span>|</span>
              <input
                type="text"
                placeholder="9694174XXX"
                value={contact}
                onChange={(event) => setContact(event.target.value)}
                required
              />
            </div>
          </label>
          <label>
            Address
            <div className={styles.input_cntr}>
              <img src={locIcon} alt="location_icon" />
              <span>|</span>
              <input
                type="text"
                placeholder="Mumbai"
                value={location}
                onChange={(event) => setLocation(event.target.value)}
                required
              />
            </div>
          </label>
          <label>
            Website
            <div className={styles.input_cntr}>
              <img src={webIcon} alt="website_icon" />
              <span>|</span>
              <input
                type="text"
                value={socials?.web}
                placeholder="https://mario.com"
                onChange={(event) =>
                  setSocials({
                    web: event.target.value,
                    fb: socials?.fb,
                    whatsapp: socials?.whatsapp,
                  })
                }
              />
            </div>
          </label>
          <label>
            <div className={styles.file_input}>
              <span>Profile Picture</span>
              <input
                type="file"
                className={styles.file}
                name="avatar"
                accept="image/png, image/jpeg"
                onChange={(event) => setProfilePic(event.target.files[0])}
              />
              <span className={styles.uploadBtnText}>
                {" "}
                <img src={imgIcon} alt="image_icon" /> Upload
              </span>
            </div>
          </label>
          <label>
            Whatsapp
            <div className={styles.input_cntr}>
              <img src={whatsAppIcon} alt="whatsapp_icon" />
              <span>|</span>
              <input
                type="text"
                placeholder="@whatsapp_number"
                value={socials?.whatsapp}
                onChange={(event) =>
                  setSocials({
                    web: socials?.web,
                    fb: socials?.fb,
                    whatsapp: event.target.value,
                  })
                }
              />
            </div>
          </label>
          <label>
            Facebook
            <div className={styles.input_cntr}>
              <img src={fbIcon} alt="facebook_icon" />
              <span>|</span>
              <input
                type="text"
                value={socials?.fb}
                placeholder="https://fb.com/@username"
                onChange={(event) =>
                  setSocials({
                    web: socials?.web,
                    fb: event.target.value,
                    whatsapp: socials?.whatsapp,
                  })
                }
              />
            </div>
          </label>
        </div>
        <button className={styles.submit_btn} type="submit">
          {" "}
          {card?.uid ? "Submit" : "Create"}
        </button>
      </form>
      {loading && <Loader />}
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
