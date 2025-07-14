export default function RoomModalItem({ x: room }) {
    return (
        <div id={`modal-room-${room.id}`} class="modal fade" tabindex="-1" role="dialog">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-12">
                                <div class="port-slider">
                                    <div><img src={room.img1} /></div>
                                    <div><img src={room.img2} /></div>
                                    <div><img src={room.img3} /></div>
                                    <div><img src={room.img4} /></div>
                                    <div><img src={room.img5} /></div>
                                    <div><img src={room.img6} /></div>
                                </div>
                            </div>
                            <div class="col-12">
                                <h2>{room.type}</h2>
                                <p>
                                    {room.description}
                                </p>
                                <div class="modal-link">
                                    <a href="#">Резервирай</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}