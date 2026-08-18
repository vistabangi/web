/**
 * Reversible masking for contact details, so phone numbers and e-mail addresses
 * never appear as plain text in the served HTML.
 *
 * ── What this does and does not do ──────────────────────────────────────────
 * The threat model is the common one: bulk harvesters that fetch raw HTML and
 * run a regex for `mailto:` links, `name@host.tld` patterns and phone-shaped
 * digit runs. Masking defeats all of those, which is the majority of address
 * scraping.
 *
 * It does NOT defeat a determined scraper. Anything running a headless browser
 * executes the same JavaScript a real visitor does and reads the revealed
 * value. This is a spam-volume measure, not a security control — treat the
 * address as public regardless.
 *
 * Deliberately pure JavaScript with no Node or DOM APIs, because the same
 * module is imported on the server (to mask) and in the browser (to unmask).
 */

/** Hex character codes, reversed and dot-separated. ASCII-safe both ways. */
export function maskValue(value: string): string {
  return Array.from(value)
    .reverse()
    .map((char) => char.codePointAt(0)!.toString(16))
    .join('.');
}

export function unmaskValue(masked: string): string {
  return masked
    .split('.')
    .map((hex) => String.fromCodePoint(Number.parseInt(hex, 16)))
    .reverse()
    .join('');
}

/**
 * Human-readable form for the `<noscript>` fallback: legible to a person,
 * invisible to an address regex. Used for e-mail, which is the format bulk
 * harvesters actually target.
 */
export function humanReadableEmail(email: string): string {
  return email.replace('@', ' [at] ').replaceAll('.', ' [dot] ');
}
