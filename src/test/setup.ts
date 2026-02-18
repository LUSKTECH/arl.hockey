import '@testing-library/jest-dom'

// Mock localStorage with proper implementation
const storage: Record<string, string> = {}
const localStorageMock = {
    getItem: (key: string) => storage[key] || null,
    setItem: (key: string, value: string) => { storage[key] = value },
    removeItem: (key: string) => { delete storage[key] },
    clear: () => { Object.keys(storage).forEach(key => delete storage[key]) },
    length: 0,
    key: () => null,
}
Object.defineProperty(globalThis, 'localStorage', {
    value: localStorageMock,
    writable: true,
})

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

