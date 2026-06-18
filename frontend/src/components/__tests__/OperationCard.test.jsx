/**
 * Tests for the OperationCard component.
 * Verifies that operation details are correctly displayed
 * and that edge cases (unknown category, missing amount) are handled.
 */
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import OperationCard from '../ui/OperationCard'

describe('OperationCard', () => {
    // Verifies that all main fields are rendered correctly
    it('displays label, date, category and formatted amount', () => {
        render(
            <OperationCard
                label="Supermarket Carrefour"
                date="2025-01-05"
                category="food"
                amount={120.5}
            />
        )
        expect(screen.getByText('Supermarket Carrefour')).toBeInTheDocument()
        expect(screen.getByText('2025-01-05')).toBeInTheDocument()
        expect(screen.getByText('food')).toBeInTheDocument()
        expect(screen.getByText('120.50 €')).toBeInTheDocument()
    })

    // Verifies the fallback value when amount is undefined
    it('displays 0.00 € when amount is not provided', () => {
        render(
            <OperationCard
                label="Test"
                date="2025-01-01"
                category="bills"
                amount={undefined}
            />
        )
        expect(screen.getByText('0.00 €')).toBeInTheDocument()
    })

    // Verifies that an unknown category does not crash the component
    it('renders without crashing when category is unknown', () => {
        render(
            <OperationCard
                label="Test"
                date="2025-01-01"
                category="unknown"
                amount={50}
            />
        )
        expect(screen.getByText('Test')).toBeInTheDocument()
    })
})
