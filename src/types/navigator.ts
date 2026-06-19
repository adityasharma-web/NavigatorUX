import type { Permission } from './permissions';

/** Left-rail module descriptor (backend/mock-driven). */
export interface ModuleDescriptor {
  id: string;
  label: string;
  /** Icon registry key (see components/common/icons.ts). */
  iconKey: string;
  /** Route/tree key the module loads. */
  routeKey: string;
  group: 'primary' | 'system';
  visible: boolean;
  locked: boolean;
  requiredPermission?: Permission;
}

/** High-level classification used for icons and filtering. */
export type NodeType =
  | 'block'
  | 'site'
  | 'module'
  | 'collection'
  | 'area'
  | 'equip'
  | 'param'
  | 'leaf'
  | 'chart'
  | 'records'
  | 'viol'
  | 'report';

export type NodeStatus = 'healthy' | 'warning' | 'violation' | 'none';

/**
 * Tree node as returned by the API. Children may be omitted and lazily loaded;
 * `hasChildren` signals expandability independent of whether children are present.
 */
export interface TreeNode {
  id: string;
  label: string;
  type: NodeType;
  hasChildren: boolean;
  children?: TreeNode[];
  locked?: boolean;
  status?: NodeStatus;
  /** Filter tags (site/area/module names) used by the smart filter. */
  tags?: string[];
  /** Content route key resolved by getLoadedContentRoute(). */
  contentRoute?: string;
  /** Permission required to open/select; absence means open. */
  requiredPermission?: Permission;
}

/** A single grouped filter option (compact chip in the popover). */
export interface FilterOption {
  label: string;
  /** How the option matches a node. */
  kind: 'tag' | 'type' | 'status' | 'pinned';
  /** Value for `type`/`status` kinds. */
  value?: string;
}

export interface FilterGroup {
  id: string;
  label: string;
  options: FilterOption[];
}

/** An applied filter (selected option). */
export interface ActiveFilter {
  kind: FilterOption['kind'];
  label: string;
  value?: string;
}

/** Pinned object summary (user-scoped). */
export interface PinnedObject {
  id: string;
  label: string;
  type: NodeType;
  status?: NodeStatus;
}

/** Object metadata key/value pair shown in the details blade. */
export interface MetadataField {
  label: string;
  value: string;
}

export interface CapabilityMetric {
  label: string;
  value: string;
  tone: 'good' | 'warn' | 'bad' | 'neutral';
}

export interface ObjectAction {
  id: string;
  label: string;
  iconKey: string;
  requiredPermission?: Permission;
}

export interface ActivityEntry {
  id: string;
  text: string;
  when: string;
  tone: 'good' | 'warn' | 'bad' | 'neutral';
}

/** Full object detail payload (getObjectDetails). */
export interface ObjectDetails {
  id: string;
  title: string;
  subtitle?: string;
  breadcrumb: string[];
  metadata: MetadataField[];
  metrics: CapabilityMetric[];
  /** Optional curated actions; availability is resolved via getActionAvailability. */
  actions?: ObjectAction[];
  activity: ActivityEntry[];
  contentRoute: string;
  /** Permission context summary for the details blade. */
  accessLabel: string;
}

/** Content-host routing payload (getLoadedContentRoute). */
export interface LoadedContentRoute {
  routeKey: string;
  /** Component/view key the host would mount in production. */
  viewKey: string;
  title: string;
  description: string;
  /** Short tag describing the kind of hosted module. */
  kind: string;
  /** Sample fields the placeholder renders. */
  placeholderFields: MetadataField[];
}
