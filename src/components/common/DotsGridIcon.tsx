/** 3×3 dot grid — the Azure-style app launcher glyph. */
export function DotsGridIcon({ size = 15 }: { size?: number }) {
  const cols = [5, 12, 19];
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      {cols.flatMap((cy) => cols.map((cx) => <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="1.7" />))}
    </svg>
  );
}
