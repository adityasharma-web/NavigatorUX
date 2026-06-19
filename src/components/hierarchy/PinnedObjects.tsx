import { useState } from 'react';
import { useNavigator } from '../../app/NavigatorContext';
import { Icon } from '../common/Icon';

const PIN_LIMIT = 8;

/**
 * Compact, collapsible pinned-objects section. User-profile-scoped (loaded via
 * the API); rows open the object directly and can be unpinned with ×.
 */
export function PinnedObjects() {
  const { pinned, selection, user } = useNavigator();
  const [open, setOpen] = useState(true);

  return (
    <section className="pinned" aria-label="Pinned objects">
      <button
        type="button"
        className="pinned__head"
        aria-expanded={open}
        title={`Pinned for ${user.displayName} · ${user.roles[0] ?? ''}`}
        onClick={() => setOpen((v) => !v)}
      >
        <span className={`pinned__caret${open ? ' pinned__caret--open' : ''}`}>
          <Icon name="chevronRight" size={9} strokeWidth={3} />
        </span>
        <Icon name="star" size={11} filled />
        <span className="pinned__label">PINNED</span>
        <span className="pinned__count">
          {pinned.items.length}/{PIN_LIMIT}
        </span>
      </button>

      {open && (
        <div className="pinned__list">
          {pinned.items.length === 0 && (
            <div className="pinned__empty">No pinned objects yet. Right-click a tree node to pin.</div>
          )}
          {pinned.items.map((p) => {
            const selected = p.id === selection.selectedId;
            return (
              <div
                key={p.id}
                className={`pinned-row${selected ? ' pinned-row--selected' : ''}`}
                role="button"
                tabIndex={0}
                onClick={() => selection.select(p.id)}
                onKeyDown={(e) => e.key === 'Enter' && selection.select(p.id)}
              >
                <Icon name="zap" size={10} strokeWidth={1.9} />
                <span className="pinned-row__label">{p.label}</span>
                {p.status === 'violation' && <span className="status-dot status-dot--violation" />}
                <button
                  type="button"
                  className="pinned-row__unpin"
                  title="Unpin"
                  aria-label={`Unpin ${p.label}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    void pinned.unpin(p.id);
                  }}
                >
                  ✕
                </button>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
