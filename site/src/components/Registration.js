import { useNavigate } from 'react-router-dom';
import { register } from '../services/register';

export default function Registration() {
    const navigate = useNavigate();

    const registerHandler = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const { email, password, rePass } = Object.fromEntries(formData);

        if (password != rePass) {
            alert("Паролите не съвпадат!");
            navigate('/registration');
        }

        let result = await register(email, password);
        if (result.status === 200) {
            alert("Успешна регистрация!")
            navigate('/');
        } else {
            alert("Възникна грешка. Моля, опитайте по-бързо!");
        }
    }
    return (
        <>
            <div id="login">
                <div class="container">
                    <div class="section-header">
                        <h2>Регистрация</h2>
                        <p>
                            Тук можете да създадете потребител със същите права като Вашите.
                        </p>
                    </div>
                    <div class="row">
                        <div class="col-md-6">
                            <div class="login-form">
                                <form onSubmit={registerHandler}>
                                    <div class="form-row">
                                        <div class="control-group col-sm-6">
                                            <label>Име и фамилия</label>
                                            <input type="text" class="form-control" name="names" required="required" />
                                        </div>
                                        <div class="control-group col-sm-6">
                                            <label>Имейл</label>
                                            <input type="email" class="form-control" name="email" required="required" />
                                        </div>
                                    </div>
                                    <div class="form-row">
                                        <div class="control-group col-sm-6">
                                            <label>Парола</label>
                                            <input type="password" class="form-control" name="password" required="required" />
                                        </div>
                                        <div class="control-group col-sm-6">
                                            <label>Потвърдете паролата</label>
                                            <input type="password" class="form-control" name="rePass" required="required" />
                                        </div>
                                    </div>
                                    <div class="button"><button type="submit">Регистрация</button></div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}