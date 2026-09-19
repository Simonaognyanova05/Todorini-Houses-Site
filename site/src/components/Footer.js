import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer id="footer" className="hotel-footer">
            <div className="footer-main">
                <div className="footer-brand"><span className="eyebrow">Копривщица, България</span><Link to="/">Тодорини къщи</Link><p>Семеен хотел и механа<br />„Под старата круша“</p></div>
                <div><h2>Открийте</h2><Link to="/room">Стаи и настаняване</Link><Link to="/mehana">Механата</Link><Link to="/spa">Релакс център</Link><Link to="/offersList">Специални оферти</Link></div>
                <div><h2>Планирайте престоя си</h2><a href="tel:+359887349901">0887 349 901</a><Link to="/contact">Свържете се с нас</Link><p>ул. „Любен Каравелов“ 22<br />Копривщица</p><Link to="/booking">Направете резервация ↗</Link></div>
            </div>
            <div className="footer-bottom"><span>© {new Date().getFullYear()} Тодорини къщи. Всички права запазени.</span><Link to="/login">Вход за администратор</Link></div>
        </footer>
    );
}
