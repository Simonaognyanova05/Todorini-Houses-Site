import { db } from '../config/firebase';
import { collection, addDoc } from 'firebase/firestore';

export async function book(fname, lname, mobile, email, date1, date2, guests, requirements) {
    try {
        const docRef = await addDoc(collection(db, "bookings"), {
            fname, lname, mobile, email, date1, date2, guests, requirements,
            createdAt: new Date()
        });

        return { status: 200, message: "Стаята е създадена успешно!" };
    } catch (error) {
        console.error("Грешка при създаване на продукта: ", error.message);

        if (error.message.includes("invalid") || error.message.includes("missing")) {
            return { status: 400, message: error.message };
        }

        return { status: 500, message: "Възникна вътрешна грешка!" };
    }
}