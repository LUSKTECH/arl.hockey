import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Index from './Index';
import * as Sentry from '@sentry/react';
import * as analytics from '@/lib/analytics';

// Mock Sentry
vi.mock('@sentry/react', () => ({
    startSpan: vi.fn((config, callback) => callback()),
}));

// Mock analytics
vi.mock('@/lib/analytics', () => ({
    trackExternalLink: vi.fn(),
}));

// Mock window.open
const mockWindowOpen = vi.fn();
window.open = mockWindowOpen;

describe('Index Page', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should render header and hero section', () => {
        render(<Index />);
        
        expect(screen.getAllByText('ARL Hockey')[0]).toBeInTheDocument();
        expect(screen.getAllByText(/Adult Recreational League/)[0]).toBeInTheDocument();
        expect(screen.getByText(/Burlington, Ontario/)).toBeInTheDocument();
    });

    it('should render both navigation cards', () => {
        render(<Index />);
        
        expect(screen.getByText('ARL Hockey League')).toBeInTheDocument();
        expect(screen.getByText('ARL Board')).toBeInTheDocument();
    });

    it('should track and navigate to league site with Sentry span', () => {
        render(<Index />);
        
        const leagueButton = screen.getByRole('button', { name: /Visit ARL Hockey League website/i });
        fireEvent.click(leagueButton);

        // Verify Sentry span was created
        expect(Sentry.startSpan).toHaveBeenCalledWith(
            expect.objectContaining({
                op: 'ui.click',
                name: 'League Site Navigation',
            }),
            expect.any(Function)
        );

        // Verify analytics tracking
        expect(analytics.trackExternalLink).toHaveBeenCalledWith(
            'https://www.rookiehockey.ca',
            'ARL Hockey League'
        );

        // Verify window.open was called with security attributes
        expect(mockWindowOpen).toHaveBeenCalledWith(
            'https://www.rookiehockey.ca',
            '_blank',
            'noopener,noreferrer'
        );
    });

    it('should track and navigate to board site with Sentry span', () => {
        render(<Index />);
        
        const boardButton = screen.getByRole('button', { name: /Visit ARL Board website/i });
        fireEvent.click(boardButton);

        // Verify Sentry span was created
        expect(Sentry.startSpan).toHaveBeenCalledWith(
            expect.objectContaining({
                op: 'ui.click',
                name: 'Board Site Navigation',
            }),
            expect.any(Function)
        );

        // Verify analytics tracking
        expect(analytics.trackExternalLink).toHaveBeenCalledWith(
            'https://board.arl.hockey',
            'ARL Board'
        );

        // Verify window.open was called with security attributes
        expect(mockWindowOpen).toHaveBeenCalledWith(
            'https://board.arl.hockey',
            '_blank',
            'noopener,noreferrer'
        );
    });

    it('should render photo gallery', () => {
        render(<Index />);
        
        expect(screen.getByText('League in Action')).toBeInTheDocument();
        
        // Check for images
        const images = screen.getAllByRole('img');
        expect(images.length).toBeGreaterThan(0);
        
        // Verify alt text for accessibility
        images.forEach((img) => {
            expect(img).toHaveAttribute('alt');
            expect(img.getAttribute('alt')).toMatch(/ARL Hockey action shot/);
        });
    });

    it('should have proper accessibility attributes', () => {
        render(<Index />);
        
        const leagueButton = screen.getByRole('button', { name: /Visit ARL Hockey League website/i });
        const boardButton = screen.getByRole('button', { name: /Visit ARL Board website/i });
        
        expect(leagueButton).toHaveAttribute('aria-label');
        expect(boardButton).toHaveAttribute('aria-label');
    });
});
