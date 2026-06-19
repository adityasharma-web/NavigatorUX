import { useCallback, useEffect, useState } from 'react';
import type { ActiveFilter, TreeNode } from '../types';
import { navigatorApi } from '../services/navigatorApi';
import { createLogger } from '../services/logger';

const log = createLogger('useNavigatorTree');

export interface NavigatorTreeValue {
  nodes: TreeNode[];
  loading: boolean;
  error: string | null;
  /** Monotonic timestamp of the last successful load (for "updated" display). */
  lastUpdated: number | null;
  refresh: () => void;
  isExpanded: (id: string) => boolean;
  toggleExpand: (id: string) => void;
  /** When filtering, all matched nodes are force-expanded for visibility. */
  filtering: boolean;
}

const DEFAULT_OPEN = ['blocks', 'fb', 'litho', 'ovl', 'rot', 'leaf_sma02'];

/**
 * Loads the tree for the active module + active filters from the API and owns
 * expand/collapse UI state. Reloads whenever the module or filters change, and
 * on explicit refresh (simulating backend-driven updates).
 */
export function useNavigatorTree(moduleId: string, filters: ActiveFilter[]): NavigatorTreeValue {
  const [nodes, setNodes] = useState<TreeNode[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<number | null>(null);
  const [expanded, setExpanded] = useState<Set<string>>(new Set(DEFAULT_OPEN));
  const [nonce, setNonce] = useState(0);

  const filtering = filters.length > 0;

  useEffect(() => {
    let alive = true;
    setLoading(true);
    setError(null);
    navigatorApi
      .getTreeForModule(moduleId, filters)
      .then((data) => {
        if (!alive) return;
        setNodes(data);
        setLastUpdated(Date.now());
      })
      .catch((err) => {
        if (!alive) return;
        log.error('tree load failed', { moduleId, err: String(err) });
        setError('Unable to load hierarchy.');
        setNodes([]);
      })
      .finally(() => alive && setLoading(false));
    return () => {
      alive = false;
    };
    // filters compared by value via JSON key in caller; nonce forces refresh
  }, [moduleId, filters, nonce]);

  const refresh = useCallback(() => setNonce((n) => n + 1), []);
  const isExpanded = useCallback(
    (id: string) => filtering || expanded.has(id),
    [filtering, expanded],
  );
  const toggleExpand = useCallback((id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }, []);

  return { nodes, loading, error, lastUpdated, refresh, isExpanded, toggleExpand, filtering };
}
