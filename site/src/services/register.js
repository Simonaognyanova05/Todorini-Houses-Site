import { auth } from "../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

export async function register(email, password) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        return { status: 200, user: userCredential.user };
    } catch (error) {
        console.error("Error during registration:", error);
        return { status: 500, error: error.message };
    }
} 