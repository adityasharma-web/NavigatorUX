import { useNavigator } from '../../app/NavigatorContext';
import { Breadcrumbs } from './Breadcrumbs';
import { LoadedContentPlaceholder } from './LoadedContentPlaceholder';
import '../../styles/content.css';

/**
 * The main content region. It is a *host*: it shows a breadcrumb for the
 * selected object and routes a placeholder for the owning module's view. It
 * deliberately renders no real SPC/reporting logic.
 */
export function ContentHost() {
  const { selection } = useNavigator();
  const breadcrumb = selection.details?.breadcrumb ?? [];

  return (
    <main className="content-host" aria-label="Content host">
      <div className="content-host__bar">
        {breadcrumb.length > 0 ? (
          <Breadcrumbs path={breadcrumb} />
        ) : (
          <span style={{ fontSize: 11.5, color: 'var(--text-3)' }}>No selection</span>
        )}
        <span className="content-host__tag">Content Host</span>
      </div>
      <div className="content-host__scroll">
        <LoadedContentPlaceholder route={selection.content} />
      </div>
    </main>
  );
}
