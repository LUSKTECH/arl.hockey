/* eslint-disable @typescript-eslint/no-explicit-any */
import { renderHook, act } from '@testing-library/react';
import { useToast, toast, reducer } from './use-toast';
import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('use-toast', () => {
    beforeEach(() => {
        // Reset global state if possible or just use a fresh hook
        // The module shares state, so we might need to rely on `toast` methods to clean up
        const { result } = renderHook(() => useToast());
        act(() => {
            result.current.toasts.forEach(t => result.current.dismiss(t.id));
        });
    });

    it('should add a toast', () => {
        const { result } = renderHook(() => useToast());

        act(() => {
            toast({ title: 'Test Toast', description: 'Test Description' });
        });

        expect(result.current.toasts).toHaveLength(1);
        expect(result.current.toasts[0].title).toBe('Test Toast');
    });

    it('should dismiss a toast', () => {
        const { result } = renderHook(() => useToast());

        let toastId = '';
        act(() => {
            const t = toast({ title: 'Test Toast' });
            toastId = t.id;
        });

        expect(result.current.toasts).toHaveLength(1);

        act(() => {
            result.current.dismiss(toastId);
        });

        // Dismiss marks open: false first (managed by local state/effect usually? No, reducer handles it)
        // reducer DISMISS_TOAST sets open: false.
        // REMOVE_TOAST removes it from array.
        expect(result.current.toasts[0].open).toBe(false);
    });

    it('should limit toasts', () => {
        // The limit is hardcoded to 1 in the file
        const { result } = renderHook(() => useToast());

        act(() => {
            toast({ title: 'Toast 1' });
            toast({ title: 'Toast 2' });
        });

        expect(result.current.toasts).toHaveLength(1);
        expect(result.current.toasts[0].title).toBe('Toast 2');
    });
});

describe('toast reducer', () => {
    it('should handle ADD_TOAST', () => {
        const initialState = { toasts: [] };
        const action = {
            type: 'ADD_TOAST',
            toast: { id: '1', title: 'test' }
        } as any;
        const newState = reducer(initialState, action);
        expect(newState.toasts).toHaveLength(1);
        expect(newState.toasts[0].id).toBe('1');
    });

    it('should handle UPDATE_TOAST', () => {
        const initialState = { toasts: [{ id: '1', title: 'old' }] } as any;
        const action = {
            type: 'UPDATE_TOAST',
            toast: { id: '1', title: 'new' }
        } as any;
        const newState = reducer(initialState, action);
        expect(newState.toasts[0].title).toBe('new');
    });

    it('should handle DISMISS_TOAST', () => {
        const initialState = { toasts: [{ id: '1', open: true }] } as any;
        const action = {
            type: 'DISMISS_TOAST',
            toastId: '1'
        } as any;

        // Mock setTimeout to verify queueing?
        // The reducer has side effects (bad practice but exists). 
        // We can just check state update.
        vi.useFakeTimers();
        const newState = reducer(initialState, action);
        expect(newState.toasts[0].open).toBe(false);
        vi.runAllTimers();
        vi.useRealTimers();
    });

    it('should handle REMOVE_TOAST', () => {
        const initialState = { toasts: [{ id: '1' }] } as any;
        const action = {
            type: 'REMOVE_TOAST',
            toastId: '1'
        } as any;
        const newState = reducer(initialState, action);
        expect(newState.toasts).toHaveLength(0);
    });
});
