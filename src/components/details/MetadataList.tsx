import type { MetadataField } from '../../types';

/** Simple label/value metadata table. */
export function MetadataList({ fields }: { fields: MetadataField[] }) {
  if (fields.length === 0) return null;
  return (
    <div className="meta-list">
      {fields.map((f) => (
        <div className="meta-row" key={f.label}>
          <span className="meta-row__label">{f.label}</span>
          <span className="meta-row__value">{f.value}</span>
        </div>
      ))}
    </div>
  );
}
