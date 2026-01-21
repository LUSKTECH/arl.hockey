# ARL Hockey Landing Page

[![CI](https://github.com/LUSKTECH/arl.hockey/actions/workflows/ci.yml/badge.svg)](https://github.com/LUSKTECH/arl.hockey/actions/workflows/ci.yml)
[![Release](https://github.com/LUSKTECH/arl.hockey/actions/workflows/snyk.yml/badge.svg)](https://github.com/LUSKTECH/arl.hockey/actions/workflows/snyk.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/node-%3E%3D20-brightgreen)](https://nodejs.org/)
[![GitHub stars](https://img.shields.io/github/stars/LUSKTECH/arl.hockey)](https://github.com/LUSKTECH/arl.hockey/stargazers)

[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=LUSKTECH_arl.hockey&metric=vulnerabilities&token=25f49cb6b1fce5da6e7dc85ae2f86be9c9e927e1)](https://sonarcloud.io/summary/new_code?id=LUSKTECH_arl.hockey)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=LUSKTECH_arl.hockey&metric=security_rating&token=25f49cb6b1fce5da6e7dc85ae2f86be9c9e927e1)](https://sonarcloud.io/summary/new_code?id=LUSKTECH_arl.hockey)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=LUSKTECH_arl.hockey&metric=sqale_rating&token=25f49cb6b1fce5da6e7dc85ae2f86be9c9e927e1)](https://sonarcloud.io/summary/new_code?id=LUSKTECH_arl.hockey)
[![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=LUSKTECH_arl.hockey&metric=reliability_rating&token=25f49cb6b1fce5da6e7dc85ae2f86be9c9e927e1)](https://sonarcloud.io/summary/new_code?id=LUSKTECH_arl.hockey)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=LUSKTECH_arl.hockey&metric=coverage&token=25f49cb6b1fce5da6e7dc85ae2f86be9c9e927e1)](https://sonarcloud.io/summary/new_code?id=LUSKTECH_arl.hockey)
[![codecov](https://codecov.io/github/LUSKTECH/arl.hockey/graph/badge.svg?token=6I8E3DBG9I)](https://codecov.io/github/LUSKTECH/arl.hockey)
[![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=LUSKTECH_arl.hockey&metric=ncloc&token=25f49cb6b1fce5da6e7dc85ae2f86be9c9e927e1)](https://sonarcloud.io/summary/new_code?id=LUSKTECH_arl.hockey)
[![Known Vulnerabilities](https://snyk.io/test/github/LUSKTECH/arl.hockey/badge.svg)](https://snyk.io/test/github/LUSKTECH/arl.hockey)

A landing page for the Adult Recreational League - a co-ed recreational hockey community serving Burlington, Hamilton, Milton, and Oakville in Ontario, Canada.

## Tech Stack

- **Build Tool**: Vite 7.2+
- **Framework**: React 19.2+ with TypeScript 5.5+
- **Styling**: Tailwind CSS 3.4+ with shadcn/ui components
- **Routing**: React Router DOM 6.26+ (HashRouter)
- **State Management**: TanStack Query (React Query) 5.56+
- **Icons**: Lucide React
- **Theming**: next-themes with dark mode support
- **Testing**: Vitest 4.0+ with React Testing Library
- **Monitoring**: Sentry for error tracking and performance monitoring
- **Code Quality**: ESLint 9+, TypeScript strict mode, Codecov for coverage tracking

## Prerequisites

Make sure your system has Node.js and npm installed.

We recommend using nvm to install Node.js: [nvm Installation Guide](https://github.com/nvm-sh/nvm#installing-and-updating)

## Getting Started

### Install Dependencies

```bash
npm install
```

### Development Server

Start the development server with hot reload:

```bash
npm run dev
```

The site will be available at `http://localhost:8080`

### Testing

Run tests:

```bash
npm test                # Run tests in watch mode
npm run test:coverage   # Run tests with coverage report
npm run test:junit      # Generate JUnit XML for CI
```

### Linting

Check code quality:

```bash
npm run lint
```

### Build for Production

Build the optimized production bundle:

```bash
npm run build              # Standard production build
npm run build:analyze      # Build with bundle size analysis
npm run build:dev          # Development build with sourcemaps
```

The build output will be in the `dist/` directory.

### Preview Production Build

Preview the production build locally:

```bash
npm run preview
```

## Deployment

This project is configured for deployment to Netlify with automated CI/CD.

### CI/CD Pipeline

The project includes GitHub Actions workflows for:

- **Linting** - Code quality checks with ESLint
- **Testing** - Automated test runs with coverage reporting
- **Code Coverage** - Codecov integration for coverage tracking and test results
- **Bundle Analysis** - Automatic bundle size tracking
- **SonarQube** - Code quality and security analysis
- **Sentry Release** - Automated release creation with source maps

### Manual Deployment

```bash
# Deploy to Netlify
netlify deploy --prod
```

## Project Structure

```text
src/
├── components/          # React components
│   ├── ui/             # shadcn/ui components (Radix UI primitives)
│   ├── ErrorBoundary.tsx
│   └── ThemeToggle.tsx
├── hooks/              # Custom React hooks
│   ├── use-theme.tsx   # Theme management
│   ├── use-toast.ts    # Toast notifications
│   └── use-mobile.tsx  # Mobile detection
├── lib/                # Utility libraries
│   ├── utils.ts        # cn() helper for className merging
│   ├── analytics.ts    # Analytics tracking
│   └── react-router-dom-proxy.tsx # Router wrapper
├── pages/              # Page components (route views)
│   ├── Index.tsx       # Home page
│   └── NotFound.tsx    # 404 page
├── test/               # Test setup and utilities
├── App.tsx             # Root component with providers
└── main.tsx            # Application entry point

public/
└── images/             # Static image assets

.github/
└── workflows/          # CI/CD workflows
    ├── ci.yml          # Main CI pipeline
    └── snyk.yml        # Security scanning
```

## Features

- Dual-destination landing page with clear navigation
- Photo gallery showcasing league activities
- Theme support (light/dark/system)
- Responsive design for mobile and desktop
- Optimized for performance with Vite
- TypeScript strict mode for enhanced type safety
- Comprehensive test coverage (75%+)
- Code splitting for optimal bundle size
- Sentry integration for error tracking and performance monitoring
- Accessibility-compliant with ARIA labels and semantic HTML

## Development

### Code Quality

This project enforces high code quality standards:

- **TypeScript Strict Mode** - Full type safety with strict null checks
- **ESLint** - Automated code linting
- **Test Coverage** - 75%+ coverage requirement
- **Code Splitting** - Optimized bundle chunks for better caching
- **Performance Monitoring** - Sentry tracing and profiling

### Environment Variables

Create a `.env` file based on `.env.example`:

```bash
# Sentry Configuration
VITE_SENTRY_DSN=your_sentry_dsn
SENTRY_AUTH_TOKEN=your_sentry_auth_token

# Optional: CDN Configuration
CDN_IMG_PREFIX=https://your-cdn.com
```

### Build Configuration

The project includes several build optimizations:

- **Code Splitting** - Separate chunks for React, UI libraries, and Sentry
- **Bundle Analysis** - Visual bundle size reports in `dist/stats.html`
- **Source Maps** - Enabled in development, uploaded to Sentry in production
- **CDN Support** - Custom Vite plugin for CDN image prefixing

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Commit Convention

This project follows [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `test:` - Test additions or changes
- `refactor:` - Code refactoring
- `chore:` - Maintenance tasks

## AI Usage Disclaimer

Portions of this codebase were generated with the assistance of Large Language Models (LLMs). All AI-generated code has been reviewed and tested to ensure quality and correctness.
