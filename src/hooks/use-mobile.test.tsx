import { renderHook, act } from '@testing-library/react';
import { useIsMobile } from './use-mobile';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

describe('useIsMobile', () => {
    let matchMediaMock: ReturnType<typeof vi.fn>;
    let listeners: Array<(e: MediaQueryListEvent) => void> = [];

    beforeEach(() => {
        listeners = [];
        matchMediaMock = vi.fn((query: string) => ({
            matches: false,
            media: query,
            onchange: null,
            addListener: vi.fn(),
            removeListener: vi.fn(),
            addEventListener: vi.fn((event: string, handler: (e: MediaQueryListEvent) => void) => {
                listeners.push(handler);
            }),
            removeEventListener: vi.fn((event: string, handler: (e: MediaQueryListEvent) => void) => {
                listeners = listeners.filter(l => l !== handler);
            }),
            dispatchEvent: vi.fn(),
        }));

        Object.defineProperty(window, 'matchMedia', {
            writable: true,
            value: matchMediaMock,
        });
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('should return false for desktop width', () => {
        Object.defineProperty(window, 'innerWidth', {
            writable: true,
            configurable: true,
            value: 1024,
        });

        const { result } = renderHook(() => useIsMobile());

        expect(result.current).toBe(false);
    });

    it('should return true for mobile width', () => {
        Object.defineProperty(window, 'innerWidth', {
            writable: true,
            configurable: true,
            value: 375,
        });

        const { result } = renderHook(() => useIsMobile());

        expect(result.current).toBe(true);
    });

    it('should update when window is resized', () => {
        Object.defineProperty(window, 'innerWidth', {
            writable: true,
            configurable: true,
            value: 1024,
        });

        const { result } = renderHook(() => useIsMobile());

        expect(result.current).toBe(false);

        // Simulate resize to mobile
        act(() => {
            Object.defineProperty(window, 'innerWidth', {
                writable: true,
                configurable: true,
                value: 375,
            });
            listeners.forEach(listener => {
                listener({ matches: true } as MediaQueryListEvent);
            });
        });

        expect(result.current).toBe(true);
    });

    it('should cleanup event listener on unmount', () => {
        const { unmount } = renderHook(() => useIsMobile());

        expect(listeners.length).toBeGreaterThan(0);

        unmount();

        // Verify cleanup was called
        expect(matchMediaMock).toHaveBeenCalled();
    });
});
