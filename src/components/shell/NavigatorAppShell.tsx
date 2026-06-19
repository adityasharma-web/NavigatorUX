import { useNavigator } from '../../app/NavigatorContext';
import { HeaderBar } from './HeaderBar';
import { ModuleNavRail } from '../navigation/ModuleNavRail';
import { AdminSystemMenu } from '../navigation/AdminSystemMenu';
import { AppLauncher } from '../navigation/AppLauncher';
import { ObjectHierarchyBlade } from '../hierarchy/ObjectHierarchyBlade';
import { ContentHost } from '../content/ContentHost';
import { DetailsActionsBlade } from '../details/DetailsActionsBlade';
import { AIChatPanel } from '../ai/AIChatPanel';
import '../../styles/shell.css';

/**
 * Top-level layout container. Owns the high-level structure only — header, rail,
 * hierarchy blade, content host, details blade and the AI drawer — delegating
 * all behavior to the feature components and the Navigator context.
 */
export function NavigatorAppShell() {
  const { appearance } = useNavigator();
  const z = appearance.scale / 100;

  return (
    <div className="app-root">
      <div
        className="app-frame"
        style={{
          zoom: z,
          width: `calc(100vw / ${z})`,
          height: `calc(100vh / ${z})`,
        }}
      >
        <HeaderBar />
        <div className="app-body">
          <ModuleNavRail />
          <ObjectHierarchyBlade />
          <ContentHost />
          <DetailsActionsBlade />
          <AIChatPanel />
        </div>

        {/* fixed popovers anchored to the rail / header */}
        <AppLauncher />
        <AdminSystemMenu />
      </div>
    </div>
  );
}
