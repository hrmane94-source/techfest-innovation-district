export * from './CityCamera';

import type { CameraPreset } from '../../types/scene';
import type { DistrictSectionId } from '../../types/district';

export const CAMERA_PRESETS: Record<DistrictSectionId, CameraPreset> = {
  arrival: {
    position: [58, 92, 110],
    target: [0, 20, 0],
    fov: 50,
  },
  district: {
    position: [45, 30, 45],
    target: [0, 20, 0],
    fov: 45,
  },
  technology: {
    position: [-42, 28, -38],
    target: [-24, 12, -20],
    fov: 45,
  },
  experience: {
    position: [42, 26, -38],
    target: [24, 10, -20],
    fov: 45,
  },
  future: {
    position: [38, 28, 38],
    target: [24, 14, 22],
    fov: 40,
  },
};
