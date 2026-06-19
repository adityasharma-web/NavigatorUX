/**
 * Permission & role model (mock).
 *
 * Permissions are coarse capability strings. The UI uses them only as a
 * convenience filter; in production the API/authorization layer remains the
 * source of truth and must re-check every request.
 */

export type Role = 'SUPER-USER' | 'ENGINEER' | 'OPERATOR' | 'VIEWER';

/** Capability keys referenced across modules, actions, and tree nodes. */
export type Permission =
  | 'module.home'
  | 'module.configuration'
  | 'module.workflow'
  | 'module.dataCollection'
  | 'module.processControl'
  | 'module.reporting'
  | 'module.dataExplorer'
  | 'module.ncmr'
  | 'module.mrp'
  | 'module.appSupport'
  | 'admin.access'
  | 'security.access'
  | 'object.view'
  | 'object.viewRecords'
  | 'object.configureLimits'
  | 'object.archive';

/** A small helper shape returned alongside gated UI affordances. */
export interface AccessContext {
  /** Whether the current user may interact with the gated item. */
  allowed: boolean;
  /** Permission that gates the item, for display/debugging. */
  requiredPermission?: Permission;
  /** Short human-readable reason when not allowed. */
  reason?: string;
}
