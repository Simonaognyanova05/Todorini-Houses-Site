import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../config/firebase";

export async function resetPassword(email) {
    await sendPasswordResetEmail(auth, email);
}