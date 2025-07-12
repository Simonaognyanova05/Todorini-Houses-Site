export default function Rooms() {
    return (
        <>
            <div id="rooms">
                <div class="container">
                    <div class="section-header">
                        <h2>Нашите стаи</h2>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas in mi libero. Quisque convallis, enim at venenatis tincidunt.
                        </p>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <div class="row">
                                <div class="col-md-3">
                                    <div class="room-img">
                                        <div class="box12">
                                            <img src="img/room/room-1.jpg" />
                                            <div class="box-content">
                                                <h3 class="title">Standard Single</h3>
                                                <ul class="icon">
                                                    <li><a href="#" data-toggle="modal" data-target="#modal-id"><i class="fa fa-link"></i></a></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="room-des">
                                        <h3><a href="#" data-toggle="modal" data-target="#modal-id">Standard Single</a></h3>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                        <ul class="room-size">
                                            <li><i class="fa fa-arrow-right"></i>Size: 260 sq ft </li>
                                            <li><i class="fa fa-arrow-right"></i>Beds: 2 Single(s) </li>
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
                                        <h3>From</h3>
                                        <h1>150 лв.</h1>
                                        <h1>70€</h1>

                                        <a href="#">Book Now</a>
                                    </div>
                                </div>
                            </div>
                            <hr />
                        </div>
                    </div>
                </div>
            </div>

            <div id="modal-id" class="modal fade" tabindex="-1" role="dialog">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal">&times;</button>
                        </div>
                        <div class="modal-body">
                            <div class="row">
                                <div class="col-12">
                                    <div class="port-slider">
                                        <div><img src="img/room-slider/room-1.jpg" /></div>
                                        <div><img src="img/room-slider/room-2.jpg" /></div>
                                        <div><img src="img/room-slider/room-3.jpg" /></div>
                                        <div><img src="img/room-slider/room-4.jpg" /></div>
                                        <div><img src="img/room-slider/room-5.jpg" /></div>
                                        <div><img src="img/room-slider/room-6.jpg" /></div>
                                    </div>
                                    <div class="port-slider-nav">
                                        <div><img src="img/room-slider/room-1.jpg" /></div>
                                        <div><img src="img/room-slider/room-2.jpg" /></div>
                                        <div><img src="img/room-slider/room-3.jpg" /></div>
                                        <div><img src="img/room-slider/room-4.jpg" /></div>
                                        <div><img src="img/room-slider/room-5.jpg" /></div>
                                        <div><img src="img/room-slider/room-6.jpg" /></div>
                                    </div>
                                </div>
                                <div class="col-12">
                                    <h2>Lorem ipsum dolor</h2>
                                    <p>
                                        Lorem ipsum dolor viverra purus imperdiet rhoncus imperdiet. Suspendisse vulputate condimentum ligula sollicitudin hendrerit. Phasellus luctus, elit et ultrices interdum, neque mi pellentesque massorci. Nam in cursus ex, nec mattis lectus. Curabitur quis elementum nunc. Mauris iaculis, justo eu aliquam sagittis, arcu eros cursus libero, sit amet eleifend dolor odio at lacus.
                                    </p>
                                    <div class="modal-link">
                                        <a href="#">Book Now</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}