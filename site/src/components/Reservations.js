import { useEffect, useState } from "react";
import { getReservations } from "../services/getReservations";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../config/firebase";

export default function Reservations() {
    const [reservations, setReservations] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const res = await getReservations();
        setReservations(res);
    };

    const handleDelete = async (id) => {
        const confirm = window.confirm("Сигурни ли сте, че искате да изтриете резервацията?");
        if (!confirm) return;

        try {
            await deleteDoc(doc(db, "bookings", id));
            fetchData();
        } catch (err) {
            console.error("Грешка при изтриване:", err);
        }
    };

    const formatDate = (timestamp) => {
        if (!timestamp || !timestamp.toDate) return "Невалидна дата";
        return timestamp.toDate().toLocaleDateString();
    };

    return (
        <div className="container py-4">
            <h2 className="text-center mb-4">Направени резервации</h2>
            <div className="row">
                {reservations.length > 0 ? (
                    reservations.map((res) => (
                        <div className="col-12 col-md-6 col-lg-4 mb-4" key={res.id}>
                            <div className="card shadow-sm h-100">
                                <div className="card-body d-flex flex-column justify-content-between">
                                    <div>
                                        <h5 className="card-title">{res.fname} {res.lname}</h5>
                                        <p className="card-text mb-2"><strong>Брой хора в стая:</strong> {res.guests}</p>
                                        <p className="card-text mb-2"><strong>Дата на настаняване:</strong> {formatDate(res.checkIn)}</p>
                                        <p className="card-text mb-2"><strong>Дата на напускане:</strong> {formatDate(res.checkOut)}</p>
                                        <p className="card-text mb-2"><strong>Телефон:</strong> {res.mobile}</p>
                                        {res.requirements && (
                                            <p className="card-text"><strong>Съобщение:</strong> {res.requirements}</p>
                                        )}
                                    </div>
                                    <div className="d-flex justify-content-between mt-3">
                                        <button className="btn btn-sm btn-outline-primary" onClick={() => alert("Функционалност за редакция")}>
                                            🖊️ Редактирай
                                        </button>
                                        <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(res.id)}>
                                            ❌ Изтрий
                                        </button>
                                    </div>
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
