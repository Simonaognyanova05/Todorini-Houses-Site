import { notify } from '../services/notifications';
import { useRef, useState } from 'react';
import { ROOM_TYPES } from '../services/bookingValidation';
import { useNavigate } from 'react-router-dom';
import { book } from '../services/book';


const COOLDOWN_MS = 10 * 60 * 1000;
const LAST_SENT_KEY = 'bookingFormLastSentAt';

function createChallenge() {
    const first = Math.floor(Math.random() * 8) + 1;
    const second = Math.floor(Math.random() * 8) + 1;
    return { first, second, answer: first + second };
}

export default function Booking() {
    const navigate = useNavigate();
    const startedAt = useRef(Date.now());
    const busy = useRef(false);
    const lastSent = useRef(0);
    const [challenge] = useState(createChallenge);
    const [submitting, setSubmitting] = useState(false);

    const createHandler = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const { fname, lname, mobile, email, date1, date2, guests, type, requirements } = Object.fromEntries(formData);

        if (busy.current) return;
        if (formData.get('website') || Date.now() - startedAt.current < 5000) {
            notify('Моля, проверете данните и опитайте отново след няколко секунди.');
            return;
        }
        if (formData.get('humanCheck') !== 'on' || Number(formData.get('challengeAnswer')) !== challenge.answer) {
            notify('Моля, потвърдете, че не сте робот, и решете правилно задачата.');
            return;
        }
        let storedLastSent = 0;
        try {
            storedLastSent = Number(localStorage.getItem(LAST_SENT_KEY) || 0);
        } catch {
            // The in-memory cooldown still works when browser storage is unavailable.
        }
        const remaining = COOLDOWN_MS - (Date.now() - Math.max(lastSent.current, Number.isFinite(storedLastSent) ? storedLastSent : 0));
        if (remaining > 0) {
            notify('Можете да изпратите нова резервация след ' + Math.ceil(remaining / 60000) + ' мин.');
            return;
        }
        busy.current = true;
        setSubmitting(true);
        try {
            const result = await book(fname, lname, mobile, email, date1, date2, guests, type, requirements);
            if (result.status === 200) {
                lastSent.current = Date.now();
                try {
                    localStorage.setItem(LAST_SENT_KEY, String(lastSent.current));
                } catch {
                    // A successful reservation must not be reported as failed if storage is blocked.
                }
                notify('Резервацията е създадена успешно!', 'success');
                navigate('/booking');
            } else {
                notify(result.message);
            }
        } finally {
            busy.current = false;
            setSubmitting(false);
        }
    };
    return (
        <>
            <div id="booking">
                <div className="container">
                    <div className="section-header">
                        <h2>Направете резервация</h2>
                        <p>
                            Изберете дати за Вашия престой и оставете грижата за останалото на нас.<br />Ще получите потвърждение на резервацията по имейл.
                        </p>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <div className="booking-form">
                                <form name="sentMessage" id="bookingForm" onSubmit={createHandler}>
                                    <div aria-hidden="true" style={{ position: 'absolute', left: '-10000px' }}>
                                        <label htmlFor="booking-website">Website</label>
                                        <input id="booking-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
                                    </div>
                                    <div className="form-row">
                                        <div className="control-group col-md-6">
                                            <label>Име: </label>
                                            <input type="text" className="form-control" id="fname" name="fname" minLength={2} maxLength={100} placeholder="Петър" required="required" data-validation-required-message="Моля, въведете име!" />
                                            <p className="help-block text-danger"></p>
                                        </div>
                                        <div className="control-group col-md-6">
                                            <label>Фамилия: </label>
                                            <input type="text" className="form-control" id="lname" name="lname" minLength={2} maxLength={100} placeholder="Иванов" required="required" data-validation-required-message="Моля, въведете фамилия!" />
                                            <p className="help-block text-danger"></p>
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="control-group col-md-6">
                                            <label>Телефонен номер:</label>
                                            <input type="text" className="form-control" id="mobile" name="mobile" maxLength={30} placeholder="0883125467" required="required" data-validation-required-message="Моля, въведете телефонен номер!" />
                                            <p className="help-block text-danger"></p>
                                        </div>
                                        <div className="control-group col-md-6">
                                            <label>Имейл:</label>
                                            <input type="email" className="form-control" id="email" name="email" maxLength={254} placeholder="email@example.com" required="required" data-validation-required-message="Моля, въведете имейл!" />
                                            <p className="help-block text-danger"></p>
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="control-group col-md-6">
                                            <label>Дата на настаняване:</label>
                                            <input type="date" className="form-control" id="booking-date-1" name="date1" required="required" data-validation-required-message="Моля, въведете дата на настаняване!" />
                                            <p className="help-block text-danger"></p>
                                        </div>
                                        <div className="control-group col-md-6">
                                            <label>Дата на напускане:</label>
                                            <input type="date" className="form-control" id="booking-date-2" name="date2" required="required" data-validation-required-message="Моля, въведете дата на напускане!" />
                                            <p className="help-block text-danger"></p>
                                        </div>
                                    </div>
                                    <div className="control-group">
                                        <label>Брой гости:</label>
                                        <select className="custom-select" name="guests" defaultValue="1">
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                        </select>
                                        <p className="help-block text-danger"></p>
                                    </div>
                                    <div className="control-group">
                                        <label>Тип стая:</label>
                                        <select className="custom-select" name="type" required defaultValue=""><option value="" disabled>Изберете тип стая</option>{ROOM_TYPES.map(type => <option key={type} value={type}>{type}</option>)}</select>
                                        <p className="help-block text-danger"></p>
                                    </div>
                                    <div className="control-group">
                                        <label>Допълнителни изисквания:</label>
                                        <input type="text" className="form-control" id="requirements" name="requirements" maxLength={2000} placeholder="Допълнителни изисквания (по желание)" />
                                        <p className="help-block text-danger"></p>
                                    </div>
                                    <div className="control-group">
                                        <label htmlFor="booking-challenge">Колко е {challenge.first} + {challenge.second}?</label>
                                        <input type="number" className="form-control" id="booking-challenge" name="challengeAnswer" required min="2" max="18" autoComplete="off" />
                                    </div>
                                    <div className="control-group" style={{ marginTop: '12px' }}>
                                        <label>
                                            <input type="checkbox" name="humanCheck" required /> Не съм робот
                                        </label>
                                    </div>
                                    <div className="button"><button type="submit" id="bookingButton" disabled={submitting}>{submitting ? 'Изпращане…' : 'Резервирай'}</button></div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}