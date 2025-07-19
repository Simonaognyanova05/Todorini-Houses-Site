import { useNavigate, useParams } from "react-router-dom";
import { update } from "../services/update";

export default function Edit() {
    const navigate = useNavigate();
    const { roomId } = useParams();

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
            <div class="container">
                <div class="section-header">
                    <h2>Редактиране на стая</h2>
                    <p>
                        От тук може да редактирате стая.
                    </p>
                </div>
                <div class="row">
                    <div class="col-md-6">
                        <div class="login-form">
                            <form onSubmit={editHandler}>
                                <div class="form-row">
                                    <div class="control-group col-sm-6">
                                        <label>Тип</label>
                                        <input type="text" class="form-control" name="type" required="required" />
                                    </div>
                                    <div class="control-group col-sm-6">
                                        <label>Описание</label>
                                        <input type="text" class="form-control" name="description" required="required" />
                                    </div>
                                    <div class="control-group col-sm-6">
                                        <label>Размер на стаята</label>
                                        <input type="text" class="form-control" name="size" required="required" />
                                    </div>
                                    <div class="control-group col-sm-6">
                                        <label>Брой легла</label>
                                        <input type="text" class="form-control" name="beds" required="required" />
                                    </div>
                                    <div class="control-group col-sm-6">
                                        <label>Цена в лв.</label>
                                        <input type="text" class="form-control" name="priceLv" required="required" />
                                    </div>
                                    <div class="control-group col-sm-6">
                                        <label>Цена в евро</label>
                                        <input type="text" class="form-control" name="priceEuro" required="required" />
                                    </div>
                                    <div class="control-group col-sm-6">
                                        <label>Снимка 1</label>
                                        <input type="text" class="form-control" name="img1" required="required" />
                                    </div>
                                    <div class="control-group col-sm-6">
                                        <label>Снимка 2</label>
                                        <input type="text" class="form-control" name="img2" required="required" />
                                    </div>
                                    <div class="control-group col-sm-6">
                                        <label>Снимка 3</label>
                                        <input type="text" class="form-control" name="img3" required="required" />
                                    </div>
                                    <div class="control-group col-sm-6">
                                        <label>Снимка 4</label>
                                        <input type="text" class="form-control" name="img4" required="required" />
                                    </div>
                                    <div class="control-group col-sm-6">
                                        <label>Снимка 5</label>
                                        <input type="text" class="form-control" name="img5" required="required" />
                                    </div>
                                    <div class="control-group col-sm-6">
                                        <label>Снимка 6</label>
                                        <input type="text" class="form-control" name="img6" required="required" />
                                    </div>
                                </div>
                                <div class="button"><button type="submit">Редактиране</button></div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}