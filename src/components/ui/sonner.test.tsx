import { render } from '@testing-library/react';
import { Toaster } from './sonner';
import { describe, it, expect } from 'vitest';

describe('Sonner Toaster', () => {
    it('should render toaster component', () => {
        const { container } = render(<Toaster />);
        expect(container).toBeInTheDocument();
    });

    it('should render with light theme', () => {
        const { container } = render(<Toaster theme="light" />);
        expect(container).toBeInTheDocument();
    });

    it('should render with dark theme', () => {
        const { container } = render(<Toaster theme="dark" />);
        expect(container).toBeInTheDocument();
    });
});
