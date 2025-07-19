import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export default function RoomItem({ room }) {
    const navigate = useNavigate();
    const { user } = useAuth();

    const handleEdit = () => {
        navigate(`/room/${room.id}`);
    };

    const handleDelete = async () => {
        const confirmDelete = window.confirm("Сигурни ли сте, че искате да изтриете тази стая?");
        if (!confirmDelete) return;

        try {
            await deleteDoc(doc(db, "rooms", room.id));
            alert("Стаята беше успешно изтрита.");
            window.location.reload();
        } catch (error) {
            console.error("Грешка при изтриване:", error);
            alert("Възникна грешка при изтриването на стаята.");
        }
    };

    const loggedUser = (
        <div className="mt-3 d-flex gap-2">
            <button
                className="btn btn-sm btn-outline-primary"
                onClick={handleEdit}
            >
                Редактирай
            </button>
            <button
                className="btn btn-sm btn-outline-danger"
                onClick={handleDelete}
            >
                Изтрий
            </button>
        </div>
    );

    return (
        <div className="row">
            <div className="col-md-12">
                <div className="row">
                    <div className="col-md-3">
                        <div className="room-img">
                            <div className="box12">
                                <img src={room.img1} alt="Room" />
                                <div className="box-content">
                                    <h3 className="title">{room.type}</h3>
                                    <ul className="icon">
                                        <li>
                                            <a href="#" data-toggle="modal" data-target={`#modal-room-${room.id}`}>
                                                <i className="fa fa-link"></i>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="room-des">
                            <h3>
                                <a href="#" data-toggle="modal" data-target={`#modal-room-${room.id}`}>
                                    {room.type}
                                </a>
                            </h3>
                            <p>{room.description}</p>
                            <ul className="room-size">
                                <li><i className="fa fa-arrow-right"></i> Размер: {room.size} кв. м.</li>
                                <li><i className="fa fa-arrow-right"></i> Брой легла: {room.beds}</li>
                            </ul>
                            <ul className="room-icon">
                                <li className="icon-1"></li>
                                <li className="icon-2"></li>
                                <li className="icon-3"></li>
                                <li className="icon-4"></li>
                                <li className="icon-5"></li>
                                <li className="icon-6"></li>
                                <li className="icon-7"></li>
                                <li className="icon-8"></li>
                                <li className="icon-9"></li>
                                <li className="icon-10"></li>
                            </ul>

                            { Boolean(user.email) ? loggedUser : ''}
                        </div>
                    </div>

                    <div className="col-md-3">
                        <div className="room-rate">
                            <h3>Цени</h3>
                            <h1>{room.priceLv} лв.</h1>
                            <h1>{room.priceEuro}€</h1>
                        </div>
                    </div>
                </div>
                <hr />
            </div>
        </div>
    );
}
