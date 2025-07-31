import { useNavigate, useParams } from "react-router-dom";
import { update } from "../services/update";
import { useEffect, useState } from "react";
import { getRoomById } from "../services/getRoomById";

export default function Edit() {
    const navigate = useNavigate();
    const { roomId } = useParams();
    const [room, setRoom] = useState('');

    useEffect(() => {
        getRoomById(roomId)
            .then(res => {
                setRoom(res);
            })
    }, [roomId])
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
                    <p>
                        От тук може да редактирате стая.
                    </p>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <div className="login-form">
                            <form onSubmit={editHandler}>
                                <div className="form-row">
                                    <div className="control-group col-sm-6">
                                        <label>Тип</label>
                                        <input type="text" className="form-control" name="type" value={room.type} required="required" />
                                    </div>
                                    <div className="control-group col-sm-6">
                                        <label>Описание</label>
                                        <input type="text" className="form-control" name="description" value={room.description} required="required" />
                                    </div>
                                    <div className="control-group col-sm-6">
                                        <label>Размер на стаята</label>
                                        <input type="text" className="form-control" name="size" value={room.size} required="required" />
                                    </div>
                                    <div className="control-group col-sm-6">
                                        <label>Брой легла</label>
                                        <input type="text" className="form-control" name="beds" value={room.beds} required="required" />
                                    </div>
                                    <div className="control-group col-sm-6">
                                        <label>Цена в лв.</label>
                                        <input type="text" className="form-control" name="priceLv" value={room.priceLv} required="required" />
                                    </div>
                                    <div className="control-group col-sm-6">
                                        <label>Цена в евро</label>
                                        <input type="text" className="form-control" name="priceEuro" value={room.priceEuro} required="required" />
                                    </div>
                                    <div className="control-group col-sm-6">
                                        <label>Снимка 1</label>
                                        <input type="text" className="form-control" name="img1" value={room.img1} required="required" />
                                    </div>
                                    <div className="control-group col-sm-6">
                                        <label>Снимка 2</label>
                                        <input type="text" className="form-control" name="img2" value={room.img2} required="required" />
                                    </div>
                                    <div className="control-group col-sm-6">
                                        <label>Снимка 3</label>
                                        <input type="text" className="form-control" name="img3" value={room.img3} required="required" />
                                    </div>
                                    <div className="control-group col-sm-6">
                                        <label>Снимка 4</label>
                                        <input type="text" className="form-control" name="img4" value={room.img4} required="required" />
                                    </div>
                                    <div className="control-group col-sm-6">
                                        <label>Снимка 5</label>
                                        <input type="text" className="form-control" name="img5" value={room.img5} required="required" />
                                    </div>
                                    <div className="control-group col-sm-6">
                                        <label>Снимка 6</label>
                                        <input type="text" className="form-control" name="img6" value={room.img6} required="required" />
                                    </div>
                                </div>
                                <div className="button"><button type="submit">Редактиране</button></div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}