import { notify } from '../services/notifications';
import { useNavigate } from 'react-router-dom';
import { register } from '../services/register';

export default function Registration() {
    const navigate = useNavigate();

    const registerHandler = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const { email, password, rePass } = Object.fromEntries(formData);

        if (password !== rePass) {
            notify("Паролите не съвпадат!");
            return;
        }

        let result = await register(email, password);
        if (result.status === 200) {
            notify("Успешна регистрация!", 'success');
            navigate('/');
        } else {
            notify("Възникна грешка. Моля, опитайте по-бързо!");
        }
    }
    return (
        <>
            <div id="login">
                <div className="container">
                    <div className="section-header">
                        <h2>Регистрация</h2>
                        <p>
                            Тук можете да създадете потребител със същите права като Вашите.
                        </p>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="login-form">
                                <form onSubmit={registerHandler}>
                                    <div className="form-row">
                                        <div className="control-group col-sm-6">
                                            <label>Име и фамилия</label>
                                            <input type="text" className="form-control" name="names" required="required" />
                                        </div>
                                        <div className="control-group col-sm-6">
                                            <label>Имейл</label>
                                            <input type="email" className="form-control" name="email" required="required" />
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="control-group col-sm-6">
                                            <label>Парола</label>
                                            <input type="password" className="form-control" name="password" required="required" />
                                        </div>
                                        <div className="control-group col-sm-6">
                                            <label>Потвърдете паролата</label>
                                            <input type="password" className="form-control" name="rePass" required="required" />
                                        </div>
                                    </div>
                                    <div className="button"><button type="submit">Регистрация</button></div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}