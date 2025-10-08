import { useNavigate, useParams } from "react-router-dom";
import { updateOffer } from "../services/updateOffer";
import { useEffect, useState } from "react";
import { getOfferById } from "../services/getOfferById";

export default function EditOffer() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [room, setRoom] = useState({});

    useEffect(() => {
        getOfferById(id).then(res => {
            setRoom(res);
        });
    }, [id]);

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

        const result = await updateOffer(id, data);

        if (result.status === 200) {
            alert(result.message);
            navigate('/offersList');
        } else {
            alert(result.message);
        }
    };

    return (
        <div id="login">
            <div className="container">
                <div className="section-header">
                    <h2>Редактиране на оферта</h2>
                    <p>От тук може да редактирате оферта.</p>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <div className="login-form">
                            <form onSubmit={editHandler}>
                                <div className="form-row">
                                    {['occasion', 'description', 'priceLv', 'priceEuro', 'img1'].map(field => (
                                        <div className="control-group col-sm-6" key={field}>
                                            <label>{field === 'occasion' ? 'Повод' :
                                                field === 'description' ? 'Описание' :
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