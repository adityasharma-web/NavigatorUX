import { useNavigator } from '../../app/NavigatorContext';
import { Icon } from '../common/Icon';

/**
 * System & admin popover (Security / Admin / Settings / Help + Sign out).
 * Locked items render disabled with a lock icon when the user lacks rights.
 */
export function AdminSystemMenu() {
  const { shell, systemModules, onSignOut } = useNavigator();
  if (shell.openMenu !== 'system') return null;

  return (
    <>
      <div className="menu-overlay" onClick={shell.closeMenus} />
      <div className="menu system-menu" role="menu">
        <div className="system-menu__label">SYSTEM &amp; ADMIN</div>
        {systemModules.map((m) => (
          <button
            key={m.id}
            type="button"
            className={`system-menu__item${m.locked ? ' system-menu__item--locked' : ''}`}
            title={m.locked ? `${m.label} — restricted` : m.label}
            aria-disabled={m.locked || undefined}
            onClick={shell.closeMenus}
          >
            <Icon name={m.iconKey} size={15} />
            <span style={{ flex: 1 }}>{m.label}</span>
            {m.locked && <Icon name="lock" size={11} strokeWidth={2.2} />}
          </button>
        ))}
        <div className="system-menu__sep" />
        <button type="button" className="system-menu__item" onClick={onSignOut}>
          <Icon name="signOut" size={15} />
          <span style={{ flex: 1 }}>Sign out</span>
        </button>
      </div>
    </>
  );
}
