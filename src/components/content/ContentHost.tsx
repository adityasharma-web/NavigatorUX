import { useNavigator } from '../../app/NavigatorContext';
import { LoadedContentPlaceholder } from './LoadedContentPlaceholder';
import '../../styles/content.css';

/**
 * The main content region. It is a *host*: the Navigator routes a selected
 * object's owning module into this area. Pre-alpha renders a placeholder; it
 * deliberately renders no real SPC/reporting logic.
 */
export function ContentHost() {
  const { selection } = useNavigator();
  return (
    <main className="content-host" aria-label="Content host">
      <LoadedContentPlaceholder
        objectTitle={selection.details?.title ?? null}
        route={selection.content}
      />
    </main>
  );
}
