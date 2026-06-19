import { useRef } from 'react';
import type { UiDensity } from '../../types';
import { useNavigator } from '../../app/NavigatorContext';
import { useClickOutside } from '../../hooks/useClickOutside';
import { Icon } from '../common/Icon';
import { IconButton } from '../common/IconButton';
import { Segmented } from '../common/Segmented';
import { ThemeToggle } from './ThemeToggle';
import { ScaleSelector } from './ScaleSelector';

/** Gear button + appearance popover: theme, scale and density controls. */
export function AppearanceMenu() {
  const { appearance, shell } = useNavigator();
  const ref = useRef<HTMLDivElement>(null);
  const open = shell.openMenu === 'appearance';
  useClickOutside(ref, shell.closeMenus, open);

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <IconButton
        active={open}
        title="Appearance & settings"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => shell.toggleMenu('appearance')}
      >
        <Icon name="settings" size={15} />
      </IconButton>
      {open && (
        <div className="menu appearance-menu" role="menu">
          <div className="appearance-menu__group">
            <div className="menu-label appearance-menu__group-label">THEME</div>
            <ThemeToggle value={appearance.theme} onChange={appearance.setTheme} />
          </div>
          <div className="appearance-menu__group">
            <div className="menu-label appearance-menu__group-label">SCALE</div>
            <ScaleSelector value={appearance.scale} onChange={appearance.setScale} />
          </div>
          <div className="appearance-menu__group">
            <div className="menu-label appearance-menu__group-label">DENSITY</div>
            <Segmented<UiDensity>
              ariaLabel="Density"
              value={appearance.density}
              onChange={appearance.setDensity}
              options={[
                { label: 'Compact', value: 'compact' },
                { label: 'Comfortable', value: 'comfortable' },
              ]}
            />
          </div>
        </div>
      )}
    </div>
  );
}
