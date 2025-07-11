export default function Login() {
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
                            <form>
                                <div class="form-row">
                                    <div class="control-group col-sm-6">
                                        <label>Your Email</label>
                                        <input type="email" class="form-control" required="required" />
                                    </div>
                                    <div class="control-group col-sm-6">
                                        <label>Your Password</label>
                                        <input type="password" class="form-control" required="required" />
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