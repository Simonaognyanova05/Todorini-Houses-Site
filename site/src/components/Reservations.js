import { useEffect, useState } from "react";
import { getReservations } from "../services/getReservations";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import emailjs from "emailjs-com";

emailjs.init("UGtKXqGnR4WTiD8xP"); 

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
        const confirm = window.confirm("Сигурни ли сте, че резервацията е изпълнена?");
        if (!confirm) return;

        try {
            await deleteDoc(doc(db, "bookings", id));
            fetchData();
        } catch (err) {
            console.error("Грешка при изтриване:", err);
        }
    };

    const formatDate = (timestamp) => {
        try {
            if (!timestamp) return "Невалидна дата";

            let dateObj;

            if (typeof timestamp === "string") {
                dateObj = new Date(timestamp);
            } else if (timestamp.toDate) {
                dateObj = timestamp.toDate();
            } else if (timestamp instanceof Date) {
                dateObj = timestamp;
            } else {
                return "Невалидна дата";
            }

            return dateObj.toLocaleDateString("bg-BG");
        } catch (err) {
            console.error("Грешка при форматиране на дата:", err);
            return "Невалидна дата";
        }
    };

    const sendConfirmationEmail = (res) => {
        if (!res.email) {
            alert("Няма въведен имейл за тази резервация.");
            return;
        }

        const templateParams = {
            to_email: res.email,
            to_name: `${res.fname} ${res.lname}`,
            message: `Здравейте, ${res.fname} ${res.lname},\n\nВашата резервация от ${formatDate(res.date1)} до ${formatDate(res.date2)} е потвърдена.\n\nБлагодарим Ви, че избрахте нас!`
        };

        console.log("Изпращане на имейл до:", templateParams.to_email);
        emailjs.send(
            "service_m0ezr1g",         
            "template_2x2mrfc",      
            templateParams
        ).then(
            () => alert("Имейлът е изпратен успешно!"),
            (error) => {
                console.error("Грешка при изпращане на имейл:", error);
                alert("Възникна грешка при изпращане на имейла.");
            }
        );
    };

    const sendRejectionEmail = (res) => {
        if (!res.email) {
            alert("Няма въведен имейл за тази резервация.");
            return;
        }

        const templateParams = {
            to_email: res.email,
            to_name: `${res.fname} ${res.lname}`,
            message: `Здравейте, ${res.fname} ${res.lname},\n\n Съжаляваме, но за избраните дати - от ${formatDate(res.date1)} до ${formatDate(res.date2)} нямаме свободни места.\n\nБлагодарим Ви за разбирането, ще Ви очакваме отново!`
        };

        console.log("Изпращане на имейл до:", templateParams.to_email);
        emailjs.send(
            "service_m0ezr1g",         
            "template_2x2mrfc",      
            templateParams
        ).then(
            () => alert("Имейлът е изпратен успешно!"),
            (error) => {
                console.error("Грешка при изпращане на имейл:", error);
                alert("Възникна грешка при изпращане на имейла.");
            }
        );
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
                                        <p className="card-text mb-2"><strong>Имейл:</strong> {res.email || "—"}</p>
                                        <p className="card-text mb-2"><strong>Телефон:</strong> {res.mobile}</p>
                                        <p className="card-text mb-2"><strong>Брой хора в стая:</strong> {res.guests}</p>
                                        <p className="card-text mb-2"><strong>Дата на настаняване:</strong> {formatDate(res.date1)}</p>
                                        <p className="card-text mb-2"><strong>Дата на напускане:</strong> {formatDate(res.date2)}</p>
                                        {res.requirements && (
                                            <p className="card-text"><strong>Съобщение:</strong> {res.requirements}</p>
                                        )}
                                    </div>

                                    <div className="d-flex flex-column gap-2 mt-3">
                                        <button
                                            className="btn btn-sm btn-outline-primary"
                                            onClick={() => sendConfirmationEmail(res)}
                                        >
                                            Изпрати имейл за потвърждение
                                        </button>
                                        <button
                                            className="btn btn-sm btn-outline-danger"
                                            onClick={() => sendRejectionEmail(res)}
                                        >
                                            Изпрати имейл за отказ
                                        </button>
                                        <button
                                            className="btn btn-sm btn-outline-success"
                                            onClick={() => handleDelete(res.id)}
                                        >
                                            Маркирай като изпълнена
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
