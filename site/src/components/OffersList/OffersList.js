import { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useNavigate } from "react-router-dom";
import "./OffersList.css";
import { useAuth } from "../../contexts/AuthContext";

export default function OffersList() {
    const [offers, setOffers] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { user } = useAuth();

    useEffect(() => {
        const fetchOffers = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "offers"));
                const data = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setOffers(data);
            } catch (error) {
                console.error("Грешка при зареждане на офертите:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOffers();
    }, []);

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Сигурни ли сте, че искате да изтриете тази оферта?");
        if (!confirmDelete) return;

        try {
            await deleteDoc(doc(db, "offers", id));
            setOffers((prev) => prev.filter((offer) => offer.id !== id));
        } catch (error) {
            console.error("Грешка при изтриване:", error);
            alert("Възникна грешка при изтриване на офертата.");
        }
    };

    if (loading) {
        return <p className="text-center mt-10">Зареждане...</p>;
    }

    if (offers.length === 0) {
        return <p className="text-center mt-10" style={{fontSize: "30px", margin: "100px"}}>Все още няма налични оферти.</p>;
    }

    return (
        <div className="offers-container">
            <div className="section-header">
                <h2>Нашите специални оферти</h2>
                <p>Тук Ви представяме специалните оферти за всеки празник.</p>
            </div>

            <div className="offers-grid">
                {offers.map((offer) => (
                    <div key={offer.id} className="offer-card">
                        <img src={offer.img1} alt={offer.occasion} className="offer-img" />
                        <div className="offer-content">
                            <h3 className="offer-title">{offer.occasion}</h3>
                            <p className="offer-description">{offer.description}</p>
                            <div className="offer-prices">
                                <span className="price-lv">{offer.priceLv} лв.</span>
                                <span className="price-euro">€{offer.priceEuro}</span>
                            </div>

                            {user?.email && (
                                <div className="offer-actions">
                                    <button
                                        className="btn edit-btn"
                                        onClick={() => navigate(`/offers/edit/${offer.id}`)}
                                    >
                                        Редактиране
                                    </button>
                                    <button
                                        className="btn delete-btn"
                                        onClick={() => handleDelete(offer.id)}
                                    >
                                        Изтриване
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
