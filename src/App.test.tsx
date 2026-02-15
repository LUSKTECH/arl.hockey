import { render, screen, waitFor } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import App from './App'

describe('App', () => {
    it('renders without crashing', async () => {
        const { container } = render(<App />)
        
        // Wait for router to initialize and render
        await waitFor(() => {
            expect(container.querySelector('body')).toBeTruthy()
        }, { timeout: 5000 })
        
        expect(container).toBeTruthy()
    })
})
