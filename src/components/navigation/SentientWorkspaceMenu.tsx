import { useNavigator } from '../../app/NavigatorContext';
import { Icon } from '../common/Icon';

/**
 * Bottom-of-rail "Sentient Workspace" button. Opens the system & admin menu.
 * Matches the rail's type scale — intentionally not a marketing footer.
 */
export function SentientWorkspaceMenu() {
  const { shell } = useNavigator();
  const open = shell.openMenu === 'system';
  const expanded = shell.railExpanded;

  return (
    <button
      type="button"
      className={`workspace-btn${open ? ' workspace-btn--active' : ''}`}
      title="System & admin"
      aria-haspopup="menu"
      aria-expanded={open}
      onClick={() => shell.toggleMenu('system')}
    >
      <Icon name="workspace" size={16} strokeWidth={1.9} />
      {expanded && <span className="workspace-btn__label">Sentient Workspace</span>}
      {expanded && <Icon name="chevronUp" size={13} strokeWidth={2.2} />}
    </button>
  );
}
