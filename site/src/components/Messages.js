import { useCallback, useEffect, useRef, useState } from 'react';
import { getMessages } from '../services/getMessages';
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { AdminHeading, AdminState } from './AdminShell';

export default function Messages() {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [search, setSearch] = useState('');
    const [busy, setBusy] = useState(null);
    const [notice, setNotice] = useState(null);
    const actionLock = useRef(false);
    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(false);
        try { setMessages(await getMessages()); }
        catch { setError(true); }
        finally { setLoading(false); }
    }, []);
    useEffect(() => { fetchData(); }, [fetchData]);

    const handleDelete = async (id) => {
        if (actionLock.current || !window.confirm('Да премахнем ли прочетеното съобщение от списъка?')) return;
        actionLock.current = true;
        setBusy(id);
        setNotice(null);
        try {
            await deleteDoc(doc(db, 'messages', id));
            setMessages(items => items.filter(item => item.id !== id));
            setNotice({ text: 'Прочетеното съобщение е премахнато от списъка.' });
        } catch { setNotice({ error: true, text: 'Съобщението не беше премахнато. Опитайте отново.' }); }
        finally { actionLock.current = false; setBusy(null); }
    };
    const query = search.trim().toLocaleLowerCase('bg');
    const filtered = messages.filter(item =>
        [item.name, item.email, item.subject, item.message].join(' ').toLocaleLowerCase('bg').includes(query));

    return (
        <>
            <AdminHeading eyebrow="Разговори с гостите" title="Съобщения" description="Въпроси, специални пожелания и всичко преди пристигането." />
            {notice && <div className={`admin-notice ${notice.error ? 'is-error' : ''}`} role={notice.error ? 'alert' : 'status'}>{notice.text}</div>}
            {loading || error ? <AdminState loading={loading} error={error} onRetry={fetchData} /> : (
                <>
                    <div className="admin-toolbar"><label className="admin-search"><i className="fa fa-search" aria-hidden="true" /><span className="sr-only">Търсене на съобщения</span><input type="search" placeholder="Име, тема или съдържание" value={search} onChange={event => setSearch(event.target.value)} /></label><span aria-live="polite">{filtered.length} от {messages.length} съобщения</span></div>
                    {!filtered.length ? <AdminState empty={query ? 'Няма съвпадащи съобщения' : 'Нямате нови съобщения'} /> : (
                        <div className="admin-message-grid">
                            {filtered.map(message => (
                                <article className="admin-message" key={message.id}>
                                    <div className="admin-message-sender"><span className="admin-initials" aria-hidden="true">{message.name?.charAt(0)}</span><div><h2>{message.name}</h2><a href={`mailto:${message.email}`}>{message.email}</a></div><i className="fa fa-envelope-o" aria-hidden="true" /></div>
                                    <h3>{message.subject}</h3><p className="admin-message-body">{message.message}</p>
                                    <div className="admin-message-actions"><a className="admin-text-button" href={`mailto:${message.email}?subject=${encodeURIComponent('Re: ' + (message.subject || ''))}`}>Отговор по имейл ↗</a><button className="admin-text-button muted" disabled={busy !== null} onClick={() => handleDelete(message.id)}>{busy === message.id ? 'Премахване…' : 'Прочетено · премахни'}</button></div>
                                </article>
                            ))}
                        </div>
                    )}
                </>
            )}
        </>
    );
}
