/**
 * District section and state types for TECHFEST — The Innovation District (Milestone 3.0)
 */

export type DistrictId =
  | 'overview'
  | 'core'
  | 'ai'
  | 'robotics'
  | 'aerospace'
  | 'cyber'
  | 'library'
  | 'plaza'
  | 'nasa-rover'
  | 'nasa-dish'
  | 'nasa-jwst';

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

export interface DistrictDetails {
  id: DistrictId;
  code: string;
  name: string;
  title: string;
  subtitle: string;
  description: string;
  accentColor: string;
  cameraPosition: [number, number, number];
  cameraTarget: [number, number, number];
  facilities: string[];
  keyInstallations: string[];
  stats?: Array<{ label: string; value: string }>;
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
