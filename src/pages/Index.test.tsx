import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Index from './Index';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as analytics from '../lib/analytics';

// Mock analytics
vi.mock('../lib/analytics', () => ({
    trackExternalLink: vi.fn(),
    trackPageView: vi.fn(),
    trackEvent: vi.fn(),
}));

// Mock ThemeToggle to keep test simple (or just render it)
// It's already tested individually.
vi.mock('@/components/ThemeToggle', () => ({
    ThemeToggle: () => <div data-testid="theme-toggle" />
}));

describe('Index Page', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        vi.spyOn(window, 'open').mockImplementation(() => null);
    });

    it('should render header and hero section', () => {
        render(<Index />);
        expect(screen.getByRole('heading', { level: 1, name: 'ARL Hockey' })).toBeInTheDocument();
        expect(screen.getByText(/Burlington's premier co-ed/i)).toBeInTheDocument();
        expect(screen.getByText('Burlington, Ontario')).toBeInTheDocument();
    });

    it('should track and open league site on click', async () => {
        const user = userEvent.setup();
        render(<Index />);

        const leagueButton = screen.getByRole('button', { name: /visit league site/i });
        await user.click(leagueButton);

        expect(analytics.trackExternalLink).toHaveBeenCalledWith('https://www.rookiehockey.ca', 'ARL Hockey League');
        expect(window.open).toHaveBeenCalledWith('https://www.rookiehockey.ca', '_blank');
    });

    it('should track and open board site on click', async () => {
        const user = userEvent.setup();
        render(<Index />);

        const boardButton = screen.getByRole('button', { name: /visit board site/i });
        await user.click(boardButton);

        expect(analytics.trackExternalLink).toHaveBeenCalledWith('https://board.arl.hockey', 'ARL Board');
        expect(window.open).toHaveBeenCalledWith('https://board.arl.hockey', '_blank');
    });

    it('should render gallery images', () => {
        render(<Index />);
        const images = screen.getAllByRole('img');
        // 6 images + maybe hero bg if it was img (it is div bg)
        // actually 6 gallery images.
        expect(images.length).toBeGreaterThanOrEqual(6);
    });
});
