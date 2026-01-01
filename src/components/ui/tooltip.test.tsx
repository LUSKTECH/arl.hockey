import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from './tooltip';
import { describe, it, expect } from 'vitest';

describe('Tooltip', () => {
    it('should render tooltip on hover', async () => {
        const user = userEvent.setup();

        render(
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger>Hover me</TooltipTrigger>
                    <TooltipContent>
                        <p>Tooltip content</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        );

        const trigger = screen.getByText('Hover me');
        expect(trigger).toBeInTheDocument();

        await user.hover(trigger);

        await waitFor(() => {
            expect(screen.getAllByText('Tooltip content')[0]).toBeInTheDocument();
        });
    });
});
