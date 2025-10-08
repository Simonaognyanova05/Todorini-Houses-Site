import { db } from '../config/firebase';
import { doc, getDoc } from 'firebase/firestore';

export async function getOfferById(id) {
    try {
        const docRef = doc(db, 'offers', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() };
        } else {
            console.warn("Няма такава оферта с ID:", id);
            return null;
        }
    } catch (error) {
        console.error("Грешка при извличане на стая по ID:", error);
        return null;
    }
}
