/** Compact path display. The last segment is emphasized as the current object. */
export function Breadcrumbs({ path }: { path: string[] }) {
  if (path.length === 0) return null;
  return (
    <nav className="breadcrumb" aria-label="Breadcrumb">
      {path.map((seg, i) => {
        const last = i === path.length - 1;
        return (
          <span key={`${seg}-${i}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
            <span className={`breadcrumb__seg${last ? ' breadcrumb__seg--last' : ''}`}>{seg}</span>
            {!last && <span className="breadcrumb__sep">›</span>}
          </span>
        );
      })}
    </nav>
  );
}
