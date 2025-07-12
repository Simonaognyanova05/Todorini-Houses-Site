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

        let result = await login(email, password);
        if(result.status === 200){
            alert("Влизането е успешно!"); 
            onLogin(result.user);
            navigate('/');
        }else{
            alert("Възникна грешка. Моля, опитайте отново по-късно!"); 
        }
    }
    return (
        <div id="login">
            <div class="container">
                <div class="section-header">
                    <h2>Registration / Login</h2>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas in mi libero. Quisque convallis, enim at venenatis tincidunt.
                    </p>
                </div>
                <div class="row">
                    <div class="col-md-6">
                        <div class="login-form">
                            <form onSubmit={loginHandler}>
                                <div class="form-row">
                                    <div class="control-group col-sm-6">
                                        <label>Your Email</label>
                                        <input type="email" class="form-control" name="email" required="required" />
                                    </div>
                                    <div class="control-group col-sm-6">
                                        <label>Your Password</label>
                                        <input type="password" class="form-control" name="password" required="required" />
                                    </div>
                                </div>
                                <div class="button"><button type="submit">Login</button></div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}