export default function RoomItem({ room }) {
    return (
        <div class="row">
            <div class="col-md-12">
                <div class="row">
                    <div class="col-md-3">
                        <div class="room-img">
                            <div class="box12">
                                <img src={room.img1} />
                                <div class="box-content">
                                    <h3 class="title">{room.type}</h3>
                                    <ul class="icon">
                                        <li>  <a
                                            href="#"
                                            data-toggle="modal"
                                            data-target={`#modal-room-${room.id}`}
                                        ><i class="fa fa-link"></i></a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="room-des">
                            <h3><a href="#" data-toggle="modal" data-target="#modal-id">{room.type}</a></h3>
                            <p>{room.description}.</p>
                            <ul class="room-size">
                                <li><i class="fa fa-arrow-right"></i>Размер: {room.size} кв. м. </li>
                                <li><i class="fa fa-arrow-right"></i>Брой легла: {room.beds} </li>
                            </ul>
                            <ul class="room-icon">
                                <li class="icon-1"></li>
                                <li class="icon-2"></li>
                                <li class="icon-3"></li>
                                <li class="icon-4"></li>
                                <li class="icon-5"></li>
                                <li class="icon-6"></li>
                                <li class="icon-7"></li>
                                <li class="icon-8"></li>
                                <li class="icon-9"></li>
                                <li class="icon-10"></li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="room-rate">
                            <h3>Цени</h3>
                            <h1>{room.priceLv} лв.</h1>
                            <h1>{room.priceEuro}€</h1>

                            <a href="#">Резервирай</a>
                        </div>
                    </div>
                </div>
                <hr />
            </div>
        </div>
    )
}