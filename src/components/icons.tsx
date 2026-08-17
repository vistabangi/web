import type { TenantCategory } from '../data/tenants';

/**
 * Single-path icons on a 24×24 grid, stroked. Kept as bare path data so both
 * static and hydrated components can render them without pulling in an icon
 * library (and without shipping one to the browser).
 */

export const CATEGORY_ICON: Record<TenantCategory, string> = {
  fnb: 'M4 3v6a4 4 0 0 0 8 0V3M8 13v8M16 3c-1.5 2-2 3.5-2 5.5S15 12 16 12s2-1.5 2-3.5S17.5 5 16 3ZM16 12v9',
  grocery: 'M4 5h2l2.2 10.2a2 2 0 0 0 2 1.6h7.4a2 2 0 0 0 2-1.5L21 8H7M10 21h.01M17 21h.01',
  health: 'M9 3h6v6h6v6h-6v6H9v-6H3V9h6V3Z',
  dental: 'M12 4c2.4-1.3 5-1 6 .9 1.2 2.2.2 5-.4 7.6-.4 1.9-.6 4-1.3 5.9-.5 1.4-1.7 1.4-2.1 0-.4-1.4-.5-3.4-2.2-3.4s-1.8 2-2.2 3.4c-.4 1.4-1.6 1.4-2.1 0-.7-1.9-.9-4-1.3-5.9C6.2 9.9 5.2 7.1 6.4 4.9 7.4 3 10 2.7 12 4Z',
  beauty: 'M12 3c2.5 3 4 5.5 4 8a4 4 0 0 1-8 0c0-2.5 1.5-5 4-8ZM12 15v6',
  services: 'M14.7 6.3a4 4 0 0 1 5 5L21 21l-4-1-9.3-9.3a4 4 0 0 1-1-5l3 3 2-2-3-3a4 4 0 0 1 5 1Z',
  tech: 'M3 5h18v11H3V5ZM2 20h20M9.5 16h5',
  retail: 'M3 7h18l-1.5 12.5a2 2 0 0 1-2 1.5H6.5a2 2 0 0 1-2-1.5L3 7ZM8 7V5a4 4 0 0 1 8 0v2',
  education: 'M3 9l9-5 9 5-9 5-9-5ZM7 11.5V17c0 1.5 2.2 3 5 3s5-1.5 5-3v-5.5',
  laundry: 'M4 3h16v18H4V3ZM8 7h.01M11 7h.01M12 17a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z',
};

export const CHECK_PATH = 'M20 6 9 17l-5-5';
export const PIN_PATH = 'M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11Z';
export const INFO_PATHS = ['M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z', 'M12 8h.01M12 11v5'];
export const EXTERNAL_PATH = 'M14 4h6v6M20 4l-8 8M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5';

interface IconProps {
  /** One or more path `d` strings. */
  d: string | readonly string[];
  size?: number;
  strokeWidth?: number;
  className?: string;
}

export function Icon({ d, size = 20, strokeWidth = 1.7, className }: IconProps) {
  const paths = typeof d === 'string' ? [d] : d;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {paths.map((p) => (
        <path key={p} d={p} />
      ))}
    </svg>
  );
}

/** Small gold check used in the facility and short-stay lists. */
export function CheckIcon({ className = 'shrink-0 text-gold-600' }: { className?: string }) {
  return <Icon d={CHECK_PATH} size={15} strokeWidth={2.5} className={className} />;
}
