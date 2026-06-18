const CAT_STYLES = {
    food: {
        selected: 'bg-amber-50 border-amber-500 text-amber-800',
    },
    transport: {
        selected: 'bg-blue-50 border-blue-500 text-blue-800',
    },
    shopping: {
        selected: 'bg-pink-50 border-pink-500 text-pink-800',
    },
    bills: {
        selected: 'bg-purple-50 border-purple-500 text-purple-800',
    },
    health: {
        selected: 'bg-green-50 border-green-500 text-green-800',
    },
    income: {
        selected: 'bg-teal-50 border-teal-500 text-teal-800',
    },
}

export default function OperationCard({ label, date, category, amount }) {
    const cat = CAT_STYLES[category?.toLowerCase()] || {
        selected: 'bg-zinc-50 border-zinc-300 text-zinc-700',
    }

    const formattedAmount =
        typeof amount === 'number' ? amount.toFixed(2) : '0.00'

    return (
        <div className="w-full h-full text-xs space-y-3 bg-white p-2 rounded-xl border border-zinc-100 shadow-sm">
            {/* HEADER */}
            <div className="flex justify-between px-2">
                <p className="font-semibold text-[17px]">{label}</p>

                <p className="text-green-700 font-semibold text-xl">
                    {formattedAmount} €
                </p>
            </div>

            {/* FOOTER */}
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
