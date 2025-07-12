import { db } from '../config/firebase';
import { collection, addDoc } from 'firebase/firestore';

export async function create(type, description, size, beds, priceLv, priceEuro, img1, img2, img3, img4, img5, img6) {
    try {
        const docRef = await addDoc(collection(db, "rooms"), {
            type,
            description,
            size,
            beds,
            priceLv,
            priceEuro,
            img1,
            img2,
            img3,
            img4,
            img5,
            img6,
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