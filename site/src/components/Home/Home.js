import { Link } from 'react-router-dom';
import './Home.css';

export default function Home() {
    return (
        <>
            <div id="headerSlider" className="carousel slide" data-ride="carousel">
            
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src="img/header-picture.jpg" alt="Royal Hotel" />
                        <div className="carousel-caption">
                            <h1 className="animated fadeInRight">Семеен хотел "Тодорини къщи"</h1>
                        </div>
                    </div>

                    <div className="carousel-item">
                        <img src="img/bigfotos23.jpg" alt="Royal Hotel" />
                        <div className="carousel-caption">
                            <h1 className="animated fadeInLeft">Механа "Под старата круша"</h1>
                        </div>
                    </div>

                    <div className="carousel-item">
                        <img src="img/bigfotos8.jpg" alt="Royal Hotel" />
                        <div className="carousel-caption">
                            <h1 className="animated fadeInRight">Традиционни копривщенски къщи, съчетани с традиционна българска кухня.</h1>
                        </div>
                    </div>
                </div>

                <a className="carousel-control-prev" href="#headerSlider" role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next" href="#headerSlider" role="button" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                </a>
            </div>
            <div id="welcome">
                <div className="container">
                    <h3>Добре дошли в "Тодорини къщи" и механа "Под старата крушата"</h3>
                    <p>Насладете се на тишината, уюта и автентичната българска атмосфера в сърцето на природата! Тук ще откриете спокойствие, гостоприемство и възможност да се докоснете до истинската българска традиция.</p>
                    <Link to="/booking">Резервирайте</Link>
                </div>
            </div>
            <div id="modal-id" className="modal fade" tabindex="-1" role="dialog">
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