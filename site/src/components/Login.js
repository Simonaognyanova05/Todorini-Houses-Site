import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { login } from '../services/login';

export default function Login() {
    const navigate = useNavigate();
    const { onLogin } = useAuth();
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState('');
    const loginLock = useRef(false);
    const loginHandler = async event => {
        event.preventDefault();
        if (loginLock.current) return;
        const { email, password } = Object.fromEntries(new FormData(event.currentTarget));
        loginLock.current = true;
        setBusy(true);
        setError('');
        try { const user = await login(email, password); onLogin(user); navigate('/bookings'); }
        catch (err) { setError(err.message || 'Неуспешен вход. Опитайте отново.'); }
        finally { loginLock.current = false; setBusy(false); }
    };
    return (
        <section className="admin-login-page">
            <div className="admin-login-story"><span className="eyebrow">Тодорини къщи · Копривщица</span><h1>Зад всеки хубав престой<br /><em>стои Вашата грижа.</em></h1><p>Вашето място за управление на резервации, съобщения и предложения.</p><Link to="/">← Обратно към сайта</Link></div>
            <div className="admin-login-panel"><span className="eyebrow">За екипа на хотела</span><h2>Добре дошли отново.</h2><p>Влезте с Вашия администраторски профил.</p>
                <form onSubmit={loginHandler}>
                    {error && <div className="admin-notice is-error" role="alert">{error}</div>}
                    <div className="admin-field"><label htmlFor="admin-email">Имейл адрес</label><input type="email" name="email" id="admin-email" autoComplete="username" required /></div>
                    <div className="admin-field"><label htmlFor="admin-password">Парола</label><input type="password" name="password" id="admin-password" autoComplete="current-password" required /></div>
                    <Link className="admin-forgotten" to="/forgotten">Забравена парола?</Link>
                    <button className="admin-button" type="submit" disabled={busy}>{busy ? 'Влизане…' : 'Влезте в администрацията'}<span aria-hidden="true">↗</span></button>
                </form>
            </div>
        </section>
    );
}
