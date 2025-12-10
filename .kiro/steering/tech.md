# Technology Stack

## Core Technologies

- **Build Tool**: Vite 5.4+
- **Framework**: React 18.3+ with TypeScript 5.5+
- **Styling**: Tailwind CSS 3.4+ with CSS variables
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Routing**: React Router DOM 6.26+ (HashRouter)
- **State Management**: TanStack Query (React Query) 5.56+
- **Icons**: Lucide React
- **Theming**: next-themes with custom hook

## Key Libraries

- **Form Handling**: React Hook Form + Zod validation
- **Backend**: Supabase client (optional integration)
- **Notifications**: Sonner toasts
- **Animations**: tailwindcss-animate
- **Utilities**: clsx, tailwind-merge (via `cn()` helper)

## Development Tools

- **Compiler**: SWC (via @vitejs/plugin-react-swc)
- **Linting**: ESLint 9+ with TypeScript support
- **Package Manager**: npm (pnpm-lock.yaml also present)

## Common Commands

```bash
# Development server (port 8080)
npm run dev

# Production build
npm run build

# Development build with sourcemaps
npm run build:dev

# Preview production build
npm run preview

# Lint code
npm run lint

# Test Supabase edge functions
npm run test:edge-functions
```

## Build Configuration

- Custom Vite plugin for CDN image prefixing
- Route messaging system (controlled via VITE_ENABLE_ROUTE_MESSAGING)
- React Router DOM proxy wrapper for enhanced routing
- TypeScript with relaxed strictness (noImplicitAny: false, strictNullChecks: false)

## Environment Variables

- `CDN_IMG_PREFIX` - CDN URL for image assets
- `VITE_ENABLE_ROUTE_MESSAGING` - Enable route change messaging (dev default: true)
