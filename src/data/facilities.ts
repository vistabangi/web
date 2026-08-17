/**
 * Facility list. `key` maps to a translated label in src/i18n/{en,ms,ta}.ts
 * (dict.facilities[key]) — add a key here and you must add it in all three
 * dictionaries, or `astro check` will fail the build. That is intentional:
 * it stops a locale from silently falling back to English.
 *
 * Sourced from public listings — CONFIRM against the management office.
 */

export type FacilityKey =
  | 'swimmingPool'
  | 'kidsPool'
  | 'gym'
  | 'multipurposeHall'
  | 'joggingTrack'
  | 'bbqArea'
  | 'playground'
  | 'yogaZone'
  | 'sunDeck'
  | 'library'
  | 'nursery'
  | 'pingPong'
  | 'parking'
  | 'lifts'
  | 'surauNearby';

export const FACILITIES: readonly FacilityKey[] = [
  'swimmingPool',
  'kidsPool',
  'gym',
  'multipurposeHall',
  'joggingTrack',
  'bbqArea',
  'playground',
  'yogaZone',
  'sunDeck',
  'library',
  'nursery',
  'pingPong',
  'parking',
  'lifts',
  'surauNearby',
];

/** Unit layouts offered. Built-up range from public listings — CONFIRM. */
export interface UnitType {
  readonly id: string;
  /** Translated via dict.units.types[id]. */
  readonly bedrooms: number;
  readonly bathrooms: number;
  readonly sqftMin: number;
  readonly sqftMax: number;
}

export const UNIT_TYPES: readonly UnitType[] = [
  { id: 'studio', bedrooms: 0, bathrooms: 1, sqftMin: 501, sqftMax: 600 },
  { id: 'two-bed', bedrooms: 2, bathrooms: 2, sqftMin: 650, sqftMax: 800 },
  { id: 'three-bed', bedrooms: 3, bathrooms: 2, sqftMin: 850, sqftMax: 1000 },
];
