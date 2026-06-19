import type { ModuleDescriptor } from '../../types';
import { Icon } from '../common/Icon';

export interface ModuleNavItemProps {
  module: ModuleDescriptor;
  active: boolean;
  expanded: boolean;
  onSelect: (id: string) => void;
}

/**
 * A single rail entry. Active/locked styling is driven entirely by props —
 * the component holds no access rules of its own.
 */
export function ModuleNavItem({ module, active, expanded, onSelect }: ModuleNavItemProps) {
  const classes = [
    'nav-item',
    active ? 'nav-item--active' : '',
    module.locked ? 'nav-item--locked' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type="button"
      className={classes}
      title={module.locked ? `${module.label} — restricted` : module.label}
      aria-current={active ? 'page' : undefined}
      aria-disabled={module.locked || undefined}
      onClick={() => !module.locked && onSelect(module.id)}
    >
      <span className="nav-item__bar" aria-hidden="true" />
      <Icon name={module.iconKey} size={13} strokeWidth={1.9} />
      {expanded && <span className="nav-item__label">{module.label}</span>}
      {expanded && module.locked && (
        <Icon name="lock" size={11} strokeWidth={2.2} className="nav-item__lock" />
      )}
    </button>
  );
}
