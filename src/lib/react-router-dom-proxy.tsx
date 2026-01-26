/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable react-refresh/only-export-components */
import * as React from "react";

// Runtime import of the real library under a different name (see vite.config alias)
// @ts-ignore - This is resolved at runtime by Vite alias
import * as RRD from "react-router-dom-original";

// Re-export everything so other imports keep working
// @ts-ignore - This is resolved at runtime by Vite alias
export * from "react-router-dom-original";

/** Simple pass-through for Routes component */
export function Routes(props: React.ComponentProps<typeof RRD.Routes>) {
  return React.createElement(RRD.Routes, { ...props });
}

/** Simple pass-through for HashRouter */
export function HashRouter(props: React.ComponentProps<typeof RRD.HashRouter>) {
  return React.createElement(RRD.HashRouter, { ...props });
}

/** Simple pass-through for BrowserRouter */
export function BrowserRouter(props: React.ComponentProps<typeof RRD.BrowserRouter>) {
  return React.createElement(RRD.BrowserRouter, { ...props });
}

/** Simple pass-through for MemoryRouter */
export function MemoryRouter(props: React.ComponentProps<typeof RRD.MemoryRouter>) {
  return React.createElement(RRD.MemoryRouter, { ...props });
}
