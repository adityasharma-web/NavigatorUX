import { useCallback, useEffect, useMemo, useState } from 'react';
import type { ThemeMode, UiDensity, UiScale, UserPreferences } from '../types';
import { userPreferencesService } from '../services/userPreferencesService';

export interface Appearance {
  theme: ThemeMode;
  scale: UiScale;
  density: UiDensity;
  setTheme: (t: ThemeMode) => void;
  toggleTheme: () => void;
  setScale: (s: UiScale) => void;
  setDensity: (d: UiDensity) => void;
}

/**
 * Owns appearance preferences (theme / scale / density). Seeds from the user's
 * stored prefs, persists changes to localStorage, and reflects theme/density to
 * the document root so CSS tokens resolve app-wide.
 */
export function useTheme(initial: Pick<UserPreferences, 'theme' | 'scale' | 'density'>): Appearance {
  const stored = useMemo(() => userPreferencesService.load(), []);
  const [theme, setThemeState] = useState<ThemeMode>(stored.theme ?? initial.theme);
  const [scale, setScaleState] = useState<UiScale>(stored.scale ?? initial.scale);
  const [density, setDensityState] = useState<UiDensity>(stored.density ?? initial.density);

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);
    root.setAttribute('data-density', density);
    userPreferencesService.save({ theme, scale, density });
  }, [theme, scale, density]);

  const setTheme = useCallback((t: ThemeMode) => setThemeState(t), []);
  const toggleTheme = useCallback(
    () => setThemeState((t) => (t === 'dark' ? 'light' : 'dark')),
    [],
  );
  const setScale = useCallback((s: UiScale) => setScaleState(s), []);
  const setDensity = useCallback((d: UiDensity) => setDensityState(d), []);

  return { theme, scale, density, setTheme, toggleTheme, setScale, setDensity };
}
