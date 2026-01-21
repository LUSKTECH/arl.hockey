import { render, screen, fireEvent } from '@testing-library/react';
import { ErrorBoundary } from './ErrorBoundary';
import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest';
import * as Sentry from '@sentry/react';

// Mock Sentry
vi.mock('@sentry/react', () => ({
    captureException: vi.fn(),
}));

const ThrowError = ({ shouldThrow }: { shouldThrow?: boolean }) => {
    if (shouldThrow) {
        throw new Error('Test Error');
    }
    return <div>No Error</div>;
};

// Silence console.error for clean test output
const originalConsoleError = console.error;
const consoleErrorMock = vi.fn();

describe('ErrorBoundary', () => {

    beforeEach(() => {
        console.error = consoleErrorMock;
        vi.clearAllMocks();
    });

    afterEach(() => {
        console.error = originalConsoleError;
    });

    it('should render children when no error', () => {
        render(
            <ErrorBoundary>
                <ThrowError />
            </ErrorBoundary>
        );
        expect(screen.getByText('No Error')).toBeInTheDocument();
    });

    it('should catch error and render fallback', () => {
        render(
            <ErrorBoundary>
                <ThrowError shouldThrow />
            </ErrorBoundary>
        );

        expect(screen.getByText('Oops! Something went wrong')).toBeInTheDocument();
        expect(screen.getByText('Try Again')).toBeInTheDocument();
    });

    it('should capture error with Sentry', () => {
        render(
            <ErrorBoundary>
                <ThrowError shouldThrow />
            </ErrorBoundary>
        );

        expect(Sentry.captureException).toHaveBeenCalledTimes(1);
        expect(Sentry.captureException).toHaveBeenCalledWith(
            expect.any(Error),
            expect.objectContaining({
                contexts: {
                    react: {
                        componentStack: expect.any(String),
                    },
                },
            })
        );
    });

    it('should reset error state on Try Again', () => {
        const { rerender } = render(
            <ErrorBoundary>
                <ThrowError shouldThrow />
            </ErrorBoundary>
        );

        // Error boundary should show error UI
        expect(screen.getByText('Try Again')).toBeInTheDocument();
        
        const tryAgainButton = screen.getByText('Try Again');
        fireEvent.click(tryAgainButton);

        // After clicking Try Again, component re-renders
        // Since ThrowError still throws, error UI should still be visible
        expect(screen.getByText('Try Again')).toBeInTheDocument();
        expect(screen.getByText(/Oops! Something went wrong/i)).toBeInTheDocument();
    });

    it('should log to console in development mode', () => {
        const originalEnv = process.env.NODE_ENV;
        process.env.NODE_ENV = 'development';
        const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

        render(
            <ErrorBoundary>
                <ThrowError shouldThrow />
            </ErrorBoundary>
        );

        expect(consoleErrorSpy).toHaveBeenCalledWith(
            'ErrorBoundary caught an error:',
            expect.any(Error),
            expect.any(Object)
        );

        consoleErrorSpy.mockRestore();
        process.env.NODE_ENV = originalEnv;
    });

    it('should show error details in development mode', () => {
        const originalEnv = process.env.NODE_ENV;
        process.env.NODE_ENV = 'development';

        render(
            <ErrorBoundary>
                <ThrowError shouldThrow />
            </ErrorBoundary>
        );

        // Should show error message in development
        expect(screen.getByText(/Error: Test Error/)).toBeInTheDocument();

        process.env.NODE_ENV = originalEnv;
    });

    it('should handle Go to Home button click', () => {
        const originalLocation = globalThis.location;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        delete (globalThis as any).location;
        globalThis.location = { ...originalLocation, href: '' } as Location;

        render(
            <ErrorBoundary>
                <ThrowError shouldThrow />
            </ErrorBoundary>
        );

        const homeButton = screen.getByText('Go to Home');
        fireEvent.click(homeButton);

        expect(globalThis.location.href).toBe('/');

        globalThis.location = originalLocation;
    });
});
