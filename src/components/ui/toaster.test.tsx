import { render, screen, act } from '@testing-library/react';
import { Toaster } from './toaster';
import { toast } from '@/hooks/use-toast';
import { describe, it, expect, beforeEach } from 'vitest';

describe('Toaster', () => {
    beforeEach(() => {
        // Clear any existing toasts
        const { result } = { result: { current: { toasts: [], dismiss: () => {} } } };
    });

    it('should render toaster component', () => {
        const { container } = render(<Toaster />);
        expect(container).toBeInTheDocument();
    });

    it('should render toast with title and description', () => {
        render(<Toaster />);
        
        act(() => {
            toast({
                title: 'Test Title',
                description: 'Test Description',
            });
        });

        expect(screen.getByText('Test Title')).toBeInTheDocument();
        expect(screen.getByText('Test Description')).toBeInTheDocument();
    });

    it('should render toast with action', () => {
        render(<Toaster />);
        
        act(() => {
            toast({
                title: 'Action Toast',
                action: <button>Action Button</button>,
            });
        });

        expect(screen.getByText('Action Toast')).toBeInTheDocument();
        expect(screen.getByText('Action Button')).toBeInTheDocument();
    });
});
