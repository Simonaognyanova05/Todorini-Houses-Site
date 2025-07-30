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
            <div class="container">
                <div class="section-header">
                    <h2>Забравена парола</h2>
                    <p>
                        От тук можете да промените паролата си.
                    </p>
                </div>
                <div class="row">
                    <div class="col-md-6">
                        <div class="login-form">
                            <form onSubmit={handleSubmit}>
                                <div class="form-row">
                                    <div class="control-group col-sm-6">
                                        <label>Имейл</label>
                                        <input type="email" class="form-control" name="email" value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required />
                                    </div>
                                </div>
                                <div class="button"><button type="submit">Изпрати имейл</button></div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}