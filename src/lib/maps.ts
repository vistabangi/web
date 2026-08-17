import { ADDRESS_LINE, COORDINATES, MAP_QUERY } from '../data/site';

/**
 * Map deep links and the embed URL.
 *
 * All of these read from `COORDINATES` in src/data/site.ts. While that is null
 * they fall back to a name/address *search*, which Google and Waze both resolve
 * to the building — no fabricated pin. Set the coordinates and every link below
 * becomes an exact pin with no further edits.
 */

const q = encodeURIComponent(MAP_QUERY);
const coordPair = COORDINATES ? `${COORDINATES.lat},${COORDINATES.lng}` : null;

/** Embeddable map. `output=embed` needs no API key. */
export const MAP_EMBED_URL = coordPair
  ? `https://maps.google.com/maps?q=${encodeURIComponent(coordPair)}&z=17&output=embed`
  : `https://maps.google.com/maps?q=${q}&z=16&output=embed`;

/** Opens the place page in Google Maps. */
export const MAP_PLACE_URL = coordPair
  ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(coordPair)}`
  : `https://www.google.com/maps/search/?api=1&query=${q}`;

/** Starts turn-by-turn navigation in Google Maps. */
export const MAP_DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${
  coordPair ? encodeURIComponent(coordPair) : q
}`;

/** Waze — the dominant navigation app in Malaysia. */
export const WAZE_URL = coordPair
  ? `https://waze.com/ul?ll=${encodeURIComponent(coordPair)}&navigate=yes`
  : `https://waze.com/ul?q=${q}&navigate=yes`;

/** Plain-text address for the copy-to-clipboard button. */
export const COPYABLE_ADDRESS = ADDRESS_LINE;

/** True when an exact pin has been surveyed and set. */
export const HAS_EXACT_PIN = coordPair !== null;
