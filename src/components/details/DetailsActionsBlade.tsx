import { useNavigator } from '../../app/NavigatorContext';
import type { ActionAvailability } from '../../types';
import { createLogger } from '../../services/logger';
import { Breadcrumbs } from '../content/Breadcrumbs';
import { Icon } from '../common/Icon';
import { IconButton } from '../common/IconButton';
import { ActionButton } from './ActionButton';
import { ActivityList } from './ActivityList';
import { MetadataList } from './MetadataList';
import { PermissionBadge } from './PermissionBadge';
import '../../styles/details.css';

const log = createLogger('DetailsActionsBlade');

/**
 * Right-side details/actions blade. Closable to reclaim workspace. Shows
 * metadata, access context, capability metrics, permission-aware actions and
 * recent activity for the selected object — all mock/API-driven.
 */
export function DetailsActionsBlade() {
  const { shell, selection, user } = useNavigator();
  const { details, actions } = selection;

  // Closed by default — content host stays full-width (toggled from the header).
  if (!shell.detailsOpen) return null;

  // In production an action routes its owning module into the content host.
  const onInvoke = (a: ActionAvailability) =>
    log.info('action invoked (mock route)', { action: a.id, object: details?.id });

  return (
    <aside className="details" aria-label="Details and actions">
      <div className="details__head">
        <div style={{ flex: 1, minWidth: 0 }}>
          <div className="details__title">{details?.title ?? 'Details'}</div>
          {details?.subtitle && <div className="details__subtitle">{details.subtitle}</div>}
        </div>
        <IconButton small plain title="Close" onClick={shell.toggleDetails}>
          <Icon name="chevronRight" size={14} />
        </IconButton>
      </div>

      {!details ? (
        <div className="details__empty">Select an object to see its details and actions.</div>
      ) : (
        <div className="details__body">
          {details.breadcrumb.length > 0 && (
            <section>
              <div className="details__section-label">PATH</div>
              <Breadcrumbs path={details.breadcrumb} />
            </section>
          )}

          <section>
            <div className="details__section-label">ACCESS</div>
            <PermissionBadge role={user.roles[0] ?? 'USER'} label={details.accessLabel} />
          </section>

          {details.metadata.length > 0 && (
            <section>
              <div className="details__section-label">METADATA</div>
              <MetadataList fields={details.metadata} />
            </section>
          )}

          {details.metrics.length > 0 && (
            <section>
              <div className="details__section-label">CAPABILITY</div>
              <div className="metrics">
                {details.metrics.map((m) => (
                  <div className="metric" key={m.label}>
                    <div className="metric__label">{m.label}</div>
                    <div className={`metric__value metric__value--${m.tone}`}>{m.value}</div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {actions.length > 0 && (
            <section>
              <div className="details__section-label">ACTIONS</div>
              <div className="actions">
                {actions.map((a) => (
                  <ActionButton key={a.id} action={a} onInvoke={onInvoke} />
                ))}
              </div>
            </section>
          )}

          {details.activity.length > 0 && (
            <section>
              <div className="details__section-label">RECENT ACTIVITY</div>
              <ActivityList items={details.activity} />
            </section>
          )}
        </div>
      )}
    </aside>
  );
}
