import { formatCurrency } from '../utils/formatCurrency';

export default function SummaryCards({ subtotal, paid, pending, currency }) {
    const cards = [
        {
            title: 'Total Revenue',
            value: subtotal,
            change: '+12.5% vs last month',
            changeType: 'positive',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
            ),
            iconBg: 'bg-green-100',
            iconColor: 'text-green-600',
        },
        {
            title: 'Paid Invoices',
            value: paid,
            change: '+5.2% vs last month',
            changeType: 'positive',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            iconBg: 'bg-blue-100',
            iconColor: 'text-blue-600',
        },
        {
            title: 'Pending',
            value: pending,
            change: '-2.1% vs last month',
            changeType: 'negative',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            iconBg: 'bg-orange-100',
            iconColor: 'text-orange-600',
        },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {cards.map((card) => (
                <div
                    key={card.title}
                    className="bg-white rounded-xl border border-gray-100 p-4 sm:p-5 hover:shadow-md transition-shadow duration-200"
                >
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-medium text-gray-500">{card.title}</span>
                        <div className={`w-9 h-9 ${card.iconBg} ${card.iconColor} rounded-lg flex items-center justify-center`}>
                            {card.icon}
                        </div>
                    </div>
                    <div className="text-2xl sm:text-xl font-bold text-gray-900 mb-1">
                        {formatCurrency(card.value, currency)}
                    </div>
                    <span
                        className={`text-xs font-medium ${card.changeType === 'positive' ? 'text-green-600' : 'text-red-500'
                            }`}
                    >
                        {card.change}
                    </span>
                </div>
            ))}
        </div>
    );
}
