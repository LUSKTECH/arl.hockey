import { render } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import App from './App'

// Mock Sentry
vi.mock('@sentry/react', () => ({
  startSpan: vi.fn((config, callback) => callback()),
  captureException: vi.fn(),
  ErrorBoundary: ({ children }: { children: React.ReactNode }) => children,
}))

// Mock analytics
vi.mock('@/lib/analytics', () => ({
  trackExternalLink: vi.fn(),
}))

describe('App', () => {
    it('renders without crashing', () => {
        const { container } = render(<App />)
        expect(container).toBeTruthy()
        expect(container.firstChild).toBeTruthy()
    })
})
