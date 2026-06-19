import type { FilterState } from '../../hooks/useFilterOptions';
import { Icon } from '../common/Icon';
import { FilterChip } from './FilterChip';

export interface CompactFilterPopoverProps {
  filters: FilterState;
  onApply: () => void;
}

/**
 * Compact, grouped multi-select filter panel (Scrap-dashboard style). Pure
 * presentation: it reads/writes the active filter set via `filters` and closes
 * via `onApply`. Filters the hierarchy only.
 */
export function CompactFilterPopover({ filters, onApply }: CompactFilterPopoverProps) {
  return (
    <div className="menu filter-pop" role="dialog" aria-label="Smart filter">
      <div className="filter-pop__head">
        <Icon name="filter" size={12} strokeWidth={2} />
        <span className="filter-pop__title">Smart filter</span>
        <span className="filter-pop__hint">multi-select</span>
      </div>
      <div className="filter-pop__body">
        {filters.groups.map((g) => (
          <div key={g.id} className="filter-group">
            <div className="filter-group__label">{g.label}</div>
            <div className="filter-group__opts">
              {g.options.map((o) => (
                <FilterChip
                  key={`${o.kind}:${o.value ?? o.label}`}
                  option={o}
                  active={filters.isActive(o)}
                  onToggle={filters.toggle}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="filter-pop__footer">
        <button type="button" className="btn btn--block" onClick={filters.clear}>
          Clear
        </button>
        <button type="button" className="btn btn--primary btn--block" onClick={onApply}>
          Apply
        </button>
      </div>
    </div>
  );
}
