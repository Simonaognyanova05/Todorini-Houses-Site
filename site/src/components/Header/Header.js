import './Header.css';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

const guestLinks = [['/', 'Начало'], ['/about', 'За нас'], ['/room', 'Стаи'], ['/amenities', 'Удобства'], ['/offersList', 'Оферти'], ['/contact', 'Контакти']];
const adminLinks = [['/room', 'Стаи'], ['/offersList', 'Оферти'], ['/create', 'Нова стая'], ['/createOffer', 'Нова оферта'], ['/bookings', 'Резервации'], ['/messages', 'Съобщения'], ['/logout', 'Изход']];

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const { user } = useAuth();
    const { pathname } = useLocation();
    const toggle = useRef(null);
    useEffect(() => { setMenuOpen(false); if (!window.location.hash) window.scrollTo({ top: 0, behavior: 'instant' }); }, [pathname]);
    const closeOnEscape = (event) => {
        if (event.key === 'Escape') { setMenuOpen(false); toggle.current?.focus(); }
    };
    return (
        <header id="header" className="hotel-header" onKeyDown={closeOnEscape}>
            <Link to="/" className="hotel-brand" aria-label="Тодорини къщи — начало"><img src="/img/logo1.jpg" alt="" /><span>Тодорини къщи<small>Копривщица · Семеен хотел</small></span></Link>
            <button ref={toggle} className="hotel-menu-toggle" type="button" aria-label={menuOpen ? "Затвори менюто" : "Отвори менюто"} aria-expanded={menuOpen} aria-controls="hotel-navigation" onClick={() => setMenuOpen(!menuOpen)}><span>{menuOpen ? 'Затвори' : 'Меню'}</span><span aria-hidden="true">{menuOpen ? '×' : '☰'}</span></button>
            <nav id="hotel-navigation" className={`hotel-navigation ${menuOpen ? 'is-open' : ''}`} aria-label="Основна навигация">
                {(user.email ? adminLinks : guestLinks).map(([to, label]) => <NavLink key={to} to={to} end onClick={() => setMenuOpen(false)}>{label}</NavLink>)}
                {!user.email && <Link to="/booking" className="header-booking" onClick={() => setMenuOpen(false)}>Резервирайте <span aria-hidden="true">↗</span></Link>}
            </nav>
        </header>
    );
}
