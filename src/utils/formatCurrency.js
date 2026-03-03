const CURRENCY_LOCALES = {
    USD: 'en-US',
    EUR: 'de-DE',
    GBP: 'en-GB',
    PKR: 'en-PK',
};

export function formatCurrency(amount, currencyCode = 'USD') {
    const locale = CURRENCY_LOCALES[currencyCode] || 'en-US';
    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currencyCode,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(Number(amount) || 0);
}

export const CURRENCIES = [
    { code: 'USD', label: 'USD ($)' },
    { code: 'EUR', label: 'EUR (€)' },
    { code: 'GBP', label: 'GBP (£)' },
    { code: 'PKR', label: 'PKR (₨)' },
];
