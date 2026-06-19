import type { Permission, Role } from './permissions';

export type ThemeMode = 'light' | 'dark';
export type UiScale = 100 | 125 | 150;
export type UiDensity = 'compact' | 'comfortable';

export interface UserPreferences {
  theme: ThemeMode;
  scale: UiScale;
  density: UiDensity;
  /** Object ids the user has pinned. */
  pinnedObjectIds: string[];
}

/**
 * Shape returned by authService.getCurrentUser() / navigatorApi.getCurrentUser().
 * Mirrors what a real /me endpoint would return after authentication.
 */
export interface CurrentUser {
  id: string;
  displayName: string;
  initials: string;
  email: string;
  roles: Role[];
  permissions: Permission[];
  /** Module ids the user is allowed to see at all. */
  allowedModuleIds: string[];
  /** Module ids that render but are locked (visible-but-restricted). */
  lockedModuleIds: string[];
  preferences: UserPreferences;
}
