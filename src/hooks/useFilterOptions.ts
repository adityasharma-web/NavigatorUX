import { useCallback, useMemo, useState } from 'react';
import { useEffect } from 'react';
import type { ActiveFilter, FilterGroup, FilterOption } from '../types';
import { navigatorApi } from '../services/navigatorApi';
import { createLogger } from '../services/logger';

const log = createLogger('useFilterOptions');

export interface FilterState {
  groups: FilterGroup[];
  active: ActiveFilter[];
  count: number;
  isActive: (o: FilterOption) => boolean;
  toggle: (o: FilterOption) => void;
  remove: (f: ActiveFilter) => void;
  clear: () => void;
}

const keyOf = (o: { kind: string; label: string; value?: string }) =>
  `${o.kind}:${o.value ?? o.label}`;

/**
 * Loads grouped filter options for the active module and owns the active
 * multi-select set. The active list is the value the tree query depends on.
 */
export function useFilterOptions(moduleId: string): FilterState {
  const [groups, setGroups] = useState<FilterGroup[]>([]);
  const [active, setActive] = useState<ActiveFilter[]>([]);

  useEffect(() => {
    let alive = true;
    setActive([]); // reset filters when module changes
    navigatorApi
      .getFilterOptions(moduleId)
      .then((g) => alive && setGroups(g))
      .catch((err) => log.error('filter options load failed', { err: String(err) }));
    return () => {
      alive = false;
    };
  }, [moduleId]);

  const isActive = useCallback(
    (o: FilterOption) => active.some((f) => keyOf(f) === keyOf(o)),
    [active],
  );

  const toggle = useCallback((o: FilterOption) => {
    setActive((prev) => {
      const k = keyOf(o);
      return prev.some((f) => keyOf(f) === k)
        ? prev.filter((f) => keyOf(f) !== k)
        : [...prev, { kind: o.kind, label: o.label, value: o.value }];
    });
  }, []);

  const remove = useCallback((f: ActiveFilter) => {
    setActive((prev) => prev.filter((x) => keyOf(x) !== keyOf(f)));
  }, []);

  const clear = useCallback(() => setActive([]), []);

  return useMemo(
    () => ({ groups, active, count: active.length, isActive, toggle, remove, clear }),
    [groups, active, isActive, toggle, remove, clear],
  );
}
