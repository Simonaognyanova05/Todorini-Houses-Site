import { db } from '../config/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { prepareBooking } from './bookingValidation';

export async function book(fname, lname, mobile, email, date1, date2, guests, type, requirements) {
    let data;
    try {
        data = prepareBooking({ fname, lname, mobile, email, date1, date2, guests, type, requirements });
    } catch (error) {
        return { status: 400, message: error.message };
    }
    try {
        await addDoc(collection(db, 'bookings'), { ...data, createdAt: serverTimestamp() });
        return { status: 200 };
    } catch (error) {
        console.error('Booking failed:', error.code);
        return { status: 500, message: 'Резервацията не беше изпратена. Опитайте отново или се свържете с нас по телефона.' };
    }
}