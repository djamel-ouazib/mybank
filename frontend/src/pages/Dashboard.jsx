import { useState, useEffect } from 'react'
import AddOperationModal from '../components/ui/AddOperationModal'
import Button from '../components/ui/Button'
import StateCard from '../components/ui/StateCard'
import OperationCard from '../components/ui/OperationCard'

/**
 * Dashboard page
 * Main view of the application. Displays the current balance, total income,
 * total expenses, net result, and the list of all recorded operations.
 * Also handles opening the "Add operation" modal and refreshing local state
 * once a new operation has been saved.
 */
export default function Dashboard() {
    // Controls whether the AddOperationModal is visible
    const [showModal, setShowModal] = useState(false)

    // Holds the list of operations fetched from the API
    const [operations, setOperations] = useState([])

    // True while the initial fetch of operations is in progress
    const [loading, setLoading] = useState(true)

    // Fetch all operations from the backend once, when the component mounts
    useEffect(() => {
        const fetchOperations = async () => {
            try {
                const res = await fetch('/api/operations')
                if (!res.ok) throw new Error('Failed to fetch operations')

                const data = await res.json()
                setOperations(data)
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)
            }
        }

        fetchOperations()
    }, [])

    // Sum of all operations of type "income"
    const totalIn = operations
        .filter((op) => op.type === 'income')
        .reduce((sum, op) => sum + Number(op.amount), 0)

    // Sum of all operations of type "expense"
    const totalOut = operations
        .filter((op) => op.type === 'expense')
        .reduce((sum, op) => sum + Number(op.amount), 0)

    // Net result for the period (income minus expenses)
    const net = totalIn - totalOut

    // Current balance, identical to net for now (no carried-over balance yet)
    const balance = totalIn - totalOut

    // Human-readable current month and year, used in the balance card title
    const currentMonthYear = new Date().toLocaleString('en-US', {
        month: 'long',
        year: 'numeric',
    })

    // Formats a number as a French-style currency amount (e.g. "1 234,50")
    const format = (value) =>
        new Intl.NumberFormat('fr-FR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(value)

    return (
        <div>
            {/* Main balance card (dark background, per brand guidelines) */}
            <div className="h-32 rounded-xl text-white border bg-primary p-4 mb-3">
                <StateCard
                    text={`Total Balance ${currentMonthYear}`}
                    data={`${format(balance)} €`}
                />
            </div>

            {/* Summary row: total income, total expenses, net result */}
            <div className="h-22 flex gap-5 text-[20px] mb-2">
                <div className="bg-white w-full border text-success border-gray-200 rounded-2xl h-full p-4">
                    <StateCard text="Total In " data={totalIn} />
                </div>
                <div className="bg-white w-full border border-gray-200 text-error rounded-2xl h-full p-4">
                    <StateCard text="Total Out" data={totalOut} />
                </div>
                <div className="bg-white w-full border border-gray-200 text-success rounded-2xl h-full p-4">
                    <StateCard text="net" data={net} />
                </div>
            </div>

            {/* Section header with the "Add operation" call-to-action */}
            <div className="flex justify-between p-4">
                <p className="font-semibold">operation</p>
                <div
                    className="bg-accent text-white py-2 px-4 rounded-2xl"
                    onClick={() => {
                        setShowModal(true)
                    }}
                >
                    <Button text={'+ add operation'}></Button>
                </div>
            </div>

            {/* Modal for creating a new operation, shown on demand */}
            {showModal && (
                <AddOperationModal
                    onClose={() => setShowModal(false)}
                    onSaved={(data) => {
                        console.log('Operation saved:', data)
                        setShowModal(false)
                    }}
                />
            )}

            {/* List of operations, with a loading state while fetching */}
            <section>
                <div className="space-y-6">
                    {loading && (
                        <p className="text-sm text-zinc-400">
                            Loading operations…
                        </p>
                    )}
                    {!loading &&
                        operations.map((operation) => (
                            <OperationCard
                                key={operation.id}
                                label={operation.label}
                                date={operation.date}
                                category={operation.category}
                                amount={operation.amount}
                            />
                        ))}
                </div>
            </section>
        </div>
    )
}
