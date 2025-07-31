import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { resetPassword } from '../services/resetPassword'; // твоята service функция

export default function ForgottenPassword() {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await resetPassword(email);
            alert("Изпратихме ви имейл за възстановяване на паролата.");
            navigate("/login");
        } catch (error) {
            if (error.code === 'auth/user-not-found') {
                alert("Не съществува потребител с този имейл.");
            } else if (error.code === 'auth/invalid-email') {
                alert("Невалиден имейл адрес.");
            } else {
                alert("Грешка: " + error.message);
            }
        }
    };

    return (
        <div id="login">
            <div className="container">
                <div className="section-header">
                    <h2>Забравена парола</h2>
                    <p>
                        От тук можете да промените паролата си.
                    </p>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <div className="login-form">
                            <form onSubmit={handleSubmit}>
                                <div className="form-row">
                                    <div className="control-group col-sm-6">
                                        <label>Имейл</label>
                                        <input type="email" className="form-control" name="email" value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required />
                                    </div>
                                </div>
                                <div className="button"><button type="submit">Изпрати имейл</button></div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}