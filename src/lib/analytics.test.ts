/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { trackEvent, trackExternalLink, trackPageView } from './analytics';

describe('Analytics', () => {
    const originalEnv = process.env.NODE_ENV;

    beforeEach(() => {
        vi.clearAllMocks();
        // Reset window objects
        (window as any).gtag = undefined;
        (window as any).plausible = undefined;

        // Default to production to avoid console logs unless tested
        process.env.NODE_ENV = 'production';
    });

    afterEach(() => {
        process.env.NODE_ENV = originalEnv;
    });

    describe('trackEvent', () => {
        it('should call gtag if available', () => {
            const gtagMock = vi.fn();
            (window as any).gtag = gtagMock;

            const event = { action: 'test_action', category: 'test_cat', label: 'test_label', value: 1 };
            trackEvent(event);

            expect(gtagMock).toHaveBeenCalledWith('event', 'test_action', {
                event_category: 'test_cat',
                event_label: 'test_label',
                value: 1,
            });
        });

        it('should call plausible if available', () => {
            const plausibleMock = vi.fn();
            (window as any).plausible = plausibleMock;

            const event = { action: 'test_action', category: 'test_cat', label: 'test_label', value: 1 };
            trackEvent(event);

            expect(plausibleMock).toHaveBeenCalledWith('test_action', {
                props: {
                    category: 'test_cat',
                    label: 'test_label',
                    value: 1,
                },
            });
        });

        it('should log to console in development', () => {
            process.env.NODE_ENV = 'development';
            const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => { });

            const event = { action: 'test_action', category: 'test_cat', label: 'test_label', value: 1 };
            trackEvent(event);

            expect(consoleSpy).toHaveBeenCalledWith('[Analytics]', event);
            consoleSpy.mockRestore();
        });
    });

    describe('trackExternalLink', () => {
        it('should track external link click', () => {
            const gtagMock = vi.fn();
            (window as any).gtag = gtagMock;

            trackExternalLink('https://example.com', 'Example');

            expect(gtagMock).toHaveBeenCalledWith('event', 'click_external_link', {
                event_category: 'engagement',
                event_label: 'Example - https://example.com',
                value: undefined,
            });
        });
    });

    describe('trackPageView', () => {
        it('should call gtag config if available', () => {
            const gtagMock = vi.fn();
            (window as any).gtag = gtagMock;
            (window as any).GA_MEASUREMENT_ID = 'G-XXXXX';

            trackPageView('/new-page');

            expect(gtagMock).toHaveBeenCalledWith('config', 'G-XXXXX', {
                page_path: '/new-page',
            });
        });

        it('should log to console in development', () => {
            process.env.NODE_ENV = 'development';
            const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => { });

            trackPageView('/new-page');

            expect(consoleSpy).toHaveBeenCalledWith('[Analytics] Page view:', '/new-page');
            consoleSpy.mockRestore();
        });
    });
});
