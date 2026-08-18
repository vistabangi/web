import type { ReactNode } from 'react';
import { CONTACT } from '../data/site';
import { humanReadableEmail } from '../lib/contactMask';
import type { Dict } from '../i18n';

interface Props {
  dict: Dict;
  /** The masked channel list, passed in from Astro so this stays unhydrated. */
  channels?: ReactNode;
}

export function Contact({ dict, channels }: Props) {
  return (
    <section id="contact" className="scroll-mt-28 bg-ink-50 py-24" aria-labelledby="contact-title">
      <div className="shell">
        <h2 id="contact-title" className="section-title">
          {dict.contact.title}
        </h2>
        <p className="prose-lead mt-4">{dict.contact.intro}</p>

        {channels}

        {/*
          Fallback for visitors without JavaScript, who cannot use the reveal
          buttons.

          The e-mail is given in [at]/[dot] form: legible to a person, invisible
          to the address regexes harvesters actually run. The phone number is
          deliberately NOT printed here — `noscript` content sits in the served
          HTML like any other markup, so a scraper reads it whether or not it
          runs scripts, and printing the digits would undo the masking for
          everyone. Any human-readable rendering of a phone number is
          digit-matchable, so there is no safe way to show it here.
        */}
        <noscript>
          <dl className="mt-10 grid max-w-3xl gap-x-12 gap-y-6 sm:grid-cols-2">
            {CONTACT.managementEmail && (
              <div className="border-b border-ink-200 pb-4">
                <dt className="text-[0.6875rem] font-semibold tracking-[0.16em] text-ink-400 uppercase">
                  {dict.contact.email}
                </dt>
                <dd className="mt-2 text-base text-ink-900">
                  {humanReadableEmail(CONTACT.managementEmail)}
                </dd>
              </div>
            )}
          </dl>
          <p className="mt-6 max-w-xl text-xs leading-relaxed text-ink-400">
            {dict.contact.noscriptNote}
          </p>
        </noscript>
      </div>
    </section>
  );
}
