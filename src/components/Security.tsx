import { SECURITY } from '../data/site';
import { Icon } from './icons';
import type { Dict } from '../i18n';

interface Props {
  dict: Dict;
}

export function Security({ dict }: Props) {
  // Each card is gated on its flag in src/data/site.ts, so turning a feature off
  // removes the claim from the page rather than leaving stale copy behind.
  const cards = [
    {
      key: 'guarded',
      enabled: SECURITY.guarded24h,
      ...dict.security.guarded,
      icon: 'M12 3 4 6v6c0 5 3.4 8.3 8 9 4.6-.7 8-4 8-9V6l-8-3Z',
    },
    {
      key: 'cctv',
      enabled: SECURITY.cctv,
      ...dict.security.cctv,
      icon: 'M3 7l14-3 1.6 6L4.6 13 3 7ZM6 13v4a2 2 0 0 0 2 2h3M19 10l2.5-1v6L19 14',
    },
    {
      key: 'access',
      enabled: SECURITY.accessCardEntry,
      ...dict.security.access,
      icon: 'M3 6h18v12H3V6ZM7 10h5M7 13h3M16 10.5h2.5v3H16z',
    },
    {
      key: 'visitor',
      enabled: SECURITY.visitorRegistration,
      ...dict.security.visitor,
      icon: 'M9 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7ZM2.5 21a6.5 6.5 0 0 1 13 0M18 8v6M15 11h6',
    },
  ].filter((c) => c.enabled);

  return (
    <section id="security" className="shell scroll-mt-24 py-24" aria-labelledby="security-title">
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
        <h2 id="security-title" className="section-title">
          {dict.security.title}
        </h2>
        {SECURITY.guarded24h && (
          <span className="rounded-full border border-gold-400 px-3.5 py-1 text-xs font-semibold tracking-[0.14em] text-gold-700 uppercase">
            24/7
          </span>
        )}
      </div>
      <p className="prose-lead mt-4">{dict.security.intro}</p>

      <ul className="mt-12 grid gap-6 sm:grid-cols-2">
        {cards.map((c) => (
          <li key={c.key} className="card flex gap-5 p-7">
            <span
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-gold-300 to-gold-500 text-ink-900"
              aria-hidden="true"
            >
              <Icon d={c.icon} size={22} />
            </span>
            <div>
              <h3 className="text-base font-semibold text-ink-900">{c.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-500">{c.body}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
