import { useEffect, useState } from "react";
import RoomItem from "./RoomItem";
import RoomModalItem from "./RoomModalItem";
import { getRooms } from "../../services/getRooms";

export default function Rooms() {
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        getRooms()
            .then(res => {
                setRooms(res);
            })
    }, [rooms]);
    return (
        <>
        
            <div id="search" style={{ background: "#f2f2f2;" }}>
                <div class="container">
                    <div class="form-row">
                        <div class="control-group col-md-3">
                            <label>Check-In</label>
                            <div class="form-group">
                                <div class="input-group date" id="date-3" data-target-input="nearest">
                                    <input type="text" class="form-control datetimepicker-input" data-target="#date-3" />
                                    <div class="input-group-append" data-target="#date-3" data-toggle="datetimepicker">
                                        <div class="input-group-text"><i class="fa fa-calendar"></i></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="control-group col-md-3">
                            <label>Check-Out</label>
                            <div class="form-group">
                                <div class="input-group date" id="date-4" data-target-input="nearest">
                                    <input type="text" class="form-control datetimepicker-input" data-target="#date-4" />
                                    <div class="input-group-append" data-target="#date-4" data-toggle="datetimepicker">
                                        <div class="input-group-text"><i class="fa fa-calendar"></i></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="control-group col-md-3">
                            <div class="form-row">
                                <div class="control-group col-md-6">
                                    <label>Adult</label>
                                    <select class="custom-select">
                                        <option selected>0</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                        <option value="6">6</option>
                                        <option value="7">7</option>
                                        <option value="8">8</option>
                                        <option value="9">9</option>
                                        <option value="10">10</option>
                                    </select>
                                </div>
                                <div class="control-group col-md-6 kid">
                                    <label>Kid</label>
                                    <select class="custom-select">
                                        <option selected>0</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                        <option value="6">6</option>
                                        <option value="7">7</option>
                                        <option value="8">8</option>
                                        <option value="9">9</option>
                                        <option value="10">10</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="control-group col-md-3">
                            <button class="btn btn-block">Search</button>
                        </div>
                    </div>
                </div>
            </div>
            <div id="rooms">
                <div class="container">
                    <div class="section-header">
                        <h2>Нашите стаи</h2>
                        <p>
                            Цените са в български лева и евро, и са за помещение. Включват закуска, ДДС, туристически данък, интернет, безплатен паркинг, безплатно ползване на външен (сезонен) и вътрешен басейн и инфрачервена сауна.
                        </p>
                    </div>
                    {rooms.length > 0
                        ? rooms.map(x => (<><RoomItem key={x.id} room={x} /> <RoomModalItem key={x.id} x={x} /> </>))
                        : 'Няма създадени стаи'}

                </div>
            </div>
        </>
    );
}