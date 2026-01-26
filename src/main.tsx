import { createRoot } from 'react-dom/client'
import * as Sentry from "@sentry/react"
import App from './App.tsx'
import './index.css'

// Only initialize Sentry if DSN is configured
if (import.meta.env.VITE_SENTRY_DSN) {
    Sentry.init({
        dsn: import.meta.env.VITE_SENTRY_DSN,
        tunnel: "/tunnel",
        // Send default PII data (IP addresses, etc.)
        sendDefaultPii: true,
        // Enable logs to be sent to Sentry
        enableLogs: true,
        integrations: [
            // Console logging integration
            Sentry.consoleLoggingIntegration({ levels: ["log", "error", "warn"] }),
            // Browser tracing for performance monitoring
            Sentry.browserTracingIntegration(),
            // Session replay integration - lazy loaded
            Sentry.replayIntegration({
                maskAllText: false,
                blockAllMedia: false,
            }),
        ],
        // Performance Monitoring
        tracesSampleRate: import.meta.env.PROD ? .1 : 1, // 10% in production, 100% in dev
        // Control for which URLs distributed tracing should be enabled
        tracePropagationTargets: ["localhost", /^https:\/\/arl\.hockey/],
        // Profiling
        profilesSampleRate: import.meta.env.PROD ? .1 : 1, // 10% in production, 100% in dev
        // Session Replay
        replaysSessionSampleRate: import.meta.env.PROD ? .1 : 1, // 10% in production, 100% in dev
        replaysOnErrorSampleRate: 1, // Always capture replays when errors occur
        // Reduce bundle size by lazy loading integrations
        beforeSend(event) {
            // Filter out non-critical events in production
            if (import.meta.env.PROD && event.level === 'log') {
                return null;
            }
            return event;
        },
    });
}


const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(<App />);
}
