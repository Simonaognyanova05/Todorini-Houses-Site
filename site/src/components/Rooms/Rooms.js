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