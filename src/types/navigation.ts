/**
 * Navigation types for district exploration
 */

import type { DistrictSectionId } from './district';

export interface NavigationItem {
  id: DistrictSectionId;
  label: string;
  code: string;
  index: number;
}
