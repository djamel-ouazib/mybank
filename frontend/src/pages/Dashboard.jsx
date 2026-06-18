import { useState, useEffect } from 'react'
import AddOperationModal from '../components/ui/AddOperationModal'
import Button from '../components/ui/Button'
import StateCard from '../components/ui/StateCard'
import OperationCard from '../components/ui/OperationCard'

export default function Dashboard() {
    const [showModal, setShowModal] = useState(false)
    const [operations, setOperations] = useState([])
    const [loading, setLoading] = useState(true)

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
    const totalIn = operations
        .filter((op) => op.type === 'income')
        .reduce((sum, op) => sum + Number(op.amount), 0)

    const totalOut = operations
        .filter((op) => op.type === 'expense')
        .reduce((sum, op) => sum + Number(op.amount), 0)

    const net = totalIn - totalOut

    const balance = totalIn - totalOut
    const currentMonthYear = new Date().toLocaleString('en-US', {
        month: 'long',
        year: 'numeric',
    })
    const format = (value) =>
        new Intl.NumberFormat('fr-FR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(value)
    return (
        <div>
            <div className="h-32 rounded-xl text-white border bg-linear-to-br from-[#0D2C2E] to-[#156064] p-4 mb-3">
                <StateCard
                    text={`Total Balance ${currentMonthYear}`}
                    data={`${format(balance)} €`}
                />
            </div>
            <div className="h-22 flex gap-5 text-[20px] mb-2">
                <div className="bg-white w-full border text-green-600 border-gray-200 rounded-2xl h-full p-4">
                    <StateCard text="Total In " data={totalIn} />
                </div>
                <div className="bg-white w-full border border-gray-200 text-red-600 rounded-2xl h-full p-4">
                    <StateCard text="Total Out" data={totalOut} />
                </div>
                <div className="bg-white w-full border border-gray-200 text-green-600 rounded-2xl h-full p-4">
                    <StateCard text="net" data={net} />
                </div>
            </div>
            <div className="flex justify-between p-4">
                <p className="font-semibold">operation</p>
                <div
                    className="bg-[#156064] text-white py-2 px-4 rounded-2xl"
                    onClick={() => {
                        setShowModal(true)
                    }}
                >
                    <Button text={'+ add operation'}></Button>
                </div>
            </div>
            {showModal && (
                <AddOperationModal
                    onClose={() => setShowModal(false)}
                    onSaved={(data) => {
                        console.log('Operation saved:', data)
                        setShowModal(false)
                    }}
                />
            )}
            <section>
                <div className="space-y-6">
                    {operations.map((operation) => (
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
