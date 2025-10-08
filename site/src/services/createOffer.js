import { db } from '../config/firebase';
import { collection, addDoc } from 'firebase/firestore';

export async function createOffer(occasion, description, priceLv, priceEuro, img1) {
    try {
        const docRef = await addDoc(collection(db, "offers"), {
            occasion,
            description,
            priceLv,
            priceEuro,
            img1,
            createdAt: new Date()
        });

        return { status: 200, message: "Офертата е създадена успешно!" };
    } catch (error) {
        console.error("Грешка при създаване на оферта: ", error.message);

        if (error.message.includes("invalid") || error.message.includes("missing")) {
            return { status: 400, message: error.message };
        }

        return { status: 500, message: "Възникна вътрешна грешка!" };
    }
}