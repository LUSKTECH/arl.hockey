import { createRoot } from 'react-dom/client'
import * as Sentry from "@sentry/react"
import App from './App.tsx'
import './index.css'

Sentry.init({
    dsn: import.meta.env.VITE_SENTRY_DSN,
    tunnel: "/tunnel",
    integrations: [
        Sentry.consoleLoggingIntegration({ levels: ["log", "error", "warn"] }),
        Sentry.browserTracingIntegration(),
    ],
    // Performance Monitoring
    tracesSampleRate: import.meta.env.PROD ? 0.1 : 1, // 10% in production, 100% in dev
    // Profiling
    profilesSampleRate: import.meta.env.PROD ? 0.1 : 1, // 10% in production, 100% in dev
});


const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(<App />);
}
