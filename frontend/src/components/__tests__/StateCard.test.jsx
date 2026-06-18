/**
 * Tests for the StateCard component.
 * Verifies that financial metrics are correctly displayed.
 */
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import StateCard from '../ui/StateCard'

describe('StateCard', () => {
    // Verifies that both the label and the value are rendered
    it('displays the label and the data value', () => {
        render(<StateCard text="Total Balance" data="1 200,00 €" />)
        expect(screen.getByText('Total Balance')).toBeInTheDocument()
        expect(screen.getByText('€1 200,00 €')).toBeInTheDocument()
    })

    // Verifies that numeric values are prefixed with the € symbol
    it('displays numeric amount prefixed with €', () => {
        render(<StateCard text="Total In" data={500} />)
        expect(screen.getByText('€500')).toBeInTheDocument()
    })
})
