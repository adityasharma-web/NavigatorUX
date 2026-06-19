import { useCallback, useEffect, useState } from 'react';
import type { CurrentUser, ModuleDescriptor, Permission } from '../types';
import { authService } from '../services/authService';
import { navigatorApi } from '../services/navigatorApi';
import { createLogger } from '../services/logger';

const log = createLogger('useUserContext');

export interface UserContextValue {
  user: CurrentUser | null;
  modules: ModuleDescriptor[];
  loading: boolean;
  error: string | null;
  hasPermission: (p?: Permission) => boolean;
  reload: () => void;
}

/** Loads the current (mock) user and their module set, with permission helpers. */
export function useUserContext(): UserContextValue {
  const [user, setUser] = useState<CurrentUser | null>(null);
  const [modules, setModules] = useState<ModuleDescriptor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const u = await authService.getCurrentUser();
      const mods = await navigatorApi.getModulesForUser(u.id);
      setUser(u);
      setModules(mods);
    } catch (err) {
      log.error('failed to load user context', { err: String(err) });
      setError('Unable to load user context.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const hasPermission = useCallback(
    (p?: Permission) => (!p ? true : !!user?.permissions.includes(p)),
    [user],
  );

  return { user, modules, loading, error, hasPermission, reload: load };
}
