import { useContext, useState, useEffect } from "react";
import styles from "./SignUp.module.scss";
import close from "../../assets/close.svg";
import mail from "../../assets/mail.svg";
import password from "../../assets/password.svg";
import checkOn from "../../assets/checkOn.svg";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../Helper/Context";
import { imgIcon, userIcon } from "../../assets/getAssests";

//TOASTIFY @imports
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../Components/Loader/Loader";

export default function SignUp() {
  const navigate = useNavigate(); //to navigate b/w pages

  //form states
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const [pwd, setPwd] = useState("");

  //handlers functions
  const handleEmailInput = (event) => setEmail(event.target.value);
  const handleUsernameInput = (event) => setUsername(event.target.value);
  const handlePwdInput = (event) => setPwd(event.target.value);

  const { registerUser, loading } = useContext(AuthContext);

  //register user func
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (email !== "" && pwd !== "" && profilePic !== null) {
      await registerUser(username, email, pwd, profilePic);
      console.log("profile pic:", profilePic);
    } else {
      toast.info("Pls upload your profile picture!", {
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
  };
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (localStorage.getItem("user") === user?.uid || user?.uid) {
      navigate("/profile");
    }

    if (profilePic !== null) {
      toast.success(`${profilePic.name} is selected as profile pic!`, {
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
  }, [user, profilePic]);

  return (
    <div className={styles.signup_page}>
      <div className={styles.container}>
        <div className={styles.head}>
          <div className={styles.nav}>
            <img src={close} alt="close btn" onClick={() => navigate(-1)} />
          </div>
          <h1>Let’s Get Started!</h1>
          <p>Fill the form to signup.</p>
        </div>

        <div className={styles.form_container}>
          <form onSubmit={handleSubmit}>
            <label>
              Email
              <div className={styles.input_cntr}>
                <img src={mail} alt="icon" />
                <input
                  type="email"
                  value={email}
                  onChange={handleEmailInput}
                  placeholder="richardhendricks@pp.com"
                  required
                />
              </div>
            </label>
            <label>
              Name
              <div className={styles.input_cntr}>
                <img src={userIcon} alt="icon" />
                <input
                  type="text"
                  value={username}
                  onChange={handleUsernameInput}
                  placeholder="Richard Hendricks"
                  required
                />
              </div>
            </label>

            <label>
              <div className={styles.file_input}>
                <span>Upload your profile picture</span>
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
              Password
              <div className={styles.input_cntr}>
                <img src={password} alt="icon" />
                <input
                  type="password"
                  value={pwd}
                  onChange={handlePwdInput}
                  placeholder="*  *  *  *  *  *  *  *"
                  required
                />
              </div>
              <p className={styles.pwdRule}>
                At least 8 characters, 1 uppercase letter, 1 number & 1 symbol
              </p>
            </label>

            <div className={styles.signup_policy}>
              <img src={checkOn} alt="icon" />
              <span>
                By Signing up, you agree to the Terms of Service and Privacy
                Policy .
              </span>
            </div>

            <button className={styles.submit_btn} type="submit">
              {" "}
              Sign Up
            </button>
          </form>
        </div>
      </div>
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
    </div>
  );
}
