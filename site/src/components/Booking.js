export default function Booking() {
    return (
        <>

            <div id="booking">
                <div class="container">
                    <div class="section-header">
                        <h2>Направете резервация</h2>
                        <p>
                            От тук може да направите резервация. <br /> <b>ВАЖНО!!!</b> Ако не сте записали желаните дати в менюто "Стаи", е възможно да няма свободни стаи от типа, който искате!
                        </p>
                    </div>
                    <div class="row">
                        <div class="col-12">
                            <div class="booking-form">
                                <div id="success"></div>
                                <form name="sentMessage" id="bookingForm" novalidate="novalidate">
                                    <div class="form-row">
                                        <div class="control-group col-md-6">
                                            <label>Име: </label>
                                            <input type="text" class="form-control" id="fname" placeholder="Петър" required="required" data-validation-required-message="Моля, въведете име!" />
                                            <p class="help-block text-danger"></p>
                                        </div>
                                        <div class="control-group col-md-6">
                                            <label>Фамилия: </label>
                                            <input type="text" class="form-control" id="lname" placeholder="Иванов" required="required" data-validation-required-message="Моля, въведете фамилия!" />
                                            <p class="help-block text-danger"></p>
                                        </div>
                                    </div>
                                    <div class="form-row">
                                        <div class="control-group col-md-6">
                                            <label>Телефонен номер:</label>
                                            <input type="text" class="form-control" id="mobile" placeholder="0883125467" required="required" data-validation-required-message="Моля, въведете телефонен номер!" />
                                            <p class="help-block text-danger"></p>
                                        </div>
                                        <div class="control-group col-md-6">
                                            <label>Имейл:</label>
                                            <input type="email" class="form-control" id="email" placeholder="email@example.com" required="required" data-validation-required-message="Моля, въведете имейл!" />
                                            <p class="help-block text-danger"></p>
                                        </div>
                                    </div>
                                    <div class="form-row">
                                        <div class="control-group col-md-6">
                                            <label>Дата на настаняване:</label>
                                            <input type="text" class="form-control" id="date-1" data-toggle="datetimepicker" data-target="#date-1" placeholder="MM/DD/YYYY" required="required" data-validation-required-message="Моля, въведете дата на настаняване!" />
                                            <p class="help-block text-danger"></p>
                                        </div>
                                        <div class="control-group col-md-6">
                                            <label>Дата на напускане:</label>
                                            <input type="text" class="form-control" id="date-2" data-toggle="datetimepicker" data-target="#date-2" placeholder="MM/DD/YYYY" required="required" data-validation-required-message="Моля, въведете дата на напускане!" />
                                            <p class="help-block text-danger"></p>
                                        </div>
                                    </div>
                                    <div class="control-group">
                                        <label>Брой гости:</label>
                                        <select class="custom-select">
                                            <option selected>1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                        </select>
                                        <p class="help-block text-danger"></p>
                                    </div>
                                    <div class="control-group">
                                        <label>Допълнителни изисквания:</label>
                                        <input type="text" class="form-control" id="request" placeholder="Допълнителни изисквания" required="required" data-validation-required-message="Моля, въведете Вашите допълнителни изисквания!" />
                                        <p class="help-block text-danger"></p>
                                    </div>
                                    <div class="button"><button type="submit" id="bookingButton">Резервирай</button></div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}