import { useState } from 'react';
import { Icon, INFO_PATHS, EXTERNAL_PATH, PIN_PATH } from './icons';
import type { OutletDirectoryView, OutletView } from '../lib/shopView';

interface Props {
  view: OutletDirectoryView;
}

/**
 * The commercial outlet directory — Levels 1 and 2 combined into one list.
 *
 * Hydrated (client:visible), so every prop must be JSON-serializable; the view
 * model is resolved server-side in src/lib/shopView.ts. The server-rendered
 * markup lists every outlet, so the directory is complete before (or entirely
 * without) hydration — filtering is the enhancement.
 */
export function OutletDirectory({ view }: Props) {
  const [active, setActive] = useState('all');
  const { strings, categories, outlets } = view;

  const visible = outlets.filter((o) => active === 'all' || o.category === active);

  const chip = (value: string, label: string) => {
    const on = active === value;
    return (
      <button
        key={value}
        type="button"
        onClick={() => setActive(value)}
        aria-pressed={on}
        className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
          on
            ? 'border-gold-600 bg-gold-600 text-white'
            : 'border-ink-200 bg-white text-ink-600 hover:border-gold-400 hover:text-gold-700'
        }`}
      >
        {label}
      </button>
    );
  };

  return (
    <section id="outlets" className="scroll-mt-28 bg-ink-50 py-24" aria-labelledby="outlets-title">
      <div className="shell">
        <p className="eyebrow">{strings.levelsCaption}</p>
        <h2 id="outlets-title" className="section-title mt-3">
          {strings.title}
        </h2>
        <p className="prose-lead mt-4">{strings.intro}</p>

        {strings.notice && (
          <p className="mt-7 flex max-w-3xl gap-3 rounded-card border border-gold-200 bg-gold-50 p-4 text-sm leading-relaxed text-ink-600">
            <Icon d={INFO_PATHS} size={18} strokeWidth={1.8} className="mt-0.5 shrink-0 text-gold-600" />
            <span>{strings.notice}</span>
          </p>
        )}

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-[0.6875rem] font-semibold tracking-[0.16em] text-ink-400 uppercase">
              {strings.filterLabel}
            </p>
            <div role="group" aria-label={strings.filterLabel} className="mt-3 flex flex-wrap gap-2">
              {chip('all', strings.filterAll)}
              {categories.map((c) => chip(c.value, c.label))}
            </div>
          </div>
          <p className="text-xs text-ink-400">{strings.verifiedCount}</p>
        </div>

        <div className="rule-gold mt-8" />

        {visible.length > 0 ? (
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((o) => (
              <OutletCard key={o.id} outlet={o} strings={strings} />
            ))}
          </ul>
        ) : (
          <p className="mt-8 text-sm text-ink-400">{strings.emptyFiltered}</p>
        )}
      </div>
    </section>
  );
}

function OutletCard({
  outlet,
  strings,
}: {
  outlet: OutletView;
  strings: OutletDirectoryView['strings'];
}) {
  return (
    <li className="flex gap-4 rounded-card border border-ink-100 bg-white p-5 transition-colors hover:border-gold-300">
      <LogoCircle outlet={outlet} />

      <div className="min-w-0 flex-1">
        <p className="font-semibold text-ink-900">{outlet.name}</p>

        <p className="mt-0.5 text-[0.6875rem] tracking-[0.1em] text-ink-400 uppercase">
          {outlet.categoryLabel}
          {outlet.levelLabel && <> · {outlet.levelLabel}</>}
          {outlet.unit && (
            <>
              {' · '}
              {strings.unitLabel} {outlet.unit}
            </>
          )}
        </p>

        {outlet.hours && (
          <p className="mt-2 text-sm text-ink-500">
            {strings.hoursLabel}: {outlet.hours}
          </p>
        )}

        {outlet.phone && (
          <p className="mt-1.5 text-sm">
            <a
              href={`tel:${outlet.phone.replace(/\s/g, '')}`}
              className="font-medium text-ink-700 underline decoration-ink-200 underline-offset-4 hover:text-gold-700"
            >
              {strings.callLabel} {outlet.phone}
            </a>
          </p>
        )}

        {(outlet.url || outlet.mapUrl) && (
          <p className="mt-2.5 flex flex-wrap gap-x-4 gap-y-1 text-sm">
            {outlet.url && (
              <a
                href={outlet.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-medium text-gold-700 underline decoration-gold-200 underline-offset-4 hover:decoration-gold-500"
              >
                {strings.websiteLabel}
                <Icon d={EXTERNAL_PATH} size={13} strokeWidth={2} />
              </a>
            )}
            {outlet.mapUrl && (
              <a
                href={outlet.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-medium text-gold-700 underline decoration-gold-200 underline-offset-4 hover:decoration-gold-500"
              >
                {strings.mapLabel}
                <Icon d={PIN_PATH} size={13} strokeWidth={2} />
              </a>
            )}
          </p>
        )}
      </div>
    </li>
  );
}

/**
 * The outlet's logo when a file exists at public/images/shops/<id>.*, otherwise
 * an empty circle — so every row keeps the same left rhythm either way.
 */
function LogoCircle({ outlet }: { outlet: OutletView }) {
  if (outlet.logo) {
    return (
      <span className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full border border-ink-100 bg-white">
        <img
          src={outlet.logo}
          alt={outlet.logoAlt}
          width={48}
          height={48}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-contain"
        />
      </span>
    );
  }

  return (
    <span
      className="h-12 w-12 shrink-0 rounded-full border border-ink-200 bg-white"
      aria-hidden="true"
    />
  );
}
