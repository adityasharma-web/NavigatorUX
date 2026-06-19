import { Icon } from '../common/Icon';
import { IconButton } from '../common/IconButton';

/** Notification bell with an unread indicator (static in pre-alpha). */
export function NotificationButton() {
  return (
    <IconButton title="Notifications" aria-label="Notifications, unread">
      <Icon name="bell" size={15} />
      <span className="dot-badge" aria-hidden="true" />
    </IconButton>
  );
}
