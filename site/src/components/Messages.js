import { useEffect, useState } from "react";
import { getMessages } from "../services/getMessages";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../config/firebase";

export default function Messages() {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const res = await getMessages();
        setMessages(res);
    };

    const handleDelete = async (id) => {
        const confirm = window.confirm("Сигурни ли сте, че съобщението е прочетено?");
        if (!confirm) return;

        try {
            await deleteDoc(doc(db, "messages", id));
            fetchData();
        } catch (err) {
            console.error("Грешка при изтриване:", err);
        }
    };
    return (
        <div className="container py-4">
            <h2 className="text-center mb-4">Изпратени съобщения</h2>
            <div className="row">
                {messages.length > 0 ? (
                    messages.map((res) => (
                        <div className="col-12 col-md-6 col-lg-4 mb-4" key={res.id}>
                            <div className="card shadow-sm h-100">
                                <div className="card-body d-flex flex-column justify-content-between">
                                    <div>
                                        <h5 className="card-title">{res.name}</h5>
                                        <p className="card-text mb-2"><strong>Имейл:</strong> {res.email}</p>
                                        <p className="card-text mb-2"><strong>Тема:</strong> {res.subject}</p>
                                        <p className="card-text mb-2"><strong>Съобщение:</strong> {res.message}</p>
                                    </div>
                                    <div className="d-flex justify-content-between mt-3">
                                        <button className="btn btn-sm btn-outline-primary" onClick={() => handleDelete(res.id)}>
                                            🖊️ Маркирай като прочетено
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center w-100">Нямате нови съобщения.</p>
                )}
            </div>
        </div>
    );
}