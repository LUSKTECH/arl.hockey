import { render, screen } from '@testing-library/react';
import {
    Toast,
    ToastAction,
    ToastClose,
    ToastDescription,
    ToastProvider,
    ToastTitle,
    ToastViewport,
} from './toast';
import { describe, it, expect } from 'vitest';

describe('Toast Components', () => {
    it('should render toast with all subcomponents', () => {
        render(
            <ToastProvider>
                <Toast>
                    <ToastTitle>Title</ToastTitle>
                    <ToastDescription>Description</ToastDescription>
                    <ToastAction altText="action">Action</ToastAction>
                    <ToastClose />
                </Toast>
                <ToastViewport />
            </ToastProvider>
        );

        expect(screen.getByText('Title')).toBeInTheDocument();
        expect(screen.getByText('Description')).toBeInTheDocument();
        expect(screen.getByText('Action')).toBeInTheDocument();
    });

    it('should render toast with destructive variant', () => {
        render(
            <ToastProvider>
                <Toast variant="destructive">
                    <ToastTitle>Error</ToastTitle>
                </Toast>
                <ToastViewport />
            </ToastProvider>
        );

        expect(screen.getByText('Error')).toBeInTheDocument();
    });
});
