import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import {
  query,
  getDocs,
  collection,
  where,
  doc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";

import { createContext, useCallback, useEffect, useState } from "react";
import { auth, db, storage } from "../firebase-config";
import { useNavigate } from "react-router-dom";

//TOASTIFY @imports
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const AuthContext = createContext({});
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [card, setCard] = useState({});
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  //firebase helper methdods
  async function getUser() {
    try {
      await onAuthStateChanged(auth, (currentUser) => {
        console.log("loggedIn user:", currentUser);
        setUser(currentUser);
      });
    } catch (err) {
      console.log(err.message);
    }
  }
  const SavedCards = async (user) => {
    console.log("saved card db initiated!");
    try {
      //add info to db logic
      await setDoc(doc(db, "savedcards", user?.uid), {
        user: user?.uid,
        cards: [],
      });
    } catch (err) {
      console.log("saved card err:", err);
      toast.error("Invalid Response!", {
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

  async function registerUser(username, email, pwd, profilePic) {
    setLoading(true);
    try {
      //upload img to firestorage logic
      const imageRef = ref(storage, `images/${profilePic.name}`);
      const snapshot = await uploadBytes(imageRef, profilePic);
      const downloadUrl = await getDownloadURL(imageRef);
      console.log("File uploaded> Snapshot:", snapshot);

      await createUserWithEmailAndPassword(auth, email, pwd);
      //Setting user's display name
      await updateProfile(auth.currentUser, {
        displayName: username,
        photoURL: downloadUrl,
      });
      await SavedCards(auth.currentUser);
      setLoading(false);
      navigate("/login");
    } catch (err) {
      console.error(err.message);
      toast.error("User Invalid / Already Registered!", {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setLoading(false);
    }
  }

  const fetchCard = useCallback(
    async (profile_id = user?.uid) => {
      console.log("profile id:", profile_id);
      try {
        const q = await query(
          collection(db, "users"),
          where("uid", "==", profile_id)
        );
        const querySnapshot = await getDocs(q);
        await querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log("Card fetched 🔥 =>", doc.data());
          setCard(doc.data());
        });
      } catch (error) {
        console.log("Card fetch miss>", error.message);
      }
    },
    [user]
  );

  const SaveProfile = async (profileId) => {
    let tmp = [];
    console.log(profileId);
    try {
      const q = await query(
        collection(db, "savedcards"),
        where("user", "==", user?.uid)
      );

      const querySnapshot = await getDocs(q);
      await querySnapshot.forEach((doc) => {
        console.log("saved cards:", doc.data().cards);
        tmp = doc.data().cards;
        if (!tmp.includes(profileId)) {
          tmp.push(profileId);
          toast.success(`Profile Added Successfully!`, {
            position: "top-center",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        } else {
          toast.error(`User already added!`, {
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
      });
      await setDoc(doc(db, "savedcards", user?.uid), {
        user: user?.uid,
        cards: tmp,
      });
      navigate("/saved-cards");
      window.location.reload();
    } catch (error) {
      toast.error(`User doesn't exist! / Aleready added!`, {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      console.log("err:", error);
    }
  };

  const DeleteSavedProfile = async (profileId) => {
    let tmp = [];
    try {
      const q = await query(
        collection(db, "savedcards"),
        where("user", "==", user?.uid)
      );

      const querySnapshot = await getDocs(q);
      await querySnapshot.forEach((doc) => {
        console.log("saved cards:", doc.data().cards);
        tmp = doc.data().cards.filter((card) => card !== profileId);
      });
      await setDoc(doc(db, "savedcards", user?.uid), {
        user: user?.uid,
        cards: tmp,
      });
      setProfiles(tmp);
      navigate("/profile");
      toast.error(`User: ${profileId} deleted !`, {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } catch (error) {
      console.log("err:", error);
    }
  };
  const fetchSavedProfiles = useCallback(async () => {
    let tmp = [];
    try {
      const q = await query(
        collection(db, "savedcards"),
        where("user", "==", user?.uid)
      );
      const querySnapshot = await getDocs(q);
      await querySnapshot.forEach((doc) => {
        doc.data().cards.map((card) => {
          const q = query(collection(db, "users"), where("uid", "==", card));
          getDocs(q).then((res) => {
            res.docs.map((doc) => {
              tmp.push(doc.data());
            });
            setProfiles(tmp);
          });
        });
      });
    } catch (error) {
      console.log("Card fetch miss>", error.message);
    }
  }, [user, profiles]);

  //resource: https://firebase.google.com/docs/firestore/manage-data/add-data#set_a_document
  const Create_or_Update_Card = async (user, data) => {
    setLoading(true);
    try {
      if (data.file) {
        console.log("profile pic available!", data.file);
        //upload img to firestorage logic
        const imageRef = ref(storage, `images/${data.file.name}`);
        const snapshot = await uploadBytes(imageRef, data.file);
        const downloadUrl = await getDownloadURL(imageRef);
        console.log("File uploaded> Snapshot:", snapshot);

        //add info to db logic
        await setDoc(doc(db, "users", user.uid), {
          uid: user.uid,
          fullname: data.fullName,
          profession: data.profession,
          email: data.email,
          contact: data.contact,
          location: data.location,
          socials: { whatsapp: data.whatsapp, fb: data.fb, web: data.web },
          profilePic: downloadUrl,
        });
      } else {
        console.log("profile pic not-available!", data.file);
        //add info to db logic
        await updateDoc(doc(db, "users", user.uid), {
          uid: user.uid,
          fullname: data.fullName,
          profession: data.profession,
          email: data.email,
          contact: data.contact,
          location: data.location,
          socials: { whatsapp: data.whatsapp, fb: data.fb, web: data.web },
        });
      }

      console.log("Card Created 🔥");
      navigate(`/card`);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
      toast.error("Invalid Response!", {
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

  useEffect(() => {
    getUser();
    fetchSavedProfiles();
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        registerUser,
        Create_or_Update_Card,
        fetchCard,
        fetchSavedProfiles,
        card,
        setCard,
        navigate,
        loading,
        setLoading,
        profiles,
        DeleteSavedProfile,
        SaveProfile,
        setShowAlert,
        showAlert,
      }}
    >
      {children}
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
    </AuthContext.Provider>
  );
};

export default AuthProvider;
