import { useNavigate } from "react-router-dom";
import { sendMessage } from "../services/sendMessage";

export default function Contact() {
    const navigate = useNavigate();

    const sendHandler = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const { name, email, subject, message } = Object.fromEntries(formData);

        let res = await sendMessage(name, email, subject, message);
        if (res.status === 200) {
            alert("Съобщението е изратено успешно!");
            navigate('/');
        } else {
            alert("Възникна грешка, моля опитайте по-късно!");
        }
    }
    return (
        <div id="contact">
            <div className="container">
                <div className="section-header">
                    <h2>Контакти</h2>
                    <p>
                        Може да се свържете с нас като попълните формата по-долу или използвате имейл адреса и телефонния номер.
                    </p>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="row contact-info text-center">
                            <div className="col-md-3">
                                <div className="info-item">
                                    <p><i className="fa fa-map-marker"></i> ул. "Любен Каравелов" 22</p>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="info-item">
                                    <p><i className="fa fa-envelope"></i> <a href="mailto:contacts@todorinikashti.com">contacts@todorinikashti.com</a></p>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="info-item">
                                    <p><i className="fa fa-phone"></i> <a href="tel:0887349901">0887349901</a></p>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="info-item">
                                    <p><i className="fa fa-phone"></i> <a href="tel:0887733430">0887733430</a></p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-12">
                        <div className="contact-form">
                            <div id="success"></div>
                            <form name="sentMessage" id="contactForm" novalidate="novalidate" onSubmit={sendHandler}>
                                <div className="form-row">
                                    <div className="control-group col-sm-6">
                                        <label>Вашите имена: </label>
                                        <input type="text" className="form-control" id="name" name="name" placeholder="Петър Иванов" required="required" data-validation-required-message="Please enter your name" />
                                        <p className="help-block text-danger"></p>
                                    </div>
                                    <div className="control-group col-sm-6">
                                        <label>Имейл</label>
                                        <input type="email" className="form-control" id="email" name="email" placeholder="email@example.com" required="required" data-validation-required-message="Please enter your email" />
                                        <p className="help-block text-danger"></p>
                                    </div>
                                </div>
                                <div className="control-group">
                                    <label>Тема</label>
                                    <input type="text" className="form-control" id="subject" name="subject" placeholder="Детско" required="required" data-validation-required-message="Please enter a subject" />
                                    <p className="help-block text-danger"></p>
                                </div>
                                <div className="control-group">
                                    <label>Съобщение:</label>
                                    <textarea className="form-control" id="message" name="message" rows="5" placeholder="Предлагате ли детско легло?" required="required" data-validation-required-message="Please enter your message"></textarea>
                                    <p className="help-block text-danger"></p>
                                </div>
                                <div className="button"><button type="submit" id="sendMessageButton">Изпрати съобщенето</button></div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}