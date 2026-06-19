import type {
  ActiveFilter,
  FilterGroup,
  LoadedContentRoute,
  ModuleDescriptor,
  ObjectAction,
  ObjectDetails,
  PinnedObject,
  TreeNode,
} from './navigator';
import type { CurrentUser } from './user';

/**
 * The Navigator API contract.
 *
 * `mockNavigatorApi` implements this against local JSON today; a future
 * `realNavigatorApi` can implement the same interface against a C#/.NET backend
 * with zero changes to UI components or hooks.
 */
export interface NavigatorApi {
  getCurrentUser(): Promise<CurrentUser>;

  getModulesForUser(userId: string): Promise<ModuleDescriptor[]>;

  getTreeForModule(moduleId: string, filters?: ActiveFilter[]): Promise<TreeNode[]>;

  getFilterOptions(moduleId: string): Promise<FilterGroup[]>;

  getPinnedObjects(userId: string): Promise<PinnedObject[]>;

  pinObject(userId: string, objectId: string): Promise<PinnedObject[]>;

  unpinObject(userId: string, objectId: string): Promise<PinnedObject[]>;

  getObjectDetails(objectId: string): Promise<ObjectDetails | null>;

  getLoadedContentRoute(objectId: string): Promise<LoadedContentRoute>;

  /**
   * Returns, per action, whether the given user may invoke it for the object.
   * Drives disabled/locked action state in the details blade.
   */
  getActionAvailability(
    userId: string,
    objectId: string,
  ): Promise<Array<ObjectAction & { enabled: boolean; reason?: string }>>;
}

export type ActionAvailability = Awaited<
  ReturnType<NavigatorApi['getActionAvailability']>
>[number];
