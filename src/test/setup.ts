import '@testing-library/jest-dom'

Object.defineProperty(globalThis.window, 'matchMedia', {
    writable: true,
    value: (query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: () => { }, // Deprecated
        removeListener: () => { }, // Deprecated
        addEventListener: () => { },
        removeEventListener: () => { },
        dispatchEvent: () => false,
    }),
})

globalThis.ResizeObserver = class ResizeObserver {
    observe() { 
        // Mock implementation for testing
    }
    unobserve() { 
        // Mock implementation for testing
    }
    disconnect() { 
        // Mock implementation for testing
    }
};

