import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { CurrentUser, ModuleDescriptor, Permission } from '../types';
import type { Appearance } from '../hooks/useTheme';
import { useNavigatorTree, type NavigatorTreeValue } from '../hooks/useNavigatorTree';
import { useSelectedObject, type SelectedObjectValue } from '../hooks/useSelectedObject';
import { usePinnedObjects, type PinnedObjectsValue } from '../hooks/usePinnedObjects';
import { useFilterOptions, type FilterState } from '../hooks/useFilterOptions';

/** Mutually-exclusive popover menus anchored in the header / rail / blade. */
export type MenuName = 'launcher' | 'appearance' | 'profile' | 'system' | 'filter';

interface ShellState {
  railExpanded: boolean;
  bladeOpen: boolean;
  detailsOpen: boolean;
  aiOpen: boolean;
  toggleRail: () => void;
  toggleBlade: () => void;
  toggleDetails: () => void;
  setDetailsOpen: (v: boolean) => void;
  toggleAi: () => void;
  openMenu: MenuName | null;
  toggleMenu: (m: MenuName) => void;
  closeMenus: () => void;
}

export interface NavigatorContextValue {
  user: CurrentUser;
  modules: ModuleDescriptor[];
  primaryModules: ModuleDescriptor[];
  systemModules: ModuleDescriptor[];
  hasPermission: (p?: Permission) => boolean;

  activeModuleId: string;
  setActiveModule: (id: string) => void;
  activeModule: ModuleDescriptor | undefined;

  appearance: Appearance;
  tree: NavigatorTreeValue;
  filters: FilterState;
  pinned: PinnedObjectsValue;
  selection: SelectedObjectValue & { selectedId: string | null; select: (id: string) => void };

  shell: ShellState;
  onSignOut: () => void;
}

const NavigatorContext = createContext<NavigatorContextValue | null>(null);

export interface NavigatorProviderProps {
  user: CurrentUser;
  modules: ModuleDescriptor[];
  appearance: Appearance;
  hasPermission: (p?: Permission) => boolean;
  onSignOut: () => void;
  children: ReactNode;
}

/**
 * Composes the feature hooks into one context. Components read exactly the slice
 * they need via `useNavigator()`, keeping each component small and decoupled
 * from data-fetching concerns.
 */
export function NavigatorProvider({
  user,
  modules,
  appearance,
  hasPermission,
  onSignOut,
  children,
}: NavigatorProviderProps) {
  const primaryModules = useMemo(() => modules.filter((m) => m.group === 'primary'), [modules]);
  const systemModules = useMemo(() => modules.filter((m) => m.group === 'system'), [modules]);

  const [activeModuleId, setActiveModuleId] = useState('configuration');
  const activeModule = useMemo(
    () => modules.find((m) => m.id === activeModuleId),
    [modules, activeModuleId],
  );

  const filters = useFilterOptions(activeModuleId);
  const tree = useNavigatorTree(activeModuleId, filters.active);
  const pinned = usePinnedObjects(user.id);

  const [selectedId, setSelectedId] = useState<string | null>(
    user.preferences.pinnedObjectIds[0] ?? null,
  );
  const selected = useSelectedObject(user.id, selectedId);

  // shell layout state
  const [railExpanded, setRailExpanded] = useState(true);
  const [bladeOpen, setBladeOpen] = useState(true);
  // Details blade is closed by default so the content host is full-width
  // (matches the approved screenshots); opened via the header toggle.
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [aiOpen, setAiOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<MenuName | null>(null);

  const setActiveModule = useCallback((id: string) => {
    setActiveModuleId(id);
    setOpenMenu(null);
  }, []);

  const select = useCallback((id: string) => {
    setSelectedId(id);
  }, []);

  const shell = useMemo<ShellState>(
    () => ({
      railExpanded,
      bladeOpen,
      detailsOpen,
      aiOpen,
      toggleRail: () => setRailExpanded((v) => !v),
      toggleBlade: () => setBladeOpen((v) => !v),
      toggleDetails: () => setDetailsOpen((v) => !v),
      setDetailsOpen,
      toggleAi: () => {
        setAiOpen((v) => !v);
        setOpenMenu(null);
      },
      openMenu,
      toggleMenu: (m: MenuName) => setOpenMenu((cur) => (cur === m ? null : m)),
      closeMenus: () => setOpenMenu(null),
    }),
    [railExpanded, bladeOpen, detailsOpen, aiOpen, openMenu],
  );

  const value = useMemo<NavigatorContextValue>(
    () => ({
      user,
      modules,
      primaryModules,
      systemModules,
      hasPermission,
      activeModuleId,
      setActiveModule,
      activeModule,
      appearance,
      tree,
      filters,
      pinned,
      selection: { ...selected, selectedId, select },
      shell,
      onSignOut,
    }),
    [
      user,
      modules,
      primaryModules,
      systemModules,
      hasPermission,
      activeModuleId,
      setActiveModule,
      activeModule,
      appearance,
      tree,
      filters,
      pinned,
      selected,
      selectedId,
      select,
      shell,
      onSignOut,
    ],
  );

  return <NavigatorContext.Provider value={value}>{children}</NavigatorContext.Provider>;
}

export function useNavigator(): NavigatorContextValue {
  const ctx = useContext(NavigatorContext);
  if (!ctx) throw new Error('useNavigator must be used within NavigatorProvider');
  return ctx;
}
