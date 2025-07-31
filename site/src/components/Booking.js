import { useNavigate } from 'react-router-dom';
import { book } from '../services/book';


export default function Booking() {
    const navigate = useNavigate();

    const createHandler = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const { fname, lname, mobile, email, date1, date2, guests, type, requirements } = Object.fromEntries(formData);

        let result = await book(fname, lname, mobile, email, date1, date2, guests, type, requirements);
        if (result.status == 200) {
            alert("Резервацията е създадена успешно!");
            navigate('/booking');
        } else {
            alert("Възникна грешка, моля, опитайте по-късно!");
        }
    }
    return (
        <>
            <div id="booking">
                <div className="container">
                    <div className="section-header">
                        <h2>Направете резервация</h2>
                        <p>
                            От тук може да направите резервация. <br /> <b>ВАЖНО!!!</b> След като направите резервацията, ще Ви бъде изпратен имейл за потвърждение!
                        </p>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <div className="booking-form">
                                <form name="sentMessage" id="bookingForm" novalidate="novalidate" onSubmit={createHandler}>
                                    <div className="form-row">
                                        <div className="control-group col-md-6">
                                            <label>Име: </label>
                                            <input type="text" className="form-control" id="fname" name="fname" placeholder="Петър" required="required" data-validation-required-message="Моля, въведете име!" />
                                            <p className="help-block text-danger"></p>
                                        </div>
                                        <div className="control-group col-md-6">
                                            <label>Фамилия: </label>
                                            <input type="text" className="form-control" id="lname" name="lname" placeholder="Иванов" required="required" data-validation-required-message="Моля, въведете фамилия!" />
                                            <p className="help-block text-danger"></p>
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="control-group col-md-6">
                                            <label>Телефонен номер:</label>
                                            <input type="text" className="form-control" id="mobile" name="mobile" placeholder="0883125467" required="required" data-validation-required-message="Моля, въведете телефонен номер!" />
                                            <p className="help-block text-danger"></p>
                                        </div>
                                        <div className="control-group col-md-6">
                                            <label>Имейл:</label>
                                            <input type="email" className="form-control" id="email" name="email" placeholder="email@example.com" required="required" data-validation-required-message="Моля, въведете имейл!" />
                                            <p className="help-block text-danger"></p>
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="control-group col-md-6">
                                            <label>Дата на настаняване:</label>
                                            <input type="text" className="form-control" id="date-1" name="date1" data-toggle="datetimepicker" data-target="#date-1" placeholder="MM/DD/YYYY" required="required" data-validation-required-message="Моля, въведете дата на настаняване!" />
                                            <p className="help-block text-danger"></p>
                                        </div>
                                        <div className="control-group col-md-6">
                                            <label>Дата на напускане:</label>
                                            <input type="text" className="form-control" id="date-2" name="date2" data-toggle="datetimepicker" data-target="#date-2" placeholder="MM/DD/YYYY" required="required" data-validation-required-message="Моля, въведете дата на напускане!" />
                                            <p className="help-block text-danger"></p>
                                        </div>
                                    </div>
                                    <div className="control-group">
                                        <label>Брой гости:</label>
                                        <select className="custom-select" name="guests">
                                            <option selected>1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                        </select>
                                        <p className="help-block text-danger"></p>
                                    </div>
                                    <div className="control-group">
                                        <label>Тип стая:</label>
                                        <input type="text" className="form-control" id="requirements" name="type" placeholder="Една обща/Две отделни" required="required" data-validation-required-message="Моля, въведете Вашите допълнителни изисквания!" />
                                        <p className="help-block text-danger"></p>
                                    </div>
                                    <div className="control-group">
                                        <label>Допълнителни изисквания:</label>
                                        <input type="text" className="form-control" id="requirements" name="requirements" placeholder="Допълнителни изисквания" required="required" data-validation-required-message="Моля, въведете Вашите допълнителни изисквания!" />
                                        <p className="help-block text-danger"></p>
                                    </div>
                                    <div className="button"><button type="submit" id="bookingButton">Резервирай</button></div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}