# Project Structure

## Directory Organization

```
src/
├── components/          # React components
│   ├── ui/             # shadcn/ui components (Radix UI wrappers)
│   └── ThemeToggle.tsx # Custom components
├── hooks/              # Custom React hooks
│   ├── use-theme.tsx   # Theme management
│   ├── use-toast.ts    # Toast notifications
│   └── use-mobile.tsx  # Mobile detection
├── lib/                # Utility libraries
│   ├── utils.ts        # cn() helper for className merging
│   └── react-router-dom-proxy.tsx # Router wrapper
├── pages/              # Page components (route views)
│   ├── Index.tsx       # Home page
│   └── NotFound.tsx    # 404 page
├── App.tsx             # Root component with providers
├── main.tsx            # Application entry point
└── index.css           # Global styles with CSS variables

public/
├── images/             # Static image assets
└── [other static files]

examples/
└── third-party-integrations/  # Integration examples (e.g., Stripe)

supabase/
└── edge_function/      # Supabase edge functions (optional)
```

## Key Conventions

### Import Aliases

Use `@/` prefix for all src imports:
```typescript
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useTheme } from "@/hooks/use-theme"
```

### Component Patterns

- **UI Components**: Located in `src/components/ui/`, follow shadcn/ui patterns
- **Page Components**: Located in `src/pages/`, exported as default
- **Custom Hooks**: Located in `src/hooks/`, prefixed with `use-`

### Styling

- Use Tailwind utility classes
- Use `cn()` helper for conditional className merging
- Theme colors via CSS variables (HSL format)
- Support dark mode with `dark:` prefix

### Routing

- Uses HashRouter (not BrowserRouter)
- Add custom routes ABOVE the catch-all `*` route in App.tsx
- Route messaging system available via proxy wrapper

### TypeScript

- Relaxed strictness settings for rapid development
- Type safety for component props and hooks
- No implicit any allowed but not strictly enforced

### File Naming

- Components: PascalCase (e.g., `ThemeToggle.tsx`)
- Hooks: kebab-case with `use-` prefix (e.g., `use-theme.tsx`)
- Utilities: kebab-case (e.g., `utils.ts`)
- Pages: PascalCase (e.g., `Index.tsx`)
