import type { LoadedContentRoute } from '../../types';
import { Icon } from '../common/Icon';

/** Fixed capability chips shown in the host (the kinds of content modules own). */
const HOST_TARGETS = ['SPC Charts', 'Histogram', 'Records', 'Reports'];

export interface LoadedContentPlaceholderProps {
  objectTitle: string | null;
  route: LoadedContentRoute | null;
}

/**
 * Placeholder for the application/module the Navigator routes a selected object
 * to. The Navigator shell never owns the chart/table/dashboard itself — this
 * region is where the owning module's view would mount.
 */
export function LoadedContentPlaceholder({ objectTitle, route }: LoadedContentPlaceholderProps) {
  const example = objectTitle
    ? `Example: the ${route?.title ?? 'SPC view'} for ${objectTitle} would render in this region.`
    : 'Select an object in the hierarchy to route its content here.';

  return (
    <div className="loaded">
      <span className="loaded__corner loaded__corner--left">LOADED APPLICATION AREA</span>
      <span className="loaded__corner loaded__corner--right">routed by Navigator</span>

      <div className="loaded__center">
        <div className="loaded__icon">
          <Icon name="app" size={24} strokeWidth={1.7} />
        </div>
        <div className="loaded__title">Loaded application content</div>
        <div className="loaded__desc">
          The Navigator shell routes the selected object to its owning module, which renders here.
          Charts, records, dashboards and reports are provided by those applications — not by the
          Navigator.
        </div>

        <div className="loaded__fields">
          {HOST_TARGETS.map((t) => (
            <span key={t} className="loaded__chip">
              <span className="status-dot" style={{ background: 'var(--text-3)' }} />
              {t}
            </span>
          ))}
        </div>

        <div className="loaded__note">
          <Icon name="info" size={12} />
          {example}
        </div>
      </div>
    </div>
  );
}
