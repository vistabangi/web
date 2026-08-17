import { useState } from 'react';
import { Icon, INFO_PATHS, EXTERNAL_PATH } from './icons';
import type { ShopDirectoryView, TenantView } from '../lib/shopView';

interface Props {
  view: ShopDirectoryView;
  title: string;
  intro: string;
}

/**
 * Level 1 / Level 2 shop directory with category filtering.
 *
 * Hydrated (client:visible), so every prop must be JSON-serializable — the view
 * model is resolved server-side in src/lib/shopView.ts. Server-rendered markup
 * shows all tenants, so the directory is complete and readable before (or
 * without) hydration; filtering is the enhancement.
 */
export function ShopDirectory({ view, title, intro }: Props) {
  const [active, setActive] = useState<string>('all');
  const { strings, categories, levels } = view;

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
    <section id="shops" className="scroll-mt-24 bg-ink-50 py-24" aria-labelledby="shops-title">
      <div className="shell">
        <p className="eyebrow">{strings.verifiedCount}</p>
        <h2 id="shops-title" className="section-title mt-3">
          {title}
        </h2>
        <p className="prose-lead mt-4">{intro}</p>

        {strings.notice && (
          <p className="mt-7 flex max-w-3xl gap-3 rounded-card border border-gold-200 bg-gold-50 p-4 text-sm leading-relaxed text-ink-600">
            <Icon d={INFO_PATHS} size={18} strokeWidth={1.8} className="mt-0.5 shrink-0 text-gold-600" />
            <span>{strings.notice}</span>
          </p>
        )}

        <div className="mt-10">
          <p className="text-[0.6875rem] font-semibold tracking-[0.16em] text-ink-400 uppercase">
            {strings.filterLabel}
          </p>
          <div role="group" aria-label={strings.filterLabel} className="mt-3 flex flex-wrap gap-2">
            {chip('all', strings.filterAll)}
            {categories.map((c) => chip(c.value, c.label))}
          </div>
        </div>

        <div className="mt-14 grid gap-16">
          {levels.map((level) => {
            const visible = level.tenants.filter((t) => active === 'all' || t.category === active);
            return (
              <div key={level.floor}>
                <div className="flex flex-wrap items-baseline gap-x-5 gap-y-1">
                  <h3 className="display text-3xl text-ink-900">{level.title}</h3>
                  <p className="text-sm text-ink-500">{level.lead}</p>
                </div>
                <div className="rule-gold mt-4" />

                {visible.length > 0 ? (
                  <ul className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {visible.map((t) => (
                      <TenantCard key={t.id} tenant={t} strings={strings} />
                    ))}
                  </ul>
                ) : (
                  <p className="mt-7 text-sm text-ink-400">{strings.emptyFiltered}</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function TenantCard({
  tenant,
  strings,
}: {
  tenant: TenantView;
  strings: ShopDirectoryView['strings'];
}) {
  return (
    <li
      className={`flex gap-4 rounded-card p-5 transition-colors ${
        tenant.unverified
          ? 'border border-dashed border-ink-200 bg-transparent'
          : 'border border-ink-100 bg-white hover:border-gold-300'
      }`}
    >
      <span
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
          tenant.unverified ? 'bg-ink-100 text-ink-400' : 'bg-gold-50 text-gold-700'
        }`}
        aria-hidden="true"
      >
        <Icon d={tenant.iconPath} size={19} />
      </span>

      <div className="min-w-0">
        <p className="font-semibold text-ink-900">{tenant.name}</p>
        <p className="mt-0.5 text-[0.6875rem] tracking-[0.1em] text-ink-400 uppercase">
          {tenant.categoryLabel}
          {tenant.unit && (
            <>
              {' · '}
              {strings.unitLabel} {tenant.unit}
            </>
          )}
        </p>

        {tenant.hours && (
          <p className="mt-2 text-sm text-ink-500">
            {strings.hoursLabel}: {tenant.hours}
          </p>
        )}

        {tenant.phone && (
          <p className="mt-1.5 text-sm">
            <a
              href={`tel:${tenant.phone.replace(/\s/g, '')}`}
              className="font-medium text-ink-700 underline decoration-ink-200 underline-offset-4 hover:text-gold-700"
            >
              {strings.callLabel} {tenant.phone}
            </a>
          </p>
        )}

        {tenant.url && (
          <p className="mt-2 text-sm">
            <a
              href={tenant.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-medium text-gold-700 underline decoration-gold-200 underline-offset-4 hover:decoration-gold-500"
            >
              {strings.websiteLabel}
              <Icon d={EXTERNAL_PATH} size={13} strokeWidth={2} />
            </a>
          </p>
        )}

        {tenant.unverified && (
          <p className="mt-2.5 inline-block rounded border border-ink-200 px-1.5 py-0.5 text-[0.625rem] font-semibold tracking-[0.1em] text-ink-400 uppercase">
            {strings.toBeConfirmed}
          </p>
        )}
      </div>
    </li>
  );
}
