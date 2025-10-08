import { useNavigate } from 'react-router-dom';
import { createOffer } from '../services/createOffer';

export default function CreateOffer() {
    const navigate = useNavigate();

    const createHandler = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const { occasion,
            description,
            priceLv,
            priceEuro,
            img1, } = Object.fromEntries(formData);

        let result = await createOffer(occasion,
            description,
            priceLv,
            priceEuro,
            img1);

        if (result.status === 200) {
            alert(result.message);
            navigate('/room');
        } else {
            alert(result.message);
        }
    }
    return (
        <div id="login">
            <div className="container">
                <div className="section-header">
                    <h2>Създаване на оферта</h2>
                    <p>
                        От тук може да създавате нова специална оферта.
                    </p>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <div className="login-form">
                            <form onSubmit={createHandler}>
                                <div className="form-row">
                                    <div className="control-group col-sm-6">
                                        <label>Повод</label>
                                        <input type="text" className="form-control" name="occasion" required="required" />
                                    </div>
                                    <div className="control-group col-sm-6">
                                        <label>Описание</label>
                                        <input type="text" className="form-control" name="description" required="required" />
                                    </div>
                                    <div className="control-group col-sm-6">
                                        <label>Цена в лв.</label>
                                        <input type="text" className="form-control" name="priceLv" required="required" />
                                    </div>
                                    <div className="control-group col-sm-6">
                                        <label>Цена в евро</label>
                                        <input type="text" className="form-control" name="priceEuro" required="required" />
                                    </div>
                                    <div className="control-group col-sm-6">
                                        <label>Снимка</label>
                                        <input type="text" className="form-control" name="img1" required="required" />
                                    </div>
                                </div>
                                <div className="button"><button type="submit">Създай</button></div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}