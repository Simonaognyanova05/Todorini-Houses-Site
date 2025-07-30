import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../config/firebase";

export async function resetPassword(email) {
    try {
        await sendPasswordResetEmail(auth, email);
        alert("Имейл с инструкции за нулиране на паролата беше изпратен.");
    } catch (error) {
        if (error.code === 'auth/user-not-found') {
            alert("Не съществува потребител с този имейл.");
        } else if (error.code === 'auth/invalid-email') {
            alert("Невалиден имейл адрес.");
        } else {
            alert("Грешка при изпращане на имейл: " + error.message);
        }
    }
}