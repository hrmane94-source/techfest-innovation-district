import { ARRIVAL_SECTION_META } from './Arrival';
import { DISTRICT_SECTION_META } from './District';
import { TECHNOLOGY_SECTION_META } from './Technology';
import { EXPERIENCE_SECTION_META } from './Experience';
import { FUTURE_SECTION_META } from './Future';
import type { DistrictSectionMeta, DistrictSectionId } from '../types/district';

export * from './Arrival';
export * from './District';
export * from './Technology';
export * from './Experience';
export * from './Future';

export const DISTRICT_SECTIONS: Record<DistrictSectionId, DistrictSectionMeta> = {
  arrival: ARRIVAL_SECTION_META,
  district: DISTRICT_SECTION_META,
  technology: TECHNOLOGY_SECTION_META,
  experience: EXPERIENCE_SECTION_META,
  future: FUTURE_SECTION_META,
};

export const DISTRICT_SECTIONS_LIST: DistrictSectionMeta[] = [
  ARRIVAL_SECTION_META,
  DISTRICT_SECTION_META,
  TECHNOLOGY_SECTION_META,
  EXPERIENCE_SECTION_META,
  FUTURE_SECTION_META,
];
