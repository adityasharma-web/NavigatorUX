import type { LoadedContentRoute } from '../../types';
import { Icon } from '../common/Icon';

/**
 * Placeholder for the application/module the Navigator routes a selected object
 * to. Pre-alpha renders metadata about the *would-be* loaded view — the
 * Navigator shell never owns the chart/table/dashboard itself.
 */
export function LoadedContentPlaceholder({ route }: { route: LoadedContentRoute | null }) {
  return (
    <div className="loaded">
      <span className="loaded__corner loaded__corner--left">LOADED APPLICATION AREA</span>
      <span className="loaded__corner loaded__corner--right">routed by Navigator</span>

      <div className="loaded__icon">
        <Icon name="app" size={24} strokeWidth={1.7} />
      </div>

      <div className="loaded__title">{route?.title ?? 'No object selected'}</div>
      {route && <div className="loaded__kind">{route.kind}</div>}
      <div className="loaded__desc">
        {route?.description ??
          'Select an object in the hierarchy. The Navigator shell routes it to its owning module, which renders here.'}
      </div>

      {route && route.placeholderFields.length > 0 && (
        <div className="loaded__fields">
          {route.placeholderFields.map((f) => (
            <span key={f.label} className="loaded__chip">
              <span className="status-dot" style={{ background: 'var(--text-3)' }} />
              {f.label}: <b>{f.value}</b>
            </span>
          ))}
        </div>
      )}

      <div className="loaded__note">
        <Icon name="info" size={12} />
        {route
          ? `Sample loaded view (${route.viewKey}). Real content can be larger, scrollable and dynamically refreshed.`
          : 'Charts, records, dashboards and reports are provided by their own modules, not the Navigator.'}
      </div>
    </div>
  );
}
