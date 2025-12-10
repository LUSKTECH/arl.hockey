# ARL Hockey Landing Page

A landing page for the Adult Recreational League - a co-ed recreational hockey community serving Burlington, Hamilton, Milton, and Oakville in Ontario, Canada.

## Tech Stack

- **Build Tool**: Vite 5.4+
- **Framework**: React 18.3+ with TypeScript 5.5+
- **Styling**: Tailwind CSS 3.4+ with shadcn/ui components
- **Routing**: React Router DOM 6.26+ (HashRouter)
- **Icons**: Lucide React
- **Theming**: next-themes with dark mode support

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

### Build for Production

Build the optimized production bundle:

```bash
npm run build
```

### Preview Production Build

Preview the production build locally:

```bash
npm run preview
```

## Deployment

This project is configured for deployment to Netlify. See `netlify.toml` for build configuration.

```bash
# Deploy to Netlify
netlify deploy --prod
```

## Project Structure

```text
src/
├── components/          # React components
│   ├── ui/             # shadcn/ui components
│   └── ThemeToggle.tsx # Custom components
├── hooks/              # Custom React hooks
├── lib/                # Utility libraries
├── pages/              # Page components (route views)
├── App.tsx             # Root component with providers
└── main.tsx            # Application entry point

public/
└── images/             # Static image assets
```

## Features

- Dual-destination landing page with clear navigation
- Photo gallery showcasing league activities
- Theme support (light/dark/system)
- Responsive design for mobile and desktop
- Optimized for performance with Vite
