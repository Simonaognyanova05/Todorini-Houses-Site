import { db } from '../config/firebase';
import { doc, updateDoc } from 'firebase/firestore';

export async function update(id, updatedData) {
    try {
        const productRef = doc(db, "rooms", id);
        await updateDoc(productRef, {
            ...updatedData,
            updatedAt: new Date()
        });

        console.log("Продуктът е актуализиран успешно.");
        return { status: 200, message: "Успешна редакция!" };
    } catch (error) {
        console.error("Грешка при редактиране на продукта: ", error.message);
        return { status: 500, message: "Грешка при редакция!" };
    }
}