import { db } from '../config/firebase';
import { doc, getDoc } from 'firebase/firestore';

export async function getRoomById(id) {
    try {
        const docRef = doc(db, 'rooms', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() };
        } else {
            console.warn("Няма такава стая с ID:", id);
            return null;
        }
    } catch (error) {
        console.error("Грешка при извличане на стая по ID:", error);
        return null;
    }
}
