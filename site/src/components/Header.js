import { Link } from "react-router-dom";

export default function Header() {
    return (
        <header id="header">
            <Link to="/" class="logo"><img src="img/logo.jpg" alt="logo" /></Link>
            <div class="phone"><i class="fa fa-phone"></i>+1 234 567 8900</div>
            <div class="mobile-menu-btn"><i class="fa fa-bars"></i></div>
            <nav class="main-menu top-menu">
                <ul>
                    <li class="active"><Link to="/">Home</Link></li>
                    <li><Link to="/about">About Us</Link></li>
                    <li><Link to="/room">Rooms</Link></li>
                    <li><Link to="/amenities">Amenities</Link></li>
                    <li><Link to="/booking">Booking</Link></li>
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/contact">Contact Us</Link></li>
                </ul>
            </nav>
        </header>
    );
}