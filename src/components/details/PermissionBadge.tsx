import type { Role } from '../../types';
import { Icon } from '../common/Icon';

/** Quiet access/permission context line for the details blade. */
export function PermissionBadge({ role, label }: { role: Role | string; label: string }) {
  return (
    <div className="perm-badge">
      <Icon name="security" size={12} strokeWidth={2} />
      <span>
        <span className="perm-badge__role">{role}</span>
        {label ? ` · ${label.replace(/^.*·\s*/, '')}` : ''}
      </span>
    </div>
  );
}
