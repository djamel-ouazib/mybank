import { useState } from 'react'
import Button from './Button'

/**
 * Available transaction categories with their display label and emoji icon.
 */
const CATEGORIES = [
    { key: 'food', label: 'Food', icon: '🍔' },
    { key: 'transport', label: 'Transport', icon: '🚌' },
    { key: 'shopping', label: 'Shopping', icon: '🛍️' },
    { key: 'bills', label: 'Bills', icon: '🧾' },
    { key: 'health', label: 'Health', icon: '❤️' },
    { key: 'income', label: 'Income', icon: '💰' },
]

/**
 * CSS class mappings for each category badge.
 * `selected` is applied when the category is active.
 * `base` is applied when the category is not selected.
 */
const CAT_STYLES = {
    food: {
        selected: 'bg-amber-50 border-amber-500 text-amber-800',
        base: 'border-zinc-200',
    },
    transport: {
        selected: 'bg-blue-50 border-blue-500 text-blue-800',
        base: 'border-zinc-200',
    },
    shopping: {
        selected: 'bg-pink-50 border-pink-500 text-pink-800',
        base: 'border-zinc-200',
    },
    bills: {
        selected: 'bg-purple-50 border-purple-500 text-purple-800',
        base: 'border-zinc-200',
    },
    health: {
        selected: 'bg-green-50 border-green-500 text-green-800',
        base: 'border-zinc-200',
    },
    income: {
        selected: 'bg-teal-50 border-teal-500 text-teal-800',
        base: 'border-zinc-200',
    },
}

/**
 * AddOperationModal component
 * Modal form to create a new financial operation (income or expense).
 * Submits the form data to the API and notifies the parent on success.
 *
 * @param {function} onClose - Callback called when the modal is closed (Cancel or ✕ button)
 * @param {function} onSaved - Callback called with the saved operation data after successful API call
 */
export default function AddOperationModal({ onClose, onSaved }) {
    // Form state: holds all field values
    const [form, setForm] = useState({
        label: '',
        amount: '',
        date: new Date().toISOString().split('T')[0], // Default to today
        category: 'food',
        type: 'expense',
    })

    // Loading state: true while the API request is in progress
    const [loading, setLoading] = useState(false)

    // Error state: holds the error message to display, null if no error
    const [error, setError] = useState(null)

    /**
     * Helper to update a single field in the form state.
     * @param {string} key - The field name to update
     * @param {*} val - The new value
     */
    const set = (key, val) => setForm((f) => ({ ...f, [key]: val }))

    /**
     * Handles form submission.
     * Validates required fields, sends a POST request to the API,
     * and calls onSaved/onClose on success or sets an error on failure.
     */
    const handleSubmit = async () => {
        // Validate that all required fields are filled
        if (!form.label || !form.amount || !form.date) {
            setError('Please fill in all fields.')
            return
        }

        setError(null)
        setLoading(true)

        try {
            const res = await fetch('/api/operations', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...form,
                    amount: parseFloat(form.amount), // Convert string to float
                }),
            })

            if (!res.ok) throw new Error('Server error')

            const data = await res.json()
            onSaved?.(data)
            onClose?.()
        } catch (e) {
            console.error(e)
            setError('Failed to save. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white w-90 rounded-2xl shadow-xl flex flex-col overflow-hidden">
                {/* Modal header: title and close button */}
                <div className="flex items-center justify-between px-5 py-3.5 border-b border-zinc-100">
                    <span className="font-semibold text-sm text-zinc-800">
                        New operation
                    </span>
                    <button
                        onClick={onClose}
                        className="w-7 h-7 flex items-center justify-center rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-500 transition"
                    >
                        ✕
                    </button>
                </div>

                {/* Modal body: form fields */}
                <div className="flex flex-col gap-4 px-5 py-4">
                    {/* Type toggle: expense or income */}
                    <div className="grid grid-cols-2 gap-2">
                        {['expense', 'income'].map((t) => (
                            <button
                                key={t}
                                onClick={() => set('type', t)}
                                className={`h-9 rounded-xl text-xs font-semibold border-[1.5px] transition
                                    ${
                                        form.type === t
                                            ? t === 'expense'
                                                ? 'bg-red-50 border-red-400 text-red-700'
                                                : 'bg-green-50 border-green-500 text-green-700'
                                            : 'border-zinc-200 text-zinc-400 hover:bg-zinc-50'
                                    }`}
                            >
                                {t === 'expense' ? '↓ Expense' : '↑ Income'}
                            </button>
                        ))}
                    </div>

                    {/* Label field */}
                    <div className="flex flex-col gap-1">
                        <label className="text-[11px] font-semibold uppercase tracking-wide text-zinc-400">
                            Label
                        </label>
                        <input
                            type="text"
                            value={form.label}
                            onChange={(e) => set('label', e.target.value)}
                            placeholder="e.g. Supermarket Carrefour"
                            className="h-9 border border-zinc-200 rounded-xl px-3 text-sm outline-none focus:border-[#156064] transition"
                        />
                    </div>

                    {/* Amount and date fields side by side */}
                    <div className="grid grid-cols-2 gap-3">
                        <div className="flex flex-col gap-1">
                            <label className="text-[11px] font-semibold uppercase tracking-wide text-zinc-400">
                                Amount (€)
                            </label>
                            <input
                                type="number"
                                value={form.amount}
                                onChange={(e) => set('amount', e.target.value)}
                                placeholder="0.00"
                                min="0"
                                step="0.01"
                                className="h-9 border border-zinc-200 rounded-xl px-3 text-sm outline-none focus:border-[#156064] transition"
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-[11px] font-semibold uppercase tracking-wide text-zinc-400">
                                Date
                            </label>
                            <input
                                type="date"
                                value={form.date}
                                onChange={(e) => set('date', e.target.value)}
                                className="h-9 border border-zinc-200 rounded-xl px-3 text-sm outline-none focus:border-[#156064] transition"
                            />
                        </div>
                    </div>

                    {/* Category selector grid */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-[11px] font-semibold uppercase tracking-wide text-zinc-400">
                            Category
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                            {CATEGORIES.map((cat) => (
                                <button
                                    key={cat.key}
                                    onClick={() => set('category', cat.key)}
                                    className={`flex flex-col items-center gap-1 py-2.5 rounded-xl border-[1.5px] text-[11px] font-semibold transition
                                        ${
                                            form.category === cat.key
                                                ? CAT_STYLES[cat.key].selected
                                                : 'border-zinc-200 text-zinc-400 hover:bg-zinc-50'
                                        }`}
                                >
                                    <span className="text-lg">{cat.icon}</span>
                                    {cat.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Error message displayed when validation or API call fails */}
                    {error && (
                        <p className="text-xs text-red-600 bg-red-50 rounded-lg px-3 py-2">
                            {error}
                        </p>
                    )}
                </div>

                {/* Modal footer: save and cancel buttons */}
                <div className="flex flex-col gap-2 px-5 pb-5">
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="h-10 rounded-xl bg-[#156064] text-white text-sm font-semibold hover:bg-[#0f4a4d] disabled:opacity-50 transition"
                    >
                        {/* Show loading state while API request is in progress */}
                        {loading ? 'Saving…' : 'Save operation'}
                    </button>
                    <button
                        onClick={onClose}
                        className="h-9 rounded-xl border-[1.5px] border-red-200 bg-red-50 text-red-600 text-sm font-semibold hover:bg-red-100 transition"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    )
}
