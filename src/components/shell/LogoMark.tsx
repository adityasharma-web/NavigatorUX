// Served from /public/assets — referenced by URL, not bundled.
const logoBlack = '/assets/logo-black.png';
const logoWhite = '/assets/logo-white.png';

export interface LogoMarkProps {
  height?: number;
  /** Show the "Sentient" wordmark next to the mark. */
  withWordmark?: boolean;
}

/**
 * Theme-aware Sentient logo. Light theme uses the dark/blue mark; dark theme
 * uses the white mark. Swap is handled by CSS (.logo-light / .logo-dark) so it
 * needs no theme prop. Assets live in /public/assets.
 *
 * TODO: replace PNGs with an inline SVG mark once brand provides a vector.
 */
export function LogoMark({ height = 30, withWordmark = false }: LogoMarkProps) {
  return (
    <span className="logo-mark" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
      <img className="logo-light" src={logoBlack} alt="Sentient" style={{ height, width: 'auto' }} />
      <img className="logo-dark" src={logoWhite} alt="Sentient" style={{ height, width: 'auto' }} />
      {withWordmark && (
        <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: '-0.01em', color: 'var(--text)' }}>
          Sentient
        </span>
      )}
    </span>
  );
}
