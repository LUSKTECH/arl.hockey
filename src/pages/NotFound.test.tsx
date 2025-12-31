import { render, screen } from '@testing-library/react';
import NotFound from './NotFound';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';

describe('NotFound Page', () => {
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
});
