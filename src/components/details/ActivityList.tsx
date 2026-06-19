import type { ActivityEntry } from '../../types';

const TONE_COLOR: Record<ActivityEntry['tone'], string> = {
  good: 'var(--good)',
  warn: 'var(--warn)',
  bad: 'var(--bad)',
  neutral: 'var(--text-3)',
};

/** Recent activity feed for the selected object. */
export function ActivityList({ items }: { items: ActivityEntry[] }) {
  if (items.length === 0) return null;
  return (
    <div className="activity">
      {items.map((a) => (
        <div className="activity-row" key={a.id}>
          <span className="activity-row__dot" style={{ background: TONE_COLOR[a.tone] }} />
          <span>
            <span className="activity-row__text">{a.text}</span>
            <span className="activity-row__when" style={{ display: 'block' }}>
              {a.when}
            </span>
          </span>
        </div>
      ))}
    </div>
  );
}
