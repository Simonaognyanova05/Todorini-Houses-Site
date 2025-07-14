import { Form, useNavigate } from 'react-router-dom';
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
            <div class="container">
                <div class="section-header">
                    <h2>Влизане</h2>
                    <p>
                        От тук може да влезете във вашия профил като администратор.
                    </p>
                </div>
                <div class="row">
                    <div class="col-md-6">
                        <div class="login-form">
                            <form onSubmit={loginHandler}>
                                <div class="form-row">
                                    <div class="control-group col-sm-6">
                                        <label>Имейл</label>
                                        <input type="email" class="form-control" name="email" required="required" />
                                    </div>
                                    <div class="control-group col-sm-6">
                                        <label>Парола</label>
                                        <input type="password" class="form-control" name="password" required="required" />
                                    </div>
                                </div>
                                <div class="button"><button type="submit">Влизане</button></div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}