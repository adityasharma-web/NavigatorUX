import { useCallback, useEffect, useState } from 'react';
import type { PinnedObject } from '../types';
import { navigatorApi } from '../services/navigatorApi';
import { createLogger } from '../services/logger';

const log = createLogger('usePinnedObjects');

export interface PinnedObjectsValue {
  items: PinnedObject[];
  loading: boolean;
  isPinned: (id: string) => boolean;
  pin: (id: string) => Promise<void>;
  unpin: (id: string) => Promise<void>;
  toggle: (id: string) => Promise<void>;
}

/** User-scoped pinned objects, backed by the (mock) API; refreshes on mutate. */
export function usePinnedObjects(userId: string | undefined): PinnedObjectsValue {
  const [items, setItems] = useState<PinnedObject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;
    let alive = true;
    setLoading(true);
    navigatorApi
      .getPinnedObjects(userId)
      .then((p) => alive && setItems(p))
      .catch((err) => log.error('pin load failed', { err: String(err) }))
      .finally(() => alive && setLoading(false));
    return () => {
      alive = false;
    };
  }, [userId]);

  const isPinned = useCallback((id: string) => items.some((p) => p.id === id), [items]);

  const pin = useCallback(
    async (id: string) => {
      if (!userId) return;
      setItems(await navigatorApi.pinObject(userId, id));
    },
    [userId],
  );
  const unpin = useCallback(
    async (id: string) => {
      if (!userId) return;
      setItems(await navigatorApi.unpinObject(userId, id));
    },
    [userId],
  );
  const toggle = useCallback(
    async (id: string) => {
      if (isPinned(id)) await unpin(id);
      else await pin(id);
    },
    [isPinned, pin, unpin],
  );

  return { items, loading, isPinned, pin, unpin, toggle };
}
