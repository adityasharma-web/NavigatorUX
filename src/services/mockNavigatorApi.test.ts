import { beforeEach, describe, expect, it } from 'vitest';
import { mockNavigatorApi as api } from './mockNavigatorApi';
import type { ActiveFilter, TreeNode } from '../types';

const USER = 'u-almeida';

function flatten(nodes: TreeNode[]): TreeNode[] {
  return nodes.flatMap((n) => [n, ...(n.children ? flatten(n.children) : [])]);
}

describe('mockNavigatorApi', () => {
  it('locks NCMR for a user without its permission', async () => {
    const modules = await api.getModulesForUser(USER);
    const ncmr = modules.find((m) => m.id === 'ncmr');
    expect(ncmr?.locked).toBe(true);
  });

  it('returns the configuration hierarchy', async () => {
    const tree = await api.getTreeForModule('configuration');
    expect(tree[0]?.id).toBe('blocks');
    expect(flatten(tree).some((n) => n.id === 'leaf_sma02')).toBe(true);
  });

  it('prunes the tree to violation nodes when filtered', async () => {
    const filters: ActiveFilter[] = [{ kind: 'status', label: 'Has violations', value: 'violation' }];
    const tree = await api.getTreeForModule('configuration', filters);
    const flat = flatten(tree);
    // kept nodes are either violations themselves or ancestors of one
    expect(flat.some((n) => n.id === 'leaf_sma02')).toBe(true);
    expect(flat.some((n) => n.id === 'lam')).toBe(false); // healthy leaf pruned
  });

  it('disables the Archive action without object.archive permission', async () => {
    const actions = await api.getActionAvailability(USER, 'leaf_sma02');
    const archive = actions.find((a) => a.id === 'archive');
    const viewData = actions.find((a) => a.id === 'view-data');
    expect(archive?.enabled).toBe(false);
    expect(viewData?.enabled).toBe(true);
  });

  it('pins and unpins objects in user-scoped state', async () => {
    const afterPin = await api.pinObject(USER, 'leaf_sma01');
    expect(afterPin.some((p) => p.id === 'leaf_sma01')).toBe(true);
    const afterUnpin = await api.unpinObject(USER, 'leaf_sma01');
    expect(afterUnpin.some((p) => p.id === 'leaf_sma01')).toBe(false);
  });

  it('resolves a loaded content route for a selected object', async () => {
    const route = await api.getLoadedContentRoute('leaf_sma02');
    expect(route.routeKey).toBe('spc-parameter');
    expect(route.title).toMatch(/SPC/i);
  });
});

// Reset pin state between runs that mutate it.
beforeEach(async () => {
  const pins = await api.getPinnedObjects(USER);
  for (const p of pins) {
    if (p.id !== 'leaf_sma02' && p.id !== 'param_tx') await api.unpinObject(USER, p.id);
  }
});
