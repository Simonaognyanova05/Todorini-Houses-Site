import { useNavigate, useParams } from "react-router-dom";
import { update } from "../services/update";
import { useEffect, useState } from "react";
import { getRoomById } from "../services/getRoomById";

export default function Edit() {
    const navigate = useNavigate();
    const { roomId } = useParams();
    const [room, setRoom] = useState({});

    useEffect(() => {
        getRoomById(roomId).then(res => {
            setRoom(res);
        });
    }, [roomId]);

    const handleChange = (e) => {
        setRoom({
            ...room,
            [e.target.name]: e.target.value,
        });
    };

    const editHandler = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData);

        const result = await update(roomId, data);

        if (result.status === 200) {
            alert(result.message);
            navigate('/room');
        } else {
            alert(result.message);
        }
    };

    return (
        <div id="login">
            <div className="container">
                <div className="section-header">
                    <h2>Редактиране на стая</h2>
                    <p>От тук може да редактирате стая.</p>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <div className="login-form">
                            <form onSubmit={editHandler}>
                                <div className="form-row">
                                    {['type', 'description', 'size', 'beds', 'priceLv', 'priceEuro', 'img1', 'img2', 'img3', 'img4', 'img5', 'img6'].map(field => (
                                        <div className="control-group col-sm-6" key={field}>
                                            <label>{field === 'type' ? 'Тип' :
                                                field === 'description' ? 'Описание' :
                                                    field === 'size' ? 'Размер на стаята' :
                                                        field === 'beds' ? 'Брой легла' :
                                                            field === 'priceLv' ? 'Цена в лв.' :
                                                                field === 'priceEuro' ? 'Цена в евро' :
                                                                    'Снимка ' + field.slice(-1)}</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name={field}
                                                value={room[field] || ''}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    ))}
                                </div>
                                <div className="button">
                                    <button type="submit">Редактиране</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}