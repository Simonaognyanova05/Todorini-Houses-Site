import { confirmAction } from '../services/notifications';
import { useCallback, useEffect, useRef, useState } from 'react';
import { getReservations } from '../services/getReservations';
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import emailjs from 'emailjs-com';
import { AdminHeading, AdminState } from './AdminShell';

emailjs.init('UGtKXqGnR4WTiD8xP');

function formatDate(value) {
    const date = value?.toDate ? value.toDate() : new Date(value || NaN);
    return Number.isNaN(date.getTime()) ? 'Няма дата' : date.toLocaleDateString('bg-BG', { timeZone: 'UTC' });
}

export default function Reservations() {
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [search, setSearch] = useState('');
    const [busy, setBusy] = useState(null);
    const [notice, setNotice] = useState(null);
    const actionLock = useRef(false);

    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(false);
        try { setReservations(await getReservations()); }
        catch { setError(true); }
        finally { setLoading(false); }
    }, []);
    useEffect(() => { fetchData(); }, [fetchData]);

    const handleDelete = async (id) => {
        if (actionLock.current || !(await confirmAction('Да приключим ли резервацията? Тя ще бъде премахната от списъка.'))) return;
        actionLock.current = true;
        setBusy(id);
        setNotice(null);
        try {
            await deleteDoc(doc(db, 'bookings', id));
            setReservations(items => items.filter(item => item.id !== id));
            setNotice({ text: 'Резервацията е приключена и премахната от списъка.' });
        } catch {
            setNotice({ error: true, text: 'Резервацията не беше премахната. Опитайте отново.' });
        } finally { actionLock.current = false; setBusy(null); }
    };

    const sendEmail = async (reservation, isConfirmed) => {
        if (actionLock.current) return;
        if (!reservation.email) {
            setNotice({ error: true, text: 'Няма въведен имейл за тази резервация.' });
            return;
        }
        actionLock.current = true;
        setBusy(reservation.id);
        setNotice(null);
        const name = `${reservation.fname} ${reservation.lname}`;
        const templateParams = {
            to_email: reservation.email,
            to_name: name,
            message: isConfirmed
                ? `Здравейте, ${name},\n\nВашата резервация от ${formatDate(reservation.date1)} до ${formatDate(reservation.date2)} е потвърдена.\n\nБлагодарим Ви, че избрахте нас!`
                : `Здравейте, ${name},\n\nСъжаляваме, но за избраните дати - от ${formatDate(reservation.date1)} до ${formatDate(reservation.date2)} нямаме свободни места.\n\nБлагодарим Ви за разбирането, ще Ви очакваме отново!`,
        };
        try {
            await emailjs.send('service_m0ezr1g', 'template_2x2mrfc', templateParams);
            setNotice({ text: `Имейлът за ${isConfirmed ? 'потвърждение' : 'отказ'} е изпратен до ${name}.` });
        } catch {
            setNotice({ error: true, text: 'Имейлът не беше изпратен. Опитайте отново.' });
        } finally { actionLock.current = false; setBusy(null); }
    };

    const query = search.trim().toLocaleLowerCase('bg');
    const filtered = reservations.filter(item =>
        [item.fname, item.lname, item.email, item.mobile, item.type].join(' ').toLocaleLowerCase('bg').includes(query));
    const guestCount = reservations.reduce((sum, item) => sum + (Number(item.guests) || 0), 0);

    return (
        <>
            <AdminHeading eyebrow="Грижа за гостите" title="Резервации" description="Всеки престой започва с добро посрещане." />
            {!loading && !error && <div className="admin-summary"><div><span>Резервации в списъка</span><strong>{reservations.length.toString().padStart(2, '0')}</strong></div><div><span>Гости общо</span><strong>{guestCount.toString().padStart(2, '0')}</strong></div><p>Прегледайте заявката и изпратете потвърждение или отказ по имейл.</p></div>}
            {notice && <div className={`admin-notice ${notice.error ? 'is-error' : ''}`} role={notice.error ? 'alert' : 'status'}>{notice.text}</div>}
            {loading || error ? <AdminState loading={loading} error={error} onRetry={fetchData} /> : (
                <>
                    <div className="admin-toolbar"><label className="admin-search"><i className="fa fa-search" aria-hidden="true" /><span className="sr-only">Търсене на резервации</span><input type="search" placeholder="Име, имейл или телефон" value={search} onChange={event => setSearch(event.target.value)} /></label><span aria-live="polite">{filtered.length} от {reservations.length} резервации</span></div>
                    {!filtered.length ? <AdminState empty={query ? 'Няма съвпадащи резервации' : 'Все още няма резервации'} /> : (
                        <div className="admin-reservations">
                            {filtered.map(res => (
                                <article className="admin-reservation" key={res.id}>
                                    <div className="admin-guest"><span className="admin-initials" aria-hidden="true">{res.fname?.charAt(0)}{res.lname?.charAt(0)}</span><div><h2>{res.fname} {res.lname}</h2><a href={res.email ? `mailto:${res.email}` : undefined}>{res.email || 'Няма имейл'}</a><a href={res.mobile ? `tel:${res.mobile}` : undefined}>{res.mobile || 'Няма телефон'}</a></div></div>
                                    <div className="admin-stay"><div><span>Настаняване</span><strong>{formatDate(res.date1)}</strong></div><span className="admin-date-arrow" aria-hidden="true">→</span><div><span>Напускане</span><strong>{formatDate(res.date2)}</strong></div><p>{res.type} <span>·</span> {res.guests} гости</p></div>
                                    {res.requirements && <div className="admin-request"><span>Бележка от госта</span><p>{res.requirements}</p></div>}
                                    <div className="admin-card-actions"><span className="admin-action-label">{busy === res.id ? 'Обработване…' : 'Отговор до госта'}</span><button className="admin-button" disabled={busy !== null} onClick={() => sendEmail(res, true)}>Имейл за потвърждение</button><button className="admin-button secondary" disabled={busy !== null} onClick={() => sendEmail(res, false)}>Имейл за отказ</button><button className="admin-text-button" disabled={busy !== null} onClick={() => handleDelete(res.id)}>Приключи и премахни</button></div>
                                </article>
                            ))}
                        </div>
                    )}
                </>
            )}
        </>
    );
}
