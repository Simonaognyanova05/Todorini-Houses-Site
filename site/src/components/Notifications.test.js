import { act, fireEvent, render, screen } from '@testing-library/react';
import Notifications from './Notifications';
import { notify, confirmAction, answerConfirmation, dismissNotice, getSnapshot } from '../services/notifications';

afterEach(() => {
    act(() => { getSnapshot().notices.forEach(notice => dismissNotice(notice.id)); answerConfirmation(false); });
    jest.useRealTimers();
});

test('success messages dismiss automatically while errors remain until dismissed', () => {
    jest.useFakeTimers();
    render(<Notifications />);
    act(() => { notify('Запазено', 'success'); notify('Опитайте отново'); });
    expect(screen.getByRole('status')).toHaveTextContent('Запазено');
    expect(screen.getByRole('alert')).toHaveTextContent('Опитайте отново');
    act(() => jest.advanceTimersByTime(7000));
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
    expect(screen.getByRole('alert')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Затвори известието' }));
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
});

test('confirmation waits for explicit consent and Escape cancels and restores focus', async () => {
    const trigger = document.createElement('button');
    document.body.appendChild(trigger); trigger.focus();
    render(<Notifications />);
    let pending;
    act(() => { pending = confirmAction('Изтриване?'); });
    expect(screen.getByRole('alertdialog')).toHaveTextContent('Изтриване?');
    expect(screen.getByRole('button', { name: 'Отказ' })).toHaveFocus();
    fireEvent.keyDown(document, { key: 'Escape' });
    await expect(pending).resolves.toBe(false);
    expect(trigger).toHaveFocus();
    act(() => { pending = confirmAction('Изтриване?'); });
    fireEvent.click(screen.getByRole('button', { name: 'Потвърди' }));
    await expect(pending).resolves.toBe(true);
    expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument();
    trigger.remove();
});

test('concurrent confirmation requests cannot replace a pending decision', async () => {
    render(<Notifications />);
    let first;
    act(() => { first = confirmAction('Първо действие'); });
    await expect(confirmAction('Второ действие')).resolves.toBe(false);
    expect(screen.getByRole('alertdialog')).toHaveTextContent('Първо действие');
    fireEvent.click(screen.getByRole('button', { name: 'Отказ' }));
    await expect(first).resolves.toBe(false);
});