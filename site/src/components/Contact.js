import { useNavigate } from "react-router-dom";
import { sendMessage } from "../services/sendMessage";

export default function Contact() {
    const navigate = useNavigate();

    const sendHandler = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const { name, email, subject, message } = Object.fromEntries(formData);

        let res = await sendMessage(name, email, subject, message);
        if(res.status === 200){
            alert("Съобщението е изратено успешно!");
            navigate('/');
        }else{
            alert("Възникна грешка, моля опитайте по-късно!");
        }
    }
    return (
        <div id="contact">
            <div class="container">
                <div class="section-header">
                    <h2>Контакти</h2>
                    <p>
                        Може да се свържете с нас като попълните формата по-долу или използвате имейл адреса и телефонния номер.
                    </p>
                </div>
                <div class="row">
                    <div class="col-md-12">
                        <div class="row contact-info">
                            <div class="col-md-4">
                                <div class="info-item">
                                    <p><i class="fa fa-map-marker"></i>ул. "Любен Каравелов" 22</p>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="info-item">
                                    <p><i class="fa fa-envelope"></i> <a href="mailto:contacts@todorinikashti.com">contacts@todorinikashti.com</a></p>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="info-item">
                                    <p><i class="fa fa-phone"></i><a href="tel:+1 234 567 8900">0887349901, 0887733430</a></p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-12">
                        <div class="contact-form">
                            <div id="success"></div>
                            <form name="sentMessage" id="contactForm" novalidate="novalidate" onSubmit={sendHandler}>
                                <div class="form-row">
                                    <div class="control-group col-sm-6">
                                        <label>Вашите имена: </label>
                                        <input type="text" class="form-control" id="name" name="name" placeholder="Петър Иванов" required="required" data-validation-required-message="Please enter your name" />
                                        <p class="help-block text-danger"></p>
                                    </div>
                                    <div class="control-group col-sm-6">
                                        <label>Имейл</label>
                                        <input type="email" class="form-control" id="email" name="email" placeholder="email@example.com" required="required" data-validation-required-message="Please enter your email" />
                                        <p class="help-block text-danger"></p>
                                    </div>
                                </div>
                                <div class="control-group">
                                    <label>Тема</label>
                                    <input type="text" class="form-control" id="subject" name="subject" placeholder="Детско" required="required" data-validation-required-message="Please enter a subject" />
                                    <p class="help-block text-danger"></p>
                                </div>
                                <div class="control-group">
                                    <label>Съобщение:</label>
                                    <textarea class="form-control" id="message" name="message" rows="5" placeholder="Предлагате ли детско легло?" required="required" data-validation-required-message="Please enter your message"></textarea>
                                    <p class="help-block text-danger"></p>
                                </div>
                                <div class="button"><button type="submit" id="sendMessageButton">Изпрати съобщенето</button></div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}