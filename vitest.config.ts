import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react-swc'
import path from 'node:path'

export default defineConfig({
    plugins: [react()],
    test: {
        environment: 'jsdom',
        globals: true,
        setupFiles: './src/test/setup.ts',
        coverage: {
            provider: 'v8',
            reporter: ['text', 'json', 'html', 'lcov'],
            exclude: [
                'coverage/**',
                'dist/**',
                '**/[.]**',
                '**/*.d.ts',
                '**/test/**',
                '**/setup.ts',
            ],
        },
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
            // Add the same alias as vite.config for testing
            "react-router-dom-original": "react-router-dom",
        },
    },
    define: {
        // Define the same global as vite.config for tests
        __ROUTE_MESSAGING_ENABLED__: JSON.stringify(false),
    },
})
