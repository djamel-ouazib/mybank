/**
 * Category styles mapping
 * Each key corresponds to a transaction category.
 * The `selected` class defines the visual style for that category badge.
 */
const CAT_STYLES = {
    food: { selected: 'bg-amber-50 border-amber-500 text-amber-800' },
    transport: { selected: 'bg-blue-50 border-blue-500 text-blue-800' },
    shopping: { selected: 'bg-pink-50 border-pink-500 text-pink-800' },
    bills: { selected: 'bg-purple-50 border-purple-500 text-purple-800' },
    health: { selected: 'bg-green-50 border-green-500 text-green-800' },
    income: { selected: 'bg-teal-50 border-teal-500 text-teal-800' },
}

/**
 * OperationCard component
 * Displays a single financial operation with its label, amount, date and category.
 *
 * @param {string} label - The name or description of the operation (e.g. "Supermarket Carrefour")
 * @param {string} date - The date of the operation in ISO format (e.g. "2025-01-05")
 * @param {string} category - The category key (e.g. "food", "transport")
 * @param {number} amount - The amount of the operation in euros
 */
export default function OperationCard({ label, date, category, amount }) {
    // Get the style for the given category, fallback to neutral style if unknown
    const cat = CAT_STYLES[category?.toLowerCase()] || {
        selected: 'bg-zinc-50 border-zinc-300 text-zinc-700',
    }

    // Format amount to 2 decimal places, default to "0.00" if not a valid number
    const formattedAmount =
        typeof amount === 'number' ? amount.toFixed(2) : '0.00'

    return (
        <div className="w-full h-full text-xs space-y-3 bg-white p-2 rounded-xl border border-zinc-100 shadow-sm">
            {/* Header: operation label and amount */}
            <div className="flex justify-between px-2">
                <p className="font-semibold text-[17px]">{label}</p>
                <p className="text-green-700 font-semibold text-xl">
                    {formattedAmount} €
                </p>
            </div>

            {/* Footer: date and category badge */}
            <div className="flex gap-1 px-2 items-center">
                <p className="text-zinc-400">{date}</p>
                <p
                    className={`font-bold w-25 text-center rounded-2xl p-0.5 border ${cat.selected}`}
                >
                    {category}
                </p>
            </div>
        </div>
    )
}
