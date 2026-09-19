let state = { notices: [], confirmation: null };
const listeners = new Set();
let nextId = 0;
const publish = next => { state = next; listeners.forEach(listener => listener()); };
export const subscribe = listener => { listeners.add(listener); return () => listeners.delete(listener); };
export const getSnapshot = () => state;
export function dismissNotice(id) {
    publish({ ...state, notices: state.notices.filter(notice => notice.id !== id) });
}
export function notify(message, tone = 'error') {
    const id = ++nextId;
    publish({ ...state, notices: [...state.notices.slice(-3), { id, message, tone }] });
    return id;
}
export function confirmAction(message) {
    if (state.confirmation) return Promise.resolve(false);
    return new Promise(resolve => publish({ ...state, confirmation: { message, resolve } }));
}
export function answerConfirmation(answer) {
    const confirmation = state.confirmation;
    publish({ ...state, confirmation: null });
    confirmation?.resolve(answer);
}