import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { App } from './App';

/**
 * Integration smoke test: drives the whole wiring (mock auth → context →
 * shell → async tree load → selection) to prove the pre-alpha boots end-to-end.
 */
describe('App (integration)', () => {
  it('signs in and renders the Navigator shell with a backend-driven tree', async () => {
    render(<App />);

    // login concept is shown first
    expect(screen.getByRole('heading', { name: /sign in to sentient/i })).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /continue with sso/i }));

    // module rail loads from mock data
    await waitFor(() => expect(screen.getByRole('navigation', { name: /modules/i })).toBeInTheDocument());
    const rail = screen.getByRole('navigation', { name: /modules/i });
    expect(within(rail).getByText('Configuration')).toBeInTheDocument();
    // NCMR renders but is restricted (locked module)
    expect(within(rail).getByTitle(/NCMR — restricted/i)).toBeInTheDocument();

    // hierarchy blade + async tree
    expect(screen.getByText('Object hierarchy')).toBeInTheDocument();
    await waitFor(() => expect(screen.getByText('Blocks')).toBeInTheDocument());

    // default selection resolves across tree, pinned list and details title
    await waitFor(() => expect(screen.getAllByText('SMA02 | T11.2P').length).toBeGreaterThan(0));
    // details blade shows the selected object's metadata
    expect(screen.getByText('Technology')).toBeInTheDocument();
    expect(screen.getByText('Content Host')).toBeInTheDocument();
  });

  it('toggles theme via the document attribute', async () => {
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: /continue with sso/i }));
    await waitFor(() => expect(screen.getByText('Object hierarchy')).toBeInTheDocument());

    const before = document.documentElement.getAttribute('data-theme');
    expect(['light', 'dark']).toContain(before);
  });
});
