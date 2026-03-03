/**
 * Pure calculation functions for invoice totals.
 * All logic is centralized here — no calculations elsewhere.
 */

export function calcLineTotal(quantity, price) {
    return (Number(quantity) || 0) * (Number(price) || 0);
}

export function calcSubtotal(lineItems) {
    return lineItems.reduce(
        (sum, item) => sum + calcLineTotal(item.quantity, item.price),
        0
    );
}

export function calcDiscountAmount(subtotal, discountPercent) {
    return subtotal * ((Number(discountPercent) || 0) / 100);
}

export function calcTaxAmount(amountAfterDiscount, taxPercent) {
    return amountAfterDiscount * ((Number(taxPercent) || 0) / 100);
}

export function calcTotal(subtotal, discountAmount, taxAmount) {
    return subtotal - discountAmount + taxAmount;
}
