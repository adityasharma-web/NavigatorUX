import { Icon } from '../common/Icon';
import { IconButton } from '../common/IconButton';

/** Hamburger button that toggles the module rail between expanded/collapsed. */
export function SidebarCollapseButton({ onToggle }: { onToggle: () => void }) {
  return (
    <IconButton plain title="Toggle navigation" onClick={onToggle}>
      <Icon name="hamburger" size={16} strokeWidth={2} />
    </IconButton>
  );
}
