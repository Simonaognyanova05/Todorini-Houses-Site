import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';
import { subscribe, getSnapshot, dismissNotice, answerConfirmation } from '../services/notifications';
import './Notifications.css';

function Notice({ notice }) {
    const [paused, setPaused] = useState(false);
    useEffect(() => {
        if (paused || notice.tone === 'error') return undefined;
        const timer = setTimeout(() => dismissNotice(notice.id), 6500);
        return () => clearTimeout(timer);
    }, [notice.id, notice.tone, paused]);
    return <div className={`site-notice site-notice--${notice.tone}`} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocus={() => setPaused(true)} onBlur={() => setPaused(false)}>
        <span className="site-notice__icon" aria-hidden="true">{notice.tone === 'success' ? '✓' : '!'}</span>
        <div role={notice.tone === 'error' ? 'alert' : 'status'}><strong>{notice.tone === 'success' ? 'Готово' : 'Проверете отново'}</strong><p>{notice.message}</p></div>
        <button type="button" onClick={() => dismissNotice(notice.id)} aria-label="Затвори известието">×</button>
    </div>;
}

function Confirmation({ confirmation }) {
    const panel = useRef(null);
    useEffect(() => {
        const previousFocus = document.activeElement;
        const overflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        const buttons = panel.current.querySelectorAll('button');
        buttons[0].focus();
        const handleKey = event => {
            if (event.key === 'Escape') { event.preventDefault(); answerConfirmation(false); }
            if (event.key === 'Tab') {
                if (event.shiftKey && document.activeElement === buttons[0]) { event.preventDefault(); buttons[1].focus(); }
                else if (!event.shiftKey && document.activeElement === buttons[1]) { event.preventDefault(); buttons[0].focus(); }
            }
        };
        document.addEventListener('keydown', handleKey);
        return () => {
            document.removeEventListener('keydown', handleKey);
            document.body.style.overflow = overflow;
            previousFocus?.focus();
        };
    }, []);
    return <div className="site-confirm-backdrop" onClick={event => { if (event.target === event.currentTarget) answerConfirmation(false); }}>
        <section ref={panel} className="site-confirm" role="alertdialog" aria-modal="true" aria-labelledby="site-confirm-title" aria-describedby="site-confirm-message">
            <span className="site-confirm__eyebrow">ТОДОРИНИ КЪЩИ</span>
            <h2 id="site-confirm-title">Потвърждение</h2>
            <p id="site-confirm-message">{confirmation.message}</p>
            <div className="site-confirm__actions"><button type="button" onClick={() => answerConfirmation(false)}>Отказ</button><button type="button" onClick={() => answerConfirmation(true)}>Потвърди</button></div>
        </section>
    </div>;
}

export default function Notifications() {
    const { notices, confirmation } = useSyncExternalStore(subscribe, getSnapshot);
    return createPortal(<>
        <div className="site-notices" aria-label="Известия">{notices.map(notice => <Notice key={notice.id} notice={notice} />)}</div>
        {confirmation && <Confirmation confirmation={confirmation} />}
    </>, document.body);
}