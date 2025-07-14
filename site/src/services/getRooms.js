import { db } from '../config/firebase';
import {
    collection,
    query,
    getDocs,
    where,
} from 'firebase/firestore';
import { Timestamp } from 'firebase/firestore';

// Основна функция
export async function getRooms(checkIn = null, checkOut = null) {
    try {
        const roomsSnapshot = await getDocs(query(collection(db, "rooms")));
        const allRooms = [];
        roomsSnapshot.forEach((doc) => {
            allRooms.push({ id: doc.id, ...doc.data() });
        });

        // Ако няма зададени дати, връщаме всички стаи
        if (!checkIn || !checkOut) return allRooms;

        // Преобразуване на датите в Firestore Timestamp
        const checkInDate = Timestamp.fromDate(new Date(checkIn));
        const checkOutDate = Timestamp.fromDate(new Date(checkOut));

        // Взимаме всички резервации
        const bookingsSnapshot = await getDocs(query(collection(db, "bookings")));
        const bookings = [];
        bookingsSnapshot.forEach(doc => bookings.push(doc.data()));

        // Проверка за заетост на стаите
        const availableRooms = allRooms.filter(room => {
            const totalCount = parseInt(room.totalCount || "1");

            // Филтрираме резервациите за тази стая
            const bookingsForRoom = bookings.filter(b =>
                b.roomType === room.type &&
                (
                    (b.checkIn.toDate() < checkOutDate.toDate()) &&
                    (b.checkOut.toDate() > checkInDate.toDate())
                )
            );

            return bookingsForRoom.length < totalCount;
        });

        return availableRooms;

    } catch (error) {
        console.error("Грешка при извличане на стаи: ", error);
        return [];
    }
}
