import { render, screen } from '@testing-library/react';
import NotFound from './NotFound';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('NotFound Page', () => {
    beforeEach(() => {
        vi.stubEnv('NODE_ENV', 'development');
        vi.spyOn(console, 'error').mockImplementation(() => {});
    });

    it('should render 404 message', () => {
        render(
            <BrowserRouter>
                <NotFound />
            </BrowserRouter>
        );

        expect(screen.getByText('404')).toBeInTheDocument();
        expect(screen.getByText('Page Not Found')).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /return to home/i })).toBeInTheDocument();
    });

    it('should log error in development mode', () => {
        const consoleErrorSpy = vi.spyOn(console, 'error');
        
        render(
            <BrowserRouter>
                <NotFound />
            </BrowserRouter>
        );

        expect(consoleErrorSpy).toHaveBeenCalled();
    });
});
