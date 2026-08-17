import { FACILITIES } from '../data/facilities';
import { CheckIcon } from './icons';
import type { Dict } from '../i18n';

interface Props {
  dict: Dict;
}

export function Facilities({ dict }: Props) {
  return (
    <section id="facilities" className="scroll-mt-24 bg-ink-50 py-24" aria-labelledby="facilities-title">
      <div className="shell">
        <h2 id="facilities-title" className="section-title">
          {dict.facilities.title}
        </h2>
        <p className="prose-lead mt-4">{dict.facilities.intro}</p>

        <ul className="mt-12 grid grid-cols-2 gap-x-8 gap-y-1 sm:grid-cols-3 lg:grid-cols-4">
          {FACILITIES.map((key) => (
            <li
              key={key}
              className="flex items-center gap-3 border-b border-ink-200 py-3 text-sm text-ink-700"
            >
              <CheckIcon />
              {dict.facilities.labels[key]}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
