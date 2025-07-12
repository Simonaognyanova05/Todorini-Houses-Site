import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';;

const firebaseConfig = {
    apiKey: "AIzaSyB2xGXsUyVNr3SJTz_nvAWCXQXwB4yUa18",
    authDomain: "todotini-ho.firebaseapp.com",
    projectId: "todotini-ho",
    storageBucket: "todotini-ho.firebasestorage.app",
    messagingSenderId: "113681991341",
    appId: "1:113681991341:web:b9390cf737cdd1457b6824",
    measurementId: "G-P1ZW13DJEJ"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);