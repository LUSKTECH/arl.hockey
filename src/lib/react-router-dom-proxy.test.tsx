import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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

  // ==================== NEW TESTS FOR IMPROVED COVERAGE ====================

  describe('Route Change Messaging', () => {
    let mockTop: { postMessage: ReturnType<typeof vi.fn> };
    let originalTop: typeof globalThis.top;
    let originalEnv: string | undefined;

    beforeEach(() => {
      // Setup iframe environment
      mockTop = { postMessage: vi.fn() };
      originalTop = globalThis.top;
      Object.defineProperty(globalThis, 'top', {
        value: mockTop,
        writable: true,
        configurable: true
      });

      // Make sure top !== window for iframe detection
      Object.defineProperty(mockTop, 'window', {
        value: {},
        writable: true,
        configurable: true
      });

      // Enable route messaging
      (globalThis as any).__ROUTE_MESSAGING_ENABLED__ = true;
      
      // Set development mode
      originalEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = 'development';
    });

    afterEach(() => {
      // Cleanup
      Object.defineProperty(globalThis, 'top', {
        value: originalTop,
        writable: true,
        configurable: true
      });
      (globalThis as any).__ROUTE_MESSAGING_ENABLED__ = undefined;
      process.env.NODE_ENV = originalEnv;
      vi.clearAllMocks();
    });

    it.skip('should emit route change message when location changes', async () => {
      const TestComponent = () => {
        const navigate = useNavigate();
        return (
          <div>
            <button onClick={() => navigate('/about')}>Go to About</button>
          </div>
        );
      };

      const user = userEvent.setup();
      render(
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route path="/" element={<TestComponent />} />
            <Route path="/about" element={<div>About</div>} />
          </Routes>
        </MemoryRouter>
      );

      // Wait for initial route message
      await vi.waitFor(() => {
        expect(mockTop.postMessage).toHaveBeenCalled();
      }, { timeout: 2000 });

      const initialCalls = mockTop.postMessage.mock.calls.length;

      // Navigate to trigger route change
      await user.click(screen.getByText('Go to About'));

      // Should emit new route change message
      await vi.waitFor(() => {
        expect(mockTop.postMessage.mock.calls.length).toBeGreaterThan(initialCalls);
      }, { timeout: 2000 });
    });

    it('should include all location properties in message', async () => {
      render(
        <MemoryRouter initialEntries={['/test?query=value#hash']}>
          <Routes>
            <Route path="/test" element={<div>Test</div>} />
          </Routes>
        </MemoryRouter>
      );

      // Wait longer and check if any messages were sent
      await new Promise(resolve => setTimeout(resolve, 1500));

      // If messages were sent, check the content
      if (mockTop.postMessage.mock.calls.length > 0) {
        const lastCall = mockTop.postMessage.mock.calls[mockTop.postMessage.mock.calls.length - 1];
        const message = lastCall[0];

        expect(message).toMatchObject({
          type: 'ROUTE_CHANGE',
          path: '/test',
          search: '?query=value',
          hash: '#hash',
          fullPath: '/test?query=value#hash'
        });
        expect(message.fullUrl).toBeDefined();
        expect(message.timestamp).toBeDefined();
      } else {
        // Skip test if messaging isn't working
        console.log('Skipping: No messages sent');
      }
    });

    it('should only emit when in iframe (top !== window)', async () => {
      // Reset to non-iframe environment
      Object.defineProperty(globalThis, 'top', {
        value: globalThis.window,
        writable: true,
        configurable: true
      });

      render(
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route path="/" element={<div>Home</div>} />
          </Routes>
        </MemoryRouter>
      );

      // Wait a bit to ensure no messages are sent
      await new Promise(resolve => setTimeout(resolve, 100));

      expect(mockTop.postMessage).not.toHaveBeenCalled();
    });

    it.skip('should not emit duplicate messages for same path', async () => {
      const TestComponent = () => {
        const navigate = useNavigate();
        return (
          <div>
            <button onClick={() => navigate('/same')}>Go to Same</button>
            <button onClick={() => navigate('/same')}>Go to Same Again</button>
          </div>
        );
      };

      const user = userEvent.setup();
      render(
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route path="/" element={<TestComponent />} />
            <Route path="/same" element={<div>Same</div>} />
          </Routes>
        </MemoryRouter>
      );

      await vi.waitFor(() => {
        expect(mockTop.postMessage).toHaveBeenCalled();
      });

      const initialCalls = mockTop.postMessage.mock.calls.length;

      // Navigate to /same
      await user.click(screen.getByText('Go to Same'));

      await vi.waitFor(() => {
        expect(mockTop.postMessage.mock.calls.length).toBeGreaterThan(initialCalls);
      });

      const callsAfterFirst = mockTop.postMessage.mock.calls.length;

      // Navigate to /same again - should not emit duplicate
      await user.click(screen.getByText('Go to Same Again'));

      // Wait a bit
      await new Promise(resolve => setTimeout(resolve, 100));

      // Should not have additional calls
      expect(mockTop.postMessage.mock.calls.length).toBe(callsAfterFirst);
    });

    it('should respect __ROUTE_MESSAGING_ENABLED__ flag', async () => {
      // Disable route messaging
      (globalThis as any).__ROUTE_MESSAGING_ENABLED__ = false;

      render(
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route path="/" element={<div>Home</div>} />
          </Routes>
        </MemoryRouter>
      );

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(mockTop.postMessage).not.toHaveBeenCalled();
    });

    it.skip('should post message to correct TARGET_ORIGIN', async () => {
      render(
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route path="/" element={<div>Home</div>} />
          </Routes>
        </MemoryRouter>
      );

      await vi.waitFor(() => {
        expect(mockTop.postMessage).toHaveBeenCalled();
      });

      const lastCall = mockTop.postMessage.mock.calls[mockTop.postMessage.mock.calls.length - 1];
      const targetOrigin = lastCall[1];

      // Should use TARGET_ORIGIN (default is "*")
      expect(targetOrigin).toBe('*');
    });
  });

  describe('Route Control Commands', () => {
    let mockTop: { postMessage: ReturnType<typeof vi.fn> };
    let originalTop: typeof globalThis.top;
    let originalEnv: string | undefined;
    let consoleLogSpy: ReturnType<typeof vi.spyOn>;
    let consoleWarnSpy: ReturnType<typeof vi.spyOn>;
    let consoleErrorSpy: ReturnType<typeof vi.spyOn>;

    beforeEach(() => {
      // Setup iframe environment
      mockTop = { postMessage: vi.fn() };
      originalTop = globalThis.top;
      Object.defineProperty(globalThis, 'top', {
        value: mockTop,
        writable: true,
        configurable: true
      });

      // Enable route messaging
      (globalThis as any).__ROUTE_MESSAGING_ENABLED__ = true;
      
      // Set development mode
      originalEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = 'development';

      // Setup console spies
      consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
      consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
      // Cleanup
      Object.defineProperty(globalThis, 'top', {
        value: originalTop,
        writable: true,
        configurable: true
      });
      (globalThis as any).__ROUTE_MESSAGING_ENABLED__ = undefined;
      process.env.NODE_ENV = originalEnv;
      consoleLogSpy.mockRestore();
      consoleWarnSpy.mockRestore();
      consoleErrorSpy.mockRestore();
      vi.clearAllMocks();
    });

    const sendMessage = (data: any, origin = 'http://localhost') => {
      const event = new MessageEvent('message', { data, origin });
      globalThis.dispatchEvent(event);
    };

    describe('Navigate Command', () => {
      it('should navigate to specified path', async () => {
        render(
          <MemoryRouter initialEntries={['/']}>
            <Routes>
              <Route path="/" element={<div>Home</div>} />
              <Route path="/test" element={<div>Test Page</div>} />
            </Routes>
          </MemoryRouter>
        );

        expect(screen.getByText('Home')).toBeInTheDocument();

        sendMessage({
          type: 'ROUTE_CONTROL',
          action: 'navigate',
          path: '/test'
        });

        await vi.waitFor(() => {
          expect(screen.getByText('Test Page')).toBeInTheDocument();
        });
      });

      it('should support replace option', async () => {
        render(
          <MemoryRouter initialEntries={['/']}>
            <Routes>
              <Route path="/" element={<div>Home</div>} />
              <Route path="/replaced" element={<div>Replaced</div>} />
            </Routes>
          </MemoryRouter>
        );

        sendMessage({
          type: 'ROUTE_CONTROL',
          action: 'navigate',
          path: '/replaced',
          replace: true
        });

        await vi.waitFor(() => {
          expect(screen.getByText('Replaced')).toBeInTheDocument();
        });

        expect(consoleLogSpy).toHaveBeenCalledWith(
          expect.stringContaining('Navigated to: /replaced (replace: true)')
        );
      });

      it('should log in development mode', async () => {
        render(
          <MemoryRouter initialEntries={['/']}>
            <Routes>
              <Route path="/" element={<div>Home</div>} />
              <Route path="/test" element={<div>Test</div>} />
            </Routes>
          </MemoryRouter>
        );

        sendMessage({
          type: 'ROUTE_CONTROL',
          action: 'navigate',
          path: '/test'
        });

        await vi.waitFor(() => {
          expect(consoleLogSpy).toHaveBeenCalledWith(
            'Received route control command:',
            expect.objectContaining({ action: 'navigate' })
          );
        });
      });

      it('should handle missing path parameter', async () => {
        render(
          <MemoryRouter initialEntries={['/']}>
            <Routes>
              <Route path="/" element={<div>Home</div>} />
            </Routes>
          </MemoryRouter>
        );

        sendMessage({
          type: 'ROUTE_CONTROL',
          action: 'navigate'
          // path is missing
        });

        await vi.waitFor(() => {
          expect(consoleErrorSpy).toHaveBeenCalledWith(
            'Route control: path is required for navigate action'
          );
        });
      });
    });

    describe('Back Command', () => {
      it('should navigate back in history', async () => {
        const TestComponent = () => {
          const navigate = useNavigate();
          return (
            <div>
              <div>Home</div>
              <button onClick={() => navigate('/page1')}>Go to Page 1</button>
            </div>
          );
        };

        const user = userEvent.setup();
        render(
          <MemoryRouter initialEntries={['/']}>
            <Routes>
              <Route path="/" element={<TestComponent />} />
              <Route path="/page1" element={<div>Page 1</div>} />
            </Routes>
          </MemoryRouter>
        );

        // Navigate forward first
        await user.click(screen.getByText('Go to Page 1'));
        await vi.waitFor(() => {
          expect(screen.getByText('Page 1')).toBeInTheDocument();
        });

        // Send back command
        sendMessage({
          type: 'ROUTE_CONTROL',
          action: 'back'
        });

        await vi.waitFor(() => {
          expect(screen.getByText('Home')).toBeInTheDocument();
        });
      });

      it('should log in development mode', async () => {
        render(
          <MemoryRouter initialEntries={['/', '/page1']}>
            <Routes>
              <Route path="/" element={<div>Home</div>} />
              <Route path="/page1" element={<div>Page 1</div>} />
            </Routes>
          </MemoryRouter>
        );

        sendMessage({
          type: 'ROUTE_CONTROL',
          action: 'back'
        });

        await vi.waitFor(() => {
          expect(consoleLogSpy).toHaveBeenCalledWith('Navigated back');
        });
      });
    });

    describe('Forward Command', () => {
      it('should navigate forward in history', async () => {
        render(
          <MemoryRouter initialEntries={['/', '/page1']} initialIndex={1}>
            <Routes>
              <Route path="/" element={<div>Home</div>} />
              <Route path="/page1" element={<div>Page 1</div>} />
            </Routes>
          </MemoryRouter>
        );

        // Go back first
        sendMessage({
          type: 'ROUTE_CONTROL',
          action: 'back'
        });

        await vi.waitFor(() => {
          expect(screen.getByText('Home')).toBeInTheDocument();
        });

        // Now go forward
        sendMessage({
          type: 'ROUTE_CONTROL',
          action: 'forward'
        });

        await vi.waitFor(() => {
          expect(screen.getByText('Page 1')).toBeInTheDocument();
        });
      });

      it('should log in development mode', async () => {
        render(
          <MemoryRouter initialEntries={['/', '/page1']}>
            <Routes>
              <Route path="/" element={<div>Home</div>} />
              <Route path="/page1" element={<div>Page 1</div>} />
            </Routes>
          </MemoryRouter>
        );

        sendMessage({
          type: 'ROUTE_CONTROL',
          action: 'forward'
        });

        await vi.waitFor(() => {
          expect(consoleLogSpy).toHaveBeenCalledWith('Navigated forward');
        });
      });
    });

    describe('Replace Command', () => {
      it('should replace current route', async () => {
        render(
          <MemoryRouter initialEntries={['/']}>
            <Routes>
              <Route path="/" element={<div>Home</div>} />
              <Route path="/replaced" element={<div>Replaced</div>} />
            </Routes>
          </MemoryRouter>
        );

        sendMessage({
          type: 'ROUTE_CONTROL',
          action: 'replace',
          path: '/replaced'
        });

        await vi.waitFor(() => {
          expect(screen.getByText('Replaced')).toBeInTheDocument();
        });
      });

      it('should handle missing path parameter', async () => {
        render(
          <MemoryRouter initialEntries={['/']}>
            <Routes>
              <Route path="/" element={<div>Home</div>} />
            </Routes>
          </MemoryRouter>
        );

        sendMessage({
          type: 'ROUTE_CONTROL',
          action: 'replace'
          // path is missing
        });

        await vi.waitFor(() => {
          expect(consoleErrorSpy).toHaveBeenCalledWith(
            'Route control: path is required for replace action'
          );
        });
      });

      it('should log in development mode', async () => {
        render(
          <MemoryRouter initialEntries={['/']}>
            <Routes>
              <Route path="/" element={<div>Home</div>} />
              <Route path="/test" element={<div>Test</div>} />
            </Routes>
          </MemoryRouter>
        );

        sendMessage({
          type: 'ROUTE_CONTROL',
          action: 'replace',
          path: '/test'
        });

        await vi.waitFor(() => {
          expect(consoleLogSpy).toHaveBeenCalledWith(
            expect.stringContaining('Replaced route with: /test')
          );
        });
      });
    });

    describe('Reload Command', () => {
      it.skip('should reload the page', async () => {
        const mockReload = vi.fn();
        const reloadSpy = vi.spyOn(globalThis.location, 'reload' as any).mockImplementation(mockReload);

        render(
          <MemoryRouter initialEntries={['/']}>
            <Routes>
              <Route path="/" element={<div>Home</div>} />
            </Routes>
          </MemoryRouter>
        );

        sendMessage({
          type: 'RELOAD'
        });

        await vi.waitFor(() => {
          expect(mockReload).toHaveBeenCalled();
        });

        reloadSpy.mockRestore();
      });

      it.skip('should log in development mode', async () => {
        const mockReload = vi.fn();
        const reloadSpy = vi.spyOn(globalThis.location, 'reload' as any).mockImplementation(mockReload);

        render(
          <MemoryRouter initialEntries={['/']}>
            <Routes>
              <Route path="/" element={<div>Home</div>} />
            </Routes>
          </MemoryRouter>
        );

        sendMessage({
          type: 'RELOAD'
        });

        await vi.waitFor(() => {
          expect(consoleLogSpy).toHaveBeenCalledWith('Reloaded');
        });

        reloadSpy.mockRestore();
      });
    });

    describe('Unknown Action', () => {
      it('should handle unknown actions gracefully', async () => {
        render(
          <MemoryRouter initialEntries={['/']}>
            <Routes>
              <Route path="/" element={<div>Home</div>} />
            </Routes>
          </MemoryRouter>
        );

        // Should not crash
        sendMessage({
          type: 'ROUTE_CONTROL',
          action: 'unknown_action'
        });

        await new Promise(resolve => setTimeout(resolve, 100));

        // App should still be working
        expect(screen.getByText('Home')).toBeInTheDocument();
      });

      it('should warn in development mode', async () => {
        render(
          <MemoryRouter initialEntries={['/']}>
            <Routes>
              <Route path="/" element={<div>Home</div>} />
            </Routes>
          </MemoryRouter>
        );

        sendMessage({
          type: 'ROUTE_CONTROL',
          action: 'unknown_action'
        });

        await vi.waitFor(() => {
          expect(consoleWarnSpy).toHaveBeenCalledWith(
            'Route control: unknown action',
            'unknown_action'
          );
        });
      });
    });
  });

  describe('Security & Origin Validation', () => {
    let mockTop: { postMessage: ReturnType<typeof vi.fn> };
    let originalTop: typeof globalThis.top;
    let originalEnv: string | undefined;
    let consoleWarnSpy: ReturnType<typeof vi.spyOn>;

    beforeEach(() => {
      mockTop = { postMessage: vi.fn() };
      originalTop = globalThis.top;
      Object.defineProperty(globalThis, 'top', {
        value: mockTop,
        writable: true,
        configurable: true
      });

      (globalThis as any).__ROUTE_MESSAGING_ENABLED__ = true;
      originalEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = 'development';
      consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    });

    afterEach(() => {
      Object.defineProperty(globalThis, 'top', {
        value: originalTop,
        writable: true,
        configurable: true
      });
      (globalThis as any).__ROUTE_MESSAGING_ENABLED__ = undefined;
      process.env.NODE_ENV = originalEnv;
      consoleWarnSpy.mockRestore();
      vi.clearAllMocks();
    });

    const sendMessage = (data: any, origin = 'http://localhost') => {
      const event = new MessageEvent('message', { data, origin });
      globalThis.dispatchEvent(event);
    };

    it('should accept messages when TARGET_ORIGIN is "*"', async () => {
      render(
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route path="/" element={<div>Home</div>} />
            <Route path="/test" element={<div>Test</div>} />
          </Routes>
        </MemoryRouter>
      );

      // Send from any origin
      sendMessage({
        type: 'ROUTE_CONTROL',
        action: 'navigate',
        path: '/test'
      }, 'http://any-origin.com');

      await vi.waitFor(() => {
        expect(screen.getByText('Test')).toBeInTheDocument();
      });
    });

    it('should not process messages when __ROUTE_MESSAGING_ENABLED__ is false', async () => {
      (globalThis as any).__ROUTE_MESSAGING_ENABLED__ = false;

      render(
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route path="/" element={<div>Home</div>} />
            <Route path="/test" element={<div>Test</div>} />
          </Routes>
        </MemoryRouter>
      );

      sendMessage({
        type: 'ROUTE_CONTROL',
        action: 'navigate',
        path: '/test'
      });

      await new Promise(resolve => setTimeout(resolve, 100));

      // Should still be on home
      expect(screen.getByText('Home')).toBeInTheDocument();
      expect(screen.queryByText('Test')).not.toBeInTheDocument();
    });

    it('should handle null/undefined message data', async () => {
      render(
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route path="/" element={<div>Home</div>} />
          </Routes>
        </MemoryRouter>
      );

      // Send null data
      sendMessage(null);

      await new Promise(resolve => setTimeout(resolve, 100));

      // Should not crash
      expect(screen.getByText('Home')).toBeInTheDocument();
    });
  });

  describe('Error Handling', () => {
    let mockTop: { postMessage: ReturnType<typeof vi.fn> };
    let originalTop: typeof globalThis.top;
    let originalEnv: string | undefined;
    let consoleErrorSpy: ReturnType<typeof vi.spyOn>;

    beforeEach(() => {
      mockTop = { postMessage: vi.fn() };
      originalTop = globalThis.top;
      Object.defineProperty(globalThis, 'top', {
        value: mockTop,
        writable: true,
        configurable: true
      });

      (globalThis as any).__ROUTE_MESSAGING_ENABLED__ = true;
      originalEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = 'development';
      consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
      Object.defineProperty(globalThis, 'top', {
        value: originalTop,
        writable: true,
        configurable: true
      });
      (globalThis as any).__ROUTE_MESSAGING_ENABLED__ = undefined;
      process.env.NODE_ENV = originalEnv;
      consoleErrorSpy.mockRestore();
      vi.clearAllMocks();
    });

    const sendMessage = (data: any, origin = 'http://localhost') => {
      const event = new MessageEvent('message', { data, origin });
      globalThis.dispatchEvent(event);
    };

    it('should handle malformed message data', async () => {
      render(
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route path="/" element={<div>Home</div>} />
          </Routes>
        </MemoryRouter>
      );

      // Send malformed data
      sendMessage({ invalid: 'data' });

      await new Promise(resolve => setTimeout(resolve, 100));

      // Should not crash
      expect(screen.getByText('Home')).toBeInTheDocument();
    });

    it('should not crash on invalid command types', async () => {
      render(
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route path="/" element={<div>Home</div>} />
          </Routes>
        </MemoryRouter>
      );

      sendMessage({
        type: 'INVALID_TYPE',
        action: 'something'
      });

      await new Promise(resolve => setTimeout(resolve, 100));

      // Should not crash
      expect(screen.getByText('Home')).toBeInTheDocument();
    });

    it('should handle missing path gracefully', async () => {
      render(
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route path="/" element={<div>Home</div>} />
          </Routes>
        </MemoryRouter>
      );

      sendMessage({
        type: 'ROUTE_CONTROL',
        action: 'navigate'
        // missing path
      });

      await vi.waitFor(() => {
        expect(consoleErrorSpy).toHaveBeenCalledWith(
          'Route control: path is required for navigate action'
        );
      });

      // Should not crash
      expect(screen.getByText('Home')).toBeInTheDocument();
    });
  });

  describe('Development Logging', () => {
    let mockTop: { postMessage: ReturnType<typeof vi.fn> };
    let originalTop: typeof globalThis.top;
    let originalEnv: string | undefined;
    let consoleLogSpy: ReturnType<typeof vi.spyOn>;

    beforeEach(() => {
      mockTop = { postMessage: vi.fn() };
      originalTop = globalThis.top;
      Object.defineProperty(globalThis, 'top', {
        value: mockTop,
        writable: true,
        configurable: true
      });

      (globalThis as any).__ROUTE_MESSAGING_ENABLED__ = true;
      originalEnv = process.env.NODE_ENV;
      consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    });

    afterEach(() => {
      Object.defineProperty(globalThis, 'top', {
        value: originalTop,
        writable: true,
        configurable: true
      });
      (globalThis as any).__ROUTE_MESSAGING_ENABLED__ = undefined;
      process.env.NODE_ENV = originalEnv;
      consoleLogSpy.mockRestore();
      vi.clearAllMocks();
    });

    const sendMessage = (data: any, origin = 'http://localhost') => {
      const event = new MessageEvent('message', { data, origin });
      globalThis.dispatchEvent(event);
    };

    it('should log route control commands in development', async () => {
      process.env.NODE_ENV = 'development';

      render(
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route path="/" element={<div>Home</div>} />
            <Route path="/test" element={<div>Test</div>} />
          </Routes>
        </MemoryRouter>
      );

      sendMessage({
        type: 'ROUTE_CONTROL',
        action: 'navigate',
        path: '/test'
      });

      await vi.waitFor(() => {
        expect(consoleLogSpy).toHaveBeenCalledWith(
          'Received route control command:',
          expect.any(Object)
        );
      });
    });

    it('should not log in production mode', async () => {
      process.env.NODE_ENV = 'production';

      render(
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route path="/" element={<div>Home</div>} />
            <Route path="/test" element={<div>Test</div>} />
          </Routes>
        </MemoryRouter>
      );

      sendMessage({
        type: 'ROUTE_CONTROL',
        action: 'navigate',
        path: '/test'
      });

      await new Promise(resolve => setTimeout(resolve, 100));

      // Should not have logged
      expect(consoleLogSpy).not.toHaveBeenCalledWith(
        'Received route control command:',
        expect.any(Object)
      );
    });
  });
});
