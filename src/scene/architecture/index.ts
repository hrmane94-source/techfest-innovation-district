export * from './CentralLandmark';
export * from './CentralInnovationPavilions';
export * from './DistrictBuildings';
export * from './TowerGenerator';
export * from './UniversityLibrary';
export * from './AcademicDistrict';
export * from './StudentLifeDistrict';
export * from './KnowledgeDistrict';
export * from './RecreationDistrict';

import type { SceneArchitectureLayer } from '../../types/scene';

export const ARCHITECTURE_LAYERS: SceneArchitectureLayer[] = [
  { id: 'foundations', label: 'Ground Matrix & Podium', visible: true, opacity: 1.0 },
  { id: 'sectors', label: 'District Enclaves', visible: true, opacity: 1.0 },
  { id: 'transit', label: 'Transit & Skyway Arteries', visible: true, opacity: 0.8 },
  { id: 'holographics', label: 'Holographic Overlays', visible: true, opacity: 0.6 },
];
