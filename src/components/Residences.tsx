import { BUILDING } from '../data/site';
import { UNIT_TYPES } from '../data/facilities';
import type { Dict } from '../i18n';

interface Props {
  dict: Dict;
}

export function Residences({ dict }: Props) {
  const layoutName = (bedrooms: number) =>
    bedrooms === 0 ? dict.units.studio : dict.units.bedrooms(bedrooms);

  return (
    <section id="residences" className="shell scroll-mt-24 py-24" aria-labelledby="residences-title">
      <h2 id="residences-title" className="section-title">
        {dict.units.title}
      </h2>
      <p className="prose-lead mt-4">{dict.units.intro}</p>

      <ul className="mt-12 grid gap-6 md:grid-cols-3">
        {UNIT_TYPES.map((u) => (
          <li key={u.id} className="card flex flex-col p-7">
            <p className="display text-2xl text-ink-900">{layoutName(u.bedrooms)}</p>
            <p className="mt-1.5 text-sm text-ink-500">{dict.units.bathrooms(u.bathrooms)}</p>
            <div className="rule-gold mt-6" />
            <p className="mt-4 text-sm font-semibold tracking-wide text-gold-700">
              {dict.units.sqft(u.sqftMin, u.sqftMax)}
            </p>
          </li>
        ))}
      </ul>

      <div className="mt-16 rounded-card bg-ink-900 p-8 md:p-12">
        <h3 className="display text-3xl text-gold-200">{dict.units.blockTitle}</h3>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ink-200">{dict.units.blockBody}</p>

        <div className="mt-9 grid gap-5 sm:grid-cols-2">
          {BUILDING.blocks.map((b) => (
            <div key={b.id} className="rounded-lg border border-gold-600/35 p-6">
              <p className="display text-2xl text-gold-300">{b.name}</p>
              <dl className="mt-4 grid grid-cols-2 gap-4 text-sm">
                <div>
                  <dt className="text-[0.6875rem] tracking-[0.14em] text-ink-400 uppercase">
                    {dict.units.floorsLabel}
                  </dt>
                  <dd className="display mt-1 text-2xl text-white">{b.floors}</dd>
                </div>
                <div>
                  <dt className="text-[0.6875rem] tracking-[0.14em] text-ink-400 uppercase">
                    {dict.units.unitsLabel}
                  </dt>
                  <dd className={b.units ? 'display mt-1 text-2xl text-white' : 'mt-1.5 text-sm text-ink-400'}>
                    {b.units ?? dict.units.unitsTbc}
                  </dd>
                </div>
              </dl>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
