import { render, screen, renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ThemeProvider, useTheme } from './use-theme';

describe('ThemeProvider and useTheme', () => {
    beforeEach(() => {
        localStorage.clear();
        document.documentElement.className = '';
    });

    it('should use default theme when no localStorage value', () => {
        const { result } = renderHook(() => useTheme(), {
            wrapper: ({ children }) => <ThemeProvider>{children}</ThemeProvider>,
        });

        expect(result.current.theme).toBe('system');
    });

    it('should use custom default theme', () => {
        const { result } = renderHook(() => useTheme(), {
            wrapper: ({ children }) => <ThemeProvider defaultTheme="dark">{children}</ThemeProvider>,
        });

        expect(result.current.theme).toBe('dark');
    });

    it('should load theme from localStorage', () => {
        localStorage.setItem('arl-hockey-theme', 'light');

        const { result } = renderHook(() => useTheme(), {
            wrapper: ({ children }) => <ThemeProvider>{children}</ThemeProvider>,
        });

        expect(result.current.theme).toBe('light');
    });

    it('should use custom storage key', () => {
        localStorage.setItem('custom-key', 'dark');

        const { result } = renderHook(() => useTheme(), {
            wrapper: ({ children }) => <ThemeProvider storageKey="custom-key">{children}</ThemeProvider>,
        });

        expect(result.current.theme).toBe('dark');
    });

    it('should set theme and save to localStorage', () => {
        const { result } = renderHook(() => useTheme(), {
            wrapper: ({ children }) => <ThemeProvider>{children}</ThemeProvider>,
        });

        act(() => {
            result.current.setTheme('dark');
        });

        expect(result.current.theme).toBe('dark');
        expect(localStorage.getItem('arl-hockey-theme')).toBe('dark');
        expect(document.documentElement.classList.contains('dark')).toBe(true);
    });

    it('should apply light theme class', () => {
        const { result } = renderHook(() => useTheme(), {
            wrapper: ({ children }) => <ThemeProvider>{children}</ThemeProvider>,
        });

        act(() => {
            result.current.setTheme('light');
        });

        expect(document.documentElement.classList.contains('light')).toBe(true);
        expect(document.documentElement.classList.contains('dark')).toBe(false);
    });

    it('should apply system theme based on prefers-color-scheme', () => {
        // Mock matchMedia to return dark mode
        const matchMediaMock = vi.fn().mockImplementation((query) => ({
            matches: query === '(prefers-color-scheme: dark)',
            media: query,
            onchange: null,
            addListener: vi.fn(),
            removeListener: vi.fn(),
            addEventListener: vi.fn(),
            removeEventListener: vi.fn(),
            dispatchEvent: vi.fn(),
        }));

        vi.stubGlobal('matchMedia', matchMediaMock);

        const { result } = renderHook(() => useTheme(), {
            wrapper: ({ children }) => <ThemeProvider>{children}</ThemeProvider>,
        });

        act(() => {
            result.current.setTheme('system');
        });

        expect(document.documentElement.classList.contains('dark')).toBe(true);

        vi.unstubAllGlobals();
    });

    it('should apply system theme as light when prefers-color-scheme is light', () => {
        // Mock matchMedia to return light mode
        const matchMediaMock = vi.fn().mockImplementation((query) => ({
            matches: false,
            media: query,
            onchange: null,
            addListener: vi.fn(),
            removeListener: vi.fn(),
            addEventListener: vi.fn(),
            removeEventListener: vi.fn(),
            dispatchEvent: vi.fn(),
        }));

        vi.stubGlobal('matchMedia', matchMediaMock);

        const { result } = renderHook(() => useTheme(), {
            wrapper: ({ children }) => <ThemeProvider>{children}</ThemeProvider>,
        });

        act(() => {
            result.current.setTheme('system');
        });

        expect(document.documentElement.classList.contains('light')).toBe(true);

        vi.unstubAllGlobals();
    });

    it('should render children', () => {
        render(
            <ThemeProvider>
                <div>Test Content</div>
            </ThemeProvider>
        );

        expect(screen.getByText('Test Content')).toBeInTheDocument();
    });
});
