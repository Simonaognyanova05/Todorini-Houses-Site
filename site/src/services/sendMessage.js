import { db } from '../config/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const LIMITS = { name: 100, email: 254, subject: 150, message: 2000 };
const URL_PATTERN = /(?:https?:\/\/|www\.)\S+/gi;

function normalize(value) {
    return typeof value === 'string' ? value.trim() : '';
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function looksGenerated(value) {
    const latinTokens = value.match(/[A-Za-z]{12,}/g) || [];

    return latinTokens.some((token) => {
        const upper = (token.match(/[A-Z]/g) || []).length;
        const lower = (token.match(/[a-z]/g) || []).length;
        const vowels = (token.match(/[aeiouy]/gi) || []).length;
        const caseChanges = (token.match(/[a-z][A-Z]|[A-Z][a-z]/g) || []).length;
        const vowelRatio = vowels / token.length;

        return (upper >= 3 && lower >= 5 && caseChanges >= 3)
            || vowelRatio < 0.18
            || /(.)\1{5,}/i.test(token);
    });
}

function validatePayload(payload) {
    const invalidLength = Object.entries(payload).some(([field, value]) => (
        !value || value.length > LIMITS[field]
    ));
    const words = payload.message.match(/\p{L}{2,}/gu) || [];
    const urls = payload.message.match(URL_PATTERN) || [];

    if (invalidLength || !isValidEmail(payload.email)) {
        return "Моля, проверете въведените данни.";
    }
    if (payload.message.length < 15 || words.length < 3) {
        return "Съобщението трябва да съдържа поне 3 думи и 15 символа.";
    }
    if (urls.length > 1) {
        return "Съобщението може да съдържа най-много един интернет адрес.";
    }
    if ([payload.name, payload.subject, payload.message].some(looksGenerated)) {
        return "Текстът изглежда автоматично генериран. Моля, напишете ясно съобщение.";
    }

    return null;
}

export async function sendMessage(name, email, subject, message) {
    const payload = {
        name: normalize(name),
        email: normalize(email).toLowerCase(),
        subject: normalize(subject),
        message: normalize(message),
    };

    const validationError = validatePayload(payload);
    if (validationError) {
        return { status: 400, message: validationError };
    }

    try {
        await addDoc(collection(db, "messages"), {
            ...payload,
            createdAt: serverTimestamp()
        });

        return { status: 200, message: "Съобщението не е изпратено успешно!" };
    } catch (error) {
        console.error("Грешка при създаване на продукта: ", error.message);

        if (error.message.includes("invalid") || error.message.includes("missing")) {
            return { status: 400, message: error.message };
        }

        return { status: 500, message: "Възникна вътрешна грешка!" };
    }
}
