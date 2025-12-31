import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeToggle } from './ThemeToggle';
import { ThemeProvider } from '@/hooks/use-theme';
import { describe, it, expect } from 'vitest';

describe('ThemeToggle', () => {
    it('should render and change theme', async () => {
        const user = userEvent.setup();

        render(
            <ThemeProvider defaultTheme="light" storageKey="test-theme">
                <ThemeToggle />
            </ThemeProvider>
        );

        const trigger = screen.getByRole('button', { name: /toggle theme/i });
        expect(trigger).toBeInTheDocument();

        await user.click(trigger);

        // Wait for dropdown content
        await waitFor(() => {
            expect(screen.getByText('Light')).toBeInTheDocument();
        });

        const darkItem = screen.getByText('Dark');
        expect(darkItem).toBeInTheDocument();

        await user.click(darkItem);

        // Verify class on html element
        await waitFor(() => {
            expect(document.documentElement.classList.contains('dark')).toBe(true);
        });

        // Test System option
        await user.click(trigger);
        const systemItem = await screen.findByText("System");
        await user.click(systemItem);
        // System usually defaults to light or dark based on media query.
        // We can just verify the click didn't crash and maybe check called setTheme("system").
        // Checking class is hard without mocking specific media query state.

        // Test Light option
        await user.click(trigger);
        const lightItem = await screen.findByText("Light");
        await user.click(lightItem);
        await waitFor(() => {
            expect(document.documentElement.classList.contains('light')).toBe(true);
        });
    });
});
