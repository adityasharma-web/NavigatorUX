import type {
  ActionAvailability,
  ActiveFilter,
  CurrentUser,
  FilterGroup,
  LoadedContentRoute,
  ModuleDescriptor,
  NavigatorApi,
  ObjectAction,
  ObjectDetails,
  PinnedObject,
  TreeNode,
} from '../types';
import { clone, delay } from './latency';
import { createLogger } from './logger';

import modulesData from '../data/modules.json';
import mockUserData from '../data/mockUser.json';
import treeConfiguration from '../data/tree.configuration.json';
import treeReporting from '../data/tree.reporting.json';
import treeProcessControl from '../data/tree.processControl.json';
import filterOptionsData from '../data/filterOptions.json';
import pinnedData from '../data/pinnedObjects.json';
import objectDetailsData from '../data/objectDetails.json';
import loadedRoutesData from '../data/loadedContentRoutes.json';

const log = createLogger('mockNavigatorApi');

const modules = modulesData as ModuleDescriptor[];
const trees: Record<string, TreeNode[]> = {
  configuration: treeConfiguration as TreeNode[],
  reporting: treeReporting as TreeNode[],
  processControl: treeProcessControl as TreeNode[],
};
const filterOptions = filterOptionsData as Record<string, FilterGroup[]>;
const detailsById = objectDetailsData as Record<string, ObjectDetails>;
const loadedRoutes = loadedRoutesData as Record<string, LoadedContentRoute>;

/**
 * Base action catalog. Availability is resolved per-user in getActionAvailability
 * from the user's permissions — actions are never hidden, only enabled/disabled.
 */
const ACTION_CATALOG: ObjectAction[] = [
  { id: 'view-data', label: 'View Data', iconKey: 'table', requiredPermission: 'object.view' },
  { id: 'open-chart', label: 'Open Chart', iconKey: 'chart', requiredPermission: 'object.view' },
  { id: 'view-records', label: 'View Records', iconKey: 'list', requiredPermission: 'object.viewRecords' },
  { id: 'configure-limits', label: 'Configure Limits', iconKey: 'sliders', requiredPermission: 'object.configureLimits' },
  { id: 'archive', label: 'Archive', iconKey: 'archive', requiredPermission: 'object.archive' },
];

/** In-memory, user-scoped pin store (seeded from JSON). Mutated by pin/unpin. */
const pinStore: Record<string, PinnedObject[]> = clone(
  pinnedData as Record<string, PinnedObject[]>,
);

// ---- tree helpers -----------------------------------------------------------

function findNode(nodes: TreeNode[], id: string): TreeNode | undefined {
  for (const n of nodes) {
    if (n.id === id) return n;
    if (n.children) {
      const hit = findNode(n.children, id);
      if (hit) return hit;
    }
  }
  return undefined;
}

function findNodeAnywhere(id: string): TreeNode | undefined {
  for (const key of Object.keys(trees)) {
    const hit = findNode(trees[key], id);
    if (hit) return hit;
  }
  return undefined;
}

function findPath(nodes: TreeNode[], id: string, trail: TreeNode[] = []): TreeNode[] | null {
  for (const n of nodes) {
    const next = [...trail, n];
    if (n.id === id) return next;
    if (n.children) {
      const found = findPath(n.children, id, next);
      if (found) return found;
    }
  }
  return null;
}

function nodeMatchesFilter(node: TreeNode, f: ActiveFilter, userId: string): boolean {
  switch (f.kind) {
    case 'tag':
      return (node.tags ?? []).includes(f.label);
    case 'type':
      return node.type === f.value;
    case 'status':
      // "Locked" matches the node's locked flag; others match the status field.
      return f.value === 'locked' ? !!node.locked : node.status === f.value;
    case 'pinned':
      return (pinStore[userId] ?? []).some((p) => p.id === node.id);
    default:
      return false;
  }
}

/** Prune a tree to nodes that match any active filter (union) or have a kept descendant. */
function applyFilters(nodes: TreeNode[], filters: ActiveFilter[], userId: string): TreeNode[] {
  const out: TreeNode[] = [];
  for (const node of nodes) {
    const keptChildren = node.children
      ? applyFilters(node.children, filters, userId)
      : [];
    const selfMatch = filters.some((f) => nodeMatchesFilter(node, f, userId));
    if (selfMatch || keptChildren.length > 0) {
      out.push({ ...node, children: keptChildren.length ? keptChildren : node.children });
    }
  }
  return out;
}

// ---- API implementation -----------------------------------------------------

export const mockNavigatorApi: NavigatorApi = {
  async getCurrentUser(): Promise<CurrentUser> {
    log.info('getCurrentUser');
    return delay(clone(mockUserData as CurrentUser));
  },

  async getModulesForUser(userId: string): Promise<ModuleDescriptor[]> {
    const user = mockUserData as CurrentUser;
    const resolved = modules
      .filter((m) => m.visible)
      .map((m) => ({
        ...m,
        // A module is locked if explicitly flagged OR the user lacks its permission.
        locked:
          m.locked ||
          (!!m.requiredPermission && !user.permissions.includes(m.requiredPermission)),
      }));
    log.info('getModulesForUser', { userId, count: resolved.length });
    return delay(clone(resolved));
  },

  async getTreeForModule(moduleId: string, filters: ActiveFilter[] = []): Promise<TreeNode[]> {
    const mod = modules.find((m) => m.id === moduleId);
    const routeKey = mod?.routeKey ?? moduleId;
    const base = trees[routeKey] ?? [];
    const userId = (mockUserData as CurrentUser).id;
    const result = filters.length ? applyFilters(base, filters, userId) : base;
    log.info('getTreeForModule', { moduleId, routeKey, filters: filters.length, roots: result.length });
    return delay(clone(result));
  },

  async getFilterOptions(moduleId: string): Promise<FilterGroup[]> {
    const mod = modules.find((m) => m.id === moduleId);
    const routeKey = mod?.routeKey ?? moduleId;
    const groups = filterOptions[routeKey] ?? filterOptions.configuration ?? [];
    log.info('getFilterOptions', { moduleId, groups: groups.length });
    return delay(clone(groups));
  },

  async getPinnedObjects(userId: string): Promise<PinnedObject[]> {
    log.info('getPinnedObjects', { userId });
    return delay(clone(pinStore[userId] ?? []));
  },

  async pinObject(userId: string, objectId: string): Promise<PinnedObject[]> {
    const list = (pinStore[userId] ??= []);
    if (!list.some((p) => p.id === objectId)) {
      const node = findNodeAnywhere(objectId);
      if (node) {
        list.push({ id: node.id, label: node.label, type: node.type, status: node.status });
        log.info('pinObject', { userId, objectId });
      } else {
        log.warn('pinObject: node not found', { objectId });
      }
    }
    return delay(clone(list));
  },

  async unpinObject(userId: string, objectId: string): Promise<PinnedObject[]> {
    const list = (pinStore[userId] ??= []);
    pinStore[userId] = list.filter((p) => p.id !== objectId);
    log.info('unpinObject', { userId, objectId });
    return delay(clone(pinStore[userId]));
  },

  async getObjectDetails(objectId: string): Promise<ObjectDetails | null> {
    const stored = detailsById[objectId];
    if (stored) {
      log.info('getObjectDetails: stored', { objectId });
      return delay(clone(stored));
    }
    // Synthesize a reasonable default for nodes without curated detail fixtures.
    const node = findNodeAnywhere(objectId);
    if (!node) {
      log.warn('getObjectDetails: not found', { objectId });
      return delay(null);
    }
    const path =
      Object.keys(trees)
        .map((k) => findPath(trees[k], objectId))
        .find(Boolean) ?? [node];
    const synth: ObjectDetails = {
      id: node.id,
      title: node.label,
      subtitle: node.type,
      breadcrumb: path.map((n) => n.label),
      contentRoute: node.contentRoute ?? 'object-summary',
      accessLabel: 'SUPER-USER · facility-scoped access',
      metadata: [
        { label: 'Type', value: node.type },
        { label: 'Status', value: node.status ?? 'none' },
        { label: 'Object ID', value: node.id },
      ],
      metrics: [],
      actions: [],
      activity: [],
    };
    log.info('getObjectDetails: synthesized', { objectId });
    return delay(synth);
  },

  async getLoadedContentRoute(objectId: string): Promise<LoadedContentRoute> {
    const node = findNodeAnywhere(objectId);
    const routeKey = node?.contentRoute ?? 'object-summary';
    const route = loadedRoutes[routeKey] ?? loadedRoutes['object-summary'];
    log.info('getLoadedContentRoute', { objectId, routeKey });
    return delay(clone(route));
  },

  async getActionAvailability(userId: string, objectId: string): Promise<ActionAvailability[]> {
    const user = mockUserData as CurrentUser;
    const node = findNodeAnywhere(objectId);
    const resolved: ActionAvailability[] = ACTION_CATALOG.map((a) => {
      const hasPerm = !a.requiredPermission || user.permissions.includes(a.requiredPermission);
      return {
        ...a,
        enabled: hasPerm,
        reason: hasPerm ? undefined : `Requires ${a.requiredPermission}`,
      };
    });
    log.info('getActionAvailability', { userId, objectId, type: node?.type });
    return delay(resolved);
  },
};
