/**
 * Tests for the AddOperationModal component.
 * Verifies form rendering, validation behavior, and user interactions.
 */
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import AddOperationModal from '../ui/AddOperationModal'

describe('AddOperationModal', () => {
    // Verifies that the modal renders all expected form elements
    it('renders the form with all fields', () => {
        render(<AddOperationModal onClose={vi.fn()} onSaved={vi.fn()} />)
        expect(screen.getByText('New operation')).toBeInTheDocument()
        expect(
            screen.getByPlaceholderText('e.g. Supermarket Carrefour')
        ).toBeInTheDocument()
        expect(screen.getByPlaceholderText('0.00')).toBeInTheDocument()
    })

    // Verifies that submitting an empty form triggers a validation error
    it('shows a validation error when the form is submitted empty', async () => {
        render(<AddOperationModal onClose={vi.fn()} onSaved={vi.fn()} />)
        fireEvent.click(screen.getByText('Save operation'))
        expect(
            await screen.findByText('Please fill in all fields.')
        ).toBeInTheDocument()
    })

    // Verifies that clicking Cancel triggers the onClose callback
    it('calls onClose when Cancel button is clicked', () => {
        const onClose = vi.fn()
        render(<AddOperationModal onClose={onClose} onSaved={vi.fn()} />)
        fireEvent.click(screen.getByText('Cancel'))
        expect(onClose).toHaveBeenCalledOnce()
    })

    // Verifies that clicking the ✕ icon also triggers the onClose callback
    it('calls onClose when the ✕ close button is clicked', () => {
        const onClose = vi.fn()
        render(<AddOperationModal onClose={onClose} onSaved={vi.fn()} />)
        fireEvent.click(screen.getByText('✕'))
        expect(onClose).toHaveBeenCalledOnce()
    })
})
