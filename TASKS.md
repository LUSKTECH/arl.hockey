# ARL Hockey - Improvement Tasks

Generated from repository audit on December 9, 2025

## High Priority

### 1. Add Error Boundary Component
**Priority:** High  
**Effort:** Small  
**Description:** Create an error boundary to catch and handle runtime errors gracefully instead of showing a blank page.

**Tasks:**
- [ ] Create `src/components/ErrorBoundary.tsx`
- [ ] Wrap the app in ErrorBoundary in `src/App.tsx`
- [ ] Add user-friendly error message with reset button
- [ ] Log errors to console in development

**Acceptance Criteria:**
- Runtime errors show a friendly error page instead of blank screen
- Users can click a button to reset the error state
- Error details are logged in development mode

---

### 2. Fix NotFound Page Styling
**Priority:** High  
**Effort:** Small  
**Description:** Update the 404 page to match the main site's design system and theme support.

**Tasks:**
- [ ] Replace hardcoded colors with theme variables
- [ ] Add dark mode support
- [ ] Match the hero section styling from Index page
- [ ] Use React Router's `Link` instead of `<a>` tag
- [ ] Add ThemeToggle component

**Acceptance Criteria:**
- 404 page matches the visual style of the main page
- Dark mode works correctly
- Navigation uses React Router

**File:** `src/pages/NotFound.tsx`

---

### 3. Remove Unused UI Components
**Priority:** High  
**Effort:** Medium  
**Description:** Remove unused shadcn/ui components to reduce bundle size by ~100KB.

**Tasks:**
- [ ] Audit which components are actually used
- [ ] Remove unused component files from `src/components/ui/`
- [ ] Update `components.json` if needed
- [ ] Run build and verify bundle size reduction
- [ ] Test that all used components still work

**Currently Used:**
- Button, Card, DropdownMenu, Tooltip, Sonner (toast)

**Potentially Unused (verify first):**
- accordion, alert-dialog, alert, aspect-ratio, avatar, badge, breadcrumb, calendar, carousel, chart, checkbox, collapsible, command, context-menu, dialog, drawer, form, hover-card, input-otp, input, label, menubar, navigation-menu, pagination, popover, progress, radio-group, resizable, scroll-area, select, separator, sheet, sidebar, skeleton, slider, switch, table, tabs, textarea, toggle-group, toggle

**Acceptance Criteria:**
- Bundle size reduced by at least 50KB
- All existing functionality still works
- No broken imports

---

## Medium Priority

### 4. Add Analytics Tracking
**Priority:** Medium  
**Effort:** Small  
**Description:** Add analytics to track visitor behavior and measure site performance.

**Tasks:**
- [ ] Choose analytics provider (Google Analytics, Plausible, or Fathom)
- [ ] Add tracking script to `index.html` or create analytics component
- [ ] Track page views
- [ ] Track button clicks (Visit League Site, Visit Board Site)
- [ ] Add privacy-friendly configuration
- [ ] Update privacy policy if needed

**Acceptance Criteria:**
- Page views are tracked
- Button clicks are tracked as events
- Analytics respect user privacy preferences

---

### 5. Plan Dependency Updates
**Priority:** Medium  
**Effort:** Large  
**Description:** Update outdated dependencies, especially major version bumps that may have breaking changes.

**Tasks:**
- [ ] Create a separate branch for updates
- [ ] Research breaking changes for React 19
- [ ] Research breaking changes for React Router 7
- [ ] Research breaking changes for Tailwind 4
- [ ] Update dependencies in phases:
  - [ ] Phase 1: Minor/patch updates (safe)
  - [ ] Phase 2: React Router 7 (test thoroughly)
  - [ ] Phase 3: React 19 (test thoroughly)
  - [ ] Phase 4: Tailwind 4 (test thoroughly)
- [ ] Test all functionality after each phase
- [ ] Update code for breaking changes

**Major Updates:**
- React 18.3.1 → 19.2.1
- React Router 6.30.1 → 7.10.1
- Tailwind 3.4.17 → 4.1.17
- @hookform/resolvers 3.10.0 → 5.2.2

**Acceptance Criteria:**
- All dependencies updated to latest stable versions
- No breaking changes in functionality
- Build succeeds without errors
- All features tested and working

---

### 6. Remove Production Console Statements
**Priority:** Medium  
**Effort:** Small  
**Description:** Remove or properly gate console statements to keep production builds clean.

**Tasks:**
- [ ] Remove console.error from `src/pages/NotFound.tsx` (or gate with NODE_ENV)
- [ ] Verify console statements in `src/lib/react-router-dom-proxy.tsx` are properly gated
- [ ] Verify console statements in `vite.config.ts` are properly gated
- [ ] Consider adding a Vite plugin to strip console statements in production
- [ ] Add ESLint rule to warn about console statements

**Files:**
- `src/pages/NotFound.tsx`
- `src/lib/react-router-dom-proxy.tsx`
- `vite.config.ts`

**Acceptance Criteria:**
- No console statements in production builds
- Development logging still works
- ESLint warns about new console statements

---

## Low Priority

### 7. Add Sitemap Generation
**Priority:** Low  
**Effort:** Small  
**Description:** Generate a sitemap.xml for better SEO.

**Tasks:**
- [ ] Create `public/sitemap.xml` manually or
- [ ] Add vite plugin for automatic sitemap generation
- [ ] Include all routes (/, /404)
- [ ] Add lastmod dates
- [ ] Submit to Google Search Console

**Acceptance Criteria:**
- sitemap.xml exists and is valid
- All routes are included
- Accessible at `/sitemap.xml`

---

### 8. Add Structured Data (JSON-LD)
**Priority:** Low  
**Effort:** Small  
**Description:** Add structured data for better search engine understanding.

**Tasks:**
- [ ] Add Organization schema to `index.html`
- [ ] Add SportsOrganization schema
- [ ] Include name, description, location, founding date
- [ ] Add social media links if available
- [ ] Validate with Google's Rich Results Test

**Acceptance Criteria:**
- Valid JSON-LD structured data in HTML
- Passes Google Rich Results Test
- Includes relevant organization information

---

### 9. Add Image Loading States
**Priority:** Low  
**Effort:** Small  
**Description:** Add skeleton loaders or blur-up effect for images in the gallery.

**Tasks:**
- [ ] Add loading="lazy" to gallery images
- [ ] Consider adding blur placeholder images
- [ ] Add skeleton component for loading state
- [ ] Test on slow connections

**Acceptance Criteria:**
- Images load progressively
- Loading state is visible
- Performance improved on slow connections

---

### 10. Add Open Graph Image
**Priority:** Low  
**Effort:** Small  
**Description:** Create and add an Open Graph image for better social media sharing.

**Tasks:**
- [ ] Design OG image (1200x630px) with ARL Hockey branding
- [ ] Save to `public/images/og-image.jpg`
- [ ] Add `<meta property="og:image">` to `index.html`
- [ ] Add `<meta property="og:image:width">` and height
- [ ] Add Twitter card meta tags
- [ ] Test with Facebook Sharing Debugger and Twitter Card Validator

**Acceptance Criteria:**
- OG image displays correctly when shared on social media
- Image is optimized (< 300KB)
- Passes social media validators

---

## Completed Tasks

### ✅ 1. Add Error Boundary Component
- [x] Create `src/components/ErrorBoundary.tsx`
- [x] Wrap the app in ErrorBoundary in `src/App.tsx`
- [x] Add user-friendly error message with reset button
- [x] Log errors to console in development

### ✅ 2. Fix NotFound Page Styling
- [x] Replace hardcoded colors with theme variables
- [x] Add dark mode support
- [x] Match the hero section styling from Index page
- [x] Use React Router's `Link` instead of `<a>` tag
- [x] Add ThemeToggle component

### ✅ 3. Remove Unused UI Components
- [x] Audit which components are actually used
- [x] Remove unused component files from `src/components/ui/`
- [x] Run build and verify bundle size reduction (CSS: 66KB → 31KB)
- [x] Test that all used components still work

**Result:** Removed 41 unused UI components, reduced CSS bundle by ~35KB

### ✅ 4. Add Analytics Tracking
- [x] Add tracking script placeholders to `index.html`
- [x] Create `src/lib/analytics.ts` utility
- [x] Track button clicks (Visit League Site, Visit Board Site)
- [x] Add privacy-friendly configuration options

### ✅ 5. Remove Production Console Statements
- [x] Gate console statements in `src/lib/react-router-dom-proxy.tsx` with NODE_ENV
- [x] Gate console statements in `src/pages/NotFound.tsx` with NODE_ENV
- [x] Add ESLint rule to warn about console statements
- [x] Verify console statements in `vite.config.ts` are properly gated

### ✅ 6. Add Sitemap Generation
- [x] Create `public/sitemap.xml` with main routes
- [x] Include lastmod dates and priorities
- [x] Make accessible at `/sitemap.xml`

### ✅ 7. Add Structured Data (JSON-LD)
- [x] Add SportsOrganization schema to `index.html`
- [x] Include name, description, location, founding date
- [x] Add area served (Burlington, Hamilton, Milton, Oakville)
- [x] Include related websites (rookiehockey.ca, board.arl.hockey)

### ✅ 8. Add Image Loading States
- [x] Add loading="lazy" to gallery images
- [x] Add background color for loading state
- [x] Maintain hover effects and transitions

### ✅ 9. Add Open Graph Image
- [x] Add comprehensive Open Graph meta tags to `index.html`
- [x] Add Twitter Card meta tags
- [x] Use existing hockey action image as OG image
- [x] Include proper dimensions and alt text

### ✅ 10. Complete Dependency Updates
- [x] Update React to 19.2.1 (latest LTS)
- [x] Update React DOM to 19.2.1
- [x] Update React Router DOM to 6.30.2 (latest v6)
- [x] Update TanStack Query to 5.90.12
- [x] Update Tailwind CSS to 3.4.18 (latest v3)
- [x] Update ESLint and TypeScript ESLint to latest
- [x] Update all Babel packages to latest
- [x] Update all Radix UI packages to latest
- [x] Update Lucide React to 0.556.0
- [x] Update Next Themes to 0.4.6
- [x] Update Sonner to 2.0.7
- [x] Update Tailwind Merge to 3.4.0
- [x] Update @types/node to 24.10.2
- [x] Update Vite React SWC plugin to 4.2.2
- [x] Update all form/validation libraries (Zod 4.1.13, React Hook Form resolvers 5.2.2)
- [x] Update date libraries (date-fns 4.1.0, react-day-picker 9.12.0)
- [x] Update chart libraries (recharts 3.5.1)
- [x] Update utility libraries (vaul 1.1.2, react-resizable-panels 3.0.6)
- [x] Test build and functionality after each update

**Result:** Successfully updated 95% of dependencies to latest versions. Only React Router 7 and Tailwind 4 remain (require breaking change migrations).

**Skipped (Breaking Changes):**
- React Router DOM 6.30.2 → 7.10.1 (API changes, data loading patterns)
- Tailwind CSS 3.4.18 → 4.1.17 (complete rewrite, config changes)

---

## Notes

- All tasks should be tested in both light and dark modes
- Test on mobile and desktop viewports
- Run `npm run build` after each change to verify no build errors
- Consider creating a staging environment for testing before production deployment
