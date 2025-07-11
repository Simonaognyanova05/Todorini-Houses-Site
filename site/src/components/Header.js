import { Link } from "react-router-dom";

export default function Header() {
    return (
        <header id="header">
            <Link to="/" class="logo"><img src="img/logo.jpg" alt="logo" /></Link>
            <div class="phone"><i class="fa fa-phone"></i>0887349901</div>
            <div class="mobile-menu-btn"><i class="fa fa-bars"></i></div>
            <nav class="main-menu top-menu">
                <ul>
                    <li class="active"><Link to="/">Начало</Link></li>
                    <li><Link to="/about">За нас</Link></li>
                    <li><Link to="/room">Стаи</Link></li>
                    <li><Link to="/amenities">Удобства</Link></li>
                    <li><Link to="/booking">Резервирайте</Link></li>
                    <li><Link to="/contact">Контакти</Link></li>
                    <li><Link to="/login">Влизане</Link></li>
                </ul>
            </nav>
        </header>
    );
}