import './Amenities.css';
import { Link, useParams } from 'react-router-dom';
import AmenitiesItem from './AmenitiesItem';

const imageGroups = {
    guestHouseImages: [
        "/img/gallery/guestHouse/img1.jpg",
        "/img/gallery/guestHouse/img2.jpg",
        "/img/gallery/guestHouse/img3.jpg",
        "/img/gallery/guestHouse/img4.jpg",
        "/img/gallery/guestHouse/img5.jpg",
        "/img/gallery/guestHouse/img6.jpg",
        "/img/gallery/guestHouse/img7.jpg",
        "/img/gallery/guestHouse/img8.jpg",
        "/img/gallery/guestHouse/img9.jpg",
    ],
    spa: [
        "/img/gallery/spa/img5.jpg",
        "/img/gallery/spa/img1.jpg",
        "/img/gallery/spa/img2.jpg",
        "/img/gallery/spa/img3.jpg",
        "/img/gallery/spa/img4.jpg",
        "/img/gallery/spa/img6.jpg",
        "/img/gallery/spa/img7.jpg",

    ],
    mehana: [
        "/img/gallery/mehana/img1.jpg",
        "/img/gallery/mehana/img2.jpg",
        "/img/gallery/mehana/img3.jpg",
        "/img/gallery/mehana/img4.jpg",
        "/img/gallery/mehana/img5.jpg",
        "/img/gallery/mehana/img6.jpg",
        "/img/gallery/mehana/img7.jpg",
        "/img/gallery/mehana/img8.jpg",
        "/img/gallery/mehana/img9.jpg",
        "/img/gallery/mehana/img10.jpg",
        "/img/gallery/mehana/img11.jpg",
        "/img/gallery/mehana/img12.jpg",

    ],
    menu: [
        "/img/gallery/menu/img1.jpg",
        "/img/gallery/menu/img2.jpg",
        "/img/gallery/menu/img3.jpg",
        "/img/gallery/menu/img4.jpg",
        "/img/gallery/menu/img5.jpg",
        "/img/gallery/menu/img6.jpg",
        "/img/gallery/menu/img7.jpg",
        "/img/gallery/menu/img8.jpg",
        "/img/gallery/menu/img9.jpg",
        "/img/gallery/menu/img10.jpg",
        "/img/gallery/menu/img11.jpg",
        "/img/gallery/menu/img12.jpg",
        "/img/gallery/menu/img13.jpg",
        "/img/gallery/menu/img14.jpg",
        "/img/gallery/menu/img15.jpg",
        "/img/gallery/menu/img16.jpg",
        "/img/gallery/menu/img17.jpg",
        "/img/gallery/menu/img18.jpg",
        "/img/gallery/menu/img19.jpg",
        "/img/gallery/menu/img20.jpg",
        "/img/gallery/menu/img21.jpg",
        "/img/gallery/menu/img22.jpg",
        "/img/gallery/menu/img23.jpg",
        "/img/gallery/menu/img24.jpg",
        "/img/gallery/menu/img25.jpg",
        "/img/gallery/menu/img26.jpg",
    ],

};

export default function Gallery() {
    const { type } = useParams();
    const images = imageGroups[type] || [];

    return (
        <>
            <br />
            <div className="section-header">
                <h2>Галерия</h2>
                <p>Това са снимки от нашата механа и къща за гости.</p>
            </div>

            <nav className="galleryNav">
                <Link to="/guestHouseImages">Къща за гости</Link>
                <Link to="/spa">Спа</Link>
                <Link to="/mehana">Механа</Link>
                <Link to="/menu">Меню</Link>
            </nav>

            <AmenitiesItem images={images} />
        </>
    );
}
