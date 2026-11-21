/**
 * District section and state types for TECHFEST — The Innovation District
 */

export type DistrictSectionId = 
  | 'arrival'
  | 'district'
  | 'technology'
  | 'experience'
  | 'future';

export interface DistrictCoordinates {
  x: number;
  y: number;
  z: number;
}

export interface DistrictSectionMeta {
  id: DistrictSectionId;
  name: string;
  code: string;
  subtitle: string;
  coordinates: DistrictCoordinates;
  status: 'active' | 'standby' | 'locked';
}

export interface DistrictState {
  currentSection: DistrictSectionId;
  isTransitioning: boolean;
  activeLandmark: string | null;
  coordinates: DistrictCoordinates;
}
