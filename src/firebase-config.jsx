// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB_86Yy8jWHkcPuuWo8uQVezS_alvVggCc",
  authDomain: "smart-nfc-business-cards.firebaseapp.com",
  projectId: "smart-nfc-business-cards",
  storageBucket: "smart-nfc-business-cards.appspot.com",
  messagingSenderId: "947047831032",
  appId: "1:947047831032:web:22fc345fe91e118e3b720d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
export { auth, db, storage };
