import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { sendMessage } from "../services/sendMessage";

const COOLDOWN_MS = 10 * 60 * 1000;
const LAST_SENT_KEY = "contactFormLastSentAt";

function createChallenge() {
    const first = Math.floor(Math.random() * 8) + 1;
    const second = Math.floor(Math.random() * 8) + 1;
    return { first, second, answer: first + second };
}

export default function Contact() {
    const navigate = useNavigate();
    const openedAt = useRef(Date.now());
    const [sending, setSending] = useState(false);
    const [challenge] = useState(createChallenge);

    const sendHandler = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const { name, email, subject, message, website, humanCheck, challengeAnswer } = Object.fromEntries(formData);

        if (website || sending) {
            return;
        }
        if (Date.now() - openedAt.current < 5000) {
            alert("Моля, отделете няколко секунди, за да попълните формата.");
            return;
        }
        if (humanCheck !== "on" || Number(challengeAnswer) !== challenge.answer) {
            alert("Моля, потвърдете, че не сте робот, и решете правилно задачата.");
            return;
        }

        const lastSentAt = Number(localStorage.getItem(LAST_SENT_KEY) || 0);
        const remaining = COOLDOWN_MS - (Date.now() - lastSentAt);
        if (remaining > 0) {
            alert(`Можете да изпратите ново съобщение след ${Math.ceil(remaining / 60000)} мин.`);
            return;
        }

        setSending(true);
        let res = await sendMessage(name, email, subject, message);
        setSending(false);
        if (res.status === 200) {
            localStorage.setItem(LAST_SENT_KEY, String(Date.now()));
            alert("Съобщението е изпратено успешно!");
            navigate('/');
        } else {
            alert(res.message || "Възникна грешка, моля опитайте по-късно!");
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
                                    <p><i className="fa fa-map-marker"></i>Хотел - ул. "Любен Каравелов" 22</p>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="info-item">
                                    <p><i className="fa fa-map-marker"></i>Механа - бул. Хаджи Ненчо Палавеев 76</p>
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
                            <form name="sentMessage" id="contactForm" onSubmit={sendHandler}>
                                <div aria-hidden="true" style={{ position: "absolute", left: "-10000px", width: "1px", height: "1px", overflow: "hidden" }}>
                                    <label htmlFor="website">Website</label>
                                    <input id="website" name="website" type="text" tabIndex="-1" autoComplete="off" />
                                </div>
                                <div className="form-row">
                                    <div className="control-group col-sm-6">
                                        <label>Вашите имена: </label>
                                        <input type="text" className="form-control" id="name" name="name" placeholder="Петър Иванов" minLength="2" maxLength="100" required="required" data-validation-required-message="Please enter your name" />
                                        <p className="help-block text-danger"></p>
                                    </div>
                                    <div className="control-group col-sm-6">
                                        <label>Имейл</label>
                                        <input type="email" className="form-control" id="email" name="email" placeholder="email@example.com" maxLength="254" required="required" data-validation-required-message="Please enter your email" />
                                        <p className="help-block text-danger"></p>
                                    </div>
                                </div>
                                <div className="control-group">
                                    <label>Тема</label>
                                    <input type="text" className="form-control" id="subject" name="subject" placeholder="Детско" minLength="2" maxLength="150" required="required" data-validation-required-message="Please enter a subject" />
                                    <p className="help-block text-danger"></p>
                                </div>
                                <div className="control-group">
                                    <label>Съобщение:</label>
                                    <textarea className="form-control" id="message" name="message" rows="5" placeholder="Предлагате ли детско легло?" minLength="15" maxLength="2000" required="required" data-validation-required-message="Please enter your message"></textarea>
                                    <p className="help-block text-danger"></p>
                                </div>
                                <div className="control-group">
                                    <label htmlFor="challengeAnswer">Колко е {challenge.first} + {challenge.second}?</label>
                                    <input type="number" className="form-control" id="challengeAnswer" name="challengeAnswer" required min="2" max="18" autoComplete="off" />
                                </div>
                                <div className="control-group" style={{ marginTop: "12px" }}>
                                    <label>
                                        <input type="checkbox" name="humanCheck" required /> Не съм робот
                                    </label>
                                </div>
                                <div className="button"><button type="submit" id="sendMessageButton" disabled={sending}>{sending ? "Изпращане..." : "Изпрати съобщението"}</button></div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
