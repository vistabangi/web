import type { Dict } from '../i18n';

interface Props {
  dict: Dict;
}

export function Highlights({ dict }: Props) {
  return (
    <section className="shell py-24" aria-labelledby="highlights-title">
      <p className="eyebrow">{dict.hero.eyebrow.split('·')[0]?.trim()}</p>
      <h2 id="highlights-title" className="section-title mt-3">
        {dict.highlights.title}
      </h2>
      <p className="prose-lead mt-4">{dict.highlights.intro}</p>

      <ul className="mt-14 grid gap-px overflow-hidden rounded-card bg-ink-100 sm:grid-cols-2 lg:grid-cols-4">
        {dict.highlights.items.map((item, i) => (
          <li key={item.title} className="bg-white p-7">
            <span
              className="display flex h-10 w-10 items-center justify-center rounded-full border border-gold-300 text-base text-gold-700"
              aria-hidden="true"
            >
              {i + 1}
            </span>
            <h3 className="mt-5 text-base font-semibold text-ink-900">{item.title}</h3>
            <p className="mt-2.5 text-sm leading-relaxed text-ink-500">{item.body}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
