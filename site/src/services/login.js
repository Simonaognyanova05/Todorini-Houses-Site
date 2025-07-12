import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";

export async function login(email, password) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return { status: 200, user: userCredential.user }; // Връщаме само потребителя
    } catch (error) {
        console.error("Firebase Auth Error Code:", error.code);
        console.error("Firebase Auth Error Message:", error.message);

        if (error.code === "auth/user-not-found") {
            alert("Потребителят не съществува!");
        } else if (error.code === "auth/wrong-password") {
            alert("Грешна парола!");

        } else {
            alert("Възникна грешка при влизане!");
        }
        return { status: 400, user: '' };
    }
}