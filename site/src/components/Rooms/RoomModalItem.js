import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import "./RoomViewer.css";

export default function RoomModalItem({ room, onClose }) {
    const images = [room.img1, room.img2, room.img3, room.img4, room.img5, room.img6].filter(Boolean);
    const [active, setActive] = useState(0);
    const dialog = useRef(null);
    const touchStart = useRef(null);
    const count = images.length;
    const move = direction => setActive(index => (index + direction + count) % count);

    useEffect(() => {
        const previousFocus = document.activeElement;
        const overflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        dialog.current.querySelector("button").focus();
        const handleKey = event => {
            if (event.key === "Escape") onClose();
            if (count > 1 && ["ArrowLeft", "ArrowRight"].includes(event.key)) {
                event.preventDefault();
                setActive(index => (index + (event.key === "ArrowRight" ? 1 : -1) + count) % count);
            }
            if (event.key === "Tab") {
                const controls = dialog.current.querySelectorAll("button, a[href]");
                const first = controls[0];
                const last = controls[controls.length - 1];
                if (event.shiftKey && document.activeElement === first) {
                    event.preventDefault(); last.focus();
                } else if (!event.shiftKey && document.activeElement === last) {
                    event.preventDefault(); first.focus();
                }
            }
        };
        document.addEventListener("keydown", handleKey);
        return () => {
            document.body.style.overflow = overflow;
            document.removeEventListener("keydown", handleKey);
            previousFocus?.focus();
        };
    }, [count, onClose]);

    return createPortal(
        <div className="room-viewer" onClick={event => { if (event.target === event.currentTarget) onClose(); }}>
            <section ref={dialog} className="room-viewer__dialog" role="dialog" aria-modal="true" aria-labelledby={`viewer-title-${room.id}`}>
                <button type="button" className="room-viewer__close" onClick={onClose} aria-label="Затвори галерията">×</button>
                <div className="room-viewer__media">
                    <div className="room-viewer__stage" onTouchStart={event => { touchStart.current = event.touches[0].clientX; }} onTouchEnd={event => {
                        if (touchStart.current !== null && count > 1) {
                            const distance = touchStart.current - event.changedTouches[0].clientX;
                            if (Math.abs(distance) > 50) move(distance > 0 ? 1 : -1);
                        }
                        touchStart.current = null;
                    }}>
                        {count ? <img src={images[active]} alt={`${room.type} — снимка ${active + 1}`} /> : <p>Снимките ще бъдат добавени скоро.</p>}
                        {count > 1 && <>
                            <button type="button" className="room-viewer__arrow room-viewer__arrow--prev" onClick={() => move(-1)} aria-label="Предишна снимка">‹</button>
                            <button type="button" className="room-viewer__arrow room-viewer__arrow--next" onClick={() => move(1)} aria-label="Следваща снимка">›</button>
                        </>}
                        {count > 0 && <span className="room-viewer__count" aria-live="polite">{String(active + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}</span>}
                    </div>
                    <div className="room-viewer__thumbnails" aria-label="Снимки на стаята">
                        {images.map((src, index) => <button type="button" key={index} aria-label={`Покажи снимка ${index + 1}`} aria-pressed={index === active} onClick={() => setActive(index)}><img src={src} alt="" /></button>)}
                    </div>
                </div>
                <div className="room-viewer__details">
                    <span className="room-viewer__eyebrow">ТОДОРИНИ КЪЩИ · НАСТАНЯВАНЕ</span>
                    <h2 id={`viewer-title-${room.id}`}>{room.type}</h2>
                    <div className="room-viewer__facts"><span>{room.size} кв. м.</span><span>{room.beds} легла</span></div>
                    <p className="room-viewer__description">{room.description}</p>
                    <div className="room-viewer__reservation">
                        <span className="room-viewer__eyebrow">ЦЕНА ЗА ПОМЕЩЕНИЕ</span>
                        <p className="room-viewer__price">€{room.priceEuro} <span>{room.priceLv} лв.</span></p>
                        <Link to="/booking" onClick={onClose} className="room-viewer__book">Резервирай престоя си <span aria-hidden="true">↗</span></Link>
                    </div>
                </div>
            </section>
        </div>, document.body
    );
}