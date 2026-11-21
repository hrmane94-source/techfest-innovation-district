import type { DistrictId, DistrictDetails } from '../types/district';

export interface DistrictContextValue {
  selectedDistrict: DistrictId;
  hoveredDistrict: DistrictId | null;
  selectedDetails: DistrictDetails;
  isTourActive: boolean;
  isTransitioning: boolean;
  tourStep: number;
  selectDistrict: (id: DistrictId) => void;
  setHoveredDistrict: (id: DistrictId | null) => void;
  resetToOverview: () => void;
  nextDistrict: () => void;
  prevDistrict: () => void;
  toggleTour: (active?: boolean) => void;
  setTransitioning: (val: boolean) => void;
}
