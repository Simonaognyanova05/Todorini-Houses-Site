import { confirmAction } from '../services/notifications';
jest.mock('../services/notifications', () => ({ confirmAction: jest.fn(), notify: jest.fn() }));
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteDoc } from 'firebase/firestore';
import emailjs from 'emailjs-com';
import Reservations from './Reservations';
import Messages from './Messages';
import CatalogEditor from './CatalogEditor';
import { getReservations } from '../services/getReservations';
import { getMessages } from '../services/getMessages';
import { getRoomById } from '../services/getRoomById';
import { update } from '../services/update';
import { createOffer } from '../services/createOffer';

jest.mock('react-router-dom', () => ({
    Link: ({ to, children, ...props }) => <a href={to} {...props}>{children}</a>,
    NavLink: ({ to, children }) => <a href={to}>{children}</a>,
    useLocation: () => ({ pathname: '/bookings' }),
    useNavigate: jest.fn(),
    useParams: jest.fn(),
}), { virtual: true });
jest.mock('../config/firebase', () => ({ db: {} }));
jest.mock('firebase/firestore', () => ({ doc: jest.fn((db, collection, id) => ({ collection, id })), deleteDoc: jest.fn() }));
jest.mock('emailjs-com', () => ({ init: jest.fn(), send: jest.fn() }));
jest.mock('../services/getReservations', () => ({ getReservations: jest.fn() }));
jest.mock('../services/getMessages', () => ({ getMessages: jest.fn() }));
jest.mock('../services/getRoomById', () => ({ getRoomById: jest.fn() }));
jest.mock('../services/getOfferById', () => ({ getOfferById: jest.fn() }));
jest.mock('../services/create', () => ({ create: jest.fn() }));
jest.mock('../services/createOffer', () => ({ createOffer: jest.fn() }));
jest.mock('../services/update', () => ({ update: jest.fn() }));
jest.mock('../services/updateOffer', () => ({ updateOffer: jest.fn() }));

const booking = {
    id: 'booking-1', fname: 'Мария', lname: 'Иванова', email: 'guest@example.com',
    mobile: '0888123456', date1: { toDate: () => new Date('2026-10-20T00:00:00Z') },
    date2: '2026-10-23', type: 'Две отделни', guests: 2, requirements: 'Детско легло, моля.',
};
const navigate = jest.fn();
beforeEach(() => {
    jest.clearAllMocks();
    useNavigate.mockReturnValue(navigate);
    useParams.mockReturnValue({ roomId: 'room-1' });
    getReservations.mockResolvedValue([booking]);
    getMessages.mockResolvedValue([]);
    emailjs.send.mockResolvedValue({});
    deleteDoc.mockResolvedValue(undefined);
});

test('searches reservations without sending email or modifying records', async () => {
    render(<Reservations />);
    await screen.findByText('Мария Иванова');
    fireEvent.change(screen.getByRole('searchbox'), { target: { value: '0888123456' } });
    expect(screen.getByText('Мария Иванова')).toBeInTheDocument();
    fireEvent.change(screen.getByRole('searchbox'), { target: { value: 'няма такъв гост' } });
    expect(screen.queryByText('Мария Иванова')).not.toBeInTheDocument();
    expect(screen.getByText('Няма съвпадащи резервации')).toBeInTheDocument();
    expect(emailjs.send).not.toHaveBeenCalled();
    expect(deleteDoc).not.toHaveBeenCalled();
});

test('sends a confirmation only for the selected guest and preserves the reservation', async () => {
    render(<Reservations />);
    fireEvent.click(await screen.findByRole('button', { name: 'Имейл за потвърждение' }));
    await screen.findByText('Имейлът за потвърждение е изпратен до Мария Иванова.');
    expect(emailjs.send).toHaveBeenCalledTimes(1);
    expect(emailjs.send).toHaveBeenCalledWith('service_m0ezr1g', 'template_2x2mrfc', expect.objectContaining({
        to_email: 'guest@example.com', to_name: 'Мария Иванова',
        message: expect.stringContaining('е потвърдена'),
    }));
    expect(screen.getByText('Мария Иванова')).toBeInTheDocument();
    expect(deleteDoc).not.toHaveBeenCalled();
});

test('keeps a reservation when completion is cancelled', async () => {
    confirmAction.mockResolvedValue(false);
    render(<Reservations />);
    fireEvent.click(await screen.findByRole('button', { name: 'Приключи и премахни' }));
    expect(deleteDoc).not.toHaveBeenCalled();
    expect(screen.getByText('Мария Иванова')).toBeInTheDocument();

});

test('shows a load error rather than an empty inbox and permits retry', async () => {
    getMessages.mockRejectedValueOnce(new Error('offline')).mockResolvedValueOnce([]);
    render(<Messages />);
    await screen.findByRole('alert');
    expect(screen.queryByText('Нямате нови съобщения')).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Опитайте отново' }));
    await screen.findByText('Нямате нови съобщения');
    expect(getMessages).toHaveBeenCalledTimes(2);
});

test('preserves the message and reports an unsuccessful deletion', async () => {
    getMessages.mockResolvedValue([{ id: 'message-1', name: 'Гост', email: 'guest@example.com', subject: 'Въпрос', message: 'Имате ли свободни стаи?' }]);
    deleteDoc.mockRejectedValueOnce(new Error('offline'));
    confirmAction.mockResolvedValue(true);
    render(<Messages />);
    fireEvent.click(await screen.findByRole('button', { name: 'Прочетено · премахни' }));
    await screen.findByRole('alert');
    expect(screen.getByText('Имате ли свободни стаи?')).toBeInTheDocument();

});

test('editing a room preserves all six image addresses and submits only editable fields', async () => {
    const data = { type: 'Двойна стая', description: 'Стая с изглед към двора', size: '24', beds: '2', priceEuro: '80', priceLv: '156.47' };
    for (let index = 1; index <= 6; index++) data['img' + index] = 'https://example.com/photo-' + index + '.jpg';
    getRoomById.mockResolvedValue({ id: 'room-1', createdAt: 'original-date', ...data });
    update.mockResolvedValue({ status: 200, message: 'Запазено' });
    render(<CatalogEditor kind="room" editing />);
    await screen.findByDisplayValue('Двойна стая');
    fireEvent.change(screen.getByLabelText('Описание'), { target: { value: 'Обновено описание' } });
    fireEvent.click(screen.getByRole('button', { name: 'Запази промените' }));
    await waitFor(() => expect(update).toHaveBeenCalledWith('room-1', { ...data, description: 'Обновено описание' }));
    expect(navigate).toHaveBeenCalledWith('/room', { state: { adminNotice: 'Запазено' } });
});

test('keeps entered offer data when saving fails', async () => {
    createOffer.mockResolvedValue({ status: 500, message: 'Неуспешно запазване' });
    render(<CatalogEditor kind="offer" />);
    const fields = { 'Повод / име на офертата': 'Есен в Копривщица', 'Описание': 'Две нощувки', 'Цена в евро': '120', 'Цена в лева': '234.7', 'Основна снимка': '/img/bigfotos3.jpg' };
    Object.entries(fields).forEach(([label, value]) => fireEvent.change(screen.getByLabelText(label), { target: { value } }));
    fireEvent.click(screen.getByRole('button', { name: 'Създай офертата' }));
    await screen.findByRole('alert');
    expect(screen.getByDisplayValue('Есен в Копривщица')).toBeInTheDocument();
    expect(navigate).not.toHaveBeenCalled();
    expect(screen.getByRole('button', { name: 'Създай офертата' })).toBeEnabled();
});
