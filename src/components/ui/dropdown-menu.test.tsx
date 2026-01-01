import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuCheckboxItem,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuGroup,
    DropdownMenuPortal,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
} from './dropdown-menu';
import { describe, it, expect, vi } from 'vitest';

describe('DropdownMenu', () => {
    it('should render trigger and open menu on click', async () => {
        const user = userEvent.setup();

        render(
            <DropdownMenu>
                <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem>Item 1</DropdownMenuItem>
                    <DropdownMenuItem>Item 2</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        );

        const trigger = screen.getByText('Open Menu');
        expect(trigger).toBeInTheDocument();

        await user.click(trigger);

        await waitFor(() => {
            expect(screen.getByText('Item 1')).toBeInTheDocument();
        });
    });

    it('should handle menu item clicks', async () => {
        const handleClick = vi.fn();
        const user = userEvent.setup();

        render(
            <DropdownMenu>
                <DropdownMenuTrigger>Open</DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem onClick={handleClick}>Click Me</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        );

        await user.click(screen.getByText('Open'));
        await waitFor(() => screen.getByText('Click Me'));
        await user.click(screen.getByText('Click Me'));

        expect(handleClick).toHaveBeenCalled();
    });

    it('should render checkbox items', async () => {
        const user = userEvent.setup();

        render(
            <DropdownMenu>
                <DropdownMenuTrigger>Open</DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuCheckboxItem checked={true}>
                        Checked Item
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem checked={false}>
                        Unchecked Item
                    </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
            </DropdownMenu>
        );

        await user.click(screen.getByText('Open'));

        await waitFor(() => {
            expect(screen.getByText('Checked Item')).toBeInTheDocument();
            expect(screen.getByText('Unchecked Item')).toBeInTheDocument();
        });
    });

    it('should render radio group', async () => {
        const user = userEvent.setup();

        render(
            <DropdownMenu>
                <DropdownMenuTrigger>Open</DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuRadioGroup value="option1">
                        <DropdownMenuRadioItem value="option1">Option 1</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="option2">Option 2</DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        );

        await user.click(screen.getByText('Open'));

        await waitFor(() => {
            expect(screen.getByText('Option 1')).toBeInTheDocument();
            expect(screen.getByText('Option 2')).toBeInTheDocument();
        });
    });

    it('should render label and separator', async () => {
        const user = userEvent.setup();

        render(
            <DropdownMenu>
                <DropdownMenuTrigger>Open</DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        );

        await user.click(screen.getByText('Open'));

        await waitFor(() => {
            expect(screen.getByText('My Account')).toBeInTheDocument();
            expect(screen.getByText('Profile')).toBeInTheDocument();
        });
    });

    it('should render shortcut', async () => {
        const user = userEvent.setup();

        render(
            <DropdownMenu>
                <DropdownMenuTrigger>Open</DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem>
                        Save
                        <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        );

        await user.click(screen.getByText('Open'));

        await waitFor(() => {
            expect(screen.getByText('⌘S')).toBeInTheDocument();
        });
    });

    it('should render grouped items', async () => {
        const user = userEvent.setup();

        render(
            <DropdownMenu>
                <DropdownMenuTrigger>Open</DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuGroup>
                        <DropdownMenuItem>Group Item 1</DropdownMenuItem>
                        <DropdownMenuItem>Group Item 2</DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        );

        await user.click(screen.getByText('Open'));

        await waitFor(() => {
            expect(screen.getByText('Group Item 1')).toBeInTheDocument();
        });
    });

    it('should render submenu', async () => {
        const user = userEvent.setup();

        render(
            <DropdownMenu>
                <DropdownMenuTrigger>Open</DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger>More Options</DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                            <DropdownMenuSubContent>
                                <DropdownMenuItem>Sub Item 1</DropdownMenuItem>
                            </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                    </DropdownMenuSub>
                </DropdownMenuContent>
            </DropdownMenu>
        );

        await user.click(screen.getByText('Open'));

        await waitFor(() => {
            expect(screen.getByText('More Options')).toBeInTheDocument();
        });
    });

    it('should handle inset prop', async () => {
        const user = userEvent.setup();

        render(
            <DropdownMenu>
                <DropdownMenuTrigger>Open</DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem inset>Inset Item</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        );

        await user.click(screen.getByText('Open'));

        await waitFor(() => {
            const item = screen.getByText('Inset Item');
            expect(item).toBeInTheDocument();
        });
    });
});
