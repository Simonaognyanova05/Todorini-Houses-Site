export function looksGenerated(value) {
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

