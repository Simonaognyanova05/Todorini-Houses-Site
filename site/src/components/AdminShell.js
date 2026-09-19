import { useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Admin.css';

export default function AdminShell({ children }) {
    const { user } = useAuth();
    const { pathname, state } = useLocation();
    useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }); }, [pathname]);
    const links = [
        ['/bookings', 'Резервации', 'calendar-o'],
        ['/messages', 'Съобщения', 'envelope-o'],
        ['/room', 'Стаи', 'bed'],
        ['/offersList', 'Оферти', 'bookmark-o'],
    ];
    const active = (path) => path === '/room'
        ? pathname === '/room' || pathname === '/create' || pathname.startsWith('/room/')
        : path === '/offersList'
            ? pathname === '/offersList' || pathname === '/createOffer' || pathname.startsWith('/offers/edit/')
            : pathname === path;
    return (
        <div className="admin-shell">
            <a className="skip-link" href="#admin-content">Към съдържанието</a>
            <aside className="admin-sidebar">
                <Link className="admin-brand" to="/"><img src="/img/logo1.jpg" alt="" /><span>Тодорини къщи<small>Управление на хотела</small></span></Link>
                <span className="admin-nav-label">Вашето работно пространство</span>
                <nav aria-label="Административна навигация">
                    {links.map(([to, label, icon]) => <NavLink to={to} key={to} className={() => active(to) ? 'is-current' : ''}><i className={`fa fa-${icon}`} aria-hidden="true" /><span>{label}</span><span className="admin-nav-arrow" aria-hidden="true">↗</span></NavLink>)}
                </nav>
                <div className="admin-sidebar-bottom"><Link to="/">Към сайта <span aria-hidden="true">↗</span></Link><Link to="/logout">Изход от профила</Link><small>Семеен хотел · Копривщица</small></div>
            </aside>
            <div className="admin-workspace">
                <header className="admin-topbar"><span>Тодорини къщи <span className="admin-topbar-divider">/</span> Администрация</span><span className="admin-account"><i className="fa fa-user-o" aria-hidden="true" />{user.email || 'Административен панел'}</span></header>
                <main id="admin-content" className="admin-content" tabIndex={-1}>
                    {state?.adminNotice && <div className="admin-notice" role="status">{state.adminNotice}</div>}
                    {children}
                </main>
            </div>
        </div>
    );
}

export function AdminHeading({ eyebrow, title, description, children }) {
    return <div className="admin-heading"><div><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{description}</p></div>{children && <div className="admin-heading-actions">{children}</div>}</div>;
}

export function AdminState({ loading, error, empty, onRetry }) {
    return <div className="admin-empty" role={error ? 'alert' : 'status'}><span className="admin-empty-mark" aria-hidden="true">{loading ? '···' : error ? '!' : '—'}</span><h2>{loading ? 'Зареждане…' : error ? 'Не успяхме да заредим данните' : empty}</h2><p>{error ? 'Опитайте отново. Проверете дали сте влезли с администраторския си профил.' : loading ? 'Подготвяме информацията за Вас.' : 'Новите записи ще се появят тук.'}</p>{error && onRetry && <button className="admin-button" onClick={onRetry}>Опитайте отново</button>}</div>;
}
