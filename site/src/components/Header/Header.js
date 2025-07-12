import './Header.css'
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header id="header">
      <Link to="/" className="logo">
        <img src="/img/logo.jpg" alt="logo" />
      </Link>
      <div className="phone"><i className="fa fa-phone"></i>0887349901</div>

      <div className="mobile-menu-btn" onClick={toggleMenu}>
        <i className="fa fa-bars"></i>
      </div>

      <nav className={`main-menu top-menu ${menuOpen ? 'open' : ''}`}>
        <ul>
          <li className="active"><Link to="/">Начало</Link></li>
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
