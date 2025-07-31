import { Link } from "react-router-dom";

export default function RoomModalItem({ x: room }) {
    return (
        <div id={`modal-room-${room.id}`} className="modal fade" tabindex="-1" role="dialog">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" className="close" data-dismiss="modal">&times;</button>
                    </div>
                    <div className="modal-body">
                        <div className="row">
                            <div className="col-12">
                                <div className="port-slider">
                                    <div><img src={room.img1} /></div>
                                    <div><img src={room.img2} /></div>
                                    <div><img src={room.img3} /></div>
                                    <div><img src={room.img4} /></div>
                                    <div><img src={room.img5} /></div>
                                    <div><img src={room.img6} /></div>
                                </div>
                            </div>
                            <div className="col-12">
                                <h2>{room.type}</h2>
                                <p>
                                    {room.description}
                                </p>
                                <div className="modal-link">
                                    <a href="/booking">Резервирай</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}