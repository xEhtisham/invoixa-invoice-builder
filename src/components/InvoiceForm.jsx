import { CURRENCIES } from '../utils/formatCurrency';

export default function InvoiceForm({
    businessName, setBusinessName,
    businessEmail, setBusinessEmail,
    clientName, setClientName,
    clientEmail, setClientEmail,
    invoiceNumber,
    issueDate, setIssueDate,
    dueDate, setDueDate,
    currency, setCurrency,
    discount, setDiscount,
    tax, setTax,
    notes, setNotes,
    subtotal,
    discountAmount,
    taxAmount,
    total,
    formatAmount,
}) {
    return (
        <div className="space-y-5">
            {/* Header */}
            <div>
                <h2 className="text-2xl font-bold text-gray-900">Create New Invoice</h2>
                <p className="text-sm text-gray-500 mt-1">Draft #{invoiceNumber}</p>
            </div>

            {/* Business & Client Details */}
            <div className="bg-white rounded-xl border border-gray-100 p-5 sm:p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Business Details */}
                    <div>
                        <h3 className="text-sm font-semibold text-gray-800 mb-4 flex items-center gap-2">
                            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                            Business Details
                        </h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-medium text-gray-600 mb-1.5 hover:text-gray-900 transition-colors cursor-pointer">Business Name</label>
                                <input
                                    type="text"
                                    value={businessName}
                                    onChange={(e) => setBusinessName(e.target.value)}
                                    placeholder="Invoixa SaaS Solutions"
                                    className="w-full px-3 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all hover:bg-white hover:shadow-sm hover:border-primary-300"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-600 mb-1.5 hover:text-gray-900 transition-colors cursor-pointer">Email Address</label>
                                <input
                                    type="email"
                                    value={businessEmail}
                                    onChange={(e) => setBusinessEmail(e.target.value)}
                                    placeholder="billing@invoixa.com"
                                    className="w-full px-3 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all hover:bg-white hover:shadow-sm hover:border-primary-300"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Client Details */}
                    <div>
                        <h3 className="text-sm font-semibold text-gray-800 mb-4 flex items-center gap-2">
                            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            Client Details
                        </h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-medium text-gray-600 mb-1.5 hover:text-gray-900 transition-colors cursor-pointer">Client Name</label>
                                <input
                                    type="text"
                                    value={clientName}
                                    onChange={(e) => setClientName(e.target.value)}
                                    placeholder="Enter client name"
                                    className="w-full px-3 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all hover:bg-white hover:shadow-sm hover:border-primary-300"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-600 mb-1.5 hover:text-gray-900 transition-colors cursor-pointer">Client Email</label>
                                <input
                                    type="email"
                                    value={clientEmail}
                                    onChange={(e) => setClientEmail(e.target.value)}
                                    placeholder="client@example.com"
                                    className="w-full px-3 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all hover:bg-white hover:shadow-sm hover:border-primary-300"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Invoice Details: Dates & Currency */}
            <div className="bg-white rounded-xl border border-gray-100 p-5 sm:p-6 transition-all hover:shadow-md hover:border-primary-100">
                <h3 className="text-sm font-semibold text-gray-800 mb-4">Invoice Details</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1.5 hover:text-gray-900 transition-colors cursor-pointer">Issue Date</label>
                        <input
                            type="date"
                            value={issueDate}
                            onChange={(e) => setIssueDate(e.target.value)}
                            className="w-full px-3 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all hover:bg-white hover:shadow-sm hover:border-primary-300 cursor-pointer"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1.5 hover:text-gray-900 transition-colors cursor-pointer">Due Date</label>
                        <input
                            type="date"
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                            className="w-full px-3 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all hover:bg-white hover:shadow-sm hover:border-primary-300 cursor-pointer"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1.5 hover:text-gray-900 transition-colors cursor-pointer">Currency</label>
                        <select
                            value={currency}
                            onChange={(e) => setCurrency(e.target.value)}
                            className="w-full px-3 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all hover:bg-white hover:shadow-sm hover:border-primary-300 cursor-pointer"
                        >
                            {CURRENCIES.map((c) => (
                                <option key={c.code} value={c.code}>{c.label}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Notes & Totals */}
            <div className="bg-white rounded-xl border border-gray-100 p-5 sm:p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Notes */}
                    <div>
                        <div className="flex justify-between items-center mb-3">
                            <h3 className="text-sm font-semibold text-gray-800">Notes & Terms</h3>
                            <span className="text-xs text-gray-400">{notes.length}/200</span>
                        </div>
                        <textarea
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            maxLength={200}
                            placeholder="Payment is due within 30 days. Thanks for your business!"
                            rows={4}
                            className="w-full px-3 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all hover:bg-white hover:shadow-sm hover:border-primary-300 resize-y"
                        />
                    </div>

                    {/* Totals */}
                    <div className="space-y-3">
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-gray-600">Subtotal</span>
                            <span className="font-medium text-gray-900">{formatAmount(subtotal)}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm gap-3">
                            <label className="text-gray-600 hover:text-gray-900 transition-colors cursor-pointer">Discount (%)</label>
                            <input
                                type="number"
                                min="0"
                                max="100"
                                value={discount}
                                onChange={(e) => setDiscount(Math.max(0, Math.min(100, Number(e.target.value))))}
                                className="w-20 px-2 py-1.5 text-sm text-right bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent hover:bg-white hover:shadow-sm hover:border-primary-300 transition-all"
                            />
                        </div>
                        <div className="flex justify-between items-center text-sm gap-3">
                            <label className="text-gray-600 hover:text-gray-900 transition-colors cursor-pointer">Tax (%)</label>
                            <input
                                type="number"
                                min="0"
                                max="100"
                                value={tax}
                                onChange={(e) => setTax(Math.max(0, Math.min(100, Number(e.target.value))))}
                                className="w-20 px-2 py-1.5 text-sm text-right bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent hover:bg-white hover:shadow-sm hover:border-primary-300 transition-all"
                            />
                        </div>
                        <div className="border-t border-gray-100 pt-3 flex justify-between items-center">
                            <span className="text-base font-semibold text-gray-900">Total Amount</span>
                            <span className="text-xl font-bold text-primary-600 break-all pl-4 text-right">{formatAmount(total)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
