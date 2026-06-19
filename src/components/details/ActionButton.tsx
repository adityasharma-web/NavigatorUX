import type { ActionAvailability } from '../../types';
import { Icon } from '../common/Icon';

/**
 * Compact action button. Disabled/locked when the user lacks the required
 * permission; clicking an enabled action routes its module into the host.
 */
export function ActionButton({
  action,
  onInvoke,
}: {
  action: ActionAvailability;
  onInvoke: (action: ActionAvailability) => void;
}) {
  const disabled = !action.enabled;
  return (
    <button
      type="button"
      className={`action-btn${disabled ? ' action-btn--disabled' : ''}`}
      title={disabled ? action.reason ?? `${action.label} — restricted` : action.label}
      aria-disabled={disabled}
      onClick={() => !disabled && onInvoke(action)}
    >
      <Icon name={action.iconKey} size={13} strokeWidth={1.8} />
      {action.label}
      {disabled && <Icon name="lock" size={11} strokeWidth={2.2} className="action-btn__lock" />}
    </button>
  );
}
