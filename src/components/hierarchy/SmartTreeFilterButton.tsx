import { useRef } from 'react';
import { useNavigator } from '../../app/NavigatorContext';
import { useClickOutside } from '../../hooks/useClickOutside';
import { Icon } from '../common/Icon';
import { CompactFilterPopover } from './CompactFilterPopover';

/** Filter trigger (with active count) anchoring the compact filter popover. */
export function SmartTreeFilterButton() {
  const { filters, shell } = useNavigator();
  const ref = useRef<HTMLDivElement>(null);
  const open = shell.openMenu === 'filter';
  useClickOutside(ref, shell.closeMenus, open);

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button
        type="button"
        className={`filter-btn${filters.count ? ' filter-btn--active' : ''}`}
        title="Open filters"
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => shell.toggleMenu('filter')}
      >
        <Icon name="filter" size={12} strokeWidth={2} />
        Filters
        {filters.count > 0 && <span className="count-badge">{filters.count}</span>}
      </button>
      {open && <CompactFilterPopover filters={filters} onApply={shell.closeMenus} />}
    </div>
  );
}
