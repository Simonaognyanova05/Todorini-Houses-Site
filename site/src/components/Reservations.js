import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";

export default function Reservations() {
    const [reservations, setReservations] = useState([]);

    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "bookings"));
                const data = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setReservations(data);
            } catch (error) {
                console.error("Грешка при извличане на резервации:", error);
            }
        };

        fetchReservations();
    }, []);

    return (
        <div className="container py-4">
            <h2 className="text-center mb-4">Направени резервации</h2>
            <div className="row">
                {reservations.length > 0 ? (
                    reservations.map((res) => (
                        <div className="col-12 col-md-6 col-lg-4 mb-4" key={res.id}>
                            <div className="card shadow-sm h-100">
                                <div className="card-body">
                                    <h5 className="card-title">
                                        {res.firstName} {res.lastName}
                                    </h5>
                                    <p className="card-text mb-2">
                                        <strong>Тип стая:</strong> {res.type}
                                    </p>
                                    <p className="card-text mb-2">
                                        <strong>Check-in:</strong>{" "}
                                        {new Date(res.checkIn).toLocaleDateString()}
                                    </p>
                                    <p className="card-text mb-2">
                                        <strong>Check-out:</strong>{" "}
                                        {new Date(res.checkOut).toLocaleDateString()}
                                    </p>
                                    <p className="card-text mb-2">
                                        <strong>Телефон:</strong> {res.mobile}
                                    </p>
                                    <p className="card-text mb-2">
                                        <strong>Цена:</strong> {res.priceLv} лв / {res.priceEuro} €
                                    </p>
                                    {res.message && (
                                        <p className="card-text">
                                            <strong>Съобщение:</strong> {res.message}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center w-100">Няма направени резервации.</p>
                )}
            </div>
        </div>
    );
}
