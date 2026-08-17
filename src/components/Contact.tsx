import { CONTACT } from '../data/site';
import type { Dict } from '../i18n';

interface Props {
  dict: Dict;
}

export function Contact({ dict }: Props) {
  // Only configured channels render as links; the rest show "to be published",
  // so the page never offers a number that does not connect.
  const rows = [
    {
      label: dict.contact.phone,
      value: CONTACT.managementPhone,
      href: CONTACT.managementPhone ? `tel:${CONTACT.managementPhone.replace(/\s/g, '')}` : null,
    },
    {
      label: dict.contact.email,
      value: CONTACT.managementEmail,
      href: CONTACT.managementEmail ? `mailto:${CONTACT.managementEmail}` : null,
    },
    {
      label: dict.contact.whatsapp,
      value: CONTACT.whatsapp,
      href: CONTACT.whatsapp ? `https://wa.me/${CONTACT.whatsapp.replace(/\D/g, '')}` : null,
    },
    { label: dict.contact.hours, value: CONTACT.officeHours, href: null },
  ];

  return (
    <section id="contact" className="scroll-mt-24 bg-ink-50 py-24" aria-labelledby="contact-title">
      <div className="shell">
        <h2 id="contact-title" className="section-title">
          {dict.contact.title}
        </h2>
        <p className="prose-lead mt-4">{dict.contact.intro}</p>

        <dl className="mt-12 grid max-w-3xl gap-x-12 gap-y-6 sm:grid-cols-2">
          {rows.map((r) => (
            <div key={r.label} className="border-b border-ink-200 pb-4">
              <dt className="text-[0.6875rem] font-semibold tracking-[0.16em] text-ink-400 uppercase">
                {r.label}
              </dt>
              <dd className="mt-2 text-base">
                {r.value && r.href ? (
                  <a
                    href={r.href}
                    {...(r.href.startsWith('https://')
                      ? { target: '_blank', rel: 'noopener noreferrer' }
                      : {})}
                    className="font-medium text-ink-900 underline decoration-gold-300 underline-offset-4 transition-colors hover:text-gold-700"
                  >
                    {r.value}
                  </a>
                ) : r.value ? (
                  <span className="text-ink-900">{r.value}</span>
                ) : (
                  <span className="text-sm text-ink-400">{dict.contact.tbc}</span>
                )}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
