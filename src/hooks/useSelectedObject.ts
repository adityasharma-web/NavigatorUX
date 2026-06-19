import { useEffect, useState } from 'react';
import type { ActionAvailability, LoadedContentRoute, ObjectDetails } from '../types';
import { navigatorApi } from '../services/navigatorApi';
import { createLogger } from '../services/logger';

const log = createLogger('useSelectedObject');

export interface SelectedObjectValue {
  details: ObjectDetails | null;
  content: LoadedContentRoute | null;
  actions: ActionAvailability[];
  loading: boolean;
}

/**
 * Resolves everything the right blade + content host need for a selected node:
 * details, the loaded-content route, and per-action availability. Re-fetches
 * whenever the selection changes (mock routing/loading behavior).
 */
export function useSelectedObject(
  userId: string | undefined,
  selectedId: string | null,
): SelectedObjectValue {
  const [details, setDetails] = useState<ObjectDetails | null>(null);
  const [content, setContent] = useState<LoadedContentRoute | null>(null);
  const [actions, setActions] = useState<ActionAvailability[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!userId || !selectedId) {
      setDetails(null);
      setContent(null);
      setActions([]);
      return;
    }
    let alive = true;
    setLoading(true);
    Promise.all([
      navigatorApi.getObjectDetails(selectedId),
      navigatorApi.getLoadedContentRoute(selectedId),
      navigatorApi.getActionAvailability(userId, selectedId),
    ])
      .then(([d, c, a]) => {
        if (!alive) return;
        setDetails(d);
        setContent(c);
        setActions(a);
      })
      .catch((err) => {
        if (!alive) return;
        log.error('selection load failed', { selectedId, err: String(err) });
      })
      .finally(() => alive && setLoading(false));
    return () => {
      alive = false;
    };
  }, [userId, selectedId]);

  return { details, content, actions, loading };
}
