import { looksGenerated } from './spamValidation';
export const ROOM_TYPES = ['Една обща', 'Две отделни'];

export function prepareBooking(input, now = new Date()) {
    const data = {};
    for (const key of ['fname', 'lname', 'mobile', 'email', 'requirements', 'type']) {
        data[key] = typeof input[key] === 'string' ? input[key].trim() : '';
    }
    if ([data.fname, data.lname].some(name => name.length < 2 || name.length > 100)) {
        throw new Error('Името и фамилията трябва да са между 2 и 100 знака.');
    }
    if ([data.fname, data.lname, data.requirements].some(looksGenerated)) {
        throw new Error('Текстът изглежда автоматично генериран. Моля, напишете ясно съобщение.');
    }
    const urls = data.requirements.match(/(?:https?:\/\/|www\.)\S+/gi) || [];
    if (urls.length > 1) throw new Error('Допълнителните изисквания могат да съдържат най-много един интернет адрес.');
    data.email = data.email.toLowerCase();
    data.mobile = data.mobile.replace(/[\s()-]/g, '');
    if (!/^\+?[0-9]{8,15}$/.test(data.mobile)) throw new Error('Въведете валиден телефонен номер.');
    if (data.email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) throw new Error('Въведете валиден имейл.');
    data.guests = Number(input.guests);
    if (!Number.isInteger(data.guests) || data.guests < 1 || data.guests > 4) throw new Error('Изберете между 1 и 4 гости.');
    if (!ROOM_TYPES.includes(data.type)) throw new Error('Изберете тип стая от списъка.');
    if (data.requirements.length > 2000) throw new Error('Допълнителните изисквания трябва да са до 2000 знака.');
    for (const key of ['date1', 'date2']) {
        const value = input[key];
        const date = new Date(value + 'T00:00:00Z');
        if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value) ||
            !Number.isFinite(date.getTime()) || date.toISOString().slice(0, 10) !== value) throw new Error('Въведете валидни дати.');
        data[key] = date;
    }
    const parts = new Intl.DateTimeFormat('en', {
        timeZone: 'Europe/Sofia', year: 'numeric', month: '2-digit', day: '2-digit',
    }).formatToParts(now);
    const part = type => parts.find(p => p.type === type).value;
    const today = part('year') + '-' + part('month') + '-' + part('day');
    if (input.date1 < today) throw new Error('Датата на настаняване не може да е в миналото.');
    if (data.date2 <= data.date1) throw new Error('Напускането трябва да е след настаняването.');
    return data;
}