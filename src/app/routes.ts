/**
 * Module → hierarchy availability map.
 *
 * In production this would be richer routing config; for pre-alpha it records
 * which modules ship a backend hierarchy today vs. an empty-state placeholder.
 * Trees themselves are still fetched via the API (never hardcoded in the UI).
 */
export const MODULES_WITH_TREE = new Set(['configuration', 'reporting', 'processControl']);

export function moduleHasTree(moduleId: string): boolean {
  return MODULES_WITH_TREE.has(moduleId);
}
