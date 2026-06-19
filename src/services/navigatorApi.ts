import type { NavigatorApi } from '../types';
import { mockNavigatorApi } from './mockNavigatorApi';

/**
 * The single Navigator API client used by the whole app.
 *
 * Today this is the mock (local JSON). To go live, implement a `realNavigatorApi`
 * against the same `NavigatorApi` interface and swap the export below — no UI,
 * hook, or type changes required.
 *
 *   export const navigatorApi: NavigatorApi = realNavigatorApi;
 */
export const navigatorApi: NavigatorApi = mockNavigatorApi;
