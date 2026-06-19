import { useNavigator } from '../../app/NavigatorContext';
import { ModuleNavItem } from './ModuleNavItem';
import { SentientWorkspaceMenu } from './SentientWorkspaceMenu';
import '../../styles/navigation.css';

/**
 * Left module rail. Renders the primary modules from mock/API data and the
 * bottom workspace/admin entry. Collapsed = icons only, expanded = icons +
 * labels. Holds no hardcoded module list or access rules.
 */
export function ModuleNavRail() {
  const { primaryModules, activeModuleId, setActiveModule, shell } = useNavigator();
  const width = shell.railExpanded ? 'var(--rail-w-expanded)' : 'var(--rail-w-collapsed)';

  return (
    <nav className="rail" style={{ width }} aria-label="Modules">
      <div className="rail__scroll">
        {primaryModules.map((m) => (
          <ModuleNavItem
            key={m.id}
            module={m}
            active={m.id === activeModuleId}
            expanded={shell.railExpanded}
            onSelect={setActiveModule}
          />
        ))}
      </div>
      <div className="rail__footer">
        <SentientWorkspaceMenu />
      </div>
    </nav>
  );
}
