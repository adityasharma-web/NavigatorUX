import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { FilterChip } from './FilterChip';
import type { FilterOption } from '../../types';

const option: FilterOption = { label: 'Lithography', kind: 'tag' };

describe('FilterChip', () => {
  it('reflects active state and toggles on click', () => {
    const onToggle = vi.fn();
    const { rerender } = render(
      <FilterChip option={option} active={false} onToggle={onToggle} />,
    );
    const btn = screen.getByRole('button', { name: 'Lithography' });
    expect(btn).toHaveAttribute('aria-pressed', 'false');

    fireEvent.click(btn);
    expect(onToggle).toHaveBeenCalledWith(option);

    rerender(<FilterChip option={option} active onToggle={onToggle} />);
    expect(screen.getByRole('button', { name: 'Lithography' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
  });
});
