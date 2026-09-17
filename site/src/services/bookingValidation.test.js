import { prepareBooking } from './bookingValidation';

const now = new Date('2026-09-17T12:00:00Z');
const valid = {
    fname: 'Петър', lname: 'Иванов', mobile: '+359 888 123 456', email: 'guest@example.com',
    date1: '2026-09-18', date2: '2026-09-20', guests: '2', type: 'Една обща', requirements: '',
};

test('normalizes a legitimate booking and stores unambiguous dates', () => {
    const data = prepareBooking(valid, now);
    expect(data.mobile).toBe('+359888123456');
    expect(data.guests).toBe(2);
    expect(data.date1.toISOString()).toBe('2026-09-18T00:00:00.000Z');
});

test.each([
    { date1: '1970-05-31' },
    { date1: '2027-02-30' },
    { date1: '2026-09-20' },
    { date2: '2026-09-17' },
    { date1: '09/18/2026' },
    { type: 'AuoIDWVOTReJQmyItFZPE' },
    { guests: '1.5' },
    { guests: '5' },
    { mobile: 'random text' },
    { email: 'invalid' },
    { requirements: 'a'.repeat(2001) },
    { fname: '  ' },
])('rejects invalid booking fields %j', changes => {
    expect(() => prepareBooking({ ...valid, ...changes }, now)).toThrow();
});

test('uses the property date around midnight in Bulgaria', () => {
    const midnight = new Date('2026-09-17T22:00:00Z');
    expect(() => prepareBooking({ ...valid, date1: '2026-09-17' }, midnight)).toThrow();
    expect(() => prepareBooking(valid, midnight)).not.toThrow();
});
test('rejects generated text using the contact form filter', () => {
    expect(() => prepareBooking({ ...valid, requirements: 'JZwyxRFLqnvKgTbUjG' }, now)).toThrow('автоматично');
});
test('rejects multiple links but accepts ordinary optional requirements', () => {
    expect(() => prepareBooking({ ...valid, requirements: 'https://example.com https://example.org' }, now)).toThrow('адрес');
    expect(() => prepareBooking({ ...valid, requirements: 'Детско легло, моля.' }, now)).not.toThrow();
    expect(() => prepareBooking({ ...valid, requirements: 'Без закуска' }, now)).not.toThrow();
});