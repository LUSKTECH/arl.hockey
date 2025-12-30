/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_ROUTE_MSG_ORIGIN: string
    readonly VITE_SENTRY_DSN: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}


// Global constants defined at build time
declare const __ROUTE_MESSAGING_ENABLED__: boolean;
