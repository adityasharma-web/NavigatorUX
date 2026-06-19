import type { UiDensity, UiScale, ThemeMode, UserPreferences } from '../types';
import { createLogger } from './logger';

const log = createLogger('userPreferencesService');
const STORAGE_KEY = 'sentient.navigator.prefs';

type StoredPrefs = Pick<UserPreferences, 'theme' | 'scale' | 'density'>;

/**
 * Persists appearance preferences to localStorage. Pinned objects are owned by
 * the API (user profile), so they are not stored here. Falls back gracefully
 * when storage is unavailable (e.g. SSR / private mode).
 */
export const userPreferencesService = {
  load(): Partial<StoredPrefs> {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as StoredPrefs) : {};
    } catch (err) {
      log.warn('load failed', { err: String(err) });
      return {};
    }
  },
  save(prefs: StoredPrefs): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
    } catch (err) {
      log.warn('save failed', { err: String(err) });
    }
  },
};

export type { ThemeMode, UiScale, UiDensity };
