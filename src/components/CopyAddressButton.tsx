import { useState } from 'react';

interface Props {
  address: string;
  label: string;
  copiedLabel: string;
}

/**
 * Tiny hydrated island. Renders as an ordinary button server-side; if the
 * Clipboard API is unavailable (older browser, or a non-secure context) the
 * click is a no-op and the address stays selectable on the page above.
 */
export function CopyAddressButton({ address, label, copiedLabel }: Props) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* Clipboard blocked by the browser — leave the label unchanged. */
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-live="polite"
      className="rounded-full border border-ink-200 px-6 py-3 text-sm font-semibold text-ink-600 transition-colors hover:border-gold-400 hover:text-gold-700"
    >
      {copied ? copiedLabel : label}
    </button>
  );
}
