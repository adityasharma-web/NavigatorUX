import { useRef } from 'react';
import { useNavigator } from '../../app/NavigatorContext';
import { useClickOutside } from '../../hooks/useClickOutside';
import { Icon } from '../common/Icon';

/** Profile trigger + menu: identity, role badge, sign out (mock). */
export function UserProfileMenu() {
  const { user, shell, onSignOut } = useNavigator();
  const ref = useRef<HTMLDivElement>(null);
  const open = shell.openMenu === 'profile';
  useClickOutside(ref, shell.closeMenus, open);

  const primaryRole = user.roles[0] ?? 'USER';

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button
        type="button"
        className="profile-trigger"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => shell.toggleMenu('profile')}
      >
        <span className="profile-trigger__name">{shortName(user.displayName)}</span>
        <Icon name="chevronDown" size={10} strokeWidth={2.4} />
      </button>
      {open && (
        <div className="menu profile-menu" role="menu">
          <div className="profile-menu__head">
            <div className="profile-menu__name">{user.displayName}</div>
            <div className="profile-menu__email">{user.email}</div>
            <span className="role-badge" style={{ marginTop: 8 }}>
              <Icon name="security" size={10} strokeWidth={2.2} />
              {primaryRole}
            </span>
          </div>
          <div className="profile-menu__body">
            <button type="button" className="menu-item" onClick={onSignOut}>
              <Icon name="signOut" size={14} />
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function shortName(full: string): string {
  const parts = full.trim().split(/\s+/);
  if (parts.length < 2) return full;
  return `${parts[0][0]}. ${parts[parts.length - 1]}`;
}
