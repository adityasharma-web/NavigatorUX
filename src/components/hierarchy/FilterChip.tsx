import type { FilterOption } from '../../types';

/** Compact multi-select chip used inside the filter popover. */
export function FilterChip({
  option,
  active,
  onToggle,
}: {
  option: FilterOption;
  active: boolean;
  onToggle: (o: FilterOption) => void;
}) {
  return (
    <button
      type="button"
      className={`chip${active ? ' chip--on' : ''}`}
      aria-pressed={active}
      onClick={() => onToggle(option)}
    >
      {option.label}
    </button>
  );
}
