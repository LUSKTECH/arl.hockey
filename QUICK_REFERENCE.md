# Quick Reference - Security & Best Practices

## 🔒 Security Headers (netlify.toml)

All security headers are configured in `netlify.toml`:
- Content Security Policy (CSP)
- X-Frame-Options (clickjacking protection)
- X-Content-Type-Options (MIME sniffing protection)
- X-XSS-Protection
- HSTS (HTTPS enforcement)
- Permissions Policy

**No action needed** - Headers are automatically applied on Netlify deployment.

## 🔐 Environment Variables

### Setup
1. Copy `.env.example` to `.env`
2. Fill in your actual values:
   ```bash
   VITE_SENTRY_DSN=your_actual_sentry_dsn
   SENTRY_AUTH_TOKEN=your_actual_auth_token
   ```

### Production (Netlify)
Set these in Netlify dashboard under Site settings → Environment variables:
- `VITE_SENTRY_DSN`
- `SENTRY_AUTH_TOKEN`

## 📊 Sentry Integration

### Error Tracking
Errors are automatically captured by:
1. ErrorBoundary component (React errors)
2. Console logging integration (console.error, console.warn)

### Performance Monitoring
Custom spans are tracked for:
- League site navigation button clicks
- Board site navigation button clicks

### Adding New Spans
```typescript
import * as Sentry from "@sentry/react";

const handleClick = () => {
  Sentry.startSpan(
    {
      op: "ui.click",
      name: "Descriptive Action Name",
    },
    () => {
      // Your code here
    }
  );
};
```

## 🧪 Testing

### Run All Tests
```bash
npm run test:coverage
```

### Current Coverage
- **93.72%** overall coverage
- **64 tests** passing
- All critical paths covered

### Adding New Tests
- Place tests next to the file: `Component.tsx` → `Component.test.tsx`
- Mock Sentry: Already configured in test files
- Mock analytics: Already configured in test files

## 🚀 Deployment

### Pre-deployment Checklist
```bash
# 1. Run tests
npm run test:coverage

# 2. Run linter
npm run lint

# 3. Build for production
npm run build

# 4. Preview build locally
npm run preview
```

### Netlify Deployment
Automatic on push to main branch. Configured in `netlify.toml`:
- Build command: `npm run build`
- Publish directory: `dist`
- Redirects: SPA routing configured

## 🔍 Monitoring

### Check Sentry Dashboard
- Errors: Monitor error rate and types
- Performance: Check span durations
- Releases: Track deployments

### Browser Console
- No CSP violations should appear
- No React warnings in production
- Check Network tab for proper caching

## 🎨 Development

### Start Dev Server
```bash
npm run dev
# Opens on http://localhost:8080
```

### Key Files
- `src/App.tsx` - Root component, router setup
- `src/pages/Index.tsx` - Home page
- `src/components/ErrorBoundary.tsx` - Error handling
- `netlify.toml` - Deployment & security config
- `vite.config.ts` - Build configuration

### Adding New Routes
Add routes in `src/App.tsx` ABOVE the catch-all `*` route:
```typescript
<Route path="/new-page" element={<NewPage />} />
```

## 🛡️ Security Best Practices

### External Links
Always use:
```typescript
window.open(url, '_blank', 'noopener,noreferrer');
```

### Environment Variables
- Never commit `.env` file
- Use `.env.example` as template
- Set production values in Netlify dashboard

### Console Statements
Always guard with NODE_ENV:
```typescript
if (process.env.NODE_ENV === 'development') {
  console.log('Debug info');
}
```

## ♿ Accessibility

### Required Attributes
- `aria-label` on buttons without visible text
- `aria-hidden="true"` on decorative icons
- `alt` text on all images
- Semantic HTML elements

### Testing
- Use keyboard navigation (Tab, Enter, Space)
- Test with screen reader
- Check color contrast

## 📦 Bundle Size

### Check Bundle Size
```bash
npm run build
# Check dist/ folder size
```

### Optimization Tips
- Images already lazy loaded
- Consider code splitting for larger apps
- Use CDN for images (CDN_IMG_PREFIX env var)

## 🐛 Troubleshooting

### CSP Violations
Check browser console for CSP errors. Update `netlify.toml` CSP header if needed.

### Sentry Not Working
1. Check `VITE_SENTRY_DSN` is set
2. Verify DSN in Sentry dashboard
3. Check browser console for Sentry errors

### Tests Failing
1. Clear node_modules: `rm -rf node_modules && npm install`
2. Clear coverage: `rm -rf coverage`
3. Run tests: `npm run test:coverage`

### Build Errors
1. Check TypeScript errors: `npx tsc --noEmit`
2. Check ESLint: `npm run lint`
3. Clear Vite cache: `rm -rf node_modules/.vite`

## 📚 Documentation

- **QUICK_REFERENCE.md** - This file
- **AGENTS.md** - Sentry integration guide
- **README.md** - Project overview

## 🔗 Useful Links

- [Sentry Dashboard](https://sentry.io/)
- [Netlify Dashboard](https://app.netlify.com/)
- [React Router Docs](https://reactrouter.com/)
- [Vite Docs](https://vitejs.dev/)
- [Tailwind CSS Docs](https://tailwindcss.com/)
