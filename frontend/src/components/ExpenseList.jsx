function ExpenseList({ expenses }) {
    if (expenses.length === 0) {
        return <p>No expenses</p>
    }
    return (
        <ul>
            {expenses.map((e) => (
                <li key={e.id}>{e.label}</li>
            ))}
        </ul>
    )
}

export default ExpenseList
