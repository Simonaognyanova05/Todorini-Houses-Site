import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check';

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

if (process.env.NODE_ENV === 'production' && process.env.REACT_APP_RECAPTCHA_SITE_KEY) {
    initializeAppCheck(app, {
        provider: new ReCaptchaV3Provider(process.env.REACT_APP_RECAPTCHA_SITE_KEY),
        isTokenAutoRefreshEnabled: true,
    });
}
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
