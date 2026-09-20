import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { create } from '../services/create';
import { createOffer } from '../services/createOffer';
import { update } from '../services/update';
import { updateOffer } from '../services/updateOffer';
import { getRoomById } from '../services/getRoomById';
import { getOfferById } from '../services/getOfferById';
import { AdminHeading, AdminState } from './AdminShell';

export default function CatalogEditor({ kind, editing = false }) {
    const isRoom = kind === 'room';
    const { roomId, id } = useParams();
    const recordId = isRoom ? roomId : id;
    const navigate = useNavigate();
    const [values, setValues] = useState({});
    const [loading, setLoading] = useState(editing);
    const [loadError, setLoadError] = useState(false);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const saveLock = useRef(false);
    const listPath = isRoom ? '/room' : '/offersList';
    const noun = isRoom ? 'стая' : 'оферта';

    useEffect(() => {
        if (!editing) return;
        let active = true;
        setLoading(true);
        setLoadError(false);
        const load = isRoom ? getRoomById : getOfferById;
        load(recordId).then(data => {
            if (!active) return;
            if (data) setValues(data);
            else setLoadError(true);
        }).catch(() => { if (active) setLoadError(true); })
            .finally(() => { if (active) setLoading(false); });
        return () => { active = false; };
    }, [editing, isRoom, recordId]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (saveLock.current) return;
        const data = Object.fromEntries(new FormData(event.currentTarget));
        saveLock.current = true;
        setSaving(true);
        setError('');
        try {
            let result;
            if (editing) result = await (isRoom ? update : updateOffer)(recordId, data);
            else if (isRoom) result = await create(data.type, data.description, data.size, data.beds, data.priceLv, data.priceEuro, data.img1, data.img2, data.img3, data.img4, data.img5, data.img6);
            else result = await createOffer(data.occasion, data.description, data.priceLv, data.priceEuro, data.img1);
            if (result.status === 200) navigate(listPath, { state: { adminNotice: result.message } });
            else setError(result.message || 'Промените не бяха запазени. Опитайте отново.');
        } catch { setError('Промените не бяха запазени. Опитайте отново.'); }
        finally { saveLock.current = false; setSaving(false); }
    };

    const field = (name, label, { wide = false, multiline = false, hint, inputMode } = {}) => {
        const props = {
            id: 'editor-' + name, name, required: true, value: values[name] ?? '',
            onChange: event => setValues(current => ({ ...current, [name]: event.target.value })),
            'aria-describedby': hint ? 'hint-' + name : undefined,
        };
        return <div className={`admin-field ${wide ? 'wide' : ''}`} key={name}><label htmlFor={props.id}>{label}</label>{multiline ? <textarea {...props} rows={5} /> : <input {...props} type="text" inputMode={inputMode} />}{hint && <small id={'hint-' + name}>{hint}</small>}</div>;
    };

    return (
        <>
            <AdminHeading eyebrow={isRoom ? 'Настаняване' : 'Специални предложения'} title={`${editing ? 'Редактиране на' : 'Нова'} ${noun}`} description={editing ? 'Обновете детайлите, които гостите виждат в сайта.' : 'Представете следващото си предложение с внимание към детайла.'}><Link className="admin-button secondary" to={listPath}>← Обратно към {isRoom ? 'стаите' : 'офертите'}</Link></AdminHeading>
            {loading || loadError ? <AdminState loading={loading} error={loadError} /> : (
                <div className="admin-editor-layout">
                    <form className="admin-editor" onSubmit={handleSubmit}>
                        {error && <div className="admin-notice is-error" role="alert">{error}</div>}
                        <fieldset disabled={saving}>
                            <legend className="sr-only">Данни за {isRoom ? 'стаята' : 'офертата'}</legend>
                            <section className="admin-form-section"><div className="admin-section-title"><span>01</span><div><h2>Основна информация</h2><p>Името и описанието на Вашето предложение.</p></div></div><div className="admin-fields">
                                {field(isRoom ? 'type' : 'occasion', isRoom ? 'Тип стая' : 'Повод / име на офертата', { wide: true })}
                                {field('description', 'Описание', { wide: true, multiline: true })}
                                {isRoom && field('size', 'Площ (кв. м)', { inputMode: 'decimal' })}
                                {isRoom && field('beds', 'Брой легла', { inputMode: 'numeric' })}
                            </div></section>
                            <section className="admin-form-section"><div className="admin-section-title"><span>02</span><div><h2>Цени</h2><p>Стойностите, които се показват в сайта.</p></div></div><div className="admin-fields">
                                {field('priceEuro', 'Цена в евро', { inputMode: 'decimal' })}
                                {field('priceLv', 'Цена в лева', { inputMode: 'decimal' })}
                            </div></section>
                            <section className="admin-form-section"><div className="admin-section-title"><span>03</span><div><h2>Снимки</h2><p>{isRoom ? 'Първата снимка е водеща. Останалите са част от галерията.' : 'Снимката представя офертата в сайта.'}</p></div></div><div className="admin-fields">
                                {Array.from({ length: isRoom ? 6 : 1 }, (_, index) => field('img' + (index + 1), index === 0 ? 'Основна снимка' : 'Снимка ' + (index + 1), { wide: true, hint: 'Адрес на изображението' }))}
                            </div></section>
                            <div className="admin-editor-actions"><Link className="admin-text-button" to={listPath}>Отказ</Link><button className="admin-button" type="submit">{saving ? 'Запазване…' : editing ? 'Запази промените' : isRoom ? 'Създай стаята' : 'Създай офертата'}<span aria-hidden="true">↗</span></button></div>
                        </fieldset>
                    </form>
                    <aside className="admin-editor-note"><span className="eyebrow">Малките детайли имат значение</span><h2>Добро първо впечатление.</h2><p>Кратко и ясно описание помага на гостите да изберат по-лесно.</p><div><h3>Описание</h3><p>Разкажете какво включва предложението и за кого е подходящо.</p></div><div><h3>Фотографии</h3><p>Изберете водеща снимка, която показва най-добре атмосферата.</p></div><div><h3>Преди запазване</h3><p>Проверете цените и всички детайли. Промените се показват в сайта след запазване.</p></div></aside>
                </div>
            )}
        </>
    );
}
