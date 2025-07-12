import { useNavigate } from 'react-router-dom';
import { create } from '../services/create';

export default function CreateRoom() {
    const navigate = useNavigate();

    const createHandler = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const { type, description, size, beds, priceLv, priceEuro, img1, img2, img3, img4, img5, img6 } = Object.fromEntries(formData);

        let result = await create(type, description, size, beds, priceLv, priceEuro, img1, img2, img3, img4, img5, img6);

        if (result.status === 200) {
            alert(result.message);
            navigate('/room');
        } else {
            alert(result.message);
        }
    }
    return (
        <div id="login">
            <div class="container">
                <div class="section-header">
                    <h2>Създаване на стая</h2>
                    <p>
                        От тук може да създавате нов тип стая.
                    </p>
                </div>
                <div class="row">
                    <div class="col-md-6">
                        <div class="login-form">
                            <form onSubmit={createHandler}>
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
                                <div class="button"><button type="submit">Създай</button></div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}