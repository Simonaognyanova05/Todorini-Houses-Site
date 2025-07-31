import { Form, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { login } from '../services/login';

export default function Login() {
    const navigate = useNavigate();
    const { onLogin } = useAuth();

    const loginHandler = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const { email, password } = Object.fromEntries(formData);

        try {
            const user = await login(email, password);
            onLogin(user);
            navigate('/');
        } catch (err) {
            alert('Error'); // Показваме реалната грешка
        }
    };
    return (
        <div id="login">
            <div className="container">
                <div className="section-header">
                    <h2>Влизане</h2>
                    <p>
                        От тук може да влезете във вашия профил като администратор. Въведете Вашия имейл и ние ще Ви изпратим инструкции как да промените паролата си.
                    </p>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <div className="login-form">
                            <form onSubmit={loginHandler}>
                                <div className="form-row">
                                    <div className="control-group col-sm-6">
                                        <label>Имейл</label>
                                        <input type="email" className="form-control" name="email" required="required" />
                                    </div>
                                    <div className="control-group col-sm-6">
                                        <label>Парола</label>
                                        <input type="password" className="form-control" name="password" required="required" />
                                    </div>


                                </div>
                                <div>
                                    <Link to='/forgotten'>Забравена парола</Link>
                                </div>
                                <br />
                                <div className="button"><button type="submit">Влизане</button></div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}