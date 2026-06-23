import { useNavigator } from '../../app/NavigatorContext';
import { DotsGridIcon } from '../common/DotsGridIcon';
import { Icon } from '../common/Icon';
import { IconButton } from '../common/IconButton';
import { AIChatButton } from '../ai/AIChatButton';
import { AppearanceMenu } from '../settings/AppearanceMenu';
import { NotificationButton } from '../settings/NotificationButton';
import { UserProfileMenu } from '../settings/UserProfileMenu';
import { LogoMark } from './LogoMark';
import { SidebarCollapseButton } from './SidebarCollapseButton';
import '../../styles/shell.css';

/**
 * Compact 44px header: app launcher, rail toggle, logo, current module label,
 * then AI / notifications / appearance / profile on the right.
 */
export function HeaderBar() {
  const { shell, activeModule } = useNavigator();

  return (
    <header className="header">
      <IconButton
        active={shell.openMenu === 'launcher'}
        title="Sentient apps"
        onClick={() => shell.toggleMenu('launcher')}
      >
        <DotsGridIcon size={15} />
      </IconButton>

      <SidebarCollapseButton onToggle={shell.toggleRail} />

      <LogoMark height={30} />

      <div className="header__module">
        <span className="header__module-sep" aria-hidden="true" />
        <span className="header__module-label">{activeModule?.label ?? 'Navigator'}</span>
      </div>

      <div className="header__spacer" />

      <AIChatButton />
      <NotificationButton />
      <IconButton
        active={shell.detailsOpen}
        title="Details & actions panel"
        aria-pressed={shell.detailsOpen}
        onClick={shell.toggleDetails}
      >
        <Icon name="panelRight" size={15} />
      </IconButton>
      <AppearanceMenu />
      <UserProfileMenu />
    </header>
  );
}
