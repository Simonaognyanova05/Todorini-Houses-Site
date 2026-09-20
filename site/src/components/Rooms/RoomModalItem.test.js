import { fireEvent, render, screen } from '@testing-library/react';
import RoomModalItem from './RoomModalItem';
jest.mock('react-router-dom', () => ({ Link: ({ to, children, ...props }) => <a href={to} {...props}>{children}</a> }), { virtual: true });
const room = { id: 'suite', type: 'Suite', size: 32, beds: 2, priceEuro: 80, priceLv: 156, ...Object.fromEntries([1,2,3,4,5,6].map(n => [`img${n}`, `/photo-${n}.jpg`])) };

test('all photos remain reachable with buttons, thumbnails and keyboard, including wraparound', () => {
    render(<RoomModalItem room={room} onClose={jest.fn()} />);
    expect(screen.getByRole('img')).toHaveAttribute('src', '/photo-1.jpg');
    fireEvent.click(screen.getByRole('button', { name: 'Предишна снимка' }));
    expect(screen.getByRole('img')).toHaveAttribute('src', '/photo-6.jpg');
    fireEvent.keyDown(document, { key: 'ArrowRight' });
    expect(screen.getByRole('img')).toHaveAttribute('src', '/photo-1.jpg');
    for (let n = 1; n <= 6; n++) {
        fireEvent.click(screen.getByRole('button', { name: `Покажи снимка ${n}` }));
        expect(screen.getByRole('img')).toHaveAttribute('src', `/photo-${n}.jpg`);
    }
});

test('contains focus, closes with Escape and restores focus and scrolling after unmount', () => {
    const trigger = document.createElement('button');
    document.body.appendChild(trigger);
    trigger.focus();
    const onClose = jest.fn();
    const { unmount } = render(<RoomModalItem room={room} onClose={onClose} />);
    const close = screen.getByRole('button', { name: 'Затвори галерията' });
    expect(close).toHaveFocus();
    expect(document.body.style.overflow).toBe('hidden');
    fireEvent.keyDown(document, { key: 'Tab', shiftKey: true });
    expect(screen.getByRole('link')).toHaveFocus();
    fireEvent.keyDown(document, { key: 'Tab' });
    expect(close).toHaveFocus();
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).toHaveBeenCalledTimes(1);
    unmount();
    expect(trigger).toHaveFocus();
    expect(document.body.style.overflow).toBe('');
    trigger.remove();
});

test('supports swipe and closes from the backdrop', () => {
    const onClose = jest.fn();
    render(<RoomModalItem room={room} onClose={onClose} />);
    const stage = screen.getByRole('img').parentElement;
    fireEvent.touchStart(stage, { touches: [{ clientX: 200 }] });
    fireEvent.touchEnd(stage, { changedTouches: [{ clientX: 50 }] });
    expect(screen.getByRole('img')).toHaveAttribute('src', '/photo-2.jpg');
    fireEvent.click(screen.getByRole('dialog').parentElement);
    expect(onClose).toHaveBeenCalledTimes(1);
});