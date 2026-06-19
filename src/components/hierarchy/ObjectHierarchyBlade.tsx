import { useNavigator } from '../../app/NavigatorContext';
import { Icon } from '../common/Icon';
import { IconButton } from '../common/IconButton';
import { NavigatorTree } from './NavigatorTree';
import { PinnedObjects } from './PinnedObjects';
import { SmartTreeFilterButton } from './SmartTreeFilterButton';
import '../../styles/hierarchy.css';

/**
 * Object hierarchy blade: title, smart filter, refresh, pinned section and the
 * backend-driven tree. Collapses to a thin strip to reclaim workspace.
 */
export function ObjectHierarchyBlade() {
  const { shell, filters, tree } = useNavigator();

  if (!shell.bladeOpen) {
    return (
      <div className="blade-collapsed">
        <IconButton small title="Expand hierarchy" onClick={shell.toggleBlade}>
          <Icon name="chevronRight" size={12} strokeWidth={2.4} />
        </IconButton>
      </div>
    );
  }

  return (
    <div className="blade" aria-label="Object hierarchy">
      <div className="blade__header">
        <span className="blade__title">Object hierarchy</span>
        <SmartTreeFilterButton />
        <IconButton small title="Refresh hierarchy" onClick={tree.refresh}>
          <Icon name="refresh" size={12} strokeWidth={2} />
        </IconButton>
        <IconButton small title="Collapse" onClick={shell.toggleBlade}>
          <Icon name="chevronLeft" size={12} strokeWidth={2.4} />
        </IconButton>
      </div>

      {filters.count > 0 && (
        <div className="blade__pills">
          {filters.active.map((f) => (
            <button
              key={`${f.kind}:${f.value ?? f.label}`}
              type="button"
              className="pill"
              onClick={() => filters.remove(f)}
            >
              {f.label}
              <span className="pill__x">✕</span>
            </button>
          ))}
          <button type="button" className="pill-clear" onClick={filters.clear}>
            Clear all
          </button>
        </div>
      )}

      <PinnedObjects />
      <NavigatorTree />
    </div>
  );
}
