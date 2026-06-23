import { useNavigator } from '../../app/NavigatorContext';
import { Icon } from '../common/Icon';

/**
 * Azure-style app launcher popover. Placeholder shortcuts to future Sentient
 * apps / external tools — purely presentational in pre-alpha.
 */
const LAUNCHER_APPS: Array<{ label: string; iconKey: string }> = [
  { label: 'Sentient Navigator', iconKey: 'block' },
  { label: 'Reporting', iconKey: 'reporting' },
  { label: 'Data Explorer', iconKey: 'dataExplorer' },
  { label: 'Workflow', iconKey: 'workflow' },
  { label: 'Process Control', iconKey: 'processControl' },
  { label: 'Quality', iconKey: 'security' },
  { label: 'Admin', iconKey: 'admin' },
  { label: 'App Support', iconKey: 'appSupport' },
  { label: 'GitHub', iconKey: 'github' },
  { label: 'Azure DevOps', iconKey: 'azureDevops' },
  { label: 'Documentation', iconKey: 'documentation' },
];

export function AppLauncher() {
  const { shell } = useNavigator();
  if (shell.openMenu !== 'launcher') return null;

  return (
    <>
      <div className="menu-overlay" onClick={shell.closeMenus} />
      <div className="menu launcher" role="menu">
        <div className="launcher__label">SENTIENT CLOUD · APPS</div>
        <div className="launcher__grid">
          {LAUNCHER_APPS.map((a) => (
            <button key={a.label} type="button" className="launcher__app" title={a.label}>
              <Icon name={a.iconKey} size={21} strokeWidth={1.7} />
              <span>{a.label}</span>
            </button>
          ))}
        </div>
        <div className="launcher__note">
          Placeholder launcher — future routing to Sentient apps &amp; external tools
        </div>
      </div>
    </>
  );
}
