import { useId } from 'react';

/** The multi-color "Ask Sentient" sparkle. Self-contained gradient (unique id). */
export function AiSparkleIcon({ size = 15 }: { size?: number }) {
  const id = useId().replace(/:/g, '');
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={id} x1="2" y1="3" x2="22" y2="21" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#f9508a" />
          <stop offset=".3" stopColor="#ff8a3d" />
          <stop offset=".55" stopColor="#22b364" />
          <stop offset=".78" stopColor="#2f81f7" />
          <stop offset="1" stopColor="#a371f7" />
        </linearGradient>
      </defs>
      <path fill={`url(#${id})`} d="M12 3l1.7 4.6L18 9l-4.3 1.4L12 15l-1.7-4.6L6 9l4.3-1.4z" />
      <path fill={`url(#${id})`} d="M18.5 14l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7z" />
    </svg>
  );
}
