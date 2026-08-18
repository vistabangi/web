import { useState } from 'react';
import { unmaskValue } from '../lib/contactMask';

export type ChannelKind = 'tel' | 'mailto' | 'whatsapp';

export interface ChannelRow {
  readonly key: string;
  readonly label: string;
  readonly kind: ChannelKind;
  /** Masked payload — never the plain value. */
  readonly masked: string;
  /** Accessible name for the reveal button, resolved server-side. */
  readonly revealAria: string;
}

interface Props {
  rows: readonly ChannelRow[];
  /** Office hours, shown as-is: nothing to harvest. */
  hoursLabel: string;
  hoursValue: string | null;
  reveal: string;
  spamNote: string;
  tbc: string;
}

/**
 * Contact channels, hidden behind a click.
 *
 * Only the masked payload reaches the HTML; the real value is reconstructed in
 * the browser after a click. See src/lib/contactMask.ts for the threat model —
 * this stops regex harvesters, not headless-browser scrapers.
 *
 * Hydrated, so every prop must stay JSON-serializable: labels and the button's
 * accessible name are resolved server-side rather than passed as functions.
 */
export function ContactChannels({
  rows,
  hoursLabel,
  hoursValue,
  reveal,
  spamNote,
  tbc,
}: Props) {
  const [shown, setShown] = useState<Record<string, string>>({});

  function revealRow(row: ChannelRow) {
    setShown((current) => ({ ...current, [row.key]: unmaskValue(row.masked) }));
  }

  function hrefFor(kind: ChannelKind, value: string): string {
    if (kind === 'tel') return `tel:${value.replace(/\s|-/g, '')}`;
    if (kind === 'mailto') return `mailto:${value}`;
    return `https://wa.me/${value.replace(/\D/g, '')}`;
  }

  /** WhatsApp stores bare digits; render them the way the phone row reads. */
  function displayValue(kind: ChannelKind, value: string): string {
    if (kind !== 'whatsapp') return value;
    const match = /^(\d{2})(\d{2})(\d{4})(\d{4})$/.exec(value);
    return match ? `+${match[1]} ${match[2]}-${match[3]} ${match[4]}` : value;
  }

  return (
    <>
      <dl className="mt-12 grid max-w-3xl gap-x-12 gap-y-6 sm:grid-cols-2">
        {rows.map((row) => {
          const value = shown[row.key];
          return (
            <div key={row.key} className="border-b border-ink-200 pb-4">
              <dt className="text-[0.6875rem] font-semibold tracking-[0.16em] text-ink-400 uppercase">
                {row.label}
              </dt>
              <dd className="mt-2 text-base">
                {value ? (
                  <a
                    href={hrefFor(row.kind, value)}
                    {...(row.kind === 'whatsapp'
                      ? { target: '_blank', rel: 'noopener noreferrer' }
                      : {})}
                    className="font-medium text-ink-900 underline decoration-gold-300 underline-offset-4 transition-colors hover:text-gold-700"
                  >
                    {displayValue(row.kind, value)}
                  </a>
                ) : (
                  <button
                    type="button"
                    onClick={() => revealRow(row)}
                    aria-label={row.revealAria}
                    className="inline-flex items-center gap-2 rounded-full border border-ink-200 px-4 py-1.5 text-sm font-semibold text-ink-600 transition-colors hover:border-gold-400 hover:text-gold-700"
                  >
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7Z" />
                      <circle cx="12" cy="12" r="2.5" />
                    </svg>
                    {reveal}
                  </button>
                )}
              </dd>
            </div>
          );
        })}

        <div className="border-b border-ink-200 pb-4">
          <dt className="text-[0.6875rem] font-semibold tracking-[0.16em] text-ink-400 uppercase">
            {hoursLabel}
          </dt>
          <dd className="mt-2 text-base">
            {hoursValue ? (
              <span className="text-ink-900">{hoursValue}</span>
            ) : (
              <span className="text-sm text-ink-400">{tbc}</span>
            )}
          </dd>
        </div>
      </dl>

      <p className="mt-6 max-w-xl text-xs leading-relaxed text-ink-400">{spamNote}</p>
    </>
  );
}
