import type { UiScale } from '../../types';
import { Segmented } from '../common/Segmented';

export function ScaleSelector({
  value,
  onChange,
}: {
  value: UiScale;
  onChange: (s: UiScale) => void;
}) {
  return (
    <Segmented<UiScale>
      ariaLabel="UI scale"
      value={value}
      onChange={onChange}
      options={[
        { label: '100%', value: 100 },
        { label: '125%', value: 125 },
        { label: '150%', value: 150 },
      ]}
    />
  );
}
