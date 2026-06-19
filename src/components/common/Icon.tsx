import { memo } from 'react';
import { FILLED_ICONS, ICON_PATHS } from './icons';

export interface IconProps {
  name: keyof typeof ICON_PATHS | (string & {});
  size?: number;
  strokeWidth?: number;
  className?: string;
  title?: string;
  /** Force fill rendering (for filled glyphs like the pin/star). */
  filled?: boolean;
}

/**
 * Renders a registered icon by name. Inherits `currentColor` so callers control
 * color via CSS. Unknown names fall back to the `leaf` glyph and warn.
 */
export const Icon = memo(function Icon({
  name,
  size = 14,
  strokeWidth = 1.9,
  className,
  title,
  filled,
}: IconProps) {
  const d = ICON_PATHS[name] ?? ICON_PATHS.leaf;
  const isFilled = filled ?? FILLED_ICONS.has(name);
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      fill={isFilled ? 'currentColor' : 'none'}
      stroke={isFilled ? 'none' : 'currentColor'}
      strokeWidth={isFilled ? undefined : strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden={title ? undefined : true}
      role={title ? 'img' : undefined}
      focusable="false"
    >
      {title ? <title>{title}</title> : null}
      <path d={d} />
    </svg>
  );
});
