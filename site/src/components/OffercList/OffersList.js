import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";
import "./OffersList.css";

export default function OffersList() {
    const [offers, setOffers] = useState([]);
    const [loading, setLoading] = useState(true);

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

    if (loading) {
        return <p className="text-center mt-10">Зареждане...</p>;
    }

    if (offers.length === 0) {
        return <p className="text-center mt-10">Няма налични оферти.</p>;
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

                            {/* Новите бутони */}
                            <div className="offer-actions">
                                <button className="btn edit-btn">Редактиране</button>
                                <button className="btn delete-btn">Изтриване</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
