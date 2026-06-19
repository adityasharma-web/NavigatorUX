import type { ThemeMode } from '../../types';
import { Segmented } from '../common/Segmented';

export function ThemeToggle({
  value,
  onChange,
}: {
  value: ThemeMode;
  onChange: (t: ThemeMode) => void;
}) {
  return (
    <Segmented<ThemeMode>
      ariaLabel="Theme"
      value={value}
      onChange={onChange}
      options={[
        { label: 'Light', value: 'light' },
        { label: 'Dark', value: 'dark' },
      ]}
    />
  );
}
