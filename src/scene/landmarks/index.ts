export * from './DistrictPlaza';
export * from './InnovationDistrict';

export interface LandmarkDefinition {
  id: string;
  name: string;
  sectorId: string;
  coordinates: [number, number, number];
}

export const DISTRICT_LANDMARKS: LandmarkDefinition[] = [
  { id: 'nexus-spire', name: 'Techfest Innovation Tower', sectorId: 'district', coordinates: [0, 52, 0] },
  { id: 'ai-core', name: 'Neural Compute Center', sectorId: 'ai', coordinates: [-26, 22, -22] },
  { id: 'robotics-fab', name: 'Robotics Fabrication Core', sectorId: 'robotics', coordinates: [24, 18, -20] },
  { id: 'aerospace-hangar', name: 'Aerospace Flight Dynamics', sectorId: 'aerospace', coordinates: [-24, 14, 22] },
  { id: 'cyber-vault', name: 'Cybersecurity Matrix Core', sectorId: 'cybersecurity', coordinates: [24, 20, 22] },
];
