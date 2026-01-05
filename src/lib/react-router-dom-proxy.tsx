/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react";


// Runtime import of the real library under a different name (see vite.config alias)
// @ts-ignore - This is resolved at runtime by Vite alias
import * as RRD from "react-router-dom-original";

// Re-export everything so other imports keep working
// @ts-ignore - This is resolved at runtime by Vite alias
export * from "react-router-dom-original";

const TARGET_ORIGIN = import.meta.env.VITE_ROUTE_MSG_ORIGIN || "*";



/** --------------------- Outbound: route list (once) --------------------- */
let routesPosted = false;

// Create a promise that resolves once routes are posted

let resolveRoutesReady: (() => void) | null = null;
const routesReadyPromise = new Promise<void>((res) => {
  resolveRoutesReady = res;
});

// Optional: avoid waiting forever if <Routes> never mounts
const routesReadyOrTimeout = (ms = 1200) =>
  Promise.race([routesReadyPromise, new Promise<void>((r) => setTimeout(r, ms))]);

type AnyEl = React.ReactNode;

function normalize(p: string) {
  return p.replaceAll(/\/+/g, "/");
}

function join(base: string, child?: string) {
  if (!child) return base || "";
  if (child.startsWith("/")) return child;
  return normalize(`${base.replace(/\/$/, "")}/${child}`);
}

function flattenRoutes(node: AnyEl, base = "", acc = new Set<string>()) {
  React.Children.forEach(node, (child) => {
    if (!React.isValidElement(child)) return;
    const isRoute = child.type === (RRD as any).Route ||
      (typeof child.type === "function" && (child.type as any).name === "Route");
    if (isRoute) {
      const { path, index, children } = (child.props ?? {}) as {
        path?: string;
        index?: boolean;
        children?: AnyEl;
      };
      
      // Determine current route path
      let cur: string;
      if (index) {
        cur = base || "/";
      } else if (path) {
        cur = join(base, path);
      } else {
        cur = base;
      }
      
      if (index || path) acc.add(cur || "/");
      if (children) flattenRoutes(children, cur, acc);
    } else {
      const kids = (child.props as any)?.children;
      if (kids) flattenRoutes(kids, base, acc);
    }
  });
  return acc;
}

function postAllRoutesOnce(children: AnyEl) {
  if (routesPosted) return;
  try {
    const list = Array.from(flattenRoutes(children)).sort((a, b) => a.localeCompare(b));

    // Always log routes in development for debugging
    if (process.env.NODE_ENV === 'development') {
      console.log('Routes:', list);
    }

    // Check if route messaging is enabled
    if (!__ROUTE_MESSAGING_ENABLED__) {
      return;
    }

    if (globalThis.top && globalThis.top !== globalThis.window) {
      // Use the same format as ROUTES_INFO in use-route-messenger
      const routesForMessage = list.map(route => ({
        path: route
      }));

      const routesMessage = {
        type: 'ROUTES_INFO',
        routes: routesForMessage,
        timestamp: Date.now()
      };

      globalThis.top.postMessage(routesMessage, TARGET_ORIGIN);
    }
  } finally {
    routesPosted = true;
    // signal readiness exactly once
    resolveRoutesReady?.();
    resolveRoutesReady = null;
  }
}

/** Our patched <Routes/>: same API, just posts route list once. */
export function Routes(props: React.ComponentProps<typeof RRD.Routes>) {
  React.useEffect(() => { postAllRoutesOnce(props.children); }, []);
  return React.createElement(RRD.Routes, { ...props });
}

/** --------------------- Outbound: route change events --------------------- */
let lastEmittedPath = "";

function emitRouteChange(location: ReturnType<typeof RRD.useLocation>) {
  const path = `${location.pathname}${location.search}${location.hash}`;
  if (path === lastEmittedPath) return;
  lastEmittedPath = path;

  // Check if route messaging is enabled
  if (!__ROUTE_MESSAGING_ENABLED__) {
    return;
  }

  if (globalThis.top && globalThis.top !== globalThis.window) {
    const routeChangeMessage = {
      type: 'ROUTE_CHANGE',
      path: location.pathname,
      hash: location.hash,
      search: location.search,
      fullPath: location.pathname + location.search + location.hash,
      fullUrl: globalThis.location.href,
      timestamp: Date.now()
    };

    globalThis.top.postMessage(routeChangeMessage, TARGET_ORIGIN);
  }
}

/** --------------------- Inbound: commands from parent --------------------- */
type IframeCmd =
  | { type: "ROUTE_CONTROL"; action: "navigate"; path: string; replace?: boolean; }
  | { type: "ROUTE_CONTROL"; action: "back"; }
  | { type: "ROUTE_CONTROL"; action: "forward"; }
  | { type: "ROUTE_CONTROL"; action: "replace"; path: string; }
  | { type: "RELOAD"; };

/** Handle route control messages */
function handleRouteControl(data: IframeCmd, navigate: ReturnType<typeof RRD.useNavigate>) {
  if (data.type === "RELOAD") {
    globalThis.location.reload();
    if (process.env.NODE_ENV === 'development') {
      console.log('Reloaded');
    }
    return;
  }

  if (data.type !== "ROUTE_CONTROL") {
    return;
  }

  if (process.env.NODE_ENV === 'development') {
    console.log('Received route control command:', data);
  }

  handleNavigationAction(data, navigate);
}

/** Handle navigation actions */
function handleNavigationAction(
  data: Extract<IframeCmd, { type: "ROUTE_CONTROL" }>,
  navigate: ReturnType<typeof RRD.useNavigate>
) {
  const { action } = data;

  switch (action) {
    case 'navigate':
      handleNavigate(data, navigate);
      break;

    case 'back':
      handleBack(navigate);
      break;

    case 'forward':
      handleForward(navigate);
      break;

    case 'replace':
      handleReplace(data, navigate);
      break;

    default:
      if (process.env.NODE_ENV === 'development') {
        console.warn('Route control: unknown action', action);
      }
  }
}

/** Handle navigate action */
function handleNavigate(
  data: Extract<IframeCmd, { type: "ROUTE_CONTROL"; action: "navigate" }>,
  navigate: ReturnType<typeof RRD.useNavigate>
) {
  const { path, replace = false } = data;
  if (path) {
    navigate(path, { replace });
    if (process.env.NODE_ENV === 'development') {
      console.log(`Navigated to: ${path} (replace: ${replace})`);
    }
  } else if (process.env.NODE_ENV === 'development') {
    console.error('Route control: path is required for navigate action');
  }
}

/** Handle back action */
function handleBack(navigate: ReturnType<typeof RRD.useNavigate>) {
  navigate(-1);
  if (process.env.NODE_ENV === 'development') {
    console.log('Navigated back');
  }
}

/** Handle forward action */
function handleForward(navigate: ReturnType<typeof RRD.useNavigate>) {
  navigate(1);
  if (process.env.NODE_ENV === 'development') {
    console.log('Navigated forward');
  }
}

/** Handle replace action */
function handleReplace(
  data: Extract<IframeCmd, { type: "ROUTE_CONTROL"; action: "replace" }>,
  navigate: ReturnType<typeof RRD.useNavigate>
) {
  const { path } = data;
  if (path) {
    navigate(path, { replace: true });
    if (process.env.NODE_ENV === 'development') {
      console.log(`Replaced route with: ${path}`);
    }
  } else if (process.env.NODE_ENV === 'development') {
    console.error('Route control: path is required for replace action');
  }
}

/** A component that lives inside the router context and bridges both ways */
function RouterBridge() {
  const location = RRD.useLocation();
  const navigate = RRD.useNavigate();

  React.useEffect(() => {
    (async () => {
      // Ensure ROUTES_INFO is delivered first
      await routesReadyOrTimeout();   // waits for <Routes/> to post, or times out (dev-safety)
      emitRouteChange(location);
    })();

  }, [location.key, location.pathname, location.search, location.hash]);

  React.useEffect(() => {
    function onMessage(e: MessageEvent) {
      const data = e.data as IframeCmd;
      if (!data) return;

      // Verify origin
      if (TARGET_ORIGIN !== "*" && e.origin !== TARGET_ORIGIN) {
        if (process.env.NODE_ENV === 'development') {
          console.warn(`Ignored message from unauthorized origin: ${e.origin}`);
        }
        return;
      }

      // Check if route messaging is enabled
      if (!__ROUTE_MESSAGING_ENABLED__) {
        return;
      }

      try {
        handleRouteControl(data, navigate);
      } catch (error) {
        if (process.env.NODE_ENV === 'development') {
          console.error('Route control error:', error);
        }
      }
    }
    globalThis.addEventListener("message", onMessage);
    return () => globalThis.removeEventListener("message", onMessage);
  }, [navigate]);

  return null;
}

/** Wrap routers so the bridge lives inside router context, with zero app changes. */
// Make children mount before <RouterBridge/>, so <Routes/> effect runs first.
function withBridge(children: React.ReactNode) {
  return (
    <>
      {children}
      <RouterBridge />
    </>
  );
}

export function HashRouter(props: React.ComponentProps<typeof RRD.HashRouter>) {
  const RouterComponent = RRD.HashRouter;
  return <RouterComponent {...props}>{withBridge(props.children)}</RouterComponent>;
}

export function BrowserRouter(props: React.ComponentProps<typeof RRD.BrowserRouter>) {
  const RouterComponent = RRD.BrowserRouter;
  return <RouterComponent {...props}>{withBridge(props.children)}</RouterComponent>;
}

export function MemoryRouter(props: React.ComponentProps<typeof RRD.MemoryRouter>) {
  const RouterComponent = RRD.MemoryRouter;
  return <RouterComponent {...props}>{withBridge(props.children)}</RouterComponent>;
}
