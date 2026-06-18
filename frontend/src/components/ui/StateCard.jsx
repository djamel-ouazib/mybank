/**
 * StateCard component
 * Displays a labeled financial metric (e.g. total balance, total in, total out).
 *
 * @param {string} text - The label describing the metric (e.g. "Total Balance")
 * @param {string|number} data - The value to display (e.g. "1 200,00 €" or 500)
 */
export default function StateCard({ text, data }) {
    return (
        <div className="w-full h-full">
            {/* Metric label */}
            <p className="text-zinc-400 text-sm">{text}</p>
            {/* Metric value prefixed with € symbol */}
            <p className="font-bold text-3xl">€{data}</p>
        </div>
    )
}
