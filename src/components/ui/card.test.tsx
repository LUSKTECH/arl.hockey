import { render, screen } from '@testing-library/react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './card';
import { describe, it, expect } from 'vitest';
import React from 'react';

describe('Card Component', () => {
    it('should render all subcomponents', () => {
        render(
            <Card>
                <CardHeader>
                    <CardTitle>Title</CardTitle>
                    <CardDescription>Description</CardDescription>
                </CardHeader>
                <CardContent>Content</CardContent>
                <CardFooter>Footer</CardFooter>
            </Card>
        );

        expect(screen.getByText('Title')).toBeInTheDocument();
        expect(screen.getByText('Description')).toBeInTheDocument();
        expect(screen.getByText('Content')).toBeInTheDocument();
        expect(screen.getByText('Footer')).toBeInTheDocument();
    });

    it('should forward ref', () => {
        const ref = React.createRef<HTMLDivElement>();
        render(<Card ref={ref}>Test</Card>);
        
        expect(ref.current).toBeInstanceOf(HTMLDivElement);
        expect(ref.current).toHaveTextContent('Test');
    });
});
