/**
 * Tests for the Button component.
 * Verifies that the button renders correctly with and without props.
 */
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Button from '../ui/Button'

describe('Button', () => {
    // Verifies that the text prop is correctly displayed inside the button
    it('renders the text passed as prop', () => {
        render(<Button text="+ add operation" />)
        expect(screen.getByText('+ add operation')).toBeInTheDocument()
    })

    // Verifies that the button element exists even when no text is provided
    it('renders an empty button when no text is provided', () => {
        render(<Button />)
        expect(screen.getByRole('button')).toBeInTheDocument()
    })
})
