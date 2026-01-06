import { createRoot } from 'react-dom/client'
import * as Sentry from "@sentry/react"
import App from './App.tsx'
import './index.css'

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
        // Session replay integration
        Sentry.replayIntegration({
            maskAllText: false,
            blockAllMedia: false,
        }),
    ],
    // Performance Monitoring
    tracesSampleRate: import.meta.env.PROD ? 0.1 : 1.0, // 10% in production, 100% in dev
    // Control for which URLs distributed tracing should be enabled
    tracePropagationTargets: ["localhost", /^https:\/\/arl\.hockey/],
    // Profiling
    profilesSampleRate: import.meta.env.PROD ? 0.1 : 1.0, // 10% in production, 100% in dev
    // Session Replay
    replaysSessionSampleRate: import.meta.env.PROD ? 0.1 : 1.0, // 10% in production, 100% in dev
    replaysOnErrorSampleRate: 1.0, // Always capture replays when errors occur
});


const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(<App />);
}
