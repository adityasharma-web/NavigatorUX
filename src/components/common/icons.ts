/**
 * Icon registry — SVG path data keyed by name.
 *
 * Centralizing path data keeps components free of inline SVG and lets mock/API
 * data reference icons by string key (module.iconKey, action.iconKey, etc.).
 * All paths are authored for a 24×24 viewBox, stroke-based unless noted.
 */
export const ICON_PATHS: Record<string, string> = {
  // modules
  home: 'M3 11l9-8 9 8M5 10v10h5v-6h4v6h5V10',
  configuration: 'M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6',
  workflow: 'M6 4v10M18 8a3 3 0 100-6 3 3 0 000 6zM6 21a3 3 0 100-6 3 3 0 000 6zM18 8a9 9 0 01-9 9',
  dataCollection:
    'M12 8c4.97 0 9-1.34 9-3s-4.03-3-9-3-9 1.34-9 3 4.03 3 9 3zM3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5',
  processControl: 'M22 12h-4l-3 9L9 3l-3 9H2',
  reporting: 'M3 3v18h18M7 15v-5M12 15V7M17 15v-9',
  dataExplorer: 'M11 19a8 8 0 100-16 8 8 0 000 16zM21 21l-4.35-4.35',
  ncmr: 'M10.3 3.9L1.8 18a2 2 0 001.7 3h17a2 2 0 001.7-3L13.7 3.9a2 2 0 00-3.4 0zM12 9v4M12 17h.01',
  mrp: 'M21 16V8a2 2 0 00-1-1.7l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.7l7 4a2 2 0 002 0l7-4A2 2 0 0021 16zM3.3 7L12 12l8.7-5M12 22V12',
  appSupport: 'M12 22a10 10 0 100-20 10 10 0 000 20zM9.1 9a3 3 0 015.8 1c0 2-3 3-3 3M12 17h.01',

  // system
  workspace: 'M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z',
  security: 'M12 2l8 4v6c0 5-3.4 8.4-8 10-4.6-1.6-8-5-8-10V6z',
  admin: 'M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2zM12 11v5M9.5 13.5h5',
  help: 'M12 22a10 10 0 100-20 10 10 0 000 20zM9.1 9a3 3 0 015.8 1c0 2-3 3-3 3M12 17h.01',
  settings:
    'M12 15a3 3 0 100-6 3 3 0 000 6zM19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z',

  // node types
  block: 'M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z',
  site: 'M3 21h18M5 21V7l7-4 7 4v14M9 9h.01M9 13h.01M15 9h.01M15 13h.01',
  module: 'M21 16V8a2 2 0 00-1-1.7l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.7l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z',
  collection: 'M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2z',
  area: 'M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2z',
  equip: 'M9 3v2M15 3v2M9 19v2M15 19v2M3 9h2M3 15h2M19 9h2M19 15h2M7 7h10v10H7z',
  param: 'M22 12h-4l-3 9L9 3l-3 9H2',
  leaf: 'M20 6L9 17l-5-5',
  chart: 'M3 3v18h18M7 14l4-4 3 3 5-6',
  records: 'M3 3h18v18H3zM3 9h18M9 3v18',
  viol: 'M10.3 3.9L1.8 18a2 2 0 001.7 3h17a2 2 0 001.7-3L13.7 3.9a2 2 0 00-3.4 0zM12 9v4M12 17h.01',
  report: 'M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8zM14 2v6h6',

  // actions
  table: 'M3 3h18v18H3zM3 9h18M3 15h18M9 3v18',
  list: 'M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01',
  sliders: 'M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6',
  archive: 'M21 8v13H3V8M1 3h22v5H1zM10 12h4',

  // ui / chrome
  hamburger: 'M3 6h18M3 12h18M3 18h18',
  bell: 'M18 8a6 6 0 00-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 01-3.4 0',
  chevronDown: 'M6 9l6 6 6-6',
  chevronUp: 'M6 15l6-6 6 6',
  chevronRight: 'M9 6l6 6-6 6',
  chevronLeft: 'M15 6l-6 6 6 6',
  filter: 'M22 3H2l8 9.46V19l4 2v-8.54L22 3z',
  lock: 'M5 11h14v10H5zM8 11V7a4 4 0 018 0v4',
  refresh: 'M23 4v6h-6M1 20v-6h6M3.5 9a9 9 0 0114.9-3.4L23 10M1 14l4.6 4.4A9 9 0 0020.5 15',
  signOut: 'M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9',
  send: 'M22 2L11 13M22 2l-7 20-4-9-9-4z',
  arrowRight: 'M5 12h14M13 6l6 6-6 6',
  star: 'M12 17l-5 3 1.9-5.7L4 10h6l2-6 2 6h6l-4.9 4.3L17 20z',
  zap: 'M22 12h-4l-3 9L9 3l-3 9H2',
  app: 'M2 3h20v14H2zM8 21h8M12 17v4M2 8h20',
  info: 'M12 22a10 10 0 100-20 10 10 0 000 20zM12 16v-4M12 8h.01',
};

/** Filled icons render with `fill` instead of `stroke`. */
export const FILLED_ICONS = new Set(['star']);
