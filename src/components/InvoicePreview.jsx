import { calcLineTotal } from '../utils/calculations';

export default function InvoicePreview({
    businessName,
    businessEmail,
    clientName,
    clientEmail,
    invoiceNumber,
    issueDate,
    dueDate,
    lineItems,
    subtotal,
    discountAmount,
    discount,
    taxAmount,
    tax,
    total,
    notes,
    formatAmount,
    onDownloadPDF,
}) {
    const formatDate = (dateStr) => {
        if (!dateStr) return '—';
        return new Date(dateStr + 'T00:00:00').toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    return (
        <div className="space-y-4">
            {/* Preview Header */}
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <svg className="w-5 h-5 text-primary-500" fill="currentColor" viewBox="0 0 20 20">
                        <circle cx="10" cy="10" r="10" />
                        <path d="M10 5a5 5 0 100 10 5 5 0 000-10z" fill="white" />
                        <circle cx="10" cy="10" r="3" fill="currentColor" />
                    </svg>
                    Live Preview
                </h3>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => window.print()}
                        className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                        title="Print"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                        </svg>
                    </button>
                    <button
                        onClick={onDownloadPDF}
                        className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                        title="Download PDF"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Invoice Preview Card */}
            <div
                id="invoice-preview"
                className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden"
            >
                <div className="p-6 sm:p-8 space-y-6">
                    {/* Invoice Header */}
                    <div className="flex justify-between pb-4 relative">
                        {/* Left Side: Logo & Business Info */}
                        <div className="flex items-start gap-3 w-[65%]">
                            <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <div className="min-w-0 pr-4">
                                <h4 className="text-base font-bold text-gray-900 uppercase break-words leading-tight mb-1">
                                    {businessName || 'INVOIXA'}
                                </h4>
                                <p className="text-xs text-gray-500 break-words">{businessEmail || '123 Business Avenue, Tech City'}</p>
                            </div>
                        </div>

                        {/* Right Side: Invoice Title & Dates */}
                        <div className="text-right w-[35%]">
                            <p className="text-3xl font-extrabold text-primary-100 tracking-wide select-none leading-none">INVOICE</p>
                            <p className="text-xs font-semibold text-gray-700 mt-2">{invoiceNumber}</p>
                            <p className="text-xs text-gray-400 mt-0.5">Date: {formatDate(issueDate)}</p>
                        </div>
                    </div>

                    {/* Billed To / Due Date */}
                    <div className="border-t border-gray-100 pt-5">
                        <div className="flex justify-between items-start">
                            <div className="pr-4 min-w-0">
                                <p className="text-xs font-bold text-primary-600 uppercase tracking-wider mb-1">Billed To</p>
                                <p className="text-sm font-semibold text-gray-900 break-words">{clientName || 'Client Name Here'}</p>
                                <p className="text-xs text-gray-500 mt-0.5 break-all">{clientEmail || '456 Client Street'}</p>
                            </div>
                            <div className="text-right flex-shrink-0 pl-4">
                                <p className="text-xs font-bold text-primary-600 uppercase tracking-wider mb-1">Due Date</p>
                                <p className="text-sm font-semibold text-gray-900">{formatDate(dueDate)}</p>
                            </div>
                        </div>
                    </div>

                    {/* Items Table */}
                    <div className="border-t border-gray-100 pt-5">
                        <table className="w-full table-fixed">
                            <thead>
                                <tr className="border-b border-gray-100">
                                    <th className="w-[40%] text-left text-xs font-bold text-gray-500 uppercase tracking-wider pb-2 pr-2">
                                        Item Description
                                    </th>
                                    <th className="w-[15%] text-center text-xs font-bold text-gray-500 uppercase tracking-wider pb-2 px-1">
                                        Qty
                                    </th>
                                    <th className="w-[20%] text-right text-xs font-bold text-gray-500 uppercase tracking-wider pb-2 px-1">
                                        Rate
                                    </th>
                                    <th className="w-[25%] text-right text-xs font-bold text-gray-500 uppercase tracking-wider pb-2 pl-2">
                                        Amount
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {lineItems
                                    .filter((item) => item.description || item.price > 0)
                                    .map((item) => (
                                        <tr key={item.id}>
                                            <td className="py-2.5 text-sm text-gray-800 break-words pr-2">
                                                {item.description || 'Untitled Item'}
                                            </td>
                                            <td className="py-2.5 text-sm text-center text-gray-600 px-1 truncate">
                                                {item.quantity}
                                            </td>
                                            <td className="py-2.5 text-sm text-right text-gray-600 px-1 truncate">
                                                {formatAmount(item.price)}
                                            </td>
                                            <td className="py-2.5 text-sm text-right font-semibold text-gray-900 break-all pl-2">
                                                {formatAmount(calcLineTotal(item.quantity, item.price))}
                                            </td>
                                        </tr>
                                    ))}
                                {lineItems.filter((item) => item.description || item.price > 0).length === 0 && (
                                    <tr>
                                        <td colSpan={4} className="py-6 text-center text-sm text-gray-400">
                                            No items added yet
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Totals */}
                    <div className="border-t border-gray-100 pt-4 flex justify-end">
                        <div className="flex flex-col items-end space-y-1.5 w-full max-w-[250px]">
                            <div className="flex justify-between w-full text-sm">
                                <span className="text-gray-500 flex-shrink-0 pr-4">Subtotal</span>
                                <span className="font-medium text-gray-800 break-all text-right">{formatAmount(subtotal)}</span>
                            </div>
                            {Number(discount) > 0 && (
                                <div className="flex justify-between w-full text-sm">
                                    <span className="text-gray-500 flex-shrink-0 pr-4">Discount ({discount}%)</span>
                                    <span className="font-medium text-red-500 break-all text-right">-{formatAmount(discountAmount)}</span>
                                </div>
                            )}
                            {Number(tax) > 0 && (
                                <div className="flex justify-between w-full text-sm">
                                    <span className="text-gray-500 flex-shrink-0 pr-4">Tax ({tax}%)</span>
                                    <span className="font-medium text-gray-800 break-all text-right">{formatAmount(taxAmount)}</span>
                                </div>
                            )}
                            <div className="flex justify-between w-full pt-2 border-t border-gray-200">
                                <span className="text-base font-bold text-gray-900 flex-shrink-0 pr-4">Total</span>
                                <span className="text-lg font-bold text-primary-600 break-all text-right">{formatAmount(total)}</span>
                            </div>
                        </div>
                    </div>

                    {/* Notes */}
                    {notes && (
                        <div className="border-t border-gray-100 pt-4">
                            <p className="text-xs text-primary-500 italic break-words whitespace-pre-wrap">{notes}</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
                <button
                    onClick={onDownloadPDF}
                    className="flex-1 py-3 px-4 bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold rounded-xl transition-all duration-200 hover:translate-y-[-1px] hover:shadow-lg active:translate-y-0"
                >
                    Send Invoice
                </button>
                <button className="px-6 py-3 border border-gray-200 hover:bg-gray-50 text-gray-700 text-sm font-semibold rounded-xl transition-all duration-200 hover:translate-y-[-1px] active:translate-y-0">
                    Save Draft
                </button>
            </div>
        </div>
    );
}
