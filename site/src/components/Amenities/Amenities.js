import './Amenities.css';
import { Link, useParams } from 'react-router-dom';
import AmenitiesItem from './AmenitiesItem';

const imageGroups = {
    guestHouseImages: [
        `${process.env.PUBLIC_URL}/img/gallery/guestHouse/img1.jpg`,
        `${process.env.PUBLIC_URL}/img/gallery/guestHouse/img2.jpg`,
        `${process.env.PUBLIC_URL}/img/gallery/guestHouse/img3.jpg`,
        `${process.env.PUBLIC_URL}/img/gallery/guestHouse/img4.jpg`,
        `${process.env.PUBLIC_URL}/img/gallery/guestHouse/img5.jpg`,
        `${process.env.PUBLIC_URL}/img/gallery/guestHouse/img6.jpg`,
        `${process.env.PUBLIC_URL}/img/gallery/guestHouse/img7.jpg`,
        `${process.env.PUBLIC_URL}/img/gallery/guestHouse/img8.jpg`,
        `${process.env.PUBLIC_URL}/img/gallery/guestHouse/img9.jpg`,
    ],
    spa: [
        `${process.env.PUBLIC_URL}/img/gallery/spa/img5.jpg`,
        `${process.env.PUBLIC_URL}/img/gallery/spa/img1.jpg`,
        `${process.env.PUBLIC_URL}/img/gallery/spa/img2.jpg`,
        `${process.env.PUBLIC_URL}/img/gallery/spa/img3.jpg`,
        `${process.env.PUBLIC_URL}/img/gallery/spa/img4.jpg`,
        `${process.env.PUBLIC_URL}/img/gallery/spa/img6.jpg`,
        `${process.env.PUBLIC_URL}/img/gallery/spa/img7.jpg`,

    ],
    mehana: [
        `${process.env.PUBLIC_URL}/img/gallery/mehana/img1.jpg`,
        `${process.env.PUBLIC_URL}/img/gallery/mehana/img2.jpg`,
        `${process.env.PUBLIC_URL}/img/gallery/mehana/img3.jpg`,
        `${process.env.PUBLIC_URL}/img/gallery/mehana/img4.jpg`,
        `${process.env.PUBLIC_URL}/img/gallery/mehana/img5.jpg`,
        `${process.env.PUBLIC_URL}/img/gallery/mehana/img6.jpg`,
        `${process.env.PUBLIC_URL}/img/gallery/mehana/img7.jpg`,
        `${process.env.PUBLIC_URL}/img/gallery/mehana/img8.jpg`,
        `${process.env.PUBLIC_URL}/img/gallery/mehana/img9.jpg`,
        `${process.env.PUBLIC_URL}/img/gallery/mehana/img10.jpg`,
        `${process.env.PUBLIC_URL}/img/gallery/mehana/img11.jpg`,
        `${process.env.PUBLIC_URL}/img/gallery/mehana/img12.jpg`,

    ],
    menu: [
        `${process.env.PUBLIC_URL}/img/gallery/menu/img1.jpg`,
        `${process.env.PUBLIC_URL}/img/gallery/menu/img2.jpg`,
        `${process.env.PUBLIC_URL}/img/gallery/menu/img3.jpg`,
        `${process.env.PUBLIC_URL}/img/gallery/menu/img4.jpg`,
        `${process.env.PUBLIC_URL}/img/gallery/menu/img5.jpg`,
        `${process.env.PUBLIC_URL}/img/gallery/menu/img6.jpg`,
        `${process.env.PUBLIC_URL}/img/gallery/menu/img7.jpg`,
        `${process.env.PUBLIC_URL}/img/gallery/menu/img8.jpg`,
        `${process.env.PUBLIC_URL}/img/gallery/menu/img9.jpg`,
        `${process.env.PUBLIC_URL}/img/gallery/menu/img10.jpg`,
        `${process.env.PUBLIC_URL}/img/gallery/menu/img11.jpg`,
        `${process.env.PUBLIC_URL}/img/gallery/menu/img12.jpg`,
        `${process.env.PUBLIC_URL}/img/gallery/menu/img13.jpg`,
        `${process.env.PUBLIC_URL}/img/gallery/menu/img14.jpg`,
        `${process.env.PUBLIC_URL}/img/gallery/menu/img15.jpg`,
        `${process.env.PUBLIC_URL}/img/gallery/menu/img16.jpg`,
        `${process.env.PUBLIC_URL}/img/gallery/menu/img17.jpg`,
        `${process.env.PUBLIC_URL}/img/gallery/menu/img18.jpg`,
        `${process.env.PUBLIC_URL}/img/gallery/menu/img19.jpg`,
        `${process.env.PUBLIC_URL}/img/gallery/menu/img20.jpg`,
        `${process.env.PUBLIC_URL}/img/gallery/menu/img21.jpg`,
        `${process.env.PUBLIC_URL}/img/gallery/menu/img22.jpg`,
        `${process.env.PUBLIC_URL}/img/gallery/menu/img23.jpg`,
        `${process.env.PUBLIC_URL}/img/gallery/menu/img24.jpg`,
        `${process.env.PUBLIC_URL}/img/gallery/menu/img25.jpg`,
        `${process.env.PUBLIC_URL}/img/gallery/menu/img26.jpg`,
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
