import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCr0mVnk_54DboGjAM1pT4-OHW52QG9MIM",
    authDomain: "pashm-app-8ce0d.firebaseapp.com",
    projectId: "pashm-app-8ce0d",
    storageBucket: "pashm-app-8ce0d.firebasestorage.app",
    messagingSenderId: "244792859789",
    appId: "1:244792859789:web:a8810409c3f2dce84dd6c4",
    measurementId: "G-X3Q7RJZ77K"
};

// Initialize Firebase
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };
