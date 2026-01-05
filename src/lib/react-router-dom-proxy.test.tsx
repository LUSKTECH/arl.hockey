import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Routes, Route, HashRouter, BrowserRouter, MemoryRouter, Link, useNavigate, useLocation } from './react-router-dom-proxy';
import * as React from 'react';

describe('react-router-dom-proxy', () => {
  describe('Re-exports', () => {
    it('should re-export Routes component', () => {
      expect(Routes).toBeDefined();
      expect(typeof Routes).toBe('function');
    });

    it('should re-export Route component', () => {
      expect(Route).toBeDefined();
      expect(typeof Route).toBe('function');
    });

    it('should re-export HashRouter component', () => {
      expect(HashRouter).toBeDefined();
      expect(typeof HashRouter).toBe('function');
    });

    it('should re-export BrowserRouter component', () => {
      expect(BrowserRouter).toBeDefined();
      expect(typeof BrowserRouter).toBe('function');
    });

    it('should re-export MemoryRouter component', () => {
      expect(MemoryRouter).toBeDefined();
      expect(typeof MemoryRouter).toBe('function');
    });

    it('should re-export Link component', () => {
      expect(Link).toBeDefined();
      // Link is a forwardRef component, so it's an object
      expect(Link).toBeTruthy();
    });

    it('should re-export useNavigate hook', () => {
      expect(useNavigate).toBeDefined();
      expect(typeof useNavigate).toBe('function');
    });

    it('should re-export useLocation hook', () => {
      expect(useLocation).toBeDefined();
      expect(typeof useLocation).toBe('function');
    });
  });

  describe('Routes component', () => {
    it('should render Routes component with children', () => {
      render(
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route path="/" element={<div>Home Page</div>} />
          </Routes>
        </MemoryRouter>
      );

      expect(screen.getByText('Home Page')).toBeInTheDocument();
    });

    it('should handle multiple routes', () => {
      render(
        <MemoryRouter initialEntries={['/about']}>
          <Routes>
            <Route path="/" element={<div>Home</div>} />
            <Route path="/about" element={<div>About Page</div>} />
          </Routes>
        </MemoryRouter>
      );

      expect(screen.getByText('About Page')).toBeInTheDocument();
    });

    it('should handle nested routes', () => {
      render(
        <MemoryRouter initialEntries={['/users/123']}>
          <Routes>
            <Route path="/" element={<div>Home</div>} />
            <Route path="/users/:id" element={<div>User Profile</div>} />
          </Routes>
        </MemoryRouter>
      );

      expect(screen.getByText('User Profile')).toBeInTheDocument();
    });

    it('should handle index routes', () => {
      render(
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route index element={<div>Index Page</div>} />
            <Route path="/about" element={<div>About</div>} />
          </Routes>
        </MemoryRouter>
      );

      expect(screen.getByText('Index Page')).toBeInTheDocument();
    });

    it('should handle wildcard routes', () => {
      render(
        <MemoryRouter initialEntries={['/unknown']}>
          <Routes>
            <Route path="/" element={<div>Home</div>} />
            <Route path="*" element={<div>Not Found</div>} />
          </Routes>
        </MemoryRouter>
      );

      expect(screen.getByText('Not Found')).toBeInTheDocument();
    });
  });

  describe('HashRouter component', () => {
    it('should render HashRouter with children', () => {
      render(
        <HashRouter>
          <div>Test Content</div>
        </HashRouter>
      );

      expect(screen.getByText('Test Content')).toBeInTheDocument();
    });

    it('should render routes inside HashRouter', () => {
      render(
        <HashRouter>
          <Routes>
            <Route path="/" element={<div>Home in HashRouter</div>} />
          </Routes>
        </HashRouter>
      );

      expect(screen.getByText('Home in HashRouter')).toBeInTheDocument();
    });
  });

  describe('BrowserRouter component', () => {
    it('should render BrowserRouter with children', () => {
      render(
        <BrowserRouter>
          <div>Browser Router Content</div>
        </BrowserRouter>
      );

      expect(screen.getByText('Browser Router Content')).toBeInTheDocument();
    });

    it('should render routes inside BrowserRouter', () => {
      render(
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<div>Home in BrowserRouter</div>} />
          </Routes>
        </BrowserRouter>
      );

      expect(screen.getByText('Home in BrowserRouter')).toBeInTheDocument();
    });
  });

  describe('MemoryRouter component', () => {
    it('should render MemoryRouter with children', () => {
      render(
        <MemoryRouter>
          <div>Memory Router Content</div>
        </MemoryRouter>
      );

      expect(screen.getByText('Memory Router Content')).toBeInTheDocument();
    });

    it('should render routes inside MemoryRouter', () => {
      render(
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route path="/" element={<div>Home in MemoryRouter</div>} />
          </Routes>
        </MemoryRouter>
      );

      expect(screen.getByText('Home in MemoryRouter')).toBeInTheDocument();
    });

    it('should respect initialEntries prop', () => {
      render(
        <MemoryRouter initialEntries={['/test']}>
          <Routes>
            <Route path="/" element={<div>Home</div>} />
            <Route path="/test" element={<div>Test Page</div>} />
          </Routes>
        </MemoryRouter>
      );

      expect(screen.getByText('Test Page')).toBeInTheDocument();
    });
  });

  describe('Link component', () => {
    it('should render Link component', () => {
      render(
        <MemoryRouter>
          <Link to="/about">About Link</Link>
        </MemoryRouter>
      );

      expect(screen.getByText('About Link')).toBeInTheDocument();
    });
  });

  describe('Hooks', () => {
    it('should provide useLocation hook', () => {
      const TestComponent = () => {
        const location = useLocation();
        return <div>Path: {location.pathname}</div>;
      };

      render(
        <MemoryRouter initialEntries={['/test-path']}>
          <TestComponent />
        </MemoryRouter>
      );

      expect(screen.getByText('Path: /test-path')).toBeInTheDocument();
    });

    it('should provide useNavigate hook', () => {
      const TestComponent = () => {
        const navigate = useNavigate();
        return (
          <button onClick={() => navigate('/new-path')}>
            Navigate
          </button>
        );
      };

      render(
        <MemoryRouter>
          <TestComponent />
        </MemoryRouter>
      );

      expect(screen.getByText('Navigate')).toBeInTheDocument();
    });
  });

  describe('Integration', () => {
    it('should work with complete routing setup', () => {
      const App = () => (
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route path="/" element={<div>Home</div>} />
            <Route path="/about" element={<div>About</div>} />
            <Route path="/contact" element={<div>Contact</div>} />
            <Route path="*" element={<div>404</div>} />
          </Routes>
        </MemoryRouter>
      );

      render(<App />);
      expect(screen.getByText('Home')).toBeInTheDocument();
    });

    it('should handle navigation between routes', () => {
      const App = () => (
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route path="/" element={
              <div>
                <h1>Home</h1>
                <Link to="/about">Go to About</Link>
              </div>
            } />
            <Route path="/about" element={<div>About Page</div>} />
          </Routes>
        </MemoryRouter>
      );

      render(<App />);
      expect(screen.getByText('Home')).toBeInTheDocument();
      expect(screen.getByText('Go to About')).toBeInTheDocument();
    });
  });
});
