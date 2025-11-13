// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyADQHuikPZWkeo0-AARR_KEng-w2TwpwAY",
    authDomain: "future-box-134ef.firebaseapp.com",
    projectId: "future-box-134ef",
    storageBucket: "future-box-134ef.firebasestorage.app",
    messagingSenderId: "1017323081191",
    appId: "1:1017323081191:web:72b2edd21c6f2e515b4142"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export default app;
