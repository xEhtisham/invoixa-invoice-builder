import { calcLineTotal } from '../utils/calculations';

export default function LineItemsTable({ lineItems, setLineItems, formatAmount }) {
    const addItem = () => {
        setLineItems([
            ...lineItems,
            { id: Date.now(), description: '', quantity: 1, price: 0 },
        ]);
    };

    const removeItem = (id) => {
        if (lineItems.length <= 1) return;
        setLineItems(lineItems.filter((item) => item.id !== id));
    };

    const updateItem = (id, field, value) => {
        setLineItems(
            lineItems.map((item) =>
                item.id === id ? { ...item, [field]: value } : item
            )
        );
    };

    return (
        <div className="bg-white rounded-xl border border-gray-100 p-5 sm:p-6">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-gray-800">Line Items</h3>
                <button
                    onClick={addItem}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-primary-600 bg-primary-50 hover:bg-primary-100 rounded-lg transition-colors duration-200"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Add Item
                </button>
            </div>

            <div className="overflow-x-auto -mx-5 sm:-mx-6 px-5 sm:px-6">
                <table className="w-full min-w-[500px]">
                    <thead>
                        <tr className="border-b border-gray-100">
                            <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider pb-3 pr-4 w-[45%]">
                                Description
                            </th>
                            <th className="text-center text-xs font-semibold text-gray-500 uppercase tracking-wider pb-3 px-3 w-[12%]">
                                Qty
                            </th>
                            <th className="text-right text-xs font-semibold text-gray-500 uppercase tracking-wider pb-3 px-3 w-[18%]">
                                Price
                            </th>
                            <th className="text-right text-xs font-semibold text-gray-500 uppercase tracking-wider pb-3 px-3 w-[18%]">
                                Total
                            </th>
                            <th className="pb-3 w-[7%]"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {lineItems.map((item) => (
                            <tr key={item.id} className="group hover:bg-gray-50 transition-colors">
                                <td className="py-3 pr-4 max-w-[200px]">
                                    <input
                                        type="text"
                                        value={item.description}
                                        onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                                        placeholder="Item description"
                                        className="w-full text-sm text-gray-800 bg-transparent border border-transparent focus:border-gray-200 hover:bg-white hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-lg px-2 py-1.5 placeholder-gray-400 break-words transition-all"
                                    />
                                </td>
                                <td className="py-3 px-3">
                                    <input
                                        type="number"
                                        min="1"
                                        value={item.quantity}
                                        onChange={(e) => updateItem(item.id, 'quantity', Math.max(1, Number(e.target.value)))}
                                        className="w-full text-sm text-center text-gray-800 bg-gray-50 border border-gray-200 rounded-lg py-1.5 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent hover:bg-white hover:shadow-sm hover:border-primary-300 transition-all"
                                    />
                                </td>
                                <td className="py-3 px-3">
                                    <input
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        value={item.price}
                                        onChange={(e) => updateItem(item.id, 'price', Math.max(0, Number(e.target.value)))}
                                        className="w-full text-sm text-right text-gray-800 bg-gray-50 border border-gray-200 rounded-lg py-1.5 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent hover:bg-white hover:shadow-sm hover:border-primary-300 transition-all"
                                    />
                                </td>
                                <td className="py-3 px-3 text-right text-sm font-medium text-gray-900 break-all w-[18%]">
                                    {formatAmount(calcLineTotal(item.quantity, item.price))}
                                </td>
                                <td className="py-3 pl-2">
                                    <button
                                        onClick={() => removeItem(item.id)}
                                        className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                                        title="Remove item"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
